function isNotNumber(
    purchaseCost,
    purchaseTransCharge,
    sellPrice,
    realSellTransUnitCharge,
    sellTransUnitCharge,
    marketCommitionPercentage,
    extraCharge
){
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
    }else{
        return false;
    }
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

function jsonToBase64(json){
    // return btoa(JSON.stringify(json));

    // **JSON -> String -> URI -> base64**
    return btoa(unescape(encodeURIComponent(JSON.stringify(json))))
}

function base64ToJson(str){
    // return JSON.parse(atob(str));

    // **base64 -> URI -> String -> JSON**
    return JSON.parse(decodeURIComponent(escape(atob(str))).toString());
}