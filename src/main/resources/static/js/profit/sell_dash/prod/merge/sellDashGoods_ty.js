function loadGoodsHtml() {
    return {
        sellItemsHtml: function() {
            let html = `
                <table class="table overflow-table">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col" width="50">#</th>
                        <th scope="col" width="100">컨트롤러</th>
                        <th scope="col" width="100">판매 개수 [개]</th>
                        <th scope="col" width="100">상품당 매출액 [원]</th>
                        <th scope="col" width="100">상품당 순수익 [원]</th>
                        <th scope="col" width="200">마켓 종류</th>
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
                    </tbody>
                </table>
            `;
            $("#i_sell_item_list").html(html);

        },
        showHaveItemSetListHtml() {
            let html = ``;
            return {
                classifys: function() {
                    (SEARCHED_DATA.length > 0 ? SEARCHED_DATA : CLASSIFYS).forEach(r => {
                        html += `
                        <div class="ty-st-sd-classify-box">
                            <button type="button" class="ty-st-sd-items-btn" value=${r.classifyUuid} id="classify_${r.classifyUuid}" onClick="eventGoodsHandler().classifySelectOnChange(this)">${r.classifyName}</button>
                        </div>
                        `;
                    });
                    $("#ty_sell_item_classify_list").html(html);
                },
                options: function() {
                    OPTIONS.forEach(r => {
                        html += `
                        <div class="ty-st-sd-option-box" id="ty_st_sd_option_el_${r.optionUuid}">
                            <button type="button"  class="ty-st-sd-items-btn" value=${r.optionUuid} id="option_${r.optionUuid}"onClick="eventGoodsHandler().optionSelectOnChange('${jsonToBase64(r)}')">${r.optionName}</button>
                        </div>
                        `;
                    });
                    $("#ty_sell_item_option_list").html(html);
                },
                optionSelectedItemList: function() {
                    BATCH_ITEM_SELECTED.forEach(r => {
                        html += `
                            <div>
                                <span class="ty-st-sd-selected-option-list st-noselect" onclick="eventGoodsHandler().selectedItemDeleteClick('${r.index}','${r.optionUuid}')">
                                    ${r.label}
                                    <button type="button" class="btn btn-outline-none ty-st-sd-selected-btn" >
                                        <i class="fas fa-times"></i>
                                    </button>
                                    ,
                                </span>
                            </div>                    
                        `;
                    })
                    $("#ty_sell_item_option_selected_list").html(html);
                },
            }
        }
    }
}

function eventGoodsHandler() {
    return {

        // TY START
        showHaveItemList: async function() {
            BATCH_ITEM_SELECTED = [];
            loadGoodsHtml().showHaveItemSetListHtml().classifys();
        },
        classifySelectOnChange: async function(event) {
            let classifyUuid = event.value;

            await sellDashDataConnect().getOptions(classifyUuid);
            loadGoodsHtml().showHaveItemSetListHtml().options();
            eventGoodsHandler().optionsCss();
        },
        optionsCss: function(id) {

            OPTIONS.forEach(r => {
                BATCH_ITEM_SELECTED.forEach(s => {
                    if (r.optionUuid === s.optionUuid) {
                        $(`#option_${s.optionUuid}`).addClass("ty_st_sd_option_el_active")
                    }
                })
            })

            let removeOptionCss = BATCH_ITEM_SELECTED.filter(r => {
                return r.optionUuid.includes(id)
            });
            if (removeOptionCss.length <= 0) {
                $(`#option_${id}`).removeClass("ty_st_sd_option_el_active")
            }

        },
        optionSelectOnChange: function(data) {
            let item = base64ToJson(data)
            let optionUuid = item.optionUuid;
            let isSelected = true;

            BATCH_ITEM_SELECTED = BATCH_ITEM_SELECTED.filter(r => {
                if (r.optionUuid === optionUuid) {
                    isSelected = false;
                    $(`#option_${item.optionUuid}`).removeClass("ty_st_sd_option_el_active")
                }
                return r.optionUuid !== optionUuid
            });

            let batchItems = SEARCH_EL_ITEMS.filter(r => r.optionUuid === optionUuid);
            eventGoodsHandler().optionItemSelectedClick(batchItems, isSelected)
        },
        optionItemSelectedClick: function(data, isSelected) {
            let items = data;
            let json = {}
            let NewIsSelected = isSelected;

            if (BATCH_ITEM_SELECTED.length >= 30) {
                return;
            }

            if (NewIsSelected) {
                items.forEach(item => {
                    json = {
                        'label': `${item.itemName}(${item.storeName})`,
                        'value': `${item.itemName}(${item.storeName})`,
                        'index': uuidv4(),
                        'itemId': item.itemId,
                        'classifyUuid': item.classifyUuid,
                        'optionUuid': item.optionUuid,
                        'itemName': item.itemName,
                        'storeType': item.storeType,
                        'storeName': item.storeName,
                    }
                    BATCH_ITEM_SELECTED.push(json);
                    $(`#option_${item.optionUuid}`).addClass("ty_st_sd_option_el_active")
                })
            };


            loadGoodsHtml().showHaveItemSetListHtml().optionSelectedItemList();
        },
        selectedOptionItemsSubmitClick: async function() {
            if(BATCH_ITEM_SELECTED.length<=0){
                return;
            }
            BATCH_ITEM_SELECTED.forEach(r => {
                SELECTED_SEARCH_ITEMS.push(r);
                $(`#option_${r.optionUuid}`).removeClass("ty_st_sd_option_el_active");
            });

            await sellDashDataConnect().setSellItems();
            eventItemHandler().sellItemSearchClick();

            BATCH_ITEM_SELECTED = [];
            SELECTED_SEARCH_ITEMS = [];
            loadGoodsHtml().showHaveItemSetListHtml().optionSelectedItemList();

        },
        selectedItemDeleteClick: function(index, id) {
            BATCH_ITEM_SELECTED = BATCH_ITEM_SELECTED.filter(r => r.index != index);
            loadGoodsHtml().showHaveItemSetListHtml().optionSelectedItemList();
            $('#ty_sell_item_option_selected_list').val('')
            eventGoodsHandler().optionsCss(id)
        },

        // search
        searchClassify: function() {
            let value = ($('#i_search_input').val());
            if (value && value.trim().length > 0) {
                SEARCHED_DATA = CLASSIFYS.filter(item => {
                    return item.classifyName.includes(value)
                }).sort((itemA, itemB) => {
                    return eventGoodsHandler().getRelevancy(itemB.classifyName, value) - eventGoodsHandler().getRelevancy(itemA.classifyName, value);
                })
            } else {
                SEARCHED_DATA = [];
            }
            loadGoodsHtml().showHaveItemSetListHtml().classifys()

        },
        getRelevancy: function(value, searchTerm) {
            if (value === searchTerm) {
                return 2;
            } else if (value.startsWith(searchTerm)) {
                return 1;
            } else if (value.includes(searchTerm)) {
                return 0;
            } else {
                return -1
            }
        }



        // TY END


    }
}