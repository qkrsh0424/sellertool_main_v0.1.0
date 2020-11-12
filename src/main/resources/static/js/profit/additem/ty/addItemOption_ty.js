init();
function init() {
    addItemOptionEventListener();
    loadOptionHtml().optionGroupLoad();
}

function addItemOptionEventListener() {
    $("#i_option_input_el").on('keydown', function (e) {
        if (e.keyCode === 13) {
            $("#i_option_input_btn").click();
        }
    })
}

function setInitialOptionData(name) {
    let optionData = {
        'optionUUID': uuidv4(),
        'name': name,
        'remainingCount': '0',
        'sellCount': '0',
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

function loadOptionHtml() {
    return {
        optionSelectedListLoad: function () {
            let listHtml = ``;
            if (OPTION_SELECTED.length === 0) {
                return $("#i_option_selected_list_box").html('');
            }

            OPTION_SELECTED.forEach(r => {
                listHtml += `
                    <li class="ty-st-atime-option-list">
                        <span class="ty-st-atime-option-list-el form-group">${r.name}
                        <button class="ty-st-atime-option-list-btn" onclick="eventOptionHandler().deleteOptionSelectClick('${r.id}')">
                        <i class="fas fa-times">
                        <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </i>
                        </button>
                        </span>
                    </li>
                `
            });

            let html = `
            
                
                    <ul class="ty-st-atime-option-list-ul">
                        ${listHtml}
                    </ul>
               
            
            `;
            $("#i_option_selected_list_box").html(html);
        },
        optionGroupLoad: function () {
            let html = ``;
            OPTIONS.forEach((r, index) => {
                let listHtml = `
                    <div class="st-aitem-box  clearfix">
                        <div class="st-aitem-option-group-title">
                            <div class="st-aitem-title-box">
                               
                                    <h4 class="st-aitem-title-el">옵션 ${index + 1}. ${r.name}</h4>
                               
                            </div>
                        </div>                        
                        <div class="ty-st-aitem-option-group-table-container">
                            <div id="i_items_group_${r.optionUUID}" class="table-responsive list-table-box ty-list-table-box">
                                ${loadItemHtml().returnItemListLoad(r)}
                            </div>
                            <div class="ty-st-option-table-footer-box">
                            <div class="ty-st-option-table-footer-wrapper">
                                <div class="col-sm-8 ty-st-option-table-remaining-box">
                                    <button class="btn ty-st-option-table-footer-btn mr-1" onclick="eventOptionHandler().batchModeOpen('${r.optionUUID}')">일괄등록</button>
                                    <button class="btn btn-danger" onclick="eventOptionHandler().deleteOptOne('${r.optionUUID}')">삭제</button>
                                </div>
                                <div class="col-sm-4 ty-st-option-table-remaining-box">
                                <span for="i_option_remaining_count_${r.optionUUID}" class="col-sm-4">옵션 재고 수량</span>
                                <input type="number" id="i_option_remaining_count_${r.optionUUID}" class="col-sm-8 ty-st-aitem-input" value="${r.remainingCount}" min="0"/>
                                </div>
                            </div>
                        </div>
                        </div>
                        
                    </div>
                `;
                html += listHtml;
            });
            $("#i_option_group").html(html);
        }
    }
}

function eventOptionHandler() {
    return {
        addOptionSelectClick: function () {

            addOptionValueSplit = $("#i_option_input_el").val().split(",");
            addOptionValueSplit.forEach(r => {
                if(r !==''){
            let json = {
                'id': uuidv4(),
                'name': r
            }
            $("#i_option_input_el").val('');
            $("#i_option_input_el").focus();
            OPTION_SELECTED.push(json);
            loadOptionHtml().optionSelectedListLoad();
            }else {
                return;
            }
        })
        },
        deleteOptionSelectClick: function (id) {
            OPTION_SELECTED = OPTION_SELECTED.filter(r => r.id != id);
            loadOptionHtml().optionSelectedListLoad();
        },
        setOptsClick: function () {
            if (OPTION_SELECTED.length === 0 | STORE_SELECTED.length === 0) {
                return;
            }
            this.setOptsDataAndLoadHtml();
        },
        setOptsDataAndLoadHtml: function () {
            eventItemHandler().saveOthers();
            OPTION_SELECTED.forEach(r => {
                let itemList = [];
                STORE_SELECTED.forEach(r => {
                    itemList.push(setInitialItemData(r.storeName, r.storeType));
                });

                let optionData = setInitialOptionData(r.name);
                optionData.items = itemList;
                OPTIONS.push(optionData);
            });
            loadOptionHtml().optionGroupLoad();
        },
        // 일괄등록 하면 그다음 모달 띄울때 입력했던 val 저장해서 띄움 
        batchModeOpen: function (optionUUID) {
            let optionData = OPTIONS.filter(r => r.optionUUID === optionUUID)[0];
            if($("#i_item_batch_input_price").val() === "0"){
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

            } else if($("#i_item_batch_input_price").val() !== "0"){
            $("#i_item_batch_input_commition_cost").val($("#i_item_batch_input_commition_cost").val());
            $("#i_item_batch_input_price").val($("#i_item_batch_input_price").val());
            $("#i_item_batch_input_customer_trans_cost").val($("#i_item_batch_input_customer_trans_cost").val());
            $("#i_item_batch_input_seller_real_trans_cost").val($("#i_item_batch_input_seller_real_trans_cost").val());
            $("#i_item_batch_input_purchase_cost").val($("#i_item_batch_input_purchase_cost").val());
            $("#i_item_batch_input_purchase_trans_cost").val($("#i_item_batch_input_purchase_trans_cost").val());
            $("#i_item_batch_input_extra_charge").val($("#i_item_batch_input_extra_charge").val());
            $("#i_item_batch_input_modalLabel").html(`옵션명 : ${optionData.name}`);
            $("#i_item_batch_input_select_uuid").val(optionUUID);
            $("#i_item_batch_input_modal").modal("toggle");
            }
            
        },
        checkBatchModeDataEmpty: function (a, b, c, d, e, f, g) {
            if (a == '' | b == '' | c == '' | d == '' | e == '' | f == '' | g == '') {
                return true;
            } else {
                return false;
            }

        },
        setBatchModeData: function () {
            if (
                this.checkBatchModeDataEmpty(
                    $("#i_item_batch_input_commition_cost").val(),
                    $("#i_item_batch_input_price").val(),
                    $("#i_item_batch_input_customer_trans_cost").val(),
                    $("#i_item_batch_input_seller_real_trans_cost").val(),
                    $("#i_item_batch_input_purchase_cost").val(),
                    $("#i_item_batch_input_purchase_trans_cost").val(),
                    $("#i_item_batch_input_extra_charge").val()
                )
            ) {
                alert("빈 값은 허용되지 않습니다.");
                return;
            }
            eventItemHandler().saveOthers();
            let optionUUID = $("#i_item_batch_input_select_uuid").val();
            OPTIONS.forEach(r => {
                if (r.optionUUID === optionUUID) {
                    r.items.forEach(ir => {
                        // console.log(ir)
                        ir.commitionCost = $("#i_item_batch_input_commition_cost").val();
                        ir.price = $("#i_item_batch_input_price").val();
                        ir.customerTransCost = $("#i_item_batch_input_customer_trans_cost").val();
                        ir.sellerRealTransCost = $("#i_item_batch_input_seller_real_trans_cost").val();
                        ir.purchaseCost = $("#i_item_batch_input_purchase_cost").val();
                        ir.purchaseTransCost = $("#i_item_batch_input_purchase_trans_cost").val();
                        ir.extraCharge = $("#i_item_batch_input_extra_charge").val();

                        $("#i_item_batch_input_commition_cost").val(`${ir.commitionCost}`);
                        $("#i_item_batch_input_price").val(`${ir.price}`);
                    })
                    
                }
            });

            loadOptionHtml().optionGroupLoad();
            $("#i_item_batch_input_modal").modal("toggle");
        },


        deleteOptOne: function (optionUUID) {
            eventItemHandler().saveOthers();
            OPTIONS = OPTIONS.filter(r => r.optionUUID != optionUUID);
            loadOptionHtml().optionGroupLoad();
        }
    }
}