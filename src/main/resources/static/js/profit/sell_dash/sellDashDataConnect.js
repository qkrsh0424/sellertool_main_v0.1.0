function goodsDataConnect() {
    return {
        items: async function() {
            await $.ajax({
                url: '/api/item_manager/search/regitem/all',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                beforeSend: function (xhr) {
                    $("div[sttr=loading]").removeClass('display-none');
                },
                complete: function () {
                    $("div[sttr=loading]").addClass('display-none');
                },
                success: function(returnData) {
                    if (returnData.message === 'SUCCESS') {
                        // console.log(returnData);
                        SEARCH_EL_ITEMS = returnData.data;
                    }
                },
                error: function(error) {
                    console.log(error);
                }
            })
        },
        setSellItems: async function() {
            let data = JSON.stringify({
                'items': SELECTED_SEARCH_ITEMS,
                'sellDate': DATE_SETTING.sellDate,
            });
            await $.ajax({
                url: '/api/item_manager/add/sell_item/one',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_st_sd_csrf").val());
                    $("div[sttr=loading]").removeClass('display-none');
                },
                complete: function () {
                    $("div[sttr=loading]").addClass('display-none');
                },
                success: function(returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : SDGSG500");
                        return window.location.reload();
                    } {
                        alert("undefined error code : SDGSG");
                        return window.location.reload();
                    }
                },
                error: function(error) {
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
        getClassifys: async function() {
            await $.ajax({
                url: '/api/item_manager/search/classifys/byuser',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                beforeSend: function(xhr) {
                    $("div[sttr=loading]").removeClass('display-none');
                },
                complete: function () {
                    $("div[sttr=loading]").addClass('display-none');
                },
                success: function(returnData) {
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
                error: function(error) {
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
        getOptions: async function(classifyUuid) {
            await $.ajax({
                url: '/api/item_manager/search/options/byclassify',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                data: {
                    'classifyUuid': classifyUuid
                },
                success: function(returnData) {
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
                error: function(error) {
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

function itemDataConnect() {
    return {
        firstGet: async function () {
            let data = {
                'startDate': DATE_SETTING.startDate,
                'endDate': DATE_SETTING.endDate
            }
            await $.ajax({
                url: '/api/item_manager/search/sell_item/time',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function(xhr) {
                    $("div[sttr=loading]").removeClass('display-none');
                },
                complete: function () {
                    $("div[sttr=loading]").addClass('display-none');
                },
                success: function (returnData) {
                    SELL_ITEMS = returnData.data;
                    loadItemHtml().sellItemsHtml();
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        getByDate: async function () {
            let data = {
                'startDate': DATE_SETTING.startDate,
                'endDate': DATE_SETTING.endDate
            }
            await $.ajax({
                url: '/api/item_manager/search/sell_item/time',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function(xhr) {
                    $("div[sttr=loading]").removeClass('display-none');
                },
                complete: function () {
                    $("div[sttr=loading]").addClass('display-none');
                },
                success: function (returnData) {
                    // console.log(returnData.data);
                    SELL_ITEMS = returnData.data;

                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        updateSellItemBySellId: function (sellId) {
            let item = SELL_ITEMS.filter(r => r.sellId == sellId)[0];
            let data = JSON.stringify(item);
            $.ajax({
                url: '/api/item_manager/update/sell_item/def',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_st_sd_csrf").val());
                    $("div[sttr=loading]").removeClass('display-none');
                },
                complete: function () {
                    $("div[sttr=loading]").addClass('display-none');
                },
                success: function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        SAVE_SELLID = [];
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : SDIUPD500");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDIUPD");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDIUPD");
                        return window.location.reload();
                    }
                }
            })
        },
        deleteSellItemBySellItem: function (item) {
            let data = JSON.stringify(item);

            $.ajax({
                url: '/api/item_manager/delete/sell_item/one',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_st_sd_csrf").val());
                },
                success: function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : SDIDE500");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDIDE");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDIDE");
                        return window.location.reload();
                    }
                }
            })

        }
    }
}
function storeDataConnect() {
    return {
        getAll: async function(){
            await $.ajax({
                url: '/api/item_store/get/all',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                beforeSend: function(xhr) {
                    $("div[sttr=loading]").removeClass('display-none');
                },
                complete: function () {
                    $("div[sttr=loading]").addClass('display-none');
                },
                success: function(returnData) {
                    STORE_LIST = returnData;
                },
                error: function(error) {
                    console.log(error)
                }
            });
        }
    }
}

function marketingDataConnect(){
    return{
        getMarketingData: async function(){
            let data = {
                'startDate': DATE_SETTING.startDate,
                'endDate': DATE_SETTING.endDate
            }
            await $.ajax({
                url: '/api/item_manager/search/marketing_cost/bytime',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function(xhr) {
                    $("div[sttr=loading]").removeClass('display-none');
                },
                complete: function () {
                    $("div[sttr=loading]").addClass('display-none');
                },
                success: function (returnData) {
                    console.log(returnData);
                    if(returnData.message==='SUCCESS'){
                        MARKETING_COST_LIST = returnData.data;
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        setMarketingData: async function(json){
            let data = JSON.stringify(json);
            console.log("ihihi");
            await $.ajax({
                url:'/api/item_manager/add/marketing_cost/one',
                type:'POST',
                contentType:'application/json',
                dataType:'json',
                data:data,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_st_sd_csrf").val());
                    $("div[sttr=loading]").removeClass('display-none');
                },
                complete: function () {
                    $("div[sttr=loading]").addClass('display-none');
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
        deleteMarketingData: async function(json){
            let data = JSON.stringify(json);
            console.log(data);
            await $.ajax({
                url:'/api/item_manager/delete/marketing_cost/one',
                type:'POST',
                contentType:'application/json',
                dataType:'json',
                data:data,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_st_sd_csrf").val());
                    $("div[sttr=loading]").removeClass('display-none');
                },
                complete: function () {
                    $("div[sttr=loading]").addClass('display-none');
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
        }
    }
}