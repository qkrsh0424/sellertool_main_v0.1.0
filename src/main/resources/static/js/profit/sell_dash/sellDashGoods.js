function goodsDataConnect(){
    return{
        items: async function(){
            await $.ajax({
                url:'/api/item_manager/search/regitem/all',
                type:'GET',
                contentType:'application/json',
                dataType:'json',
                success: function(returnData){
                    if(returnData.message==='SUCCESS'){
                        console.log(returnData);
                        SEARCH_EL_ITEMS = returnData.data;
                    }
                },
                error: function(error){
                    console.log(error);
                }
            })
        },
        setSellItemsAndGet: async function(){
            let data = JSON.stringify({
                'items':SELECTED_SEARCH_ITEMS,
                'sellDate': DATE_SETTING.sellDate
            });
            await $.ajax({
                url:'/api/item_manager/selldash/reg',
                type:'POST',
                contentType:'application/json',
                dataType:'json',
                data:data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-CSRF-Token", $("#i_st_sd_csrf").val());
                },
                success: function(returnData){
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : SDGSG500");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDGSG");
                        return window.location.reload();
                    }
                },
                error: function(error){
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
        getClassifys: async function(){
            await $.ajax({
                url:'/api/item_manager/search/classifys/byuser',
                type:'GET',
                contentType:'application/json',
                dataType:'json',
                success: function(returnData){
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
                error: function(error){
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
        getOptions: async function(classifyUuid){
            await $.ajax({
                url:'/api/item_manager/search/options/byclassify',
                type:'GET',
                contentType:'application/json',
                dataType:'json',
                data:{
                    'classifyUuid':classifyUuid
                },
                success: function(returnData){
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
                error: function(error){
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

function loadGoodsHtml(){
    return{
        selectedItemsTag: function(){
            let html = ``;
            // if(SELECTED_SEARCH_ITEMS.length===0){
            //     return $("#i_seach_itemlist_box").html();
            // }
            SELECTED_SEARCH_ITEMS.forEach(r=>{
                html += `
                    <span class="st-sd-batch-selected-item-wrapper">
                        ${r.label}
                        <button type="button" class="btn" onclick="eventGoodsHandler().deleteSelectedSearchItem('${r.index}')">
                            <i class="fas fa-times"></i>
                        </button>
                    </span>
                `;
            });
            $("#i_seach_itemlist_box").html(html);
            
        },
        sellItemsHtml: function(){
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
        itemRegisterBatchModalSetHtml: function(){
            let modalHeaderHtml = `
                <div class="modal-header">
                    <h5 class="modal-title" id="i_sd_batch_input_modalLabel">등록된 상품 찾기</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;

            let modalBodyHtml = `
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="i_sd_registered_classify_list">나의 상품 목록</label>
                                <select id="i_sd_registered_classify_list" class="form-control" onchange="eventGoodsHandler().classifySelectOnChange(this)">
                                
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="i_sd_registered_option_list">옵션 목록</label>
                                <select id="i_sd_registered_option_list" class="form-control" onchange="eventGoodsHandler().optionSelectOnChange(this)">
                                
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div class="">
                        <p>등록 가능 상품 목록</p>
                        <div class="form-group" id="i_sd_registered_item_list">
                                    
                        </div>
                    </div>
                    
                    <hr/>
                    <div>
                        <p>선택됨</p>
                        <div class="form-group" id="i_sd_registered_selected_item_list">
                                    
                        </div>
                    </div>
                    
                </div>
            `;

            let modalFooterHtml = `
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="eventGoodsHandler().itemRegisterBatchModalSubmitClick()">적용</button>
                    <button type="button" class="btn btn-primary" onclick="eventItemHandler().modalClose()">닫기</button>
                </div>
            `;
            let html = `
                <div class="modal-content">
                    ${modalHeaderHtml}
                    ${modalBodyHtml}
                    ${modalFooterHtml}
                </div>
            `;
            $("#i_sd_batch_modal_box").html(html);
            this.itemRegisterBatchModalSetSelectHtml().classifys();
        },
        itemRegisterBatchModalSetSelectHtml(){
            return{
                classifys: function(){
                    let html = `<option value="none">--선택--</option>`;
                    CLASSIFYS.forEach(r=>{
                        html += `
                            <option value=${r.classifyUuid}>${r.classifyName}</option>
                        `;
                    })
                    $("#i_sd_registered_classify_list").html(html);
                },
                options: function(){
                    let html = `<option value="none">--선택--</option>`;
                    OPTIONS.forEach(r=>{
                        html += `
                            <option value=${r.optionUuid}>${r.optionName}</option>
                        `;
                    })
                    $("#i_sd_registered_option_list").html(html);
                },
                items: function(items){
                    let html = ``;
                    items.forEach(r=>{
                        html += `
                            <button type="button" class="btn btn-outline-dark" onclick="eventGoodsHandler().batchItemSelectedClick('${jsonToBase64(r)}')">${r.itemName}(${r.storeName})</button>
                        `;
                    })
                    $("#i_sd_registered_item_list").html(html);
                },
                selectedItemList: function(){
                    let html = ``;
                    BATCH_ITEM_SELECTED.forEach(r=>{
                        html+=`
                            <span class="st-sd-batch-selected-item-wrapper">
                                ${r.itemName}(${r.storeName})
                                <button type="button" class="btn" onclick="eventGoodsHandler().batchItemSelectedDeleteClick('${r.index}')">
                                    <i class="fas fa-times"></i>
                                </button>
                            </span>
                        `;
                    })
                    $("#i_sd_registered_selected_item_list").html(html);
                }
            }
        }
    }
}

function eventGoodsHandler(){
    return{
        makeAutoComplete: function(){
            let val = [];
            SEARCH_EL_ITEMS.forEach(r=>{
                val.push({
                    'label':`${r.itemName}(${r.storeName})`,
                    'value':`${r.itemName}(${r.storeName})`,
                    'index':uuidv4(),
                    'itemId':r.itemId,
                    'classifyUuid':r.classifyUuid,
                    'optionUuid':r.optionUuid,
                    'itemName':r.itemName,
                    'storeType':r.storeType,
                    'storeName':r.storeName,
                });
            })
            $("#i_search_input").autocomplete({  //오토 컴플릿트 시작
                source : val,    // source 는 자동 완성 대상
                select : function(event, ui) {    //아이템 선택시
                    console.log(ui.item);
                    console.log(ui);
                    eventGoodsHandler().addSelectedItem(ui.item);
                    ui.item.value='';
                },
                focus : function(event, ui) {    //포커스 가면
                    return false;//한글 에러 잡기용도로 사용됨
                },
                minLength: 1,// 최소 글자수
                autoFocus: true, //첫번째 항목 자동 포커스 기본값 false
                classes: {
                    "ui-autocomplete": "highlight"
                },
                delay: 100,    //검색창에 글자 써지고 나서 autocomplete 창 뜰 때 까지 딜레이 시간(ms)
        //            disabled: true, //자동완성 기능 끄기
                position: { my : "right top", at: "right bottom" },
                close : function(event){    //자동완성창 닫아질때 호출
                    // console.log(event);
                }
            })
        },
        addSelectedItem: function(data){
            SELECTED_SEARCH_ITEMS.push(data);
            loadGoodsHtml().selectedItemsTag();
        },
        addSellItemsClick: async function(){
            await goodsDataConnect().setSellItemsAndGet();
            eventItemHandler().itemSearchClick();
        },
        deleteSelectedSearchItem: function(index){
            SELECTED_SEARCH_ITEMS = SELECTED_SEARCH_ITEMS.filter(r=>r.index!=index);
            loadGoodsHtml().selectedItemsTag();
        },
        itemRegisterBatchModalOpen: async function(){
            BATCH_ITEM_SELECTED = [];
            await goodsDataConnect().getClassifys();
            loadGoodsHtml().itemRegisterBatchModalSetHtml();
            $("#i_sd_batch_input_modal").modal('show');
        },
        classifySelectOnChange: async function(event){
            let classifyUuid = event.value;
            if(classifyUuid == 'none'){
                $("#i_sd_registered_option_list").html('');
                $("#i_sd_registered_item_list").html('');
                return;
            }
            await goodsDataConnect().getOptions(classifyUuid);
            loadGoodsHtml().itemRegisterBatchModalSetSelectHtml().options();
        },
        optionSelectOnChange: function(event){
            let optionUuid = event.value;
            if(optionUuid=='none'){
                $("#i_sd_registered_item_list").html('');
                return;
            }
            let batchItems = SEARCH_EL_ITEMS.filter(r=>r.optionUuid===optionUuid);
            loadGoodsHtml().itemRegisterBatchModalSetSelectHtml().items(batchItems);
        },
        batchItemSelectedClick: function(data){
            let item = base64ToJson(data);
            if(BATCH_ITEM_SELECTED.length>=20){
                return;
            }
            let json = {
                'label':`${item.itemName}(${item.storeName})`,
                'value':`${item.itemName}(${item.storeName})`,
                'index':uuidv4(),
                'itemId':item.itemId,
                'classifyUuid':item.classifyUuid,
                'optionUuid':item.optionUuid,
                'itemName':item.itemName,
                'storeType':item.storeType,
                'storeName':item.storeName,
            }
            BATCH_ITEM_SELECTED.push(json);
            loadGoodsHtml().itemRegisterBatchModalSetSelectHtml().selectedItemList();
        },
        batchItemSelectedDeleteClick: function(index){
            BATCH_ITEM_SELECTED = BATCH_ITEM_SELECTED.filter(r=>r.index!=index);
            loadGoodsHtml().itemRegisterBatchModalSetSelectHtml().selectedItemList();
        },
        itemRegisterBatchModalSubmitClick: function(){
            BATCH_ITEM_SELECTED.forEach(r=>{
                SELECTED_SEARCH_ITEMS.push(r);
            });
            BATCH_ITEM_SELECTED=[];
            loadGoodsHtml().selectedItemsTag();
            $("#i_sd_batch_input_modal").modal('hide');
        }

    }
}