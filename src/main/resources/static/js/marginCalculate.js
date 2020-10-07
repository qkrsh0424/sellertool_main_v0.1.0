$("#domesticMarginSubmit").submit(
    
    function searchSubmit(e) {
        e.preventDefault();
        if (
            isNaN(document.getElementById("purchaseCost").value) ||
            isNaN(document.getElementById("purchaseTransCharge").value) ||
            isNaN(document.getElementById("sellPrice").value) ||
            isNaN(document.getElementById("realSellTransUnitCharge").value) ||
            isNaN(document.getElementById("sellTransUnitCharge").value) ||
            isNaN(document.getElementById("marketCommitionPercentage").value)
        ) {
            alert("숫자만 입력 하세요")
        } else {
            $(document).ready(function () {
                $.ajax({
                    type: "GET", //전송방식을 지정한다 (POST,GET)
                    url: "/api/margin/domesticCalc",//호출 URL을 설정한다. GET방식일경우 뒤에 파라티터를 붙여서 사용해도된다.
                    dataType: "text",//호출한 페이지의 형식이다. xml,json,html,text등의 여러 방식을 사용할 수 있다.
                    data: {
                        purchaseCost: $("#purchaseCost").val() ? $("#purchaseCost").val() : "0",
                        purchaseTransCharge: $("#purchaseTransCharge").val() ? $("#purchaseTransCharge").val() : "0",
                        sellPrice: $("#sellPrice").val() ? $("#sellPrice").val() : "0",
                        realSellTransUnitCharge: $("#realSellTransUnitCharge").val() ? $("#realSellTransUnitCharge").val() : "0",
                        sellTransUnitCharge: $("#sellTransUnitCharge").val() ? $("#sellTransUnitCharge").val() : "0",
                        marketCommitionPercentage: $("#marketCommitionPercentage").val() ? $("#marketCommitionPercentage").val() : "0",
                        extraCharge:$("#extraCharge").val() ? $("#extraCharge").val() : "0"
                    },
                    error: function () {
                        alert("server connect failed");
                    },
                    success: function (Parse_data) {
                        $("#marginVal").html(JSON.parse(Parse_data).margin);
                        $("#marginRateVal").html(JSON.parse(Parse_data).marginRate);
                        $("#VAT_10").html(JSON.parse(Parse_data).VAT_10);
                        $("#marginAfterVAT_10").html(JSON.parse(Parse_data).margin - JSON.parse(Parse_data).VAT_10);
                    }
    
                });
            });
        }
    }
);

// function enterkey() {
//     if (window.event.keyCode == 13) {

//         // 엔터키가 눌렸을 때 실행할 내용
//         submitClick();
//     }
// }

function calcRefresh(){
    $("#marginVal").html(0);
    $("#marginRateVal").html(0);
    $("#VAT_10").html(0);
    $("#marginAfterVAT_10").html(0);

    $("#purchaseCost").val(0);
    $("#purchaseTransCharge").val(0);
    $("#sellPrice").val(0);
    $("#realSellTransUnitCharge").val(0);
    $("#sellTransUnitCharge").val(0);
    $("#marketCommitionPercentage").val(0);
    $("#extraCharge").val(0);
}