function goodsDataConnect() {
    return {
        items: async function() {
            await $.ajax({
                url: '/api/item_manager/search/regitem/all',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                success: function(returnData) {
                    if (returnData.message === 'SUCCESS') {
                        // console.log(returnData);
                        SEARCH_EL_ITEMS = returnData.data;
                    }
                },
                error: function(error) {
                    console.log(error);
                }
            })
        },
        setSellItems: async function() {
            let data = JSON.stringify({
                'items': SELECTED_SEARCH_ITEMS,
                'sellDate': DATE_SETTING.sellDate,
            });
            await $.ajax({
                url: '/api/item_manager/add/sell_item/one',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-CSRF-Token", $("#i_st_sd_csrf").val());
                },
                success: function(returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : SDGSG500");
                        return window.location.reload();
                    } {
                        alert("undefined error code : SDGSG");
                        return window.location.reload();
                    }
                },
                error: function(error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDGSG");
                        return window.location.reload();
                    }
                }
            });
        },
        getClassifys: async function() {
            await $.ajax({
                url: '/api/item_manager/search/classifys/byuser',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                success: function(returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        CLASSIFYS = returnData.classifys;
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : SDGSG500");
                        return window.location.reload();
                    } {
                        alert("undefined error code : SDGSG");
                        return window.location.reload();
                    }
                },
                error: function(error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDGSG");
                        return window.location.reload();
                    }
                }
            })
        },
        getOptions: async function(classifyUuid) {
            await $.ajax({
                url: '/api/item_manager/search/options/byclassify',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                data: {
                    'classifyUuid': classifyUuid
                },
                success: function(returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        OPTIONS = returnData.options;
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : SDGSG500");
                        return window.location.reload();
                    } {
                        alert("undefined error code : SDGSG");
                        return window.location.reload();
                    }
                },
                error: function(error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDGSG");
                        return window.location.reload();
                    }
                }
            })
        }
    }
}

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
                        <span class="ty-st-sd-selected-option-list un" onclick="eventGoodsHandler().selectedItemDeleteClick('${r.index}','${r.optionUuid}')">
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

            await goodsDataConnect().getOptions(classifyUuid);
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
            })
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

            BATCH_ITEM_SELECTED.forEach(r => {
                SELECTED_SEARCH_ITEMS.push(r);
                $(`#option_${r.optionUuid}`).removeClass("ty_st_sd_option_el_active");
            });

            await goodsDataConnect().setSellItems();
            eventItemHandler().itemSearchClick();

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