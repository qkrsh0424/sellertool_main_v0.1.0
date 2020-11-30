function loadClassifyHtml() {
    return {
        setClassifySelect: function () {
            return {
                set: function () {
                    let classifyListHtml = ``;
                    CLASSIFYS.forEach(r => {
                        classifyListHtml += `
                            <span class="st-sd-batch-selected-item-wrapper" id="i_mitem_classify_select_el_box_${r.classifyUuid}">
                                <button class="btn" onclick="eventClassifyHandler().classifyInfoOpenClick('${r.classifyUuid}')">${r.classifyName}</button>
                            </span>
                        `;
                    })
                    let html = `
                        <div class="st-mitem-wrapper">
                            <div class="st-mitem-box">
                                <div class="st-mitem-title-box">
                                    <h4 class="st-mitem-title-el">
                                        상품명 선택
                                    </h4>
                                </div>
                                <div class="st-mitem-content-box">
                                    <div>
                                        ${classifyListHtml}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    $("#i_mitem_classify_selector_box").html(html);
                },
                clear: function () {
                    $("#i_mitem_classify_selector_box").html('');
                }
            }
        },
        setClassifyInfo: function () {
            let html = `
                <div class="st-aitem-wrapper">
                    <div class="st-aitem-box">
                        <div class="st-aitem-title-box">
                            <h4 class="st-aitem-title-el">
                                상품 정보
                                <button type="button" class="btn btn-outline-danger btn-lg float-right" onclick="eventClassifyHandler().classifyDeleteClick('${SELECTED_CLASSIFY.classifyUuid}')">
                                    삭제
                                    <i class="fas fa-trash"></i>
                                </button>
                            </h4>
                        </div>
                        <div class="st-aitem-content-box">
                            <div class="st-aitem-header-title-wrapper">
                                <div class="row">
                                    <div class="form-group col-sm-3">
                                        <label for="i_mitem_info_classify_name" class="st-aitem-required-text">*상품명 (필수)</label>
                                        <div class="input-group mb-3">
                                            <input type="text" class="ty-st-aitem-input form-control" id="i_mitem_info_classify_name" name="i_mitem_info_classify_name" value="${SELECTED_CLASSIFY.classifyName}" disabled>
                                            <div class="input-group-append">
                                                <button class="btn btn-outline-secondary" type="button" id="i_mitem_info_classify_name_fix_btn" onclick="eventClassifyHandler().infoClassifyNameBtnClick().edit()"><i class="fas fa-pen"></i></button>
                                            </div>
                                        </div>
                                        <div class="ty-st-aitem-box-footer">*관리하기 편하신 이름으로 설정해주세요.</div>
                                    </div>
                                    <div class="form-group col-sm-6">
                                        <label for="i_mitem_info_classify_desc">상품 설명 (선택)</label>
                                        <div class="input-group">
                                            <input class="ty-st-aitem-input form-control" id="i_mitem_info_classify_desc" value="${SELECTED_CLASSIFY.classifyDesc}" disabled></input>
                                            <div class="input-group-append">
                                                <button class="btn btn-outline-secondary" type="button" id="i_mitem_info_classify_desc_fix_btn" onclick="eventClassifyHandler().infoClassifyDescBtnClick().edit()"><i class="fas fa-pen"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p>상품 이미지(선택)</p>
                                <div class="row">
                                    <input type="file" name="i_mitem_image_file" id="i_mitem_image_file" onchange="eventClassifyHandler().uploadImage()" accept="image/*" hidden>
                                    ${SELECTED_CLASSIFY.classifyImageUrl == '' ? (
                                        `
                                            <div class="col-auto">
                                                <button type="button" class="st-aitem-image-btn" onclick="eventClassifyHandler().fileUploaderOpen()">
                                                    <svg width="2.5em" height="2.5em" viewBox="0 0 17 16" class="bi bi-image"
                                                        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd"
                                                            d="M14.002 2h-12a1 1 0 0 0-1 1v9l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094L15.002 9.5V3a1 1 0 0 0-1-1zm-12-1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm4 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        `
                                    ):
                                        `
                                            <div class="col-auto">
                                                <img src="${SELECTED_CLASSIFY.classifyImageUrl}" class="st-aitem-image-el"/>   
                                            </div>
                                            <div class="col-sm-2">
                                                <button type="button" class="btn btn-block ty-st-aitem-btn"
                                                    onclick="eventClassifyHandler().fileUploaderOpen()">
                                                    이미지 수정
                                                </button>
                                                <button type="button" class="btn btn-block ty-st-aitem-btn"
                                                    onclick="eventClassifyHandler().deleteImage()">
                                                    이미지 제거
                                                </button>
                                            </div>
                                        `
                                    }
                                </div>
                                <div class="ty-st-aitem-box-footer">
                                    *최대 10MB까지 첨부 가능합니다.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            return {
                set: function(){ return $("#i_mitem_classify_info").html(html); },
                clear: function(){ return $("#i_mitem_classify_info").html(''); }
            }
        },
    }
}

function classifyObjectControl(){
    return{
        updateSelectedClassify: function(){
            return SELECTED_CLASSIFY = CLASSIFYS.filter(r=>r.classifyUuid===SELECTED_CLASSIFY.classifyUuid)[0];
        }
    }
}
function eventClassifyHandler() {
    return{
        classifyInfoOpenClick: async function(classifyUuid){
            loadClassifyHtml().setClassifySelect().set();
            $(`#i_mitem_classify_select_el_box_${classifyUuid}`).css('border','2px solid #f2a057');
            SELECTED_CLASSIFY = CLASSIFYS.filter(r=>r.classifyUuid==classifyUuid)[0];
            loadClassifyHtml().setClassifyInfo().set();
            loadCategoryHtml().setCategoyBreadcrumb().set();
            await dataConnect().getOptions();
            optionObjectControl().selectedOptionFlush();
            loadOptionHtml().setOptionSelect().set();
            loadOptionHtml().setOptionInfoHtml().clear();
            loadItemHtml().setItemsTableHtml().clear();
        },
        classifySelectorChange: async function (event) {
            let classifyUuid = event.value;
            if(classifyUuid == 'none'){
                SELECTED_CLASSIFY = 'none';
                loadClassifyHtml().setClassifyInfo().clear();
                return;
            }
            SELECTED_CLASSIFY = CLASSIFYS.filter(r=>r.classifyUuid==event.value)[0];
            $("#i_mitem_classify_selector").val('none');
            loadClassifyHtml().setClassifyInfo().set();
            loadCategoryHtml().setCategoyBreadcrumb().set();

            await dataConnect().getOptions();
            optionObjectControl().selectedOptionFlush();
            loadOptionHtml().setOptionSelect().set();
            loadOptionHtml().setOptionInfoHtml().clear();
            loadItemHtml().setItemsTableHtml().clear();
        },
        infoClassifyNameBtnClick: function(){
            let inputTag = $("#i_mitem_info_classify_name");
            let fixBtn = $("#i_mitem_info_classify_name_fix_btn");
            return{
                edit: function(){
                    inputTag.attr("disabled",false);
                    fixBtn.attr("onclick","eventClassifyHandler().infoClassifyNameBtnClick().ok()");
                    fixBtn.html('<i class="far fa-check-square"></i>');
                    return;
                },
                ok: async function(){
                    let newName = inputTag.val();
                    if(textIsEmpty(newName) | newName==null){
                        alert('비어있는 상품명은 사용하실수 없습니다.');
                        return;
                    }

                    SELECTED_CLASSIFY.classifyName = newName;
                    await dataConnect().updateClassifyData();
                    await dataConnect().getClassifys();
                    loadClassifyHtml().setClassifySelect().set();
                    $(`#i_mitem_classify_select_el_box_${SELECTED_CLASSIFY.classifyUuid}`).css('border','2px solid #f2a057');

                    inputTag.attr("disabled",true);
                    fixBtn.attr("onclick","eventClassifyHandler().infoClassifyNameBtnClick().edit()");
                    fixBtn.html('<i class="fas fa-pen"></i>');
                    return;
                }
            }
        },
        infoClassifyDescBtnClick: function(){
            let inputTag = $("#i_mitem_info_classify_desc");
            let fixBtn = $("#i_mitem_info_classify_desc_fix_btn");
            return{
                edit: function(){
                    inputTag.attr("disabled",false);
                    fixBtn.attr("onclick","eventClassifyHandler().infoClassifyDescBtnClick().ok()");
                    fixBtn.html('<i class="far fa-check-square"></i>');
                    return;
                },
                ok: async function(){
                    let newDesc = inputTag.val();
                    SELECTED_CLASSIFY.classifyDesc = newDesc;

                    await dataConnect().updateClassifyData();
                    await dataConnect().getClassifys();
                    loadClassifyHtml().setClassifySelect().set();
                    $(`#i_mitem_classify_select_el_box_${SELECTED_CLASSIFY.classifyUuid}`).css('border','2px solid #f2a057');

                    inputTag.attr("disabled",true);
                    fixBtn.attr("onclick","eventClassifyHandler().infoClassifyDescBtnClick().edit()");
                    fixBtn.html('<i class="fas fa-pen"></i>');
                    return;
                }
            }
        },
        categoryUpdateBtnClick: async function(){
            $("#i_mitem_breadcrumb_list").html('');
            loadCategoryHtml().setCategoryList().set();
            await dataConnect().getCategorys().getCategory1();
            loadCategoryHtml().setCategoryEls();
        },
        classifyDeleteClick: function(classifyUuid){
            if(confirm("해당 상품을 삭제하게 되면 옵션 및 상세 상품 데이터들도 함께 삭제 됩니다. 계속 하시겠습니까?")){
                let classify = {};
                CLASSIFYS = CLASSIFYS.filter(r=>{
                    if(r.classifyUuid==classifyUuid){
                        classify = r;
                    }
                    return r.classifyUuid!=classifyUuid;
                });
                loadClassifyHtml().setClassifySelect().set();
                loadClassifyHtml().setClassifyInfo().clear();
                loadCategoryHtml().setCategoyBreadcrumb().clear();
                loadOptionHtml().setOptionSelect().clear();
                loadOptionHtml().setOptionInfoHtml().clear();
                loadItemHtml().setItemsTableHtml().clear();
                dataConnect().deleteClassifyData(classify);
                SELECTED_CLASSIFY = {};
                SELECTED_OPTION = {};
                SELECTED_ITEM = {};
                SELECTED_CATEGORY = {
                    'category1Id':0,
                    'category2Id':0,
                    'category3Id':0,
                    'category4Id':0,
                    'category1Name':'',
                    'category2Name':'',
                    'category3Name':'',
                    'category4Name':''
                }
            }
        },
        fileUploaderOpen: function(){
            $("#i_mitem_image_file").click();
        },
        uploadImage: async function(){
            await dataConnect().uploadImageToS3();
            await dataConnect().updateClassifyData();
            await dataConnect().getClassifys();
            loadClassifyHtml().setClassifySelect().set();
            $(`#i_mitem_classify_select_el_box_${SELECTED_CLASSIFY.classifyUuid}`).css('border', '2px solid #f2a057');
            loadClassifyHtml().setClassifyInfo().set();
        },
        deleteImage: async function(){
            SELECTED_CLASSIFY.classifyImageUrl = '';
            await dataConnect().updateClassifyData();
            await dataConnect().getClassifys();
            loadClassifyHtml().setClassifySelect().set();
            $(`#i_mitem_classify_select_el_box_${SELECTED_CLASSIFY.classifyUuid}`).css('border','2px solid #f2a057');
            loadClassifyHtml().setClassifyInfo().set();
        }
    }
}