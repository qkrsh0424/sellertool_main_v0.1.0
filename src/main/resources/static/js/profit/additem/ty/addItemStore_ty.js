init();
async function init(){
    await getStores();
    loadStoreHtml().storeOptionListLoad()
}

async function getStores() {
    await $.ajax({
        url: '/api/item_store/get/all',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (returnData) {
            STORE_LIST = returnData;
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function loadStoreHtml(){
    return{
        storeSelectedListLoad:function(){
            let listHtml=``;
            if(STORE_SELECTED.length===0){
                return $("#i_store_selected_list_box").html('');
            }
            STORE_SELECTED.forEach(r=>{
                listHtml+= `
                    <li class="ty-st-atime-option-list">
                        <span class="ty-st-atime-option-list-el form-group">${r.storeName}
                        <button class="ty-st-atime-option-list-btn" onclick="eventStoreHandler().deleteStoreSelectClick('${r.id}')">
                        <i class="fas fa-times">
                                <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </i>
                        </button>
                        </span>
                    </li>
                `
            })
            let html = `
                
                    <ul class="ty-st-atime-option-list-ul">
                        ${listHtml}
                    </ul>
                
            `;
            $("#i_store_selected_list_box").html(html);
        },
        storeOptionListLoad:function(){
            let html = `<option value='none'>==직접 선택==</option>`;
            STORE_LIST.forEach(r=>{
                html += `
                    <option value=${r.storeType}>${r.storeName}</option>
                `;
            });
            $(`#i_store_select_el`).html(html);
        },
    }
}

function eventStoreHandler(){
    return{
        addStoreSelect:function(e){
            // console.log(e)
            let selectedType = e.value;
            let json;

            STORE_LIST.forEach(r=>{
                if(r.storeType===selectedType){
                    json = {
                        'id':uuidv4(),
                        'storeName':r.storeName,
                        'storeType':r.storeType
                    }
                }
            })
            STORE_SELECTED.push(json);
            loadStoreHtml().storeSelectedListLoad();
            $(`#i_store_select_el`).val('none');
        },
        deleteStoreSelectClick:function(id){
            STORE_SELECTED = STORE_SELECTED.filter(r=>r.id!=id);
            loadStoreHtml().storeSelectedListLoad();
        }
    }
}