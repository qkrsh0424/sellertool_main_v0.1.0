function loadClassifyHtml() {
    return {
        setClassifySelector: function() {
            let html = `<option value="none">전체상품</option>`;
            CLASSIFYS.forEach(r => {

                html += `
                    <option value="${r.classifyUuid}">${r.classifyName}</option>
                `;
            });
            $("#i_mdash_classify_selector").html(html);
        }
    }
}

function loadItemOptionHtml() {
    return {
        setOptionSelector: function() {
            let html = `<option value="none">전체옵션</option>`;
            OPTIONS.forEach(r => {
                html += `
                    <option value="${r.optionUuid}">${r.optionName}</option>
                `;
            });
            $("#i_mdash_option_selector").html(html);
        }
    }
}

function loadStoreHtml() {
    return {
        setStoreSelector: function() {
            eventStoreHandler().extractUserSelectSotre()
            let html = `<option value="none">전체마켓</option>`;
            EXTRACT_STORE.forEach(r => {

                html += `
                    <option value="${r.itemData.itemStoreType}">${r.itemData.itemStoreName}</option>
                `;
            });
            $("#i_mdash_store_selector").html(html);
        }
    }
}

function eventClassifyHandler() {
    return {
        selectorValueChange: async function(event) {
            let classifyUuid = event.value;
            SELECTED_OPTION = 'none';
            if (classifyUuid == 'none') {
                SELECTED_CLASSIFY = 'none';
                $("#i_mdash_option_selector").html('');
                return;
            }
            SELECTED_CLASSIFY = classifyUuid
            await dataConnect().getItemOptions(classifyUuid);
            loadItemOptionHtml().setOptionSelector();
        }
    }
}

function eventItemOptionHandler() {
    return {
        selectorValueChange: async function(event) {
            let optionUuid = event.value;
            if (optionUuid == 'none') {
                SELECTED_OPTION = 'none';
                return;
            }
            SELECTED_OPTION = optionUuid;
        }
    }
}

function eventStoreHandler() {
    return {
        selectorValueChange: async function(event) {
            let storeType = event.value;
            if (storeType == 'none') {
                SELECTED_STORE = 'none';
            }
            SELECTED_STORE = storeType;
        },
        extractUserSelectSotre: function() {
            // SELLED_ITEMS에서 중복되는 storeType 추출해서 EXARACT_STORE 만듬
            EXTRACT_STORE = SELLED_ITEMS.filter((r, index, self) =>
                self.findIndex(t => t.itemData.itemStoreType === r.itemData.itemStoreType) === index)
        }
    }
}