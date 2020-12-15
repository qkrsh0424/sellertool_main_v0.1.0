function sellDashDataConnect(){
    return {
        getRegItems: async function(){
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
                        SEARCH_EL_ITEMS = returnData.data;
                    }else if(returnData.message === 'USER_INVALID'){
                        alert('로그인 세션이 만료되었습니다.');
                        return window.location.href='/login';
                    }
                },
                error: function(error) {
                    alert("undefined error code : SDGRI");
                    return ;
                }
            });
        },
        setSellItems: async function(){
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
                        alert("DB Search fail code : SDSSI500");
                        return window.location.reload();
                    } else{
                        alert("undefined fail code : SDSSI");
                        return window.location.reload();
                    }
                },
                error: function(error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDSSI");
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
                        alert("DB Search fail code : SDGC500");
                        return window.location.reload();
                    } else {
                        alert("undefined fail code : SDGC");
                        return window.location.reload();
                    }
                },
                error: function(error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDGC");
                        return ;
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
                        alert("DB Search fail code : SDGO500");
                        return window.location.reload();
                    } else{
                        alert("undefined fail code : SDGO");
                        return window.location.reload();
                    }
                },
                error: function(error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDGO");
                        return ;
                    }
                }
            })
        },
        getSellItems: async function(){
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
                    if(returnData.message==='USER_INVALID'){
                        alert('로그인 세션이 만료되었습니다.');
                        return window.location.href="/login";
                    }
                    SELL_ITEMS = returnData.data;
                },
                error: function (error) {
                    alert("undefined error code : SDGSI");
                    return ;
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
                        alert("DB Search fail code : SDUSIBS500");
                        return window.location.reload();
                    } else {
                        alert("undefined fail code : SDUSIBS");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDUSIBS");
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
                        alert("DB Search fail code : SDDSIBS500");
                        return window.location.reload();
                    } else {
                        alert("undefined fail code : SDDSIBS");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDDSIBS");
                        return window.location.reload();
                    }
                }
            })

        },
        getStores: async function(){
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
                    alert("undefined error code : SDGS");
                    return ;
                }
            });
        }
    }
}