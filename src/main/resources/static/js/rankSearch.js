$("#searchSubmit").submit(
    function searchSubmit(e) {
        e.preventDefault();
        $(document).ready(function () {
            $.ajax({
                type: "GET", //전송방식을 지정한다 (POST,GET)
                url: "/api/rank/naverShopping",//호출 URL을 설정한다. GET방식일경우 뒤에 파라티터를 붙여서 사용해도된다.
                dataType: "text",//호출한 페이지의 형식이다. xml,json,html,text등의 여러 방식을 사용할 수 있다.
                data: {
                    // purchaseCost:document.getElementById("purchaseCost").value,
                    // purchaseTransCharge:document.getElementById("purchaseTransCharge").value,
                    // sellPrice:document.getElementById("sellPrice").value,
                    // realSellTransUnitCharge:document.getElementById("realSellTransUnitCharge").value,
                    // sellTransUnitCharge:document.getElementById("sellTransUnitCharge").value,
                    // marketCommitionPercentage:document.getElementById("marketCommitionPercentage").value
                    nSearchKeyword: $("#nSearchKeyword").val(),
                    nShopURL: $("#nShopURL").val(),
                },
                error: function () {
                    alert("server connect failed");
                },
                success: function (Parse_data) {
                    let resData = JSON.parse(Parse_data).data;
                    document.getElementById("rankingResultBoard").style.display = 'block';
                    console.log(resData);

                    let resHtml = ``;
                    if (resData.length <= 0) {
                        resHtml += `
                            <div class="text-center">
                                랭킹이 300위 이하이거나 입력 내용이 잘못되었습니다.
                            </div>
                        `;
                    }
                    for (let i = 0; i < resData.length; i++) {
                        // resHtml+=`
                        //     <div class="rs_itemList_Wrapper">
                        //         <img src="${resData[i].val.image}"/>
                        //         <div class="float-left">
                        //             <p class="rs_itemList_title"><a href=${resData[i].val.link} target="_blank">${resData[i].val.title}</a></p>
                        //             <p class="rs_itemList_storeName">${resData[i].val.mallName}</p>
                        //             <p class="rs_itemList_price">${resData[i].val.lprice} 원</p>
                        //             <p class="rs_itemList_category">${resData[i].val.category1}>${resData[i].val.category2}>${resData[i].val.category3}>${resData[i].val.category4}</p>
                        //             <p class="rs_itemList_rank">현재 랭킹 : <span class="text-danger">${resData[i].rank}</span>위</p>
                        //         </div>
                        //     </div>
                        // `;
                        resHtml += `
                            <div class="pcy-rk-result-itemlist-wrapper">
                                <div>
                                    <img class="pcy-rk-result-itemlist-img"
                                        src="${resData[i].val.image}" />
                                </div>
                                <div class="pcy-rk-result-itemlist-box">
                                    <div class="pcy-rk-result-itemlist-label"><a href=${resData[i].val.link} target="_blank">${resData[i].val.title}</a></div>
                                    <div class="pcy-rk-result-itemlist-storename">${resData[i].val.mallName}</div>
                                    <div class="pcy-rk-result-itemlist-price">${resData[i].val.lprice} 원</div>
                                    <div class="pcy-rk-result-itemlist-category">${resData[i].val.category1}>${resData[i].val.category2}>${resData[i].val.category3}>${resData[i].val.category4}</div>
                                    <div class="pcy-rk-result-itemlist-rank">
                                        <p class="pcy-rk-result-itemlist-rank-p">현재 랭킹 : <span class="text-danger">${resData[i].rank}</span>위</p>
                                    </div>
                                </div>
                            </div>
                        `;

                    }
                    $("#rankingResultBoard").html(resHtml);
                    // $("#Parse_Area").html(Parse_data); //div에 받아온 값을 넣는다.
                    // alert("통신 데이터 값 : " + Parse_data);
                    // console.log(JSON.parse(Parse_data).margin);
                    // $("#marginVal").html(JSON.parse(Parse_data).margin);
                    // $("#marginRateVal").html(JSON.parse(Parse_data).marginRate);
                    // $("#VAT_10").html(JSON.parse(Parse_data).VAT_10);
                    // $("#marginAfterVAT_10").html(JSON.parse(Parse_data).margin - JSON.parse(Parse_data).VAT_10);
                }

            });
        });
    }
);
