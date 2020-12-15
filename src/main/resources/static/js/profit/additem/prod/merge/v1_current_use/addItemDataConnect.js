function addItemDataConnect(){
    return{
        getCategory: function(){
            return {
                get: async (type) => {
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
        },
        getStoreData: async function(){
            await $.ajax({
                url: '/api/item_store/get/all',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                success: function (returnData) {
                    STORE_LIST = returnData;
        
                },
                error: function (error) {
                    console.log(error)
                }
            });
        },
        uploadImageAndReturnUrl: async function(formData){
            await $.ajax({
                url: '/api/fileupload/image',
                type: 'POST',
                enctype: 'multipart/form-data',
                contentType: false,
                processData: false,
                dataType: 'json',
                data: formData,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_aitem_csrf").val());
                },
                success: function (returnData) {
                    if (returnData.message === 'SUCCESS') {
                        IMAGE_SELECTED = returnData.imageUrl;
                        eventImageHandler().loadImageHtml();
                    } else {
                        alert('image undefined');
                        return;
                    }
                }
            });
        },
        setAllDataAndAddItem: function(){
            ITEM_CLASSIFY = {
                'classifyUUID' : uuidv4(),
                'classifyName' : $("#i_header_title").val(),
                'classifyDesc': $("#i_header_desc").val(),
                'classifyImage': IMAGE_SELECTED,
                'categorys':SELECTED_CATEGORY,
                'options':OPTIONS
            }
            // console.log(ITEM_CLASSIFY);
            let data = JSON.stringify(ITEM_CLASSIFY);
            $.ajax({
                url:'/api/item_manager/additem/add',
                type:'POST',
                contentType:'application/json',
                dataType:'json',
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", $("#i_aitem_csrf").val());
                },
                success: function(returnData){
                    if(returnData.message==='SUCCESS'){
                        window.location.href="/profit";
                    }else if(returnData.message==='USER_INVALID'){
                        alert("세션이 만료되었습니다.");
                        window.location.href="/login";
                    }else{
                        alert("server error code : AIC500 fail")
                    }
                },
                error: function(error){
                    console.log(error);
                    alert("server error code : AIC500 error")
                }
            });
        }
    }
}