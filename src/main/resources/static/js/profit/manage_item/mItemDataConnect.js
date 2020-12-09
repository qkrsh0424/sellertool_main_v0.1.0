function dataConnect() {
    return {
        getStores: async function () {
            await $.ajax({
                url: '/api/item_store/get/all',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                beforeSend: function () {
                    $("#i_mitem_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mitem_loading").addClass('display-none');
                },
                success: function (returnData) {
                    STORES = returnData;
                },
                error: function (error) {
                    console.log(error)
                }
            })
        },
        getClassifys: async function () {
            await $.ajax({
                url: '/api/item_manager/search/classifys/def/byuser',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                beforeSend: function () {
                    $("#i_mitem_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mitem_loading").addClass('display-none');
                },
                success: function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        CLASSIFYS = returnData.classifys;
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : MIGCLF500");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MIGCLF");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MIGCLF");
                        return window.location.reload();
                    }
                }
            });
        },
        updateClassifyData: async function () {
            let data = JSON.stringify(SELECTED_CLASSIFY);
            await $.ajax({
                url: '/api/item_manager/update/classify/pure',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_mitem_csrf").val());
                    $("#i_mitem_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mitem_loading").addClass('display-none');
                },
                success: async function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : MIUCLF500");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MIUCLF");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MIUCLF");
                        return window.location.reload();
                    }
                }
            });
        },
        deleteClassifyData: function (classify) {
            let data = JSON.stringify(classify);
            $.ajax({
                url: '/api/item_manager/delete/classify/one',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_mitem_csrf").val());
                    $("#i_mitem_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mitem_loading").addClass('display-none');
                },
                success: async function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        await dataConnect().getClassifys();
                        loadClassifyHtml().setClassifySelect().set();
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : MIUCLF500");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MIUCLF");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MIUCLF");
                        return window.location.reload();
                    }
                }
            });
        },
        getCategorys: function () {
            return {
                getCategory1: async function () {
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
                },
                getCategory2: async function () {
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
                    });
                },
                getCategory3: async function () {
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
                    });
                },
                getCategory4: async function () {
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
                    });
                }
            }
        },
        updateCategoryData: function () {
            let data = JSON.stringify({
                'category': SELECTED_CATEGORY,
                'classify': SELECTED_CLASSIFY
            });
            $.ajax({
                url: '/api/item_manager/update/categorygroup/def',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_mitem_csrf").val());
                    $("#i_mitem_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mitem_loading").addClass('display-none');
                },
                success: async function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        console.log(returnData);
                        await dataConnect().getClassifys();
                        classifyObjectControl().updateSelectedClassify();
                        loadCategoryHtml().setCategoyBreadcrumb().set();
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : MIUCLF500");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MIUCLF");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MIUCLF");
                        return window.location.reload();
                    }
                }
            });
        },
        getOptions: async function () {
            await $.ajax({
                url: '/api/item_manager/search/options/byclassify',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                data: {
                    'classifyUuid': SELECTED_CLASSIFY.classifyUuid
                },
                beforeSend: function (xhr) {
                    $("#i_mitem_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mitem_loading").addClass('display-none');
                },
                success: function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        OPTIONS = returnData.options;
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : MDGOPT500");
                        return window.location.reload();
                    } {
                        alert("undefined error code : MDGOPT");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MDGOPT");
                        return window.location.reload();
                    }
                }
            });
        },
        addOption: async function (optionName) {
            let data = JSON.stringify({
                'classify': SELECTED_CLASSIFY,
                'optionName': optionName,
                'remainingCount': 0
            });
            await $.ajax({
                url: '/api/item_manager/add/option/one',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_mitem_csrf").val());
                    $("#i_mitem_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mitem_loading").addClass('display-none');
                },
                success: function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : MDGOPT500");
                        return window.location.reload();
                    } {
                        alert("undefined error code : MDGOPT");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MDGOPT");
                        return window.location.reload();
                    }
                }
            });
        },
        updateOptionData: async function () {
            let data = JSON.stringify(SELECTED_OPTION);
            await $.ajax({
                url: '/api/item_manager/update/option/pure',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_mitem_csrf").val());
                    $("#i_mitem_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mitem_loading").addClass('display-none');
                },
                success: async function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : MIUCLF500");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MIUCLF");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MIUCLF");
                        return window.location.reload();
                    }
                }
            });
        },
        deleteOptionData: function (option) {
            let data = JSON.stringify(option);
            $.ajax({
                url: '/api/item_manager/delete/option/one',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_mitem_csrf").val());
                },
                success: async function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        await dataConnect().getOptions();
                        loadOptionHtml().setOptionSelect().set();
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : MIUCLF500");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MIUCLF");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MIUCLF");
                        return window.location.reload();
                    }
                }
            });
        },
        getItems: async function () {
            await $.ajax({
                url: '/api/item_manager/search/item/partial/byoption',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                data: {
                    'optionUuid': SELECTED_OPTION.optionUuid
                },
                beforeSend: function (xhr) {
                    $("#i_mitem_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mitem_loading").addClass('display-none');
                },
                success: function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        ITEMS = returnData.data;
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : MDGOPT500");
                        return window.location.reload();
                    } {
                        alert("undefined error code : MDGOPT");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MDGOPT");
                        return window.location.reload();
                    }
                }
            });
        },
        updateItemData: function (itemId) {
            let item = ITEMS.filter(r => r.itemId == itemId)[0];
            let data = JSON.stringify(item);
            $.ajax({
                url: '/api/item_manager/update/item/def',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_mitem_csrf").val());
                    $("#i_mitem_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mitem_loading").addClass('display-none');
                },
                success: async function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        await dataConnect().getItems();
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : MIUCLF500");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MIUCLF");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MIUCLF");
                        return window.location.reload();
                    }
                }
            });
        },
        deleteItemData: function (item) {
            let data = JSON.stringify(item);
            $.ajax({
                url: '/api/item_manager/delete/item/one',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_mitem_csrf").val());
                },
                success: async function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : MIUCLF500");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MIUCLF");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MIUCLF");
                        return window.location.reload();
                    }
                }
            });
        },
        addItemWithStore: async function (storeType, storeName) {
            let classify = SELECTED_CLASSIFY;
            let option = SELECTED_OPTION;
            let data = JSON.stringify({
                'classify': classify,
                'option': option,
                'storeType': storeType,
                'storeName': storeName
            });
            await $.ajax({
                url: '/api/item_manager/add/item/one',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_mitem_csrf").val());
                    $("#i_mitem_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mitem_loading").addClass('display-none');
                },
                success: async function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        await dataConnect().getItems();
                        loadItemHtml().setItemsTableHtml().set();
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : MDGOPT500");
                        return window.location.reload();
                    } {
                        alert("undefined error code : MDGOPT");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MDGOPT");
                        return window.location.reload();
                    }
                }
            });

        },
        uploadImageToS3: async function () {
            var theFormFile = $('#i_mitem_image_file').get()[0].files[0];

            var formData = new FormData();
            formData.append("file", theFormFile);
            await $.ajax({
                url: '/api/fileupload/image',
                type: 'POST',
                enctype: 'multipart/form-data',
                contentType: false,
                processData: false,
                dataType: 'json',
                data: formData,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_mitem_csrf").val());
                    $("#i_mitem_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mitem_loading").addClass('display-none');
                },
                success: async function (returnData) {
                    if (returnData.message === 'SUCCESS') {
                        SELECTED_CLASSIFY.classifyImageUrl = returnData.imageUrl;
                    } else {
                        alert('image undefined');
                        return;
                    }
                },
                error: function (error) {
                    alert('image upload error');
                }
            });
            $("#i_mitem_image_file").val('');
        }
    }
}