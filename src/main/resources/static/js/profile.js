$("#profileUpdateSubmit").submit(function(event){
    event.preventDefault();

    let data = JSON.stringify({
        "name":$("#name").val(),
        "userUrl":$("#userUrl").val()
    });

    $.ajax({
        url:"/api/profile/update",
        type:"POST",
        contentType:"application/json",
        dataType:"json",
        data:data,
        beforeSend:function(xhr){
            xhr.setRequestHeader("X-XSRF-TOKEN", $("#_csrf").val());
        },
        success:function(returnData){
            if(returnData.message==="success"){
                alert("회원정보가 성공적으로 변경되었습니다.");
            }else{
                alert("failure error")
            }
            window.location.reload();
        },
        error:function(error){
            alert("server connect error");
        }
    })
});

$("#passwordUpdateSubmit").submit(function(event){
    event.preventDefault();
    if(chkPW($("#new_password").val(), $("#new_password_check").val())===false){
        return;
    }

    let data = JSON.stringify({
        "password":$("#password").val(),
        "newPassword":$("#new_password").val()
    });

    $.ajax({
        url:"/api/profile/password",
        type:"POST",
        contentType:"application/json",
        dataType:"json",
        data:data,
        beforeSend:function(xhr){
            xhr.setRequestHeader("X-XSRF-TOKEN", $("#_csrf_password_change").val());
        },
        success:function(returnData){
            if(returnData.message==="PW_NOT_MATCH"){
                alert("현재 패스워드가 일치하지 않습니다.");
            }else if(returnData.message==="USER_NON"){
                alert("세션이 만료되었습니다.");
                window.location.reload();
            }else if(returnData.message==="success"){
                alert("비밀번호가 성공적으로 변경되었으며, 다시 로그인 해주시기 바랍니다.");
                window.location.href="/login";
            }else{
                alert("failure error");
                window.location.reload();
            }
        },
        error:function(error){
            alert("server connect error");
        }
    })
});

$("#signoutSubmit").submit(function(event){
    event.preventDefault();
    if(!confirm('회원 탈퇴시 관련된 모든 데이터를 잃게 되며, 복구가 불가능 합니다. 그래도 계속 하시겠습니까?')){
        return;
    }
    let data = JSON.stringify({
        "password":$("#i_signout_password").val(),
    });

    $.ajax({
        url:"/api/profile/signout",
        type:"POST",
        contentType:"application/json",
        dataType:"json",
        data:data,
        beforeSend:function(xhr){
            xhr.setRequestHeader("X-XSRF-TOKEN", $("#_csrf_signout").val());
        },
        success:function(returnData){
            console.log(returnData);
            if(returnData.message==="PW_NOT_MATCH"){
                alert("패스워드가 일치하지 않습니다.");
                return;
            }else if(returnData.message==="USER_NON"){
                alert("세션이 만료되었습니다.");
                return window.location.reload();
            }else if(returnData.message==="SUCCESS"){
                alert("회원이 정상적으로 탈퇴 되었습니다.");
                return window.location.href="/";
            }else{
                alert("failure error");
                return window.location.reload();
            }
        },
        error:function(error){
            alert("server connect error");
        }
    })
});

function chkPW(password, checkPassword) {

    var pw = password;
    var pwc = checkPassword;
    var num = pw.search(/[0-9]/g);
    var eng = pw.search(/[a-z]/ig);
    // var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    var spe = pw.search(/[!@#$%^&*()\-_=+\\\/\[\]{};:\`"',.<>\/?\|~]/gi);

    if(pw !== pwc){
        alert("비밀번호를 다시 확인해 주세요.");
        return false;
    }
    if (pw.length < 8 || pw.length > 20) {

        alert("비밀번호는 8자리 ~ 20자리 이내로 입력해주세요.");
        return false;
    } else if (pw.search(/\s/) != -1) {
        alert("비밀번호는 공백 없이 입력해주세요.");
        return false;
    } else if (num < 0 || eng < 0 || spe < 0) {
        alert("비밀번호는 영문, 숫자, 특수문자를 혼합하여 입력해주세요.");
        return false;
    } else {
        return true;
    }

}