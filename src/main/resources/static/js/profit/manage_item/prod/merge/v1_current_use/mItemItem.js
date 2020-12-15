function loadItemHtml() {
    return {
        setItemsTableHtml: function () {
            return {
                set: function () {
                    let tableEls = ``;
                    ITEMS.forEach((r, index) => {
                        let commitionCostTag = `
                            <div class="form-group">
                                ${r.commitionCost}
                            </div>
                        `;

                        let priceTag = `
                            <div class="form-group">
                                ${r.price}
                            </div>
                        `;
                        let customerTransCostTag = `
                            <div class="form-group">
                                ${r.customerTransCost}
                            </div>
                        `;
                        let sellerRealTransCostTag = `
                            <div class="form-group">
                                ${r.sellerRealTransCost}
                            </div>
                        `;
                        let purchaseCostTag = `
                            <div class="form-group">
                                ${r.purchaseCost}
                            </div>
                        `;
                        let purchaseTransCostTag = `
                            <div class="form-group">
                                ${r.purchaseTransCost}
                            </div>
                        `;
                        let extraChargeTag = `
                            <div class="form-group">
                                ${r.extraCharge}
                            </div>
                        `;
                        tableEls += `
                            <tr>
                                <th scope="row">${index + 1}</th>
                                <td>
                                    <button type="button" class="btn btn-outline-danger" onclick="eventItemHandler().itemDataDeleteClick('${r.itemId}')">삭제</button>
                                    <button type="button" class="btn btn-outline-primary" onclick="eventItemHandler().itemDataUpdateModalOpen('${r.itemId}')">데이터 수정</button>
                                </td>
                                <td>${r.storeName}</td>
                                <td>${commitionCostTag}</td>
                                <td>${numberWithCommas(priceTag)}</td>
                                <td>${numberWithCommas(customerTransCostTag)}</td>
                                <td>${numberWithCommas(sellerRealTransCostTag)}</td>
                                <td>${numberWithCommas(purchaseCostTag)}</td>
                                <td>${numberWithCommas(purchaseTransCostTag)}</td>
                                <td>${numberWithCommas(extraChargeTag)}</td>
                            </tr>
                        `;
                    });

                    let html = `
                        <div class="st-sd-wrapper">
                            <div class="st-sd-box">
                                <div class="st-sd-title-box">
                                    <h4 class="st-sd-title-el">
                                        상품 상세<button class="float-right btn btn-outline-primary btn-lg" onclick="eventItemHandler().storeAddModalOpen()">스토어 추가</button>
                                    </h4>
                                </div>
                                <div class="st-sd-table-container">
                                    <div class="table-responsive list-table-box text-center" id="i_sell_item_list">
                                        <table class="table overflow-table">
                                            <thead class="thead-dark">
                                            <tr>
                                                <th scope="col" width="50">#</th>
                                                <th scope="col" width="200">컨트롤러</th>
                                                <th scope="col" width="200">마켓 종류</th>
                                                <th scope="col" width="200">마켓 수수료<div class="st-sd-sell-unit">단위 : [%]</div></th>
                                                <th scope="col" width="200">개당 판매가<span class="text-success">(+)</span><div class="st-sd-sell-unit">단위 : [원]</div></th>
                                                <th scope="col" width="200">개당 소비자 운임비용<span class="text-success">(+)</span><div class="st-sd-sell-unit">단위 : [원]</div></th>
                                                <th scope="col" width="200">개당 판매자 실질 운임비용<span class="text-danger">(-)</span><div class="st-sd-sell-unit">단위 : [원]</div></th>
                                                <th scope="col" width="200">개당 매입 가격 | 구매 비용<span class="text-danger">(-)</span><div class="st-sd-sell-unit">단위 : [원]</div></th>
                                                <th scope="col" width="200">개당 매입 운임 비용<span class="text-danger">(-)</span><div class="st-sd-sell-unit">단위 : [원]</div></th>
                                                <th scope="col" width="200">개당 기타 비용<span class="text-danger">(-)</span><div class="st-sd-sell-unit">단위 : [원]</div></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                ${tableEls}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    $("#i_mitem_item_table_box").html(html);

                },
                clear: function () {
                    $("#i_mitem_item_table_box").html('');
                }
            }
        },
        setItemDataUpdateModalContent: function () {
            return {
                set: function () {
                    let modalHeaderHtml = `
                        <div class="modal-header">
                            <h5 class="modal-title" id="i_mitem_batch_input_modalLabel">마켓명 : (${ITEM_MODAL_DATA.storeName})</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `;

                    let modalBodyHtml = `
                        <div class="modal-body">
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="i_mitem_batch_input_commition_cost">마켓 수수료 [%]</label>
                                    <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[1]</span>
                                    <input type="text" class="form-control" id="i_mitem_batch_input_commition_cost"
                                        value=${ITEM_MODAL_DATA.commitionCost} placeholder="마켓 수수료" onkeypress="return isActualNumberKey(event)"
                                        onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">

                                    <label for="i_mitem_batch_input_price">개당 판매가 [원]<span class="text-success">(+)</span></label>
                                    <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[2]</span>
                                    <input type="text" class="form-control" id="i_mitem_batch_input_price" 
                                        value=${ITEM_MODAL_DATA.price}
                                        placeholder="개당 판매가" onkeypress="return isNumberKey(event)"
                                        onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">

                                    <label for="i_mitem_batch_input_customer_trans_cost">개당 소비자 운임 비용 [원]<span class="text-success">(+)</span></label>
                                    <span class="badge badge-dark" title="${TOOLTIP_TEXT.unitCustomerTransCost}">&#63;</span>
                                    <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[3]</span>
                                    <input type="text" class="form-control" id="i_mitem_batch_input_customer_trans_cost"
                                        value=${ITEM_MODAL_DATA.customerTransCost} placeholder="개당 소비자 운임 비용" onkeypress="return isNumberKey(event)"
                                        onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">
                                    <label for="i_mitem_batch_input_seller_real_trans_cost">개당 판매자 실질 운임 비용 [원]<span class="text-danger">(-)</span></label>
                                    <span class="badge badge-dark" title="${TOOLTIP_TEXT.unitSellerRealTransCost}">&#63;</span>
                                    <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[4]</span>
                                    <input type="text" class="form-control"
                                        id="i_mitem_batch_input_seller_real_trans_cost" value=${ITEM_MODAL_DATA.sellerRealTransCost}
                                        placeholder="개당 판매자 실질 운임 비용" onkeypress="return isNumberKey(event)"
                                        onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="i_mitem_batch_input_purchase_cost">개당 매입 가격 | 구매 비용 [원]<span class="text-danger">(-)</span></label>
                                    <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[5]</span>
                                    <input type="text" class="form-control" id="i_mitem_batch_input_purchase_cost"
                                        value=${ITEM_MODAL_DATA.purchaseCost} placeholder="개당 매입 가격 | 구매 비용" onkeypress="return isNumberKey(event)"
                                        onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">

                                    <label for="i_mitem_batch_input_purchase_trans_cost">개당 매입 운임 비용 [원]<span class="text-danger">(-)</span></label>
                                    <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[6]</span>
                                    <input type="text" class="form-control" id="i_mitem_batch_input_purchase_trans_cost"
                                        value=${ITEM_MODAL_DATA.purchaseTransCost} placeholder="개당 매입 운임 비용" onkeypress="return isNumberKey(event)"
                                        onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">

                                    <label for="i_mitem_batch_input_extra_charge">개당 기타 비용 [원]<span class="text-danger">(-)</span></label>
                                    <span class="float-right" style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[7]</span>
                                    <input type="text" class="form-control" id="i_mitem_batch_input_extra_charge"
                                        value=${ITEM_MODAL_DATA.extraCharge} placeholder="개당 기타 비용" onkeypress="return isNumberKey(event)"
                                        onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');">
                                </div>
                                <div class="form-group col-md-12">
                                    <div id="i_mitem_batch_data_profit">
                                        개당 수익 : <span>${numberWithCommas(ITEM_MODAL_DATA.unitProfit)}</span> [원]
                                        <span class="badge badge-dark" title="${TOOLTIP_TEXT.unitProfit}">&#63;</span>
                                        <span style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[b]</span>
                                    </div>
                                    <div id="i_mitem_batch_data_profit_rate">
                                        개당 수익율 : <span>${ITEM_MODAL_DATA.unitProfitRate}</span> [%]
                                        <span class="badge badge-dark" title="${TOOLTIP_TEXT.unitProfitRate}">&#63;</span>
                                        <span style="color:gray;">&middot;&middot;&middot;&middot;&middot;&middot;[c]</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    let modalFooterHtml = `
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onclick="eventItemHandler().modalDataAdapt().setUnitData()">수치 적용</button>
                            <button type="button" class="btn btn-primary" onclick="eventItemHandler().modalDataSubmitClick()">저장하기</button>
                            <button type="button" class="btn btn-primary" onclick="eventItemHandler().modalClose()">닫기</button>
                        </div>
                    `;
                    let html = `
                        <div class="modal-content">
                            ${modalHeaderHtml}
                            ${modalBodyHtml}
                            ${modalFooterHtml}
                        </div>
                    `;
                    $("#i_mitem_modal_large_box").html(html);
                }
            }
        },
        setAddStoreModalContent: function(){
            let storesHtml = ``;
            STORES.forEach(r=>{
                storesHtml+= `
                    <span class="st-sd-batch-selected-item-wrapper">
                        <button class="btn" onclick="eventItemHandler().addItemWithStore('${r.storeType}', '${r.storeName}')">${r.storeName}</button>
                    </span>
                `;
            })
            let modalHeaderHtml = `
                        <div class="modal-header">
                            <h5 class="modal-title" id="i_mitem_batch_input_modalLabel">스토어 추가하기</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `;

            let modalBodyHtml = `
                <div class="modal-body">
                    ${storesHtml}
                </div>
            `;

            let modalFooterHtml = `
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="eventItemHandler().modalClose()">닫기</button>
                </div>
            `;
            let html = `
                <div class="modal-content">
                    ${modalHeaderHtml}
                    ${modalBodyHtml}
                    ${modalFooterHtml}
                </div>
            `;
            $("#i_mitem_modal_large_box").html(html);
        }
    }
}

function itemObjectDataControl(){
    return{
        costValCalc: function (rData) {
            let unitSales = Number(rData.price) + Number(rData.customerTransCost);
            let unitProfit = parseInt(unitSales * ((100 - Number(rData.commitionCost)) / 100) - Number(rData.purchaseCost) - Number(rData.purchaseTransCost) - Number(rData.sellerRealTransCost) - Number(rData.extraCharge));
            let unitProfitRate = 0;
            if (unitSales === 0) {
                unitProfitRate = 0;
            } else {
                unitProfitRate = (unitProfit / ((unitSales)) * 100).toFixed(2);
            }

            return {
                getUnitSales: function () { return unitSales; },
                getUnitProfit: function () { return unitProfit; },
                getUnitProfitRate: function () { return unitProfitRate; },
            }
        },
        setItemModalData: function(itemId){
            let item = ITEMS.filter(r => r.itemId == itemId)[0];
            ITEM_MODAL_DATA = '';
            let costValCalc = itemObjectDataControl().costValCalc(item);
            ITEM_MODAL_DATA = {
                'itemId': item.itemId,
                'storeName':item.storeName,
                'itemName': item.itemName,
                'commitionCost': item.commitionCost,
                'price': item.price,
                'customerTransCost': item.customerTransCost,
                'sellerRealTransCost': item.sellerRealTransCost,
                'purchaseCost': item.purchaseCost,
                'purchaseTransCost': item.purchaseTransCost,
                'extraCharge': item.extraCharge,
                'unitProfit': costValCalc.getUnitProfit(),
                'unitProfitRate': costValCalc.getUnitProfitRate(),
            }
        }
    }
}

function eventItemHandler() {
    return {
        itemDataUpdateModalOpen: function (itemId) {
            itemObjectDataControl().setItemModalData(itemId);
            loadItemHtml().setItemDataUpdateModalContent().set();
            $("#i_mitem_modal_large").modal('show');
        },
        modalClose : function(){
            ITEM_MODAL_DATA = '';
            $("#i_mitem_modal_large").modal('hide');
        },
        modalDataAdapt: function(){
            return {
                setUnitData: function(){
                    ITEM_MODAL_DATA.commitionCost = $("#i_mitem_batch_input_commition_cost").val() === '' ? 0 : $("#i_mitem_batch_input_commition_cost").val();
                    ITEM_MODAL_DATA.price = $("#i_mitem_batch_input_price").val() === '' ? 0 : $("#i_mitem_batch_input_price").val();
                    ITEM_MODAL_DATA.customerTransCost = $("#i_mitem_batch_input_customer_trans_cost").val() === '' ? 0 : $("#i_mitem_batch_input_customer_trans_cost").val();
                    ITEM_MODAL_DATA.sellerRealTransCost = $("#i_mitem_batch_input_seller_real_trans_cost").val() === '' ? 0 : $("#i_mitem_batch_input_seller_real_trans_cost").val();
                    ITEM_MODAL_DATA.purchaseCost = $("#i_mitem_batch_input_purchase_cost").val() === '' ? 0 : $("#i_mitem_batch_input_purchase_cost").val();
                    ITEM_MODAL_DATA.purchaseTransCost = $("#i_mitem_batch_input_purchase_trans_cost").val() === '' ? 0 : $("#i_mitem_batch_input_purchase_trans_cost").val();
                    ITEM_MODAL_DATA.extraCharge = $("#i_mitem_batch_input_extra_charge").val() === '' ? 0 : $("#i_mitem_batch_input_extra_charge").val();

                    let costValCalc = itemObjectDataControl().costValCalc(ITEM_MODAL_DATA);
                    ITEM_MODAL_DATA.unitProfit = costValCalc.getUnitProfit();
                    ITEM_MODAL_DATA.unitProfitRate = costValCalc.getUnitProfitRate();

                    loadItemHtml().setItemDataUpdateModalContent().set();
                }
            }
        },
        modalDataSubmitClick: function(){
            ITEMS.forEach(r => {
                if (r.itemId == ITEM_MODAL_DATA.itemId) {
                    r.commitionCost = $("#i_mitem_batch_input_commition_cost").val() === '' ? 0 : $("#i_mitem_batch_input_commition_cost").val();
                    r.price = $("#i_mitem_batch_input_price").val() === '' ? 0 : $("#i_mitem_batch_input_price").val();
                    r.customerTransCost = $("#i_mitem_batch_input_customer_trans_cost").val() === '' ? 0 : $("#i_mitem_batch_input_customer_trans_cost").val();
                    r.sellerRealTransCost = $("#i_mitem_batch_input_seller_real_trans_cost").val() === '' ? 0 : $("#i_mitem_batch_input_seller_real_trans_cost").val();
                    r.purchaseCost = $("#i_mitem_batch_input_purchase_cost").val() === '' ? 0 : $("#i_mitem_batch_input_purchase_cost").val();
                    r.purchaseTransCost = $("#i_mitem_batch_input_purchase_trans_cost").val() === '' ? 0 : $("#i_mitem_batch_input_purchase_trans_cost").val();
                    r.extraCharge = $("#i_mitem_batch_input_extra_charge").val() === '' ? 0 : $("#i_mitem_batch_input_extra_charge").val();
                    $("#i_mitem_modal_large").modal('hide');
                    loadItemHtml().setItemsTableHtml().set();
                    return dataConnect().updateItemData(r.itemId);
                }
            });
        },
        itemDataDeleteClick: function(itemId){
            let item = ITEMS.filter(r=>r.itemId==itemId)[0];
            ITEMS = ITEMS.filter(r=>r.itemId!=itemId);
            dataConnect().deleteItemData(item);
            loadItemHtml().setItemsTableHtml().set();
        },
        storeAddModalOpen: function(){
            $("#i_mitem_modal_large").modal('show');
            loadItemHtml().setAddStoreModalContent();
        },
        addItemWithStore: async function(storeType,storeName){
            dataConnect().addItemWithStore(storeType, storeName);
            $("#i_mitem_modal_large").modal('hide');
        }
    }
}