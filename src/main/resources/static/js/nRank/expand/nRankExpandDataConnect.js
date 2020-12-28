function nrankExpandDataConnect(){
    return{
        getModules: async function(){
            await $.ajax({
                url:'/api/rank/naver/expand/search/modules_n_keywords/all',
                type:'GET',
                contentType:'application/json',
                dataType:'json',
                success: function(returnData){
                    let message = returnData && returnData.message ? returnData.message : 'ERROR';
                    if(message == 'USER_INVALID'){
                        return;
                    }
                    if(message=='SUCCESS'){
                        MODULES = returnData.module;
                        return;
                    } else{
                        alert('undefined error code : NREGM, error');
                        return;
                    }
                },
                error: function(error){
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : NREGM");
                    }
                }
            });
        },
        addModule: async function(){
            await $.ajax({
                url:'/api/rank/naver/expand/add/module/one',
                type:'POST',
                contentType:'application/json',
                dataType:'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", getCookie('XSRF-TOKEN'));
                },
                success: function(returnData){
                    let message = returnData && returnData.message ? returnData.message : 'ERROR';
                    if(message == 'USER_INVALID'){
                        alert("로그인이 필요합니다.");
                        return window.location.href='/login';
                    }
                    if(message == 'OVER_LIMIT'){
                        StSnackbarOpen('현재는 추가 모듈 생성을 지원하지 않습니다. 추후 공개될 서비스이며, 필요하신 셀러분은 관리자 메일로 연락주시기 바랍니다.');
                        return;
                    }
                    if(message=='SUCCESS'){
                        StSnackbarOpen('모듈이 추가되었습니다.');
                        return;
                    }else if(message=='FAILURE'){
                        alert('undefined error code : NREAM, fail');
                        return;
                    }else{
                        alert('undefined error code : NREAM, error');
                        return;
                    }
                },
                error: function(error){
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : NREAM");
                    }
                }
            });
        },
        addKeyword: async function(moduleId, keyword, shopName){
            let data = JSON.stringify({
                'moduleId':moduleId,
                'keyword':keyword,
                'shopName':shopName
            });
            await $.ajax({
                url:'/api/rank/naver/expand/add/keyword/one',
                type:'POST',
                contentType:'application/json',
                dataType:'json',
                data:data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", getCookie('XSRF-TOKEN'));
                },
                success: function(returnData){
                    let message = returnData && returnData.message ? returnData.message : 'ERROR';
                    if(message == 'USER_INVALID'){
                        alert("로그인이 필요합니다.");
                        return window.location.href='/login';
                    }
                    if(message == 'OVER_LIMIT'){
                        StSnackbarOpen('최대 5개의 키워드만 등록 가능합니다.');
                        return;
                    }
                    if(message=='SUCCESS'){
                        StSnackbarOpen('키워드가 등록 되었습니다.');
                        return;
                    }else if(message=='FAILURE'){
                        alert('undefined error code : NREAK, fail');
                        return;
                    }else{
                        alert('undefined error code : NREAK, error');
                        return;
                    }
                },
                error: function(error){
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : NREAK");
                    }
                }
            });
        },
        deleteModule: async function(moduleJson){
            let data = JSON.stringify(moduleJson);

            await $.ajax({
                url:'/api/rank/naver/expand/delete/module/one',
                type:'POST',
                contentType:'application/json',
                dataType:'json',
                data:data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", getCookie('XSRF-TOKEN'));
                },
                success: function(returnData){
                    let message = returnData && returnData.message ? returnData.message : 'ERROR';
                    if(message == 'USER_INVALID'){
                        alert("로그인 세션이 만료되었습니다.");
                        return window.location.href='/login';
                    }
                    if(message=='SUCCESS'){
                        StSnackbarOpen(`모듈이 삭제되었습니다.`);
                        return;
                    }else if(message=='FAILURE'){
                        alert('undefined error code : NREDM, fail');
                        return;
                    }else{
                        alert('undefined error code : NREDM, error');
                        return;
                    }
                },
                error: function(error){
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : NREDM");
                    }
                }
            });
        },
        deleteKeyword: async function(keywordJson){
            let data = JSON.stringify(keywordJson);
            
            await $.ajax({
                url:'/api/rank/naver/expand/delete/keyword/one',
                type:'POST',
                contentType:'application/json',
                dataType:'json',
                data:data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", getCookie('XSRF-TOKEN'));
                },
                success: function(returnData){
                    let message = returnData && returnData.message ? returnData.message : 'ERROR';
                    if(message == 'USER_INVALID'){
                        alert("로그인 세션이 만료되었습니다.");
                        return window.location.href='/login';
                    }
                    if(message=='SUCCESS'){
                        StSnackbarOpen(`${keywordJson.keyword}-${keywordJson.shopName} 이 삭제되었습니다.`);
                        return;
                    }else if(message=='FAILURE'){
                        alert('undefined error code : NREDK, fail');
                        return;
                    }else{
                        alert('undefined error code : NREDK, error');
                        return;
                    }
                },
                error: function(error){
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : NREDK");
                    }
                }
            });
        },
        getRankData: async function(moduleJson){
            let data = JSON.stringify(moduleJson);

            await $.ajax({
                url:'/api/rank/naver/expand/search/rank/by_module',
                type:'POST',
                contentType:'application/json',
                dataType:'json',
                data:data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", getCookie('XSRF-TOKEN'));
                    // $("#i_mdash_loading").removeClass('display-none');
                    nrankExpandModuleLoadHtml().setModuleLoading().set();
                },
                // complete: function () {
                //     $("#i_mdash_loading").addClass('display-none');
                // },
                success: function(returnData){
                    console.log(returnData);
                    let message = returnData && returnData.message ? returnData.message : 'ERROR';
                    if(message == 'USER_INVALID'){
                        alert("로그인 세션이 만료되었습니다.");
                        return window.location.href='/login';
                    }
                    if(message=='SUCCESS'){
                        SEARCH_LIST = returnData.searchList;
                        return;
                    }else if(message=='FAILURE'){
                        alert('현재 서버 요청량이 너무 많습니다. 잠시후에 다시 시도해주세요.');
                        return;
                    }else{
                        alert('undefined error code : NREDK, error');
                        return;
                    }
                },
                error: function(error){
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : NREDK");
                    }
                }
            });
        }
    }
}