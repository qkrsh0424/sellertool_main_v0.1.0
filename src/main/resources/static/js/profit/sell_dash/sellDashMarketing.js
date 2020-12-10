function loadMarketingHtml() {
    return{
        setMarketingModalContent: function(){
            let modalHeaderHtml = `
                <div class="modal-header">
                    <h5 class="modal-title" id="i_sd_batch_input_modalLabel">마케팅 비용 등록</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;


            let modalBodyHtml = `
                <div class="modal-body">
                    <div class="st-sd-marketing-select-strategy form-group" st-mkc-html-target="modalBody_btn_group">
                        <button type="button" st-mkc-html-target="modalBody_btn_1" class="btn btn-outline-dark m-1" onclick="eventMarketingHandler().selectStrategyClick().classify()">상품명</button>
                        <button type="button" st-mkc-html-target="modalBody_btn_2" class="btn btn-outline-dark m-1" onclick="eventMarketingHandler().selectStrategyClick().classify_store()">상품명-마켓명</button>
                        <button type="button" st-mkc-html-target="modalBody_btn_3" class="btn btn-outline-dark m-1" onclick="eventMarketingHandler().selectStrategyClick().classify_option()">상품명-옵션명</button>
                        <button type="button" st-mkc-html-target="modalBody_btn_4" class="btn btn-outline-dark m-1" onclick="eventMarketingHandler().selectStrategyClick().classify_option_store()">상품명-옵션명-마켓명</button>
                    </div>
                    <input hidden id="i_sd_marketing_type_input" value="none">
                    <div id="st-sd-marketing-select-detail-box">
                    </div>
                </div>
            `;

            let modalFooterHtml = `
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="eventMarketingHandler().marketingModalSubmitClick()">등록 | 저장</button>
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
        },
        setSelectDetailBox: function(){
            return{
                classify: function(){
                    let optionHtml = ``;
                    let formHtml = ``;
                    let html = ``;

                    var classifySet = new Set();

                    SELL_ITEMS.forEach(r=>{
                        if(classifySet.has(r.itemData.classifyUuid)){
                            return;
                        }else{
                            classifySet.add(r.itemData.classifyUuid);
                            optionHtml += `
                                <option value="${r.itemData.classifyUuid}">${r.itemData.classifyName}</option>
                            `;
                        }
                    });

                    formHtml = `
                        <label for="i_sd_marketing_ads_cost_input">광고 비용</label>
                        <input type="number" id="i_sd_marketing_ads_cost_input" class="form-control" value="0"></input>
                    `;

                    html = `
                        <div>
                            <div class="form-group">
                                <select class="form-control">
                                    ${optionHtml}
                                </select>
                            </div>
                            <div class="form-group">
                                ${formHtml}
                            </div>
                        </div>
                    `;
                    $("#st-sd-marketing-select-detail-box").html(html);

                },
                classify_store: function(){
                    let optionHtml = ``;
                    let formHtml = ``;
                    let html = ``;

                    var classify_storeSet = new Set();
                    SELL_ITEMS.forEach(r=>{
                        if(classify_storeSet.has(`${r.itemData.classifyUuid} ${r.itemData.itemStoreType}`)){
                            return;
                        }else{
                            classify_storeSet.add(`${r.itemData.classifyUuid} ${r.itemData.itemStoreType}`);
                            optionHtml += `
                                <option value="${r.itemData.classifyUuid} ${r.itemData.itemStoreType}">${r.itemData.classifyName}-${r.itemData.itemStoreName}</option>
                            `;
                        }
                        
                    });

                    formHtml = `
                        <label for="i_sd_marketing_ads_cost_input">광고 비용</label>
                        <input type="number" id="i_sd_marketing_ads_cost_input" class="form-control" value="0"></input>
                    `;

                    html = `
                        <div>
                            <div class="form-group">
                                <select class="form-control">
                                    ${optionHtml}
                                </select>
                            </div>
                            <div class="form-group">
                                ${formHtml}
                            </div>
                        </div>
                    `;
                    $("#st-sd-marketing-select-detail-box").html(html);
                },
                classify_option: function(){
                    let optionHtml = ``;
                    let formHtml = ``;
                    let html = ``;

                    var classify_optionSet = new Set();
                    SELL_ITEMS.forEach(r=>{
                        if(classify_optionSet.has(`${r.itemData.classifyUuid} ${r.itemData.optionUuid}`)){
                            return;
                        }else{
                            classify_optionSet.add(`${r.itemData.classifyUuid} ${r.itemData.optionUuid}`);
                            optionHtml += `
                                <option value="${r.itemData.classifyUuid} ${r.itemData.optionUuid}">${r.itemData.classifyName}-${r.itemData.optionName}</option>
                            `;
                        }
                        
                    });

                    formHtml = `
                        <label for="i_sd_marketing_ads_cost_input">광고 비용</label>
                        <input type="number" id="i_sd_marketing_ads_cost_input" class="form-control" value="0"></input>
                    `;

                    html = `
                        <div>
                            <div class="form-group">
                                <select class="form-control">
                                    ${optionHtml}
                                </select>
                            </div>
                            <div class="form-group">
                                ${formHtml}
                            </div>
                        </div>
                    `;
                    $("#st-sd-marketing-select-detail-box").html(html);
                },
                classify_option_store: function(){
                    let optionHtml = ``;
                    let formHtml = ``;
                    let html = ``;

                    var classify_optionSet = new Set();
                    SELL_ITEMS.forEach(r=>{
                        if(classify_optionSet.has(`${r.itemData.classifyUuid} ${r.itemData.optionUuid} ${r.itemData.itemStoreType}`)){
                            return;
                        }else{
                            classify_optionSet.add(`${r.itemData.classifyUuid} ${r.itemData.optionUuid} ${r.itemData.itemStoreType}`);
                            optionHtml += `
                                <option value="${r.itemData.classifyUuid} ${r.itemData.optionUuid} ${r.itemData.itemStoreType}">${r.itemData.itemName}-${r.itemData.itemStoreName}</option>
                            `;
                        }
                        
                    });

                    formHtml = `
                        <label for="i_sd_marketing_ads_cost_input">광고 비용</label>
                        <input type="number" id="i_sd_marketing_ads_cost_input" class="form-control" value="0"></input>
                    `;

                    html = `
                        <div>
                            <div class="form-group">
                                <select class="form-control">
                                    ${optionHtml}
                                </select>
                            </div>
                            <div class="form-group">
                                ${formHtml}
                            </div>
                        </div>
                    `;
                    $("#st-sd-marketing-select-detail-box").html(html);
                }
            }
        },
        btnSelected: function(){
            return{
                classify: function(){
                    let btnGroup = $("div[st-mkc-html-target=modalBody_btn_group]");
                    btnGroup.children().removeClass('st-sd-outline-btn-selected');
                    btnGroup.children("button[st-mkc-html-target=modalBody_btn_1]").addClass('st-sd-outline-btn-selected');
                },
                classify_store: function(){
                    let btnGroup = $("div[st-mkc-html-target=modalBody_btn_group]");
                    btnGroup.children().removeClass('st-sd-outline-btn-selected');
                    btnGroup.children("button[st-mkc-html-target=modalBody_btn_2]").addClass('st-sd-outline-btn-selected');
                },
                classify_option: function(){
                    let btnGroup = $("div[st-mkc-html-target=modalBody_btn_group]");
                    btnGroup.children().removeClass('st-sd-outline-btn-selected');
                    btnGroup.children("button[st-mkc-html-target=modalBody_btn_3]").addClass('st-sd-outline-btn-selected');
                },
                classify_option_store: function(){
                    let btnGroup = $("div[st-mkc-html-target=modalBody_btn_group]");
                    btnGroup.children().removeClass('st-sd-outline-btn-selected');
                    btnGroup.children("button[st-mkc-html-target=modalBody_btn_4]").addClass('st-sd-outline-btn-selected');
                }
            }
        },
        tableHtml: function(){
            return{
                set: function(){
                    let bodyListHtml = ``;
                    MARKETING_COST_LIST.forEach((r,index)=>{
                        let typeStr = '';
                        let nameStr = '';
                        switch(r.mkcType){
                            case 'TYPE_CLASSIFY_ONLY':
                                typeStr = '상품명';
                                nameStr = r.classifyName;
                                break;
                            case 'TYPE_CLASSIFY_STORE':
                                typeStr = '상품명-마켓명';
                                nameStr = `${r.classifyName}-<span class="text-primary">${r.storeName}</span>`;
                                break;
                            case 'TYPE_CLASSIFY_OPTION':
                                typeStr = '상품명-옵션명';
                                nameStr = `${r.classifyName}-<span class="text-success">${r.optionName}</span>`;
                                break;
                            case 'TYPE_CLASSIFY_OPTION_STORE':
                                typeStr = '상품명-옵션명-마켓명(상세 상품)';
                                nameStr = `${r.classifyName}-<span class="text-success">${r.optionName}</span>-<span class="text-primary">${r.storeName}</span>`;
                                break;
                        }
                        bodyListHtml+=`
                            <tr>
                                <td scope="row">${index + 1}</td>
                                <td><button type="button" class="btn btn-danger btn-block" onclick="eventMarketingHandler().deleteClick('${r.mkcId}')">삭제</button></td>
                                <td class="text-info">${typeStr}</td>
                                <td>${nameStr}</td>
                                <td>${numberWithCommas(r.adsCost)}</td>
                            </tr>
                        `;
                    });
                    let html = `
                        <table class="table overflow-table text-center table-hover ty-st-sd-sell-item-table">
                            <thead class="">
                                <tr>
                                    <th scope="col" width="50" >#</th>
                                    <th scope="col" width="80">컨트롤</th>
                                    <th scope="col" width="200">형식</th>
                                    <th scope="col" width="150" >상품명 | 옵션명 | 마켓명</th>
                                    <th scope="col" width="150" >광고 비용</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${bodyListHtml}
                            </tbody>
                        </table>
                    `;
                    $("#i_marketing_cost_list").html(html);
                }
            }
        }
    }
    
}

function eventMarketingHandler() {
    return {
        marketingModalOpen: function(){
            if(SELL_ITEMS.length<=0){
                alert('마케팅 비용을 등록하시려면 판매 상품을 먼저 등록해야 합니다.');
                return;
            }
            loadMarketingHtml().setMarketingModalContent(); 
            $("#i_sd_batch_input_modal").modal('show');
        },
        selectStrategyClick: function(){
            return{
                classify:function(){
                    $("#i_sd_marketing_type_input").val('TYPE_CLASSIFY_ONLY');
                    loadMarketingHtml().btnSelected().classify();
                    loadMarketingHtml().setSelectDetailBox().classify();
                },
                classify_store: function(){
                    $("#i_sd_marketing_type_input").val('TYPE_CLASSIFY_STORE');
                    loadMarketingHtml().btnSelected().classify_store();
                    loadMarketingHtml().setSelectDetailBox().classify_store();
                },
                classify_option: function(){
                    $("#i_sd_marketing_type_input").val('TYPE_CLASSIFY_OPTION');
                    loadMarketingHtml().btnSelected().classify_option();
                    loadMarketingHtml().setSelectDetailBox().classify_option();
                },
                classify_option_store: function(){
                    $("#i_sd_marketing_type_input").val('TYPE_CLASSIFY_OPTION_STORE');
                    loadMarketingHtml().btnSelected().classify_option_store();
                    loadMarketingHtml().setSelectDetailBox().classify_option_store();
                }
            }
        },
        marketingModalSubmitClick: async function(){
            
            let type = $('#i_sd_marketing_type_input').val();
            let adsCost = $("#i_sd_marketing_ads_cost_input").val();
            let value = $("#st-sd-marketing-select-detail-box select").val();
            if(type == null || type == undefined || type == 'none'){
                alert('타입을 먼저 선택해 주세요.');
                return;
            }
            if(!isInt(adsCost)){
                alert('비용에는 정수 값만 허용됩니다.');
                $("#i_sd_marketing_ads_cost_input").focus();
                return;
            }
            if(value==null || value==undefined || value==''){
                alert('등록 상품을 선택해 주세요.');
                return;
            }
            let valueArr = value.split(' ');
            let classifyUuid = '';
            let classifyName = '';
            let optionUuid = '';
            let optionName = '';
            let storeType = '';
            let storeName = '';

            if(adsCost == ''){
                adsCost=0;
            }

            if(type=='TYPE_CLASSIFY_ONLY'){
                classifyUuid = valueArr[0];
                let data = SELL_ITEMS.filter(r=>r.itemData.classifyUuid==classifyUuid)[0];
                classifyName = data.itemData.classifyName;
            }else if(type=='TYPE_CLASSIFY_STORE'){
                classifyUuid = valueArr[0];
                storeType = valueArr[1]
                let data = SELL_ITEMS.filter(r=>r.itemData.classifyUuid==classifyUuid && r.itemData.itemStoreType==storeType)[0];
                classifyName = data.itemData.classifyName;
                storeName = data.itemData.itemStoreName;
            }else if(type=='TYPE_CLASSIFY_OPTION'){
                classifyUuid = valueArr[0];
                optionUuid = valueArr[1]
                let data = SELL_ITEMS.filter(r=>r.itemData.classifyUuid==classifyUuid && r.itemData.optionUuid==optionUuid)[0];
                classifyName = data.itemData.classifyName;
                optionName = data.itemData.optionName;
                
            }else if(type=='TYPE_CLASSIFY_OPTION_STORE'){
                classifyUuid = valueArr[0];
                optionUuid = valueArr[1];
                storeType = valueArr[2];
                let data = SELL_ITEMS.filter(r=>r.itemData.classifyUuid==classifyUuid && r.itemData.optionUuid==optionUuid && r.itemData.itemStoreType==storeType)[0];
                classifyName = data.itemData.classifyName;
                optionName = data.itemData.optionName;
                storeName = data.itemData.itemStoreName;
            }
            let json = {
                'mkcType':type,
                'mkcRegDate':DATE_SETTING.sellDate,
                'classifyUuid':classifyUuid,
                'classifyName':classifyName,
                'optionUuid':optionUuid,
                'optionName':optionName,
                'storeType':storeType,
                'storeName':storeName,
                'adsCost':adsCost,
            }
            await marketingDataConnect().setMarketingData(json);
            await marketingDataConnect().getMarketingData();
            loadMarketingHtml().tableHtml().set();
            $("#i_sd_batch_input_modal").modal('hide');
        },
        deleteClick: async function(mkcId){
            let data = MARKETING_COST_LIST.filter(r=>r.mkcId==mkcId)[0];
            await marketingDataConnect().deleteMarketingData(data);
            await marketingDataConnect().getMarketingData();
            loadMarketingHtml().tableHtml().set();
        }
    }
}