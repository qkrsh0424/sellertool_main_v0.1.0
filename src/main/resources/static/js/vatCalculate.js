$("#vatKnowSumSubmit").submit(
    function searchSubmit(e) {
        e.preventDefault();
        $.ajax({
            type: "GET", //전송방식을 지정한다 (POST,GET)
            url: "/api/calculate/vat/knowSum",//호출 URL을 설정한다. GET방식일경우 뒤에 파라티터를 붙여서 사용해도된다.
            dataType: "text",//호출한 페이지의 형식이다. xml,json,html,text등의 여러 방식을 사용할 수 있다.
            data: {
                vatKnowSum: $("#vatKnowSum").val() ? $("#vatKnowSum").val() : "0"
            },
            error: function () {
                alert("server connect failed");
            },
            success: function (Parse_data) {
                let resData = JSON.parse(Parse_data).data;
                let resHTML = `
                    <div class="row text-center m-3">
                        <h5 class="col-xs-12 col-sm-6 mb-2">
                            <div>공급가액(₩)</div>
                            <div><span class="text-danger">${pricePointHandler(resData.supplyPrice)}</span> 원</div>
                        </h5>
                        <h5 class="col-xs-12 col-sm-6 mb-2">
                            <div>부가세(VAT 10%)</div>
                            <div><span class="text-danger">${pricePointHandler(resData.vat)}</span> 원</div>
                        </h5>
                    </div>
                `;
                $("#vatKnowSumResultPannel").html(resHTML);
            }

        });
    }
);

$("#vatKnowSupplySubmit").submit(
    function searchSubmit(e) {
        e.preventDefault();
        $(document).ready(function () {
            $.ajax({
                type: "GET", //전송방식을 지정한다 (POST,GET)
                url: "/api/calculate/vat/knowSupply",//호출 URL을 설정한다. GET방식일경우 뒤에 파라티터를 붙여서 사용해도된다.
                dataType: "text",//호출한 페이지의 형식이다. xml,json,html,text등의 여러 방식을 사용할 수 있다.
                data: {
                    vatKnowSupply: $("#vatKnowSupply").val() ? $("#vatKnowSupply").val() : "0"
                },
                error: function () {
                    alert("server connect failed");
                },
                success: function (Parse_data) {
                    let resData = JSON.parse(Parse_data).data;
                    let resHTML = `
                        <div class="row text-center m-3">
                            <h5 class="col-xs-12 col-sm-4 mb-2">
                                <div>공급가액(₩)</div>
                                <div><span class="text-danger">${pricePointHandler(resData.supplyPrice)}</span> 원</div>
                            </h5>
                            <h5 class="col-xs-12 col-sm-4 mb-2">
                                <div>부가세(VAT 10%)</div>
                                <div><span class="text-danger">${pricePointHandler(resData.vat)}</span> 원</div>
                            </h5>
                            <h5 class="col-xs-12 col-sm-4 mb-2">
                                <div>합계금액(₩)</div>
                                <div><span class="text-danger">${pricePointHandler(resData.sum)}</span> 원</div>
                            </h5>
                        </div>
                    `;
                    $("#vatKnowSupplyResultPannel").html(resHTML);
                }

            });
        });
    }
);

function pricePointHandler(price){
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}