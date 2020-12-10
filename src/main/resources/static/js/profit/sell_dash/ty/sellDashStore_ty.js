function loadStoreHtml() {
    return {
        setInitStore: function() {
            STORE_LIST.forEach(r => {
                STORE_SELECTED.push(r)
            })
            loadItemHtml().sellItemsHtml();
            loadStoreHtml().extractUserSelectSotre();
        },
        extractUserSelectSotre: function() {
            // SEARCH_EL_ITEMS에서 중복되는 storeType 추출해서 EXARACT_STORE 만듬
            EXTRACT_STORE = SEARCH_EL_ITEMS.filter((r, index, self) =>
                self.findIndex(t => t.storeType === r.storeType) === index)
            loadStoreHtml().storeOptionListLoad()
        },
        storeOptionListLoad: function() {
            let html = `
            <option value="none">전체 마켓</option>
            `;
            //user가 가지고 있는 마켓만 출력
            EXTRACT_STORE.forEach(r => {
                html += `
                    <option value=${r.storeType}>${r.storeName}</option>
                    `;

            });
            $(`#ty_st_sd_i_store_select_el`).html(html);
        },
    }
}

function eventStoreHandler() {

    return {
        addStoreSelect: function(e) {
            STORE_SELECTED = [];
            let selectedType = e.value;
            let json;
            STORE_LIST.forEach(r => {
                if (r.storeType === selectedType) {
                    json = {
                        'id': uuidv4(),
                        'storeName': r.storeName,
                        'storeType': r.storeType
                    }
                    STORE_SELECTED.push(json)
                } else if (selectedType === 'none') {
                    json = {
                        'id': uuidv4(),
                        'storeName': r.storeName,
                        'storeType': r.storeType
                    }
                    STORE_SELECTED.push(json)
                }
            })
            loadItemHtml().sellItemsHtml()

        },
    }
}