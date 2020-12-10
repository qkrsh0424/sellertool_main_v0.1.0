function getCategory() {
    return {
        load: async (type) => {
            if (type === 'category1') {
                await $.ajax({
                    url: "/api/item_manger/category/get_category1/all",
                    type: "GET",
                    contentType: "application/json",
                    dataType: "json",
                    success: function (returnData) {
                        CATEGORY1 = returnData;
                    },
                    error: function (error) {
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
                    success: function (returnData) {
                        CATEGORY2 = returnData;
                    },
                    error: function (error) {
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
                    success: function (returnData) {
                        CATEGORY3 = returnData;
                    },
                    error: function (error) {
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
                    success: function (returnData) {
                        CATEGORY4 = returnData;
                    },
                    error: function (error) {
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
        getCategory1: function () {
            CATEGORY1.forEach(r => {
                html += `
                    <button type="button" id="category1Btn_${r.id}" class="btn btn-lg btn-block" onclick="categoryClickHandler().category1('${r.id}','${r.name}')">${r.name}</button>
                `;
            });
            $("#i_category1_list").html(html);
        },
        getCategory2: function () {
            CATEGORY2.forEach(r => {
                html += `
                    <button type="button" id="category2Btn_${r.id}" class="btn btn-lg btn-block" onclick="categoryClickHandler().category2('${r.id}','${r.name}')">${r.name}</button>
                `;
            });
            $("#i_category2_list").html(html);
        },
        getCategory3: function () {
            CATEGORY3.forEach(r => {
                html += `
                    <button type="button" id="category3Btn_${r.id}" class="btn btn-lg btn-block" onclick="categoryClickHandler().category3('${r.id}','${r.name}')">${r.name}</button>
                `;
            });
            $("#i_category3_list").html(html);
        },
        getCategory4: function () {
            CATEGORY4.forEach(r => {
                html += `
                    <button type="button" id="category4Btn_${r.id}" class="btn btn-lg btn-block" onclick="categoryClickHandler().category4('${r.id}','${r.name}')">${r.name}</button>
                `;
            });
            $("#i_category4_list").html(html);
        }
    }


}

function categoryClickHandler() {
    let breadCrumbHtml = ``;
    return {
        category1: async function (id, name) {
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
        category2: async function (id, name) {
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
        category3: async function (id, name) {
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
        category4: async function (id, name) {
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