function nrankExpandModuleLoadHtml() {
    return {
        setModuleList: function () {
            return {
                set: function () {
                    let html = ``;
                    MODULES.forEach((r, index) => {
                        let keywordsHtml = ``;
                        r.keywords.forEach(k => {
                            keywordsHtml += `
                                <span class="st-nre-prod-el">${k.keyword}-${k.shopName} <button type="button" class="st-nre-prod-noborder-btn" onclick="nrankExpandModuleEventHandler().deleteKeywordSubmit('${jsonToBase64(k)}')"><i class="fas fa-times"></i></button></span>
                            `;
                        });
                        html +=`
                            <div class="st-nre-container">
                                <div class="st-nre-wrapper">
                                    <div class="st-nre-title">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <span>모듈 ${index + 1}</span>
                                                <button type="button" class="st-nre-prod-noborder-btn" onclick="nrankExpandModuleEventHandler().deleteModuleSubmit('${jsonToBase64(r)}')"><i class="far fa-trash-alt"></i></button>
                                            </div>
                                            <div class="col-sm-6 clearfix">
                                                <button type="button" class="btn btn-outline-primary float-right ml-2" onclick="nrankExpandModuleEventHandler().searchRankSubmit('${jsonToBase64(r)}')">조회</button>
                                                <button type="button" class="btn btn-outline-secondary float-right ml-2" onclick="nrankExpandModuleEventHandler().addKeywordModal().open('${r.id}')">키워드 추가</button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="st-nre-content">
                                        ${keywordsHtml}
                                    </div>
                                </div>
                            </div>
                        `;

                    });
                    html+=`
                        <div class="text-center">
                            <p class="text-info ml-3" style="font-size:12px; font-weight:600;">* 모듈 1개당 키워드 등록 개수는 최대 5개이며, 현재는 3개의 모듈 생성만 지원합니다.</p>
                            <button class="st-nre-circle-btn" onclick="nrankExpandModuleEventHandler().addModuleClick()"><i class="fas fa-plus"></i></button>
                        </div>
                    `
                    $('div[st-area=module]').html(html);
                }
            }
        },
        setModuleLoading: function () {
            return {
                set: function () {
                    let html = ``;
                    MODULES.forEach((r, index) => {
                        let keywordsHtml = ``;
                        r.keywords.forEach(k => {
                            keywordsHtml += `
                                <span class="st-nre-prod-el">${k.keyword}-${k.shopName} <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></span>
                            `;
                        });
                        html +=`
                            <div class="st-nre-container">
                                <div class="st-nre-wrapper">
                                    <div class="st-nre-title">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <span>모듈 ${index + 1}</span>
                                                <button type="button" class="st-nre-prod-noborder-btn"> <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>
                                            </div>
                                            <div class="col-sm-6 clearfix">
                                                <button type="button" class="btn btn-outline-primary float-right ml-2">조회 <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>
                                                <button type="button" class="btn btn-outline-secondary float-right ml-2">키워드 추가 <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="st-nre-content">
                                        ${keywordsHtml}
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    html+=`
                        <div class="st-loader1">
                            <div class="st-loaderBar1"></div>
                        </div>
                        <h5 class="text-center">조회 중입니다. 잠시만 기다려주세요.</h5>
                    `
                    $('div[st-area=module]').html(html);
                }
            }
        }
    }
}

function nrankExpandModuleEventHandler() {
    return {
        addModuleClick: async function () {
            await nrankExpandDataConnect().addModule();
            await nrankExpandDataConnect().getModules();
            nrankExpandModuleLoadHtml().setModuleList().set();
        },
        addKeywordModal: function () {
            return {
                open: function (moduleId) {
                    $('#i_st_rne_add_keyword_modal').modal('show');
                    SELECTED_MODULE = MODULES.filter(r => r.id == moduleId)[0];
                },
                close: function () {
                    $('#i_st_rne_add_keyword_modal').modal('hide');
                    SELECTED_MODULE = {};
                },
                enter: function () {
                    if (window.event.keyCode == 13) {
                        nrankExpandModuleEventHandler().addKeywordSubmit();
                    }
                }
            }
        },
        addKeywordSubmit: async function () {
            let keyword = $('#i_st_rne_keyword_input_el').val();
            let shopName = $('#i_st_rne_shop_name_input_el').val();
            let moduleId = SELECTED_MODULE.id;
            if (keyword == '') {
                alert('키워드를 입력해 주세요.');
                $('#i_st_rne_keyword_input_el').focus();
                return;
            }
            if (shopName == '') {
                alert('스토어명을 입력해 주세요.');
                $('#i_st_rne_shop_name_input_el').focus();
                return;
            }
            await nrankExpandDataConnect().addKeyword(moduleId, keyword, shopName);
            await nrankExpandDataConnect().getModules();
            nrankExpandModuleLoadHtml().setModuleList().set();
            nrankExpandModuleEventHandler().addKeywordModal().close();
        },
        deleteModuleSubmit: async function (moduleDataBase64) {
            let moduleJson = base64ToJson(moduleDataBase64);
            await nrankExpandDataConnect().deleteModule(moduleJson);
            await nrankExpandDataConnect().getModules();
            nrankExpandModuleLoadHtml().setModuleList().set();
        },
        deleteKeywordSubmit: async function (keywordDataBase64) {
            let keywordDataJson = base64ToJson(keywordDataBase64);
            await nrankExpandDataConnect().deleteKeyword(keywordDataJson);
            await nrankExpandDataConnect().getModules();
            nrankExpandModuleLoadHtml().setModuleList().set();
        },
        searchRankSubmit: async function (moduleDataBase64) {
            let moduleJson = base64ToJson(moduleDataBase64);
            await nrankExpandDataConnect().getRankData(moduleJson);
            await nrankExpandDataConnect().getModules();
            nrankExpandModuleLoadHtml().setModuleList().set();
            nRankExpandResultLoadHtml().loadNewResult().set();
        }
    }
}