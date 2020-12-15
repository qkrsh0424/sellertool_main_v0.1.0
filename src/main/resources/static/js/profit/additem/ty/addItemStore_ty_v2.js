function loadStoreHtml() {
    return {
        storeSelectedListLoad: function () {
            let listHtml = ``;
            if (STORE_SELECTED.length === 0) {
                return $("#i_store_selected_list_box").html('');
            }
            STORE_SELECTED.forEach(r => {
                listHtml += `
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
        storeOptionListLoad: function () {
            let html = ``;
            
            STORE_LIST.forEach(r => {
                html += `
                    <span>
                        <button class="btn ty-st-aitem-store-list-btn" id="ty-st-aitem-store-list-btn-${r.storeType}" onclick="eventStoreHandler().addStoreSelect('${r.storeType}','${r.storeName}')">${r.storeName}</button>
                    </span> 
                `;
            });
            $(`#i_store_select_modal_body`).html(html);
        },
    }
}

function eventStoreHandler() {
    return {
        addStoreSelect: function (storeType,storeName) {


            let isSelected = true;
            SELECTED_STORE_MODAL = SELECTED_STORE_MODAL.filter(r=>{
                if(r.storeType === storeType){
                    isSelected = false;
                    $(`#ty-st-aitem-store-list-btn-${storeType}`).removeClass("ty-st-aitem-store-list-btn-active"); 
                }
                return r.storeType != storeType;
            });

            if(isSelected){
                let json = {
                    'id':uuidv4(),
                    'storeName': storeName,
                    'storeType': storeType
                }
                SELECTED_STORE_MODAL.push(json);
                $(`#ty-st-aitem-store-list-btn-${storeType}`).addClass("ty-st-aitem-store-list-btn-active")    
            }
        },
        setStoreSelectedData: function () {
            STORE_SELECTED = SELECTED_STORE_MODAL;
            SELECTED_STORE_MODAL.forEach(r=>{
                $(`#ty-st-aitem-store-list-btn-${r.storeType}`).removeClass("ty-st-aitem-store-list-btn-active");
            })
            SELECTED_STORE_MODAL = [];
            loadStoreHtml().storeSelectedListLoad();
            $("#i_store_select_modal").modal("toggle");
        },
        deleteStoreSelectClick: function (id) {
            STORE_SELECTED = STORE_SELECTED.filter(r => r.id != id);
            loadStoreHtml().storeSelectedListLoad();
        }
    }
}

