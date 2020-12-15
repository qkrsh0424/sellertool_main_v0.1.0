function itemDataConnect() {
    return {
        firstGet: async function () {
            let data = {
                'startDate': DATE_SETTING.startDate,
                'endDate': DATE_SETTING.endDate
            }
            await $.ajax({
                url: '/api/item_manager/search/sell_item/time',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                success: function (returnData) {
                    SELL_ITEMS = returnData.data;
                    loadItemHtml().sellItemsHtml();
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        getByDate: async function () {
            let data = {
                'startDate': DATE_SETTING.startDate,
                'endDate': DATE_SETTING.endDate
            }
            await $.ajax({
                url: '/api/item_manager/search/sell_item/time',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                success: function (returnData) {
                    // console.log(returnData.data);
                    SELL_ITEMS = returnData.data;

                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        updateSellItemBySellId: function (sellId) {
            let item = SELL_ITEMS.filter(r => r.sellId == sellId)[0];
            let data = JSON.stringify(item);
            $.ajax({
                url: '/api/item_manager/update/sell_item/def',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_sd_csrf").val());
                },
                success: function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        SAVE_SELLID = [];
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : SDIUPD500");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDIUPD");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDIUPD");
                        return window.location.reload();
                    }
                }
            })
        },
        deleteSellItemBySellItem: function (item) {
            let data = JSON.stringify(item);

            $.ajax({
                url: '/api/item_manager/delete/sell_item/one',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_sd_csrf").val());
                },
                success: function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : SDIDE500");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDIDE");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDIDE");
                        return window.location.reload();
                    }
                }
            })

        }
    }
}

function loadItemHtml() {
    // tooltipOn();
    return {
        // 테이블 형식의 판매 아이템 리스트를 Html 출력
        sellItemsHtml: function () {
            let bodyListHtml = `
                
            `;
            SELL_ITEMS.forEach((r, index) => {
                // Value Data Model => 매출 합계, 수익 합계
                let totValue = objectValueHandler().costValCalc(r);
                let totSales = totValue.getTotSales();
                let totProfit = totValue.getTotProfit();

                bodyListHtml += `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <th scope="row">
                            <button type="button" class="btn btn-outline-danger btn-block" onclick="eventItemHandler().sellItemDeleteClick('${r.sellId}')">제거</button>
                        </th>
                        <td>${r.itemData.itemName}</td>
                        <td id="i_td_sellTag_box_${r.sellId}">
                            <span>${r.sellTag}</span>
                            <button class="btn" onclick="eventItemHandler().sellTagInputOpen('${r.sellId}', '${r.sellTag}')">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                </svg>
                            </button>
                        </td>
                        <td>${r.itemData.itemStoreName}</td>
                        <td id="i_td_sellCount_box_${r.sellId}">
                            <span>${r.sellCount}</span>
                            <button class="btn" onclick="eventItemHandler().sellCountInputOpen('${r.sellId}', '${r.sellCount}')">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                </svg>
                            </button>
                        </td>
                        <td id="i_td_totAdsCost_box_${r.sellId}">
                            <span>${r.sellTotAdsCost}</span>
                            <button class="btn" onclick="eventItemHandler().totAdsCostInputOpen('${r.sellId}', '${r.sellTotAdsCost}')">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                </svg>
                            </button>
                        </td>
                        <td>${totSales}</td>
                        <td>${totProfit}</td>
                        <td><button class="btn btn-block btn-primary" onclick="eventItemHandler().setUnitItemBatchModalOpen('${r.sellId}')">상세 보기</button></td>
                        <td><button class="btn btn-block btn-primary" onclick="eventItemHandler().setTotalItemBatchModalOpen('${r.sellId}')">상세 보기</button></td>
                    </tr>
                `
            })
            let html = `
                <table class="table overflow-table text-center table-hover">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col" width="50">#</th>
                        <th scope="col" width="80">컨트롤</th>
                        <th scope="col" width="200">상품명</th>
                        <th scope="col" width="150">상품 태그</th>
                        <th scope="col" width="150">마켓 종류</th>
                        <th scope="col" width="120">판매 개수 <div class="st-sd-sell-unit">단위 : [개]</div></th>
                        <th scope="col" width="200">총 광고 비용<span class="text-danger">(-)</span><div class="st-sd-sell-unit">단위 : [원]</div></th>
                        <th scope="col" width="200">매출 합계<div class="st-sd-sell-unit">단위 : [원]</div></th>
                        <th scope="col" width="200">수익 합계<div class="st-sd-sell-unit">단위 : [원]</div></th>
                        <th scope="col" width="200">개당 데이터 상세</th>
                        <th scope="col" width="200">합계 데이터 상세</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${bodyListHtml}
                    </tbody>
                </table>
            `;
            $("#i_sell_item_list").html(html);
        },
        // 테이블 내부의 개당 상세 클릭시 띄워지는 modal 창의 Content Html 출력
        unitModalContentSetHtml: function (sellId) {
            let modalHeaderHtml = `
                <div class="modal-header">
                    <h5 class="modal-title" id="i_sd_batch_input_modalLabel">상품명 : ${MODAL_DATA.itemName}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;

            let modalSubHeaderHtml = `
                <div class="modal-header">
                    <p class="modal-title" id="i_sd_batch_input_modalLabel">상품 태그 : ${MODAL_DATA.sellTag}</p>
                </div>
            `;


            let modalBodyHtml = `
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="i_sd_batch_input_commition_cost">마켓 수수료 [%]</label>
                            <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[1]</span>
                            <input type="text" class="form-control" id="i_sd_batch_input_commition_cost"
                                value=${MODAL_DATA.sellCommitionCost} placeholder="마켓 수수료" onkeypress="return isActualNumberKey(event)"
                                onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">

                            <label for="i_sd_batch_input_price">개당 판매가 [원]<span class="text-success">(+)</span></label>
                            <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[2]</span>
                            <input type="text" class="form-control" id="i_sd_batch_input_price" 
                                value=${MODAL_DATA.sellPrice}
                                placeholder="개당 판매가" onkeypress="return isNumberKey(event)"
                                onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">

                            <label for="i_sd_batch_input_customer_trans_cost">개당 소비자 운임 비용 [원]<span class="text-success">(+)</span></label>
                            <span class="badge badge-dark" title="${TOOLTIP_TEXT.unitCustomerTransCost}">&#63;</span>
                            <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[3]</span>
                            <input type="text" class="form-control" id="i_sd_batch_input_customer_trans_cost"
                                value=${MODAL_DATA.sellCustomerTransCost} placeholder="개당 소비자 운임 비용" onkeypress="return isNumberKey(event)"
                                onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">
                            <label for="i_sd_batch_input_seller_real_trans_cost">개당 판매자 실질 운임 비용 [원]<span class="text-danger">(-)</span></label>
                            <span class="badge badge-dark" title="${TOOLTIP_TEXT.unitSellerRealTransCost}">&#63;</span>
                            <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[4]</span>
                            <input type="text" class="form-control"
                                id="i_sd_batch_input_seller_real_trans_cost" value=${MODAL_DATA.sellSellerRealTransCost}
                                placeholder="개당 판매자 실질 운임 비용" onkeypress="return isNumberKey(event)"
                                onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="i_sd_batch_input_purchase_cost">개당 매입 가격 | 구매 비용 [원]<span class="text-danger">(-)</span></label>
                            <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[5]</span>
                            <input type="text" class="form-control" id="i_sd_batch_input_purchase_cost"
                                value=${MODAL_DATA.sellPurchaseCost} placeholder="개당 매입 가격 | 구매 비용" onkeypress="return isNumberKey(event)"
                                onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">

                            <label for="i_sd_batch_input_purchase_trans_cost">개당 매입 운임 비용 [원]<span class="text-danger">(-)</span></label>
                            <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[6]</span>
                            <input type="text" class="form-control" id="i_sd_batch_input_purchase_trans_cost"
                                value=${MODAL_DATA.sellPurchaseTransCost} placeholder="개당 매입 운임 비용" onkeypress="return isNumberKey(event)"
                                onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">

                            <label for="i_sd_batch_input_extra_charge">개당 기타 비용 [원]<span class="text-danger">(-)</span></label>
                            <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[7]</span>
                            <input type="text" class="form-control" id="i_sd_batch_input_extra_charge"
                                value=${MODAL_DATA.sellExtraCharge} placeholder="개당 기타 비용" onkeypress="return isNumberKey(event)"
                                onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">
                        </div>
                        <div class="form-group col-md-12">
                            <div id="i_sd_batch_data_profit">
                                개당 수익 : <span>${MODAL_DATA.unitProfit}</span> [원]
                                <span class="badge badge-dark" title="${TOOLTIP_TEXT.unitProfit}">&#63;</span>
                                <span style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[b]</span>
                            </div>
                            <div id="i_sd_batch_data_profit_rate">
                                개당 수익율 : <span>${MODAL_DATA.unitProfitRate}</span> [%]
                                <span class="badge badge-dark" title="${TOOLTIP_TEXT.unitProfitRate}">&#63;</span>
                                <span style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[c]</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            let modalFooterHtml = `
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="eventItemHandler().modalDataAdapt('${sellId}').setUnitValue()">적용</button>
                    <button type="button" class="btn btn-primary" onclick="eventItemHandler().modalDataSubmitClick().submitUnitData()">등록 | 저장</button>
                    <button type="button" class="btn btn-primary" onclick="eventItemHandler().modalClose()">닫기</button>
                </div>
            `;
            let html = `
                <div class="modal-content">
                    ${modalHeaderHtml}
                    ${modalSubHeaderHtml}
                    ${modalBodyHtml}
                    ${modalFooterHtml}
                </div>
            `;
            $("#i_sd_batch_modal_box").html(html);
        },
        // 테이블 내부의 합계 상세 클릭시 띄워지는 modal 창의 Content Html 출력
        totalModalContentSetHtml: function (sellId) {
            let modalHeaderHtml = `
                <div class="modal-header">
                    <h5 class="modal-title" id="i_sd_batch_input_modalLabel">상품명 : ${MODAL_DATA.itemName}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;

            let modalSubHeaderHtml = `
                <div class="modal-header">
                    <p class="modal-title" id="i_sd_batch_input_modalLabel">상품 태그 : ${MODAL_DATA.sellTag}</p>
                </div>
            `;


            let modalBodyHtml = `
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="i_sd_batch_input_sell_count">판매 개수 [개]</label>
                            <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[8]</span>
                            <input type="number" class="form-control" id="i_sd_batch_input_sell_count" 
                                value=${MODAL_DATA.sellCount}
                                placeholder="판매 개수" onkeypress="return isNumberKey(event)"
                                onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">

                            <label for="i_sd_batch_input_tot_ads_cost">총 광고 비용 [원]<span class="text-danger">(-)</span></label>
                            <span class="badge badge-dark" title="${TOOLTIP_TEXT.totAdsCost}">&#63;</span>
                            <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[9]</span>
                            <input type="text" class="form-control" id="i_sd_batch_input_tot_ads_cost" 
                                value=${MODAL_DATA.sellTotAdsCost}
                                placeholder="총 광고 비용" onkeypress="return isNumberKey(event)"
                                onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">

                            <label for="i_sd_batch_input_tot_expenses_cost">총 추가 지출 [원]<span class="text-danger">(-)</span></label>
                            <span class="badge badge-dark" title="${TOOLTIP_TEXT.totExpensesCost}">&#63;</span>
                            <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[10]</span>
                            <input type="text" class="form-control" id="i_sd_batch_input_tot_expenses_cost"
                                value=${MODAL_DATA.sellTotExpensesCost} placeholder="총 추가 지출" onkeypress="return isNumberKey(event)"
                                onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">

                            <label for="i_sd_batch_input_tot_earning_cost">총 추가 수익 [원]<span class="text-success">(+)</span></label>
                            <span class="badge badge-dark" title="${TOOLTIP_TEXT.totEarningCost}">&#63;</span>
                            <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[11]</span>
                            <input type="text" class="form-control"
                                id="i_sd_batch_input_tot_earning_cost" value=${MODAL_DATA.sellTotEarningCost}
                                placeholder="총 추가 수익" onkeypress="return isNumberKey(event)"
                                onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="i_sd_batch_input_tot_purchase_trans_cost">총 매입 운임비 [원]<span class="text-danger">(-)</span></label>
                            <span class="badge badge-dark" title="${TOOLTIP_TEXT.totPurchaseTransCost}">&#63;</span>
                            <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[12]</span>
                            <input type="text" class="form-control" id="i_sd_batch_input_tot_purchase_trans_cost"
                                value=${MODAL_DATA.sellTotPurchaseTransCost} placeholder="총 매입 운임비" onkeypress="return isNumberKey(event)"
                                onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">

                            <label for="i_sd_batch_input_tot_customer_trans_cost">총 소비자 운임비 [원]<span class="text-success">(+)</span></label>
                            <span class="badge badge-dark" data-toggle="tooltip" data-placement="top" title="${TOOLTIP_TEXT.totCustomerTransCost}">&#63;</span>
                            <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[13]</span>
                            <input type="text" class="form-control" id="i_sd_batch_input_tot_customer_trans_cost"
                                value=${MODAL_DATA.sellTotCustomerTransCost} placeholder="총 소비자 운임비" onkeypress="return isNumberKey(event)"
                                onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">

                            <label for="i_sd_batch_input_tot_seller_real_trans_cost">총 판매자 실질 부담 운임비 [원]<span class="text-danger">(-)</span></label>
                            <span class="badge badge-dark" title="${TOOLTIP_TEXT.totSellerRealTransCost}">&#63;</span>
                            <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[14]</span>
                            
                            <input type="text" class="form-control" id="i_sd_batch_input_tot_seller_real_trans_cost"
                                value=${MODAL_DATA.sellTotSellerRealTransCost} placeholder="총 판매자 실질 부담 운임비" onkeypress="return isNumberKey(event)"
                                onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">
                        </div>
                        <div class="form-group col-md-12">
                            <div id="i_sd_batch_data_profit">
                                매출 합계 : <span>${MODAL_DATA.totSales}</span> [원]
                                <span class="badge badge-dark" title="${TOOLTIP_TEXT.totSales}">&#63;</span>
                            </div>
                            <div id="i_sd_batch_data_profit_rate">
                                수익 합계 : <span>${MODAL_DATA.totProfit}</span> [원]
                                <span class="badge badge-dark" title="${TOOLTIP_TEXT.totProfit}">&#63;</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            let modalFooterHtml = `
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="eventItemHandler().modalDataAdapt('${sellId}').setTotValue()">적용</button>
                    <button type="button" class="btn btn-primary" onclick="eventItemHandler().modalDataSubmitClick().submitTotData()">등록 | 저장</button>
                    <button type="button" class="btn btn-primary" onclick="eventItemHandler().modalClose()">닫기</button>
                </div>
            `;
            let html = `
                <div class="modal-content">
                    ${modalHeaderHtml}
                    ${modalSubHeaderHtml}
                    ${modalBodyHtml}
                    ${modalFooterHtml}
                </div>
            `;
            $("#i_sd_batch_modal_box").html(html);
        },
        // 테이블 내부 판매 개수 수정 클릭시 Html 출력
        sellCountInputSetHtml: function (sellId, sellCount) {
            let html = `
                <div class="input-group mb-3">
                    <input type="number" class="form-control" value="${sellCount}" id="i_td_sellCount_input_data_${sellId}">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" onclick="eventItemHandler().sellCountSubmitClick('${sellId}')">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-box-arrow-in-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/>
                                <path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            $(`#i_td_sellCount_box_${sellId}`).html(html);
        },
        // 테이블 내부 총 광고 비용 수정 클릭시 Html 출력
        totAdsCostInputSetHtml: function (sellId, totAdsCost) {
            let html = `
                <div class="input-group mb-3">
                    <input type="number" class="form-control" value="${totAdsCost}" id="i_td_totAdsCost_input_data_${sellId}">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" onclick="eventItemHandler().totAdsCostSubmitClick('${sellId}')">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-box-arrow-in-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/>
                                <path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            $(`#i_td_totAdsCost_box_${sellId}`).html(html);
        },
        // 테이블 내부 상품 태그 수정 클릭시 Html 출력
        sellTagInputSetHtml: function (sellId, sellTag) {
            let html = `
                <div class="input-group mb-3">
                    <input type="text" class="form-control" value="${sellTag}" id="i_td_sellTag_input_data_${sellId}">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" onclick="eventItemHandler().setSellTagSubmitClick('${sellId}')">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-box-arrow-in-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/>
                                <path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            $(`#i_td_sellTag_box_${sellId}`).html(html);
        }
    }
}

function objectValueHandler() {
    return {
        costValCalc: function (rData) {
            // let unitSales = Number(rData.sellPrice) + Number(rData.sellCustomerTransCost);
            // let unitProfit = parseInt(unitSales * ((100 - Number(rData.sellCommitionCost)) / 100) - Number(rData.sellPurchaseCost) - Number(rData.sellPurchaseTransCost) - Number(rData.sellSellerRealTransCost) - Number(rData.sellExtraCharge));
            // let unitProfitRate = 0;
            // if (unitSales === 0) {
            //     unitProfitRate = 0;
            // } else {
            //     unitProfitRate = (unitProfit / ((unitSales)) * 100).toFixed(2);
            // }
            // let totProfit = (Number(unitProfit) * Number(rData.sellCount)) - Number(rData.sellTotAdsCost) + Number(rData.sellTotEarningCost) + ((Number(rData.sellTotCustomerTransCost) * ((100 - Number(rData.sellCommitionCost)) / 100))) - Number(rData.sellTotSellerRealTransCost) - Number(rData.sellTotExpensesCost) - Number(rData.sellTotPurchaseTransCost);
            // let totSales = Number(rData.sellCount) * (Number(rData.sellPrice) + Number(rData.sellCustomerTransCost)) + Number(rData.sellTotCustomerTransCost);

            // return {
            //     getUnitSales: function () { return unitSales; },
            //     getUnitProfit: function () { return unitProfit; },
            //     getUnitProfitRate: function () { return unitProfitRate; },
            //     getTotProfit: function () { return totProfit; },
            //     getTotSales: function () { return totSales; }
            // }
            // ** 개당 데이터 **
            let cc = Number(rData.sellCommitionCost); // 수수료
            let up = Number(rData.sellPrice);   // 개당 판매가
            let uct = Number(rData.sellCustomerTransCost);  // 개당 소비자 운임 비용
            let ust = Number(rData.sellSellerRealTransCost);    // 개당 판매자 실질 부담 운임비용
            let upu = Number(rData.sellPurchaseCost);   // 개당 매입 가격
            let uput = Number(rData.sellPurchaseTransCost); // 개당 매입 운임비용
            let ue = Number(rData.sellExtraCharge); //개당 기타 비용
            // ** 총 데이터 **
            let n = Number(rData.sellCount);    // 판매 개수
            let tads = Number(rData.sellTotAdsCost);    // 총 광고 비용
            let texp = Number(rData.sellTotExpensesCost);   // 총 추가 지출
            let tear = Number(rData.sellTotEarningCost);    // 총 추가 수익
            let tput = Number(rData.sellTotPurchaseTransCost);  // 총 매입 운임 비용
            let tct = Number(rData.sellTotCustomerTransCost);   // 총 소비자 운임 비용
            let tst = Number(rData.sellTotSellerRealTransCost); // 총 판매자 실질 부담 운임 비용
            // ** 개당 조합 데이터 **
            let unitSales = up + uct;   // 실질판매가 개당 매출 sau
            let mf = parseInt(unitSales * (cc/100));    // 마켓 수수료비 mf= 실질 판매가( 판매가 + 소비자 부담 운임비) * 수수료(%)
            let unitMarginCost = upu + uput + ust + ue + mf;    // 개당 마진 원가 | 개당 매출 원가 | 개당 매입 원가 cpu
            let unitProfit = unitSales - unitMarginCost;    // 개당 수익
            let unitProfitRate = 0; // 개당 수익율

            // let unitProfit = parseInt(up * ((100 - Number(rData.sellCommitionCost)) / 100) - Number(rData.sellPurchaseCost) - Number(rData.sellPurchaseTransCost) - Number(rData.sellSellerRealTransCost) - Number(rData.sellExtraCharge));
            // let unitProfitRate = 0;
            
            if (unitSales === 0) {
                unitProfitRate = 0;
            } else {
                unitProfitRate = Number((unitProfit / ((unitSales)) * 100).toFixed(2));
            }
            // ** 합계 조합 데이터 **
            let totSales = unitSales * n + tct; // 합계 매출 sam = 개당 실질 판매가 * 개수 + 총 소비자 운임비용
            let totMarginCost = unitMarginCost * n + tads + texp - tear + tput + parseInt((tct * (cc/100))) + tst;
            let totProfit = totSales - totMarginCost;
            // let totSales = Number(rData.sellCount) * (Number(rData.sellPrice) + Number(rData.sellCustomerTransCost)) + Number(rData.sellTotCustomerTransCost);
            // let totProfit = (Number(unitProfit) * Number(rData.sellCount)) - Number(rData.sellTotAdsCost) + Number(rData.sellTotEarningCost) + ((Number(rData.sellTotCustomerTransCost) * ((100 - Number(rData.sellCommitionCost)) / 100))) - Number(rData.sellTotSellerRealTransCost) - Number(rData.sellTotExpensesCost) - Number(rData.sellTotPurchaseTransCost);

            return {
                getUnitSales: function () { return unitSales; },
                getUnitProfit: function () { return unitProfit; },
                getUnitProfitRate: function () { return unitProfitRate; },
                getTotProfit: function () { return totProfit; },
                getTotSales: function () { return totSales; }
            }
        }
    }
}

function eventItemHandler() {
    return {
        sellItemSearchClick: async function () {
            await itemDataConnect().getByDate();
            loadItemHtml().sellItemsHtml();
        },
        sellCountInputOpen: function (sellId, sellCount) {
            loadItemHtml().sellCountInputSetHtml(sellId, sellCount);
        },
        sellCountSubmitClick: function (sellId) {
            let sellCount = $(`#i_td_sellCount_input_data_${sellId}`).val();
            if (!isInt(sellCount)) {
                return;
            }
            SELL_ITEMS.forEach(r => {
                if (r.sellId == sellId) {
                    r.sellCount = sellCount === '' ? '0' : sellCount;
                }
            });
            loadItemHtml().sellItemsHtml();
            itemDataConnect().updateSellItemBySellId(sellId);
        },
        totAdsCostInputOpen: function (sellId, totAdsCost) {
            loadItemHtml().totAdsCostInputSetHtml(sellId, totAdsCost);
        },
        totAdsCostSubmitClick: function (sellId) {
            let totAdsCost = $(`#i_td_totAdsCost_input_data_${sellId}`).val();
            if (!isInt(totAdsCost)) {
                return;
            }
            SELL_ITEMS.forEach(r => {
                if (r.sellId == sellId) {
                    r.sellTotAdsCost = totAdsCost === '' ? '0' : totAdsCost;
                }
            });
            loadItemHtml().sellItemsHtml();
            itemDataConnect().updateSellItemBySellId(sellId);
        },
        sellTagInputOpen: function (sellId, sellTag) {
            loadItemHtml().sellTagInputSetHtml(sellId, sellTag);
        },
        setSellTagSubmitClick: function (sellId) {
            let sellTag = $(`#i_td_sellTag_input_data_${sellId}`).val();
            SELL_ITEMS.forEach(r => {
                if (r.sellId == sellId) {
                    r.sellTag = sellTag;
                }
            });
            loadItemHtml().sellItemsHtml();
            itemDataConnect().updateSellItemBySellId(sellId);
        },
        setUnitItemBatchModalOpen: function (sellId) {
            this.setModalData(sellId);
            loadItemHtml().unitModalContentSetHtml(sellId);
            $("#i_sd_batch_input_modal").modal('show');
        },
        setTotalItemBatchModalOpen: function (sellId) {
            this.setModalData(sellId);
            loadItemHtml().totalModalContentSetHtml(sellId);
            $("#i_sd_batch_input_modal").modal('show');
        },
        setModalData: function (sellId) {
            let item = SELL_ITEMS.filter(r => r.sellId == sellId)[0];
            MODAL_DATA = '';
            let costValCalc = objectValueHandler().costValCalc(item);
            MODAL_DATA = {
                'sellId': item.sellId,
                'itemName': item.itemData.itemName,
                'sellTag': item.sellTag,
                'sellCommitionCost': item.sellCommitionCost,
                'sellPrice': item.sellPrice,
                'sellCustomerTransCost': item.sellCustomerTransCost,
                'sellSellerRealTransCost': item.sellSellerRealTransCost,
                'sellPurchaseCost': item.sellPurchaseCost,
                'sellPurchaseTransCost': item.sellPurchaseTransCost,
                'sellExtraCharge': item.sellExtraCharge,
                'sellCount': item.sellCount,
                'sellTotAdsCost': item.sellTotAdsCost,
                'sellTotExpensesCost': item.sellTotExpensesCost,
                'sellTotEarningCost': item.sellTotEarningCost,
                'sellTotPurchaseTransCost': item.sellTotPurchaseTransCost,
                'sellTotCustomerTransCost': item.sellTotCustomerTransCost,
                'sellTotSellerRealTransCost': item.sellTotSellerRealTransCost,
                'unitProfit': costValCalc.getUnitProfit(),
                'unitProfitRate': costValCalc.getUnitProfitRate(),
                'totSales': costValCalc.getTotSales(),
                'totProfit': costValCalc.getTotProfit()
            }
        },
        modalDataAdapt: function (sellId) {
            return {
                setUnitValue: function () {
                    MODAL_DATA.sellCommitionCost = $("#i_sd_batch_input_commition_cost").val() === '' ? 0 : $("#i_sd_batch_input_commition_cost").val();
                    MODAL_DATA.sellPrice = $("#i_sd_batch_input_price").val() === '' ? 0 : $("#i_sd_batch_input_price").val();
                    MODAL_DATA.sellCustomerTransCost = $("#i_sd_batch_input_customer_trans_cost").val() === '' ? 0 : $("#i_sd_batch_input_customer_trans_cost").val();
                    MODAL_DATA.sellSellerRealTransCost = $("#i_sd_batch_input_seller_real_trans_cost").val() === '' ? 0 : $("#i_sd_batch_input_seller_real_trans_cost").val();
                    MODAL_DATA.sellPurchaseCost = $("#i_sd_batch_input_purchase_cost").val() === '' ? 0 : $("#i_sd_batch_input_purchase_cost").val();
                    MODAL_DATA.sellPurchaseTransCost = $("#i_sd_batch_input_purchase_trans_cost").val() === '' ? 0 : $("#i_sd_batch_input_purchase_trans_cost").val();
                    MODAL_DATA.sellExtraCharge = $("#i_sd_batch_input_extra_charge").val() === '' ? 0 : $("#i_sd_batch_input_extra_charge").val();

                    let costValCalc = objectValueHandler().costValCalc(MODAL_DATA);
                    MODAL_DATA.unitProfit = costValCalc.getUnitProfit();
                    MODAL_DATA.unitProfitRate = costValCalc.getUnitProfitRate();

                    loadItemHtml().unitModalContentSetHtml(sellId);
                },
                setTotValue: function () {
                    MODAL_DATA.sellCount = $("#i_sd_batch_input_sell_count").val() === '' ? 0 : $("#i_sd_batch_input_sell_count").val();
                    MODAL_DATA.sellTotAdsCost = $("#i_sd_batch_input_tot_ads_cost").val() === '' ? 0 : $("#i_sd_batch_input_tot_ads_cost").val();
                    MODAL_DATA.sellTotExpensesCost = $("#i_sd_batch_input_tot_expenses_cost").val() === '' ? 0 : $("#i_sd_batch_input_tot_expenses_cost").val();
                    MODAL_DATA.sellTotEarningCost = $("#i_sd_batch_input_tot_earning_cost").val() === '' ? 0 : $("#i_sd_batch_input_tot_earning_cost").val();
                    MODAL_DATA.sellTotPurchaseTransCost = $("#i_sd_batch_input_tot_purchase_trans_cost").val() === '' ? 0 : $("#i_sd_batch_input_tot_purchase_trans_cost").val();
                    MODAL_DATA.sellTotCustomerTransCost = $("#i_sd_batch_input_tot_customer_trans_cost").val() === '' ? 0 : $("#i_sd_batch_input_tot_customer_trans_cost").val();
                    MODAL_DATA.sellTotSellerRealTransCost = $("#i_sd_batch_input_tot_seller_real_trans_cost").val() === '' ? 0 : $("#i_sd_batch_input_tot_seller_real_trans_cost").val();

                    let costValCalc = objectValueHandler().costValCalc(MODAL_DATA);
                    MODAL_DATA.totSales = costValCalc.getTotSales();
                    MODAL_DATA.totProfit = costValCalc.getTotProfit();

                    loadItemHtml().totalModalContentSetHtml(sellId);
                }
            }
        },
        modalDataSubmitClick: function () {
            return {
                submitUnitData: function () {
                    SELL_ITEMS.forEach(r => {
                        if (r.sellId == MODAL_DATA.sellId) {
                            r.sellCommitionCost = $("#i_sd_batch_input_commition_cost").val() === '' ? 0 : $("#i_sd_batch_input_commition_cost").val();
                            r.sellPrice = $("#i_sd_batch_input_price").val() === '' ? 0 : $("#i_sd_batch_input_price").val();
                            r.sellCustomerTransCost = $("#i_sd_batch_input_customer_trans_cost").val() === '' ? 0 : $("#i_sd_batch_input_customer_trans_cost").val();
                            r.sellSellerRealTransCost = $("#i_sd_batch_input_seller_real_trans_cost").val() === '' ? 0 : $("#i_sd_batch_input_seller_real_trans_cost").val();
                            r.sellPurchaseCost = $("#i_sd_batch_input_purchase_cost").val() === '' ? 0 : $("#i_sd_batch_input_purchase_cost").val();
                            r.sellPurchaseTransCost = $("#i_sd_batch_input_purchase_trans_cost").val() === '' ? 0 : $("#i_sd_batch_input_purchase_trans_cost").val();
                            r.sellExtraCharge = $("#i_sd_batch_input_extra_charge").val() === '' ? 0 : $("#i_sd_batch_input_extra_charge").val();
                            $("#i_sd_batch_input_modal").modal('hide');
                            loadItemHtml().sellItemsHtml();
                            return itemDataConnect().updateSellItemBySellId(r.sellId);
                        }
                    });
                },
                submitTotData: function () {
                    SELL_ITEMS.forEach(r => {
                        if (r.sellId == MODAL_DATA.sellId) {
                            r.sellCount = $("#i_sd_batch_input_sell_count").val() === '' ? 0 : $("#i_sd_batch_input_sell_count").val();
                            r.sellTotAdsCost = $("#i_sd_batch_input_tot_ads_cost").val() === '' ? 0 : $("#i_sd_batch_input_tot_ads_cost").val();
                            r.sellTotExpensesCost = $("#i_sd_batch_input_tot_expenses_cost").val() === '' ? 0 : $("#i_sd_batch_input_tot_expenses_cost").val();
                            r.sellTotEarningCost = $("#i_sd_batch_input_tot_earning_cost").val() === '' ? 0 : $("#i_sd_batch_input_tot_earning_cost").val();
                            r.sellTotPurchaseTransCost = $("#i_sd_batch_input_tot_purchase_trans_cost").val() === '' ? 0 : $("#i_sd_batch_input_tot_purchase_trans_cost").val();
                            r.sellTotCustomerTransCost = $("#i_sd_batch_input_tot_customer_trans_cost").val() === '' ? 0 : $("#i_sd_batch_input_tot_customer_trans_cost").val();
                            r.sellTotSellerRealTransCost = $("#i_sd_batch_input_tot_seller_real_trans_cost").val() === '' ? 0 : $("#i_sd_batch_input_tot_seller_real_trans_cost").val();
                            $("#i_sd_batch_input_modal").modal('hide');
                            loadItemHtml().sellItemsHtml();
                            return itemDataConnect().updateSellItemBySellId(r.sellId);
                        }
                    });
                }
            }
        },
        sellItemDeleteClick: function (sellId) {
            let item;
            SELL_ITEMS = SELL_ITEMS.filter(r => {
                if (r.sellId == sellId) {
                    item = r;
                }
                return r.sellId != sellId;
            });
            loadItemHtml().sellItemsHtml();
            return itemDataConnect().deleteSellItemBySellItem(item);
        },
        modalClose: function () {
            $("#i_sd_batch_input_modal").modal('hide');
        }
    }
}