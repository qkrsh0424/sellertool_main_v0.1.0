function dataConnect(){
    return{
        getItemClassifys: async function(){
            await $.ajax({
                url:'/api/item_manager/search/classifys/byuser',
                type:'GET',
                contentType:'application/json',
                dataType:'json',
                beforeSend: function (xhr) {
                    $("#i_mdash_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mdash_loading").addClass('display-none');
                },
                success: function(returnData){
                    if(returnData.message==='SUCCESS'){
                        return CLASSIFYS = returnData.classifys;
                    }else if(returnData.message==='USER_INVALID'){
                        alert('로그인 세션이 만료되었습니다.');
                        return window.location.href='/login';
                    }
                    
                },
                error: function(error){
                    console.log(error);
                }
            })
        },
        getDeletedItemClassifys: async function(){
            await $.ajax({
                url:'/api/item_manager/search/deleted_classifys/jselled',
                type:'GET',
                contentType:'application/json',
                dataType:'json',
                beforeSend: function (xhr) {
                    $("#i_mdash_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mdash_loading").addClass('display-none');
                },
                success: function(returnData){
                    if(returnData.message==='SUCCESS'){
                        CLASSIFYS = CLASSIFYS.concat(returnData.classifys);
                        return;
                    }else if(returnData.message==='USER_INVALID'){
                        alert('로그인 세션이 만료되었습니다.');
                        return window.location.href='/login';
                    }
                    
                },
                error: function(error){
                    console.log(error);
                }
            })
        },
        getItemOptions: async function(classifyUuid){
            await $.ajax({
                url:'/api/item_manager/search/options/byclassify',
                type:'GET',
                contentType:'application/json',
                dataType:'json',
                data:{
                    'classifyUuid':classifyUuid
                },
                beforeSend: function (xhr) {
                    $("#i_mdash_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mdash_loading").addClass('display-none');
                },
                success: function(returnData){
                    if (returnData.message === 'USER_INVALID') {
                        alert("로그인 세션이 만료되었습니다.")
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
                error: function(error){
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MDGOPT");
                    }
                }
            });
        },
        getStores: async function(){
            await $.ajax({
                url:'/api/item_store/get/all',
                type:'GET',
                contentType:'application/json',
                dataType:'json',
                beforeSend: function (xhr) {
                    $("#i_mdash_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mdash_loading").addClass('display-none');
                },
                success: function(returnData){
                    STORES = returnData;
                },
                error: function(error){
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : MDGST");
                        return window.location.reload();
                    }
                }
            })
        },
        getSellItemByCondition: async function(){
            let data = {
                'startDate':DATE_SETTING.startDate,
                'endDate':DATE_SETTING.endDate,
                'order':ORDERBY,
                'classifyUuid':SELECTED_CLASSIFY,
                'optionUuid':SELECTED_OPTION,
                'storeType':SELECTED_STORE
            }
            await $.ajax({
                url:'/api/item_manager/search/sell_item/condition',
                type:'GET',
                contentType:'application/json',
                dataType:'json',
                data:data,
                beforeSend: function (xhr) {
                    $("#i_mdash_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mdash_loading").addClass('display-none');
                },
                success: function(returnData){
                    if(returnData.message==='SUCCESS'){
                        return SELLED_ITEMS = returnData.data;
                    }else if(returnData.message==='USER_INVALID'){
                        alert('로그인 세션이 만료되었습니다.');
                        return window.location.href='/login';
                    }
                    
                },
                error: function(error){
                    console.log(error);
                }
            })
        },
        getSellItemsByDateTime: async function(){
            let data = {
                'startDate':DATE_SETTING.startDate,
                'endDate':DATE_SETTING.endDate,
            }
            await $.ajax({
                url:'/api/item_manager/search/sell_item/time/order/selldate',
                type:'GET',
                contentType:'application/json',
                dataType:'json',
                data:data,
                beforeSend: function (xhr) {
                    $("#i_mdash_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mdash_loading").addClass('display-none');
                },
                success: function(returnData){
                    if(returnData.message==='SUCCESS'){
                        return SELLED_ITEMS = returnData.data;
                    }else if(returnData.message==='USER_INVALID'){
                        alert('로그인 세션이 만료되었습니다.');
                        return window.location.href='/login';
                    }
                },
                error: function(error){
                    console.log(error);
                }
            });
        }
    }
}