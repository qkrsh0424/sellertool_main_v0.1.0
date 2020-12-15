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
        clickSelectCategory: function() {

            loadCategorySelectHtml().categorySelectHtml();
            loadCategoryHtml().getCategory1();

            $("#ty_i_category_select").addClass("ty-st-aitem-category-btn-active-right")
            $("#ty_i_category_search").removeClass("ty-st-aitem-category-btn-active-left")
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
            await addItemDataConnect().getCategory().get('category2');
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
            await addItemDataConnect().getCategory().get('category3');
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
            await addItemDataConnect().getCategory().get('category4');
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