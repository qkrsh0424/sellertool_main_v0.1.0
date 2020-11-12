init();
function init(){

}

function loadItemHtml(){
    return{
        returnItemListLoad:function(option){
            let tableEls = ``;
            items = option.items;
            items.forEach((r,index) => {
                let commitionCostTag = `
                    <div class="">
                        <input type="text" class="form-control ty-st-aitem-input item-price-input" 
                            id="i_item_commition_cost_${r.itemUUID}" 
                            onkeypress="return isActualNumberKey(event)" 
                            onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');" 
                            value=${r.commitionCost}></input>
                    </div>
                `;
                
                let priceTag = `
                    <div class="">
                        <input type="text" class="form-control ty-st-aitem-input item-price-input" 
                            id="i_item_price_${r.itemUUID}" 
                            onkeypress="return isNumberKey(event)" 
                            onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');" 
                            value=${r.price}></input>
                    </div>
                `;
                let customerTransCostTag = `
                    <div class="">
                        <input type="text" class="form-control ty-st-aitem-input item-price-input" 
                            id="i_item_customer_trans_cost_${r.itemUUID}" 
                            onkeypress="return isNumberKey(event)" 
                            onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');" 
                            value=${r.customerTransCost}></input>
                    </div>
                `;
                let sellerRealTransCostTag = `
                    <div class="">
                        <input type="text" class="form-control ty-st-aitem-input item-price-input" 
                            id="i_item_seller_real_trans_cost_${r.itemUUID}" 
                            onkeypress="return isNumberKey(event)" 
                            onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');" 
                            value=${r.sellerRealTransCost}></input>
                    </div>
                `;
                let purchaseCostTag = `
                    <div class="">
                        <input type="text" class="form-control ty-st-aitem-input item-price-input" 
                            id="i_item_purchase_cost_${r.itemUUID}" 
                            onkeypress="return isNumberKey(event)" 
                            onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');" 
                            value=${r.purchaseCost}></input>
                    </div>
                `;
                let purchaseTransCostTag = `
                    <div class="">
                        <input type="text" class="form-control ty-st-aitem-input item-price-input" 
                            id="i_item_purchase_trans_cost_${r.itemUUID}" 
                            onkeypress="return isNumberKey(event)" 
                            onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');" 
                            value=${r.purchaseTransCost}></input>
                    </div>
                `;
                let extraChargeTag = `
                    <div class="">
                        <input type="text" class="form-control ty-st-aitem-input item-price-input" 
                            id="i_item_extra_charge_${r.itemUUID}" 
                            onkeypress="return isNumberKey(event)" 
                            onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');" 
                            value=${r.extraCharge}></input>
                    </div>
                `;
                tableEls += `
                    <tr class="text-center">
                        <th scope="row">${index+1}</th>
                        <td ><button type="button" class="btn btn-danger" onclick="eventItemHandler().deleteOne('${option.optionUUID}','${r.itemUUID}')">삭제</button></td>
                        <td class="align-middle">${r.storeName}</td>
                        <td>${commitionCostTag}</td>
                        <td>${priceTag}</td>
                        <td>${customerTransCostTag}</td>
                        <td>${sellerRealTransCostTag}</td>
                        <td>${purchaseCostTag}</td>
                        <td>${purchaseTransCostTag}</td>
                        <td>${extraChargeTag}</td>
                    </tr>
                `;
            });

            let html = `
            
                <table class="table overflow-table">
                    <thead class="ty-st-aitem-thead">
                    <tr class="text-center">
                        <th scope="col" width="50">#</th>
                        <th scope="col" width="80">컨트롤러</th>
                        <th scope="col" width="110">마켓 종류</th>
                        <th scope="col" width="200">마켓 수수료 [%]</th>
                        <th scope="col" width="200">판매가 [원]<span class="text-success">(+)</span></th>
                        <th scope="col" width="200">소비자 운임비용 [원]<span class="text-success">(+)</span></th>
                        <th scope="col" width="200">판매자 실질 운임비용 [원]<span class="text-danger">(-)</span></th>
                        <th scope="col" width="200">매입 가격 | 구매 비용 [원]<span class="text-danger">(-)</span></th>
                        <th scope="col" width="200">매입 운임 비용 [원]<span class="text-danger">(-)</span></th>
                        <th scope="col" width="200">기타 비용 [원]<span class="text-danger">(-)</span></th>
                    </tr>
                    </thead>
                    <tbody>
                        ${tableEls}
                    </tbody>
                </table>
                
            `;
            return html;
        }
    }
}

function eventItemHandler(){
    return{
        saveOthers: function(){
            OPTIONS.forEach(r=>{
                r.remainingCount = $(`#i_option_remaining_count_${r.optionUUID}`).val();
                r.items.forEach(ir=>{
                    ir.commitionCost = $(`#i_item_commition_cost_${ir.itemUUID}`).val()?$(`#i_item_commition_cost_${ir.itemUUID}`).val():'0';
                    ir.price = $(`#i_item_price_${ir.itemUUID}`).val()?$(`#i_item_price_${ir.itemUUID}`).val():'0';
                    ir.customerTransCost = $(`#i_item_customer_trans_cost_${ir.itemUUID}`).val()?$(`#i_item_customer_trans_cost_${ir.itemUUID}`).val():'0';
                    ir.sellerRealTransCost = $(`#i_item_seller_real_trans_cost_${ir.itemUUID}`).val()?$(`#i_item_seller_real_trans_cost_${ir.itemUUID}`).val():'0';
                    ir.purchaseCost = $(`#i_item_purchase_cost_${ir.itemUUID}`).val()?$(`#i_item_purchase_cost_${ir.itemUUID}`).val():'0';
                    ir.purchaseTransCost = $(`#i_item_purchase_trans_cost_${ir.itemUUID}`).val()?$(`#i_item_purchase_trans_cost_${ir.itemUUID}`).val():'0';
                    ir.extraCharge = $(`#i_item_extra_charge_${ir.itemUUID}`).val()?$(`#i_item_extra_charge_${ir.itemUUID}`).val():'0';
                })
            })
        },
        deleteOne:function(optionUUID,itemUUID){
            // console.log(itemUUID);
            this.saveOthers();
            OPTIONS.forEach(r=>{
                if(r.optionUUID === optionUUID){
                    if(r.items.length<=1){
                        addItemSnackbarOpen("적어도 하나의 아이템은 유지해야 합니다. <br/>삭제가 필요한 경우 옵션을 삭제해 주세요.");
                        // addItemSnackbarOpen("Some text some message..");
                        return;
                    }
                    r.items = r.items.filter(ir=>ir.itemUUID!=itemUUID);
                }
            });
            loadOptionHtml().optionGroupLoad();
        }
    }
}