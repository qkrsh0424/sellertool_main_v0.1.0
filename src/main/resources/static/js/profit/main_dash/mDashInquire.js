function loadClassifyHtml(){
    return{
        setClassifySelector: function(){
            let html = `<option value="none">상품명 선택</option>`;
            CLASSIFYS.forEach(r=>{
                html += `
                    <option value="${r.classifyUuid}">${r.classifyName}</option>
                `;
            });
            $("#i_mdash_classify_selector").html(html);
        }
    }
}

function loadItemOptionHtml(){
    return{
        setOptionSelector: function(){
            let html = `<option value="none">상품 옵션 선택</option>`;
            OPTIONS.forEach(r=>{
                html += `
                    <option value="${r.optionUuid}">${r.optionName}</option>
                `;
            });
            $("#i_mdash_option_selector").html(html);
        }
    }
}

function loadStoreHtml(){
    return{
        setStoreSelector: function(){
            console.log(STORES);
            let html = `<option value="none">마켓 선택</option>`;
            STORES.forEach(r=>{
                html += `
                    <option value="${r.storeType}">${r.storeName}</option>
                `;
            });
            $("#i_mdash_store_selector").html(html);
        }
    }
}

function eventClassifyHandler(){
    return{
        selectorValueChange: async function(event){
            let classifyUuid = event.value;
            SELECTED_OPTION = 'none';
            if(classifyUuid=='none'){
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

function eventItemOptionHandler(){
    return{
        selectorValueChange: async function(event){
            let optionUuid = event.value;
            if(optionUuid=='none'){
                SELECTED_OPTION = 'none';
                return;
            }
            SELECTED_OPTION = optionUuid;
        }
    }
}

function eventStoreHandler(){
    return{
        selectorValueChange: async function(event){
            let storeType = event.value;
            if(storeType=='none'){
                SELECTED_STORE='none';
            }
            SELECTED_STORE = storeType;
        }
    }
}