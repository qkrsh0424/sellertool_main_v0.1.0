function getCategory() {
    return {
        load: async(type) => {
            if (type === 'category1') {
                await $.ajax({
                    url: "/api/item_manger/category/get_category1/all",
                    type: "GET",
                    contentType: "application/json",
                    dataType: "json",
                    success: function(returnData) {
                        CATEGORY1 = returnData;
                    },
                    error: function(error) {
                        console.log(error);
                    }

                });
            } else if (type === 'category2') {
                await $.ajax({
                    url: "/api/item_manger/category/get_category2/val",
                    type: "GET",
                    contentType: "application/json",
                    dataType: "json",
                    data: { "ic1": SELECTED_CATEGORY.category1Id },
                    success: function(returnData) {
                        CATEGORY2 = returnData;
                    },
                    error: function(error) {
                        console.log(error);
                    }
                })
            } else if (type === 'category3') {
                await $.ajax({
                    url: "/api/item_manger/category/get_category3/val",
                    type: "GET",
                    contentType: "application/json",
                    dataType: "json",
                    data: {
                        "ic1": SELECTED_CATEGORY.category1Id,
                        "ic2": SELECTED_CATEGORY.category2Id
                    },
                    success: function(returnData) {
                        CATEGORY3 = returnData;
                    },
                    error: function(error) {
                        console.log(error);
                    }
                })
            } else if (type === 'category4') {
                await $.ajax({
                    url: "/api/item_manger/category/get_category4/val",
                    type: "GET",
                    contentType: "application/json",
                    dataType: "json",
                    data: {
                        "ic1": SELECTED_CATEGORY.category1Id,
                        "ic2": SELECTED_CATEGORY.category2Id,
                        "ic3": SELECTED_CATEGORY.category3Id
                    },
                    success: function(returnData) {
                        console.log(returnData);
                        CATEGORY4 = returnData;
                    },
                    error: function(error) {
                        console.log(error);
                    }
                })
            }
        }
    }
}

function loadCategoryHtml() {
    let html = ``;

    return {
        getCategory1: function() {
            CATEGORY1.forEach(r => {
                // console.log(r)
                html += `
                    <button type="button" id="category1Btn_${r.id}" class="btn btn-lg btn-block" onclick="categoryClickHandler().category1('${r.id}','${r.name}')">${r.name}</button>
                `;
            });
            $("#i_category1_list").html(html);
        },
        getCategory2: function() {
            CATEGORY2.forEach(r => {
                // console.log(r)
                html += `
                    <button type="button" id="category2Btn_${r.id}" class="btn btn-lg btn-block" onclick="categoryClickHandler().category2('${r.id}','${r.name}')">${r.name}</button>
                `;
            });
            $("#i_category2_list").html(html);
        },
        getCategory3: function() {
            CATEGORY3.forEach(r => {
                html += `
                    <button type="button" id="category3Btn_${r.id}" class="btn btn-lg btn-block" onclick="categoryClickHandler().category3('${r.id}','${r.name}')">${r.name}</button>
                `;
            });
            $("#i_category3_list").html(html);
        },
        getCategory4: function() {
            CATEGORY4.forEach(r => {
                html += `
                    <button type="button" id="category4Btn_${r.id}" class="btn btn-lg btn-block" onclick="categoryClickHandler().category4('${r.id}','${r.name}')">${r.name}</button>
                `;
            });
            $("#i_category4_list").html(html);
        }
    }

}

function loadCategorySelectHtml() {
    return {
        categorySelectHtml: function() {
            let selectHtml = ``

            selectHtml += `
                    <div class="col-sm-3 mt-1 mb-1 st-aitem-category-box ">
                    <label class="st-aitem-required-text">*카테고리1 (필수)</label>
                    <div id="i_category1_list" class="st-aitem-category-list-box ty-st-aitem-category-box">

                    </div>
                </div>
                <div class="col-sm-3 mt-1 mb-1 st-aitem-category-box ">
                    <label class="st-aitem-required-text">*카테고리2 (필수)</label>
                    <div id="i_category2_list" class="st-aitem-category-list-box ty-st-aitem-category-box">

                    </div>
                </div>
                <div class="col-sm-3 mt-1 mb-1 st-aitem-category-box ">
                    <label>카테고리3 (선택)</label>
                    <div id="i_category3_list" class="st-aitem-category-list-box ty-st-aitem-category-box">

                    </div>
                </div>
                <div class="col-sm-3 mt-1 mb-1 st-aitem-category-box ">
                    <label>카테고리4 (선택)</label>
                    <div id="i_category4_list" class="st-aitem-category-list-box ty-st-aitem-category-box">

                    </div>
                </div>
                    `
            $("#ty_i_categorys_list").html(selectHtml)
        }
    }
}

function loadCategorySearchHtml() {
    let searchHtml = ``;
    return {
        categorySearchHtml: function() {
            searchHtml += `
            
            <div class="col-sm-6 my-1" >
            <input id="ty_i_category_search_input" class="ty-st-aitem-input" />
            </div>
            
            `
            $("#ty_i_categorys_list").html(searchHtml)

        }
    }
}


function categoryClickHandler() {
    let breadCrumbHtml = ``;
    return {
        // makeAutoComplete: function() {
        //     let val = [];
        //     SEARCH_EL_ITEMS.forEach(r => {
        //         val.push({
        //             'label': `${r.itemName}(${r.storeName})`,
        //             'value': `${r.itemName}(${r.storeName})`,
        //             'index': uuidv4(),
        //             'itemId': r.itemId,
        //             'classifyUuid': r.classifyUuid,
        //             'optionUuid': r.optionUuid,
        //             'itemName': r.itemName,
        //             'storeType': r.storeType,
        //             'storeName': r.storeName,
        //         });
        //     })
        //     $("#ty_i_category_search_input").autocomplete({ //오토 컴플릿트 시작
        //         source: val, // source 는 자동 완성 대상
        //         select: function(event, ui) { //아이템 선택시
        //             // console.log(ui.item);
        //             // console.log(ui);
        //             eventGoodsHandler().addSelectedItem(ui.item);
        //             ui.item.value = '';
        //         },
        //         focus: function(event, ui) { //포커스 가면
        //             return false; //한글 에러 잡기용도로 사용됨
        //         },
        //         minLength: 1, // 최소 글자수
        //         autoFocus: true, //첫번째 항목 자동 포커스 기본값 false
        //         classes: {
        //             "ui-autocomplete": "highlight"
        //         },
        //         delay: 100, //검색창에 글자 써지고 나서 autocomplete 창 뜰 때 까지 딜레이 시간(ms)
        //         //            disabled: true, //자동완성 기능 끄기
        //         position: { my: "right top", at: "right bottom" },
        //         close: function(event) { //자동완성창 닫아질때 호출
        //             // console.log(event);
        //         }
        //     })
        // },
        clickSelectCategory: function() {

            loadCategorySelectHtml().categorySelectHtml();
            loadCategoryHtml().getCategory1();

            $("#ty_i_category_select").addClass("ty-st-aitem-category-btn-active-right")
            $("#ty_i_category_search").removeClass("ty-st-aitem-category-btn-active-left")
        },
        clickSearchCategory: function() {
            return {
                setCategory: async function() {
                    SELECTED_CATEGORY.category1Id = 0;
                    SELECTED_CATEGORY.category1Name = '';
                    SELECTED_CATEGORY.category2Id = 0;
                    SELECTED_CATEGORY.category2Name = '';
                    SELECTED_CATEGORY.category3Id = 0;
                    SELECTED_CATEGORY.category3Name = '';
                    SELECTED_CATEGORY.category4Id = 0;
                    SELECTED_CATEGORY.category4Name = '';
                    $("#i_breadcrumb").html('');
                    CATEGORY1.forEach(r => {
                        SEARCHED_CATEGORY.category1Id = r.id;
                        SEARCHED_CATEGORY.category1Name = r.name;

                        getCategory().load('category2');
                    })

                    categoryClickHandler().clickSearchCategory().category1()
                    loadCategorySearchHtml().categorySearchHtml()
                    $("#ty_i_category_select").removeClass("ty-st-aitem-category-btn-active-right")
                    $("#ty_i_category_search").addClass("ty-st-aitem-category-btn-active-left")
                },
                category1: async function() {
                    console.log(CATEGORY2)


                }
            }



        },
        category1: async function(id, name) {
            SELECTED_CATEGORY.category1Id = id;
            SELECTED_CATEGORY.category1Name = name;
            SELECTED_CATEGORY.category2Id = 0;
            SELECTED_CATEGORY.category2Name = '';
            SELECTED_CATEGORY.category3Id = 0;
            SELECTED_CATEGORY.category3Name = '';
            SELECTED_CATEGORY.category4Id = 0;
            SELECTED_CATEGORY.category4Name = '';

            $("#i_category3_list").html('');
            $("#i_category4_list").html('');
            loadCategoryHtml().getCategory1();
            $(`#category1Btn_${id}`).css('background', '#1d5a8d');
            $(`#category1Btn_${id}`).css('color', 'white');



            if (SELECTED_CATEGORY.category1Id != 0) {
                breadCrumbHtml = `${SELECTED_CATEGORY.category1Name}`;
            }
            $("#i_breadcrumb").html(breadCrumbHtml);
            await getCategory().load('category2');
            loadCategoryHtml().getCategory2();
        },
        category2: async function(id, name) {
            SELECTED_CATEGORY.category2Id = id;
            SELECTED_CATEGORY.category2Name = name;
            SELECTED_CATEGORY.category3Id = 0;
            SELECTED_CATEGORY.category3Name = '';
            SELECTED_CATEGORY.category4Id = 0;
            SELECTED_CATEGORY.category4Name = '';

            $("#i_category4_list").html('');
            loadCategoryHtml().getCategory2();
            $(`#category2Btn_${id}`).css('background', '#1d5a8d');
            $(`#category2Btn_${id}`).css('color', 'white');

            if (SELECTED_CATEGORY.category1Id != 0 && SELECTED_CATEGORY.category2Id != 0) {
                breadCrumbHtml = `${SELECTED_CATEGORY.category1Name} > ${SELECTED_CATEGORY.category2Name}`;
            }
            $("#i_breadcrumb").html(breadCrumbHtml);
            await getCategory().load('category3');
            loadCategoryHtml().getCategory3();
        },
        category3: async function(id, name) {
            SELECTED_CATEGORY.category3Id = id;
            SELECTED_CATEGORY.category3Name = name;
            SELECTED_CATEGORY.category4Id = 0;
            SELECTED_CATEGORY.category4Name = '';

            loadCategoryHtml().getCategory3();
            $(`#category3Btn_${id}`).css('background', '#1d5a8d');
            $(`#category3Btn_${id}`).css('color', 'white');

            if (SELECTED_CATEGORY.category1Id != 0 && SELECTED_CATEGORY.category2Id != 0 && SELECTED_CATEGORY.category3Id != 0) {
                breadCrumbHtml = `${SELECTED_CATEGORY.category1Name} > ${SELECTED_CATEGORY.category2Name} > ${SELECTED_CATEGORY.category3Name}`;
            }
            $("#i_breadcrumb").html(breadCrumbHtml);
            await getCategory().load('category4');
            loadCategoryHtml().getCategory4();
        },
        category4: async function(id, name) {
            SELECTED_CATEGORY.category4Id = id;
            SELECTED_CATEGORY.category4Name = name;

            loadCategoryHtml().getCategory4();
            $(`#category4Btn_${id}`).css('background', '#1d5a8d');
            $(`#category4Btn_${id}`).css('color', 'white');

            if (SELECTED_CATEGORY.category1Id != 0 && SELECTED_CATEGORY.category2Id != 0 && SELECTED_CATEGORY.category3Id != 0 && SELECTED_CATEGORY.category4Id != 0) {
                breadCrumbHtml = `${SELECTED_CATEGORY.category1Name} > ${SELECTED_CATEGORY.category2Name} > ${SELECTED_CATEGORY.category3Name} > ${SELECTED_CATEGORY.category4Name}`;
            }
            $("#i_breadcrumb").html(breadCrumbHtml);
        }
    }
}