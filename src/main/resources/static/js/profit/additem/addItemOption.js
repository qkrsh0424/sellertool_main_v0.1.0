init();
function init(){
    addItemOptionEventListener();
    loadOptionHtml().optionGroupLoad();
}

function addItemOptionEventListener(){
    $("#i_option_input_el").on('keydown', function(e){
        if(e.keyCode===13){
            $("#i_option_input_btn").click();
        }
    })
}

function setInitialOptionData(name){
    let optionData = {
        'optionUUID': uuidv4(),
        'name': name,
        'remainingCount':'0',
        'sellCount':'0',
        'items': []
    }
    return optionData;
}

function setInitialItemData(storeName, storeType) {
    return {
        'itemUUID': uuidv4(),
        'storeName': storeName,
        'storeType': storeType,
        'commitionCost': '0',
        'price': '0',
        'customerTransCost': '0',
        'sellerRealTransCost': '0',
        'purchaseCost': '0',
        'purchaseTransCost': '0',
        'extraCharge': '0'
    }
}

function loadOptionHtml(){
    return{
        optionSelectedListLoad:function(){
            let listHtml = ``;
            if(OPTION_SELECTED.length===0){
                return $("#i_option_selected_list_box").html('');
            }

            OPTION_SELECTED.forEach(r=>{
                listHtml+= `
                    <li class="list-group-item clearfix">
                        <span>${r.name}</span>
                        <button class="float-right btn" onclick="eventOptionHandler().deleteOptionSelectClick('${r.id}')">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </li>
                `
            });

            let html=`
                <div class="card" style="width: 18rem;">
                    <ul class="list-group list-group-flush">
                        ${listHtml}
                    </ul>
                </div>
            `;
            $("#i_option_selected_list_box").html(html);
        },
        optionGroupLoad:function(){
            let html = ``;
            OPTIONS.forEach((r, index)=>{
                let listHtml = `
                    <div class="st-aitem-option-group-box clearfix">
                        <div class="st-aitem-option-group-title">
                            <div class="row">
                                <div class="col-sm-auto">
                                    <h3>옵션 ${index+1}. ${r.name}</h3>
                                </div>
                                <div class="col-sm-3">
                                    <button class="btn btn-primary" onclick="eventOptionHandler().batchModeOpen('${r.optionUUID}')">일괄등록</button>
                                    <button class="btn btn-outline-danger" onclick="eventOptionHandler().deleteOptOne('${r.optionUUID}')">삭제</button>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group row">
                                        <label for="i_option_remaining_count_${r.optionUUID}" class="col-form-label col-sm-4">재고 수량</label>
                                        <input type="number" id="i_option_remaining_count_${r.optionUUID}" class="form-control col-sm-8" value="${r.remainingCount}" min="0"/>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                        <div class="st-aitem-option-group-table-container">
                            <div id="i_items_group_${r.optionUUID}" class="table-responsive list-table-box">
                                ${loadItemHtml().returnItemListLoad(r)}
                            </div>
                        </div>
                    </div>
                `;
                html+=listHtml;
            });
            $("#i_option_group").html(html);
        }
    }
}

function eventOptionHandler(){
    return{
        addOptionSelectClick:function(){
            if($("#i_option_input_el").val()===''){
                return;
            }
            let json = {
                'id':uuidv4(),
                'name':$("#i_option_input_el").val()
            }
            $("#i_option_input_el").val('');
            $("#i_option_input_el").focus();
            OPTION_SELECTED.push(json);
            loadOptionHtml().optionSelectedListLoad();
        },
        deleteOptionSelectClick:function(id){
            OPTION_SELECTED = OPTION_SELECTED.filter(r=>r.id!=id);
            loadOptionHtml().optionSelectedListLoad();
        },
        setOptsClick:function(){
            if(OPTION_SELECTED.length === 0 | STORE_SELECTED.length === 0){
                addItemSnackbarOpen('최소 하나 이상의 옵션과 마켓을 추가해 주세요.')
                return;
            }
            this.setOptsDataAndLoadHtml();
        },
        setOptsDataAndLoadHtml: function(){
            eventItemHandler().saveOthers();
            OPTION_SELECTED.forEach(r=>{
                let itemList = [];
                STORE_SELECTED.forEach(r=>{
                    itemList.push(setInitialItemData(r.storeName,r.storeType));
                });

                let optionData = setInitialOptionData(r.name);
                optionData.items = itemList;
                OPTIONS.push(optionData);
            });
            loadOptionHtml().optionGroupLoad();
        },
        batchModeOpen:function(optionUUID){
            let optionData = OPTIONS.filter(r=>r.optionUUID===optionUUID)[0];
            $("#i_item_batch_input_commition_cost").val("0");
            $("#i_item_batch_input_price").val("0");
            $("#i_item_batch_input_customer_trans_cost").val("0");
            $("#i_item_batch_input_seller_real_trans_cost").val("0");
            $("#i_item_batch_input_purchase_cost").val("0");
            $("#i_item_batch_input_purchase_trans_cost").val("0");
            $("#i_item_batch_input_extra_charge").val("0");
            $("#i_item_batch_input_modalLabel").html(`옵션명 : ${optionData.name}`);
            $("#i_item_batch_input_select_uuid").val(optionUUID);
            $("#i_item_batch_input_modal").modal("toggle");
        },
        checkBatchModeDataEmpty: function(a,b,c,d,e,f,g){
            if(a=='' | b=='' | c=='' | d=='' | e =='' | f == '' | g == ''){
                return true;
            }else{
                return false;
            }

        },
        setBatchModeData: function(){
            if(
                this.checkBatchModeDataEmpty(
                    $("#i_item_batch_input_commition_cost").val(),
                    $("#i_item_batch_input_price").val(),
                    $("#i_item_batch_input_customer_trans_cost").val(),
                    $("#i_item_batch_input_seller_real_trans_cost").val(),
                    $("#i_item_batch_input_purchase_cost").val(),
                    $("#i_item_batch_input_purchase_trans_cost").val(),
                    $("#i_item_batch_input_extra_charge").val()
                )
            ){
                alert("빈 값은 허용되지 않습니다.");
                return ;
            }
            eventItemHandler().saveOthers();
            let optionUUID = $("#i_item_batch_input_select_uuid").val();
            OPTIONS.forEach(r=>{
                if(r.optionUUID===optionUUID){
                    r.items.forEach(ir=>{
                        ir.commitionCost = $("#i_item_batch_input_commition_cost").val();
                        ir.price = $("#i_item_batch_input_price").val();
                        ir.customerTransCost = $("#i_item_batch_input_customer_trans_cost").val();
                        ir.sellerRealTransCost = $("#i_item_batch_input_seller_real_trans_cost").val();
                        ir.purchaseCost = $("#i_item_batch_input_purchase_cost").val();
                        ir.purchaseTransCost = $("#i_item_batch_input_purchase_trans_cost").val();
                        ir.extraCharge = $("#i_item_batch_input_extra_charge").val();
                    })
                }
            });
            
            loadOptionHtml().optionGroupLoad();
            $("#i_item_batch_input_modal").modal("toggle");
        },
        deleteOptOne:function(optionUUID){
            eventItemHandler().saveOthers();
            OPTIONS = OPTIONS.filter(r=>r.optionUUID!=optionUUID);
            loadOptionHtml().optionGroupLoad();
        }
    }
}