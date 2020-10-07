$("#nonMemAddItemSubmit").submit(function(event){
    event.preventDefault();
    var productName = $("#productName").val();
    var purchaseCost = $("#purchaseCost").val();
    var purchaseTransCharge = $("#purchaseTransCharge").val();
    var sellPrice = $("#sellPrice").val();
    var realSellTransUnitCharge = $("#realSellTransUnitCharge").val();
    var sellTransUnitCharge = $("#sellTransUnitCharge").val();
    var marketCommitionPercentage = $("#marketCommitionPercentage").val();
    var extraCharge = $("#extraCharge").val();

    if(isNotNumber(purchaseCost,purchaseTransCharge,sellPrice,realSellTransUnitCharge,sellTransUnitCharge,marketCommitionPercentage,extraCharge)){
        alert("숫자만 입력하세요.");
        return;
    }

    let nonmemberItems = JSON.parse(window.localStorage.getItem("nonmemberItems"));
    if(isItemsOverflow(nonmemberItems)){
        alert("최대 10개의 아이템 등록만 지원 합니다.");
        return;
    }

    $.ajax({
        type: "GET", //전송방식을 지정한다 (POST,GET)
        url: "/api/margin/domesticCalc",//호출 URL을 설정한다. GET방식일경우 뒤에 파라티터를 붙여서 사용해도된다.
        dataType: "text",//호출한 페이지의 형식이다. xml,json,html,text등의 여러 방식을 사용할 수 있다.
        data: {
            purchaseCost: purchaseCost ? purchaseCost : "0",
            purchaseTransCharge: purchaseTransCharge ? purchaseTransCharge : "0",
            sellPrice: sellPrice ? sellPrice : "0",
            realSellTransUnitCharge: realSellTransUnitCharge ? realSellTransUnitCharge : "0",
            sellTransUnitCharge: sellTransUnitCharge ? sellTransUnitCharge : "0",
            marketCommitionPercentage: marketCommitionPercentage ? marketCommitionPercentage : "0",
            extraCharge:extraCharge ? extraCharge : "0"
        },
        error: function () {
            alert("server connect failed");
        },
        success: function (Parse_data) {
            let data = JSON.parse(Parse_data);
            
            var id = uuidv4();
            let json = {
                "id":id,
                "name":productName,
                "purchaseCost":purchaseCost,
                "purchaseTransCharge":purchaseTransCharge,
                "sellPrice":sellPrice,
                "realSellTransUnitCharge":realSellTransUnitCharge,
                "sellTransUnitCharge":sellTransUnitCharge,
                "marketCommitionPercentage":marketCommitionPercentage,
                "extraCharge":extraCharge,
                "unit":0,
                "margin":data.margin,
                "marginRate":data.marginRate,
                "VAT_10":data.VAT_10,
                "marginAfterVAT_10":data.margin - data.VAT_10
            }
            let jsonArr = [];
    
            if(nonmemberItems){
                jsonArr = jsonArr.concat(nonmemberItems);
            }
            jsonArr.push(json);
            let jsonToStr = JSON.stringify(jsonArr);
            window.localStorage.setItem("nonmemberItems",jsonToStr);
        }

    });

    
})

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

function isItemsOverflow(items){
    if(items && items.length>10){ return true; }
    return false;
}