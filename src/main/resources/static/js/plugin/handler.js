function isNotNumber(
    purchaseCost,
    purchaseTransCharge,
    sellPrice,
    realSellTransUnitCharge,
    sellTransUnitCharge,
    marketCommitionPercentage,
    extraCharge
) {
    if (
        isNaN(purchaseCost) ||
        isNaN(purchaseTransCharge) ||
        isNaN(sellPrice) ||
        isNaN(realSellTransUnitCharge) ||
        isNaN(sellTransUnitCharge) ||
        isNaN(marketCommitionPercentage) ||
        isNaN(extraCharge)
    ) {
        return true;
    } else {
        return false;
    }
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function jsonToBase64(json) {
    // return btoa(JSON.stringify(json));

    // **JSON -> String -> URI -> base64**
    return btoa(unescape(encodeURIComponent(JSON.stringify(json))))
}

function base64ToJson(str) {
    // return JSON.parse(atob(str));

    // **base64 -> URI -> String -> JSON**
    return JSON.parse(decodeURIComponent(escape(atob(str))).toString());
}

function isActualNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    // Textbox value
    var _value = evt.srcElement.value;
    // 소수점(.)이 두번 이상 나오지 못하게
    var _pattern0 = /^\d*[.]\d*$/; // 현재 value값에 소수점(.) 이 있으면 . 입력불가
    if (_pattern0.test(_value)) {
        if (charCode == 46) {
            return false;
        }
    }

    // 100 이하의 숫자만 입력가능
    var _pattern1 = /^\d{2}$/; // 현재 value값이 2자리 숫자이면 . 만 입력가능
    if (_pattern1.test(_value)) {
        if (charCode != 46) {
            // alert("100 이하의 숫자만 입력가능합니다");
            return false;
        }
    }

    // 소수점 둘째자리까지만 입력가능
    var _pattern2 = /^\d*[.]\d{2}$/; // 현재 value값이 소수점 둘째짜리 숫자이면 더이상 입력 불가
    if (_pattern2.test(_value)) {
        // alert("소수점 둘째자리까지만 입력가능합니다.");
        return false;
    }
    return true;
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function isInt(num) {
    return num % 1 === 0;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getDateRangeData(param1, param2) {  //param1은 시작일, param2는 종료일이다.
    var res_day = [];
    var ss_day = new Date(param1);
    var ee_day = new Date(param2);
    while (ss_day.getTime() <= ee_day.getTime()) {
        var _mon_ = (ss_day.getMonth() + 1);
        _mon_ = _mon_ < 10 ? '0' + _mon_ : _mon_;
        var _day_ = ss_day.getDate();
        _day_ = _day_ < 10 ? '0' + _day_ : _day_;
        res_day.push(ss_day.getFullYear() + '-' + _mon_ + '-' + _day_);
        ss_day.setDate(ss_day.getDate() + 1);
    }
    return res_day;
}

function textIsEmpty(text) {
    let newText = text.replace(/ /gi, '');
    if (newText == '' | newText == null) {
        return true;
    } else {
        return false;
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function isMember() {
    let acc = getCookie('ATHRU');
    let token = $("#ru_data").val();
    let text = acc + token;
    if(SHA256(text)===getCookie('ATHO')){
        return true;
    }else{
        return false;
    }
}

function dateToYYYYMMDD(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

// This is a functions that scrolls to #{blah}link
function goToByScroll(id) {
    // Remove "link" from the ID
    id = id.replace("link", "");
    // Scroll
    $('html,body').animate({
        scrollTop: $(id).offset().top-150
    },'slow');
}

function pageRouting(href){
    window.location.href=href;
}

function StSnackbarOpen(message) {
    var x = document.getElementById("i_st_snackbar");
    if(x == null){
        let snackbarHtml = `
            <div class="text-center">
                <div id="i_st_snackbar" class="show">${message}</div>
            </div>
        `;
        $('body').append(snackbarHtml);
        x = document.getElementById("i_st_snackbar");
    }else{
        x.innerHTML = message;
        x.classList.add("show");
    }
    setTimeout(function(){ x.classList.remove("show"); }, 3000);
}