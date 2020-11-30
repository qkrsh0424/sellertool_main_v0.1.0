function loadCategoryHtml(){
    return{
        setCategoyBreadcrumb: function(){
            let category = SELECTED_CLASSIFY.category;
            let breadcrumbHtml = ``;
            if(category.category1Id!==0){
                breadcrumbHtml+=`${category.category1Name}`
            }
            if(category.category2Id!==0){
                breadcrumbHtml+=` > ${category.category2Name}`
            }
            if(category.category3Id!==0){
                breadcrumbHtml+=` > ${category.category3Name}`
            }
            if(category.category4Id!==0){
                breadcrumbHtml+=` > ${category.category4Name}`
            }
            let html =`
                <div class="st-mitem-wrapper">
                    <div class="st-mitem-box">
                        <div class="row">
                            <div class="form-group col-sm-8">
                                <div class="st-mitem-breadcrumb">
                                    <span>카테고리 구성 : </span><span id="i_mitem_breadcrumb_list">${breadcrumbHtml}</span>
                                </div>
                            </div>
                            <div class="form-group col-sm-4" id="i_mitem_category_update_button_group">
                                <button type="type" class="btn btn-block btn-outline-primary" onclick="eventCategoryHandler().categoryUpdateBtnClick().openUpdate()">카테고리 재설정</button>
                            </div>
                        </div>
                        <div id="i_mitem_category_list">
                        </div>
                    </div>
                    
                </div>
            `;
            return{
                set: function(){ return $("#i_mitem_category_breadcrumb").html(html) },
                clear: function() { return $("#i_mitem_category_breadcrumb").html('') }
            }
        },
        setCategoryList: function(){
            let html=`
                <div class="st-mitem-content-box">
                    <div class="st-mitem-category-wrapper">
                        <div class="row">
                            <div class="col-sm-3 mt-1 mb-1 st-mitem-category-box">
                                <label class="st-mitem-required-text">*카테고리1 (필수)</label>
                                <div id="i_mitem_category1_list" class="st-mitem-category-list-box">

                                </div>
                            </div>
                            <div class="col-sm-3 mt-1 mb-1 st-mitem-category-box">
                                <label class="st-mitem-required-text">*카테고리2 (필수)</label>
                                <div id="i_mitem_category2_list" class="st-mitem-category-list-box">

                                </div>
                            </div>
                            <div class="col-sm-3 mt-1 mb-1 st-mitem-category-box">
                                <label>카테고리3 (선택)</label>
                                <div id="i_mitem_category3_list" class="st-mitem-category-list-box">

                                </div>
                            </div>
                            <div class="col-sm-3 mt-1 mb-1 st-mitem-category-box">
                                <label>카테고리4 (선택)</label>
                                <div id="i_mitem_category4_list" class="st-mitem-category-list-box">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            return {
                set: function(){
                    $("#i_mitem_category_list").html(html);
                },
                clear: function(){
                    $("#i_mitem_category_list").html('');
                }
            }
        },
        setCategoryEls: function(){
            return{
                category1: function(){
                    let html = ``;
                    CATEGORY1.forEach(r => {
                        html += `
                            <button type="button" id="category1Btn_${r.id}" class="btn btn-lg btn-block" onclick="eventCategoryHandler().categoryElClick().category1('${r.id}','${r.name}')">${r.name}</button>
                        `;
                    });
                    $("#i_mitem_category1_list").html(html);
                },
                category2: function () {
                    let html = ``;
                    CATEGORY2.forEach(r => {
                        html += `
                            <button type="button" id="category2Btn_${r.id}" class="btn btn-lg btn-block" onclick="eventCategoryHandler().categoryElClick().category2('${r.id}','${r.name}')">${r.name}</button>
                        `;
                    });
                    $("#i_mitem_category2_list").html(html);
                },
                category3: function(){
                    let html = ``;
                    CATEGORY3.forEach(r => {
                        html += `
                            <button type="button" id="category3Btn_${r.id}" class="btn btn-lg btn-block" onclick="eventCategoryHandler().categoryElClick().category3('${r.id}','${r.name}')">${r.name}</button>
                        `;
                    });
                    $("#i_mitem_category3_list").html(html);
                },
                category4: function(){
                    let html = ``;
                    CATEGORY4.forEach(r => {
                        html += `
                            <button type="button" id="category4Btn_${r.id}" class="btn btn-lg btn-block" onclick="eventCategoryHandler().categoryElClick().category4('${r.id}','${r.name}')">${r.name}</button>
                        `;
                    });
                    $("#i_mitem_category4_list").html(html);
                }
            }
        },
        setCategoryUpdateBtnGroup: function(){
            return{
                setSaveAndClose: function(){
                    let html = `
                        <div class="row">
                            <div class="col-sm-6 form-group">
                                <button type="type" class="btn btn-block btn-outline-danger" onclick="eventCategoryHandler().categoryUpdateBtnClick().closeUpdate()">취소하기</button>
                            </div>
                            <div class="col-sm-6 form-group">
                                <button type="type" class="btn btn-block btn-outline-success" onclick="eventCategoryHandler().categoryUpdateBtnClick().saveUpdate()">저장하기</button>
                            </div>
                        </div>
                        
                    `;
                    $("#i_mitem_category_update_button_group").html(html);
                },
                setOpen: function(){
                    let html = `
                        <button type="type" class="btn btn-block btn-outline-primary" onclick="eventCategoryHandler().categoryUpdateBtnClick().openUpdate()">카테고리 재설정</button>
                    `;
                    $("#i_mitem_category_update_button_group").html(html);
                }
            }
        }
    }
}

function eventCategoryHandler(){
    return{
        categoryUpdateBtnClick: function(){
            return{
                openUpdate: async function(){
                    loadCategoryHtml().setCategoryUpdateBtnGroup().setSaveAndClose();
                    $("#i_mitem_breadcrumb_list").html('');
                    loadCategoryHtml().setCategoryList().set();
                    await dataConnect().getCategorys().getCategory1();
                    loadCategoryHtml().setCategoryEls().category1();
                },
                saveUpdate: function(){
                    console.log(SELECTED_CATEGORY);
                    if(SELECTED_CATEGORY.category1Id==0 | SELECTED_CATEGORY.category2Id==0){
                        alert("카테고리1과 카테고리2는 필수 선택입니다.");
                        return;
                    }
                    dataConnect().updateCategoryData();
                },
                closeUpdate: function(){
                    loadCategoryHtml().setCategoyBreadcrumb().set();
                    SELECTED_CATEGORY.category1Id = 0;
                    SELECTED_CATEGORY.category1Name = '';
                    SELECTED_CATEGORY.category2Id = 0;
                    SELECTED_CATEGORY.category2Name = '';
                    SELECTED_CATEGORY.category3Id = 0;
                    SELECTED_CATEGORY.category3Name = '';
                    SELECTED_CATEGORY.category4Id = 0;
                    SELECTED_CATEGORY.category4Name = '';
                }
            }
        },
        categoryElClick: function(){
            return {
                category1: async function(id, name){
                    SELECTED_CATEGORY.category1Id = id;
                    SELECTED_CATEGORY.category1Name = name;
                    SELECTED_CATEGORY.category2Id = 0;
                    SELECTED_CATEGORY.category2Name = '';
                    SELECTED_CATEGORY.category3Id = 0;
                    SELECTED_CATEGORY.category3Name = '';
                    SELECTED_CATEGORY.category4Id = 0;
                    SELECTED_CATEGORY.category4Name = '';

                    $("#i_mitem_category3_list").html('');
                    $("#i_mitem_category4_list").html('');
                    loadCategoryHtml().setCategoryEls().category1();
                    $(`#category1Btn_${id}`).css('background', '#1d5a8d');
                    $(`#category1Btn_${id}`).css('color', 'white');
                    await dataConnect().getCategorys().getCategory2();
                    loadCategoryHtml().setCategoryEls().category2();
                },
                category2: async function (id, name) {
                    SELECTED_CATEGORY.category2Id = id;
                    SELECTED_CATEGORY.category2Name = name;
                    SELECTED_CATEGORY.category3Id = 0;
                    SELECTED_CATEGORY.category3Name = '';
                    SELECTED_CATEGORY.category4Id = 0;
                    SELECTED_CATEGORY.category4Name = '';
        
                    $("#i_mitem_category4_list").html('');
                    loadCategoryHtml().setCategoryEls().category2();
                    $(`#category2Btn_${id}`).css('background', '#1d5a8d');
                    $(`#category2Btn_${id}`).css('color', 'white');
                    await dataConnect().getCategorys().getCategory3();
                    loadCategoryHtml().setCategoryEls().category3();
                },
                category3: async function(id, name){
                    SELECTED_CATEGORY.category3Id = id;
                    SELECTED_CATEGORY.category3Name = name;
                    SELECTED_CATEGORY.category4Id = 0;
                    SELECTED_CATEGORY.category4Name = '';
        
                    loadCategoryHtml().setCategoryEls().category3();
                    $(`#category3Btn_${id}`).css('background', '#1d5a8d');
                    $(`#category3Btn_${id}`).css('color', 'white');

                    await dataConnect().getCategorys().getCategory4();
                    loadCategoryHtml().setCategoryEls().category4();
                },
                category4: async function(id, name){
                    SELECTED_CATEGORY.category4Id = id;
                    SELECTED_CATEGORY.category4Name = name;
        
                    loadCategoryHtml().setCategoryEls().category4();
                    $(`#category4Btn_${id}`).css('background', '#1d5a8d');
                    $(`#category4Btn_${id}`).css('color', 'white');
                }
            }
        }
    }
}