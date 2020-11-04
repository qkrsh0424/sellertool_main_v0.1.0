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
    if (charCode > 31 &&(charCode < 48 || charCode > 57))
        return false;
    return true;
}

function isInt(num) {
    return num % 1 === 0;
}