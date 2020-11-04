function fileUploaderOpen() {
    $("#i_aitem_image_file").click();
}
function uploadImage() {
    var theFormFile = $('#i_aitem_image_file').get()[0].files[0];

    var formData = new FormData();
    formData.append("file", theFormFile);
    $.ajax({
        url: '/api/fileupload/image',
        type: 'POST',
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        dataType: 'json',
        data: formData,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRF-Token", $("#i_aitem_csrf").val());
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
    $("#i_aitem_image_file").val('');
}

function eventImageHandler() {
    return {
        loadImageHtml: function () {
            $("#i_aitem_image_box").html(`
                <img src="${IMAGE_SELECTED}" class="st-aitem-image-el"/>
            `);
            $("#i_aitem_image_control_box").show();
        },
        deleteImage: function(){
            IMAGE_SELECTED = '';
            $("#i_aitem_image_control_box").hide();
            $("#i_aitem_image_box").html(`
                <input type="file" name="i_aitem_image_file" id="i_aitem_image_file"
                onchange="uploadImage()" accept="image/*" hidden>
                <button type="button" class="st-aitem-image-btn" onclick="fileUploaderOpen()">
                    <svg width="2.5em" height="2.5em" viewBox="0 0 17 16" class="bi bi-image"
                        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M14.002 2h-12a1 1 0 0 0-1 1v9l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094L15.002 9.5V3a1 1 0 0 0-1-1zm-12-1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm4 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                </button>
            `);
        }
    }
}

function eventIntegHandler(){
    return{
        submit: function(){
            if(this.checkHeaderTitleEmpty()){
                addItemSnackbarOpen("상품명을 입력하세요.");
                $("#i_header_title").focus();
                return;
            } else if(this.checkCategoryFailure()){
                addItemSnackbarOpen("카테고리1 과 카테고리2 는 필수 선택 입니다.");
                var offset = $('#i_aitem_category').offset(); //선택한 태그의 위치를 반환
	            $('html').animate({scrollTop : offset.top}, 400);
                return;
            } else if(this.checkOptionsEmpty()){
                addItemSnackbarOpen("최소 1개 이상의 옵션은 유지해야 합니다.");
                $("#i_option_input_el").focus();
                return;
            }

            eventItemHandler().saveOthers();
            if(this.checkCommitionValueOverLimit()){
                addItemSnackbarOpen("마켓 수수료는 0~100%의 범위 값만 허용합니다.");
            } else if(this.checkValueMakeError()){
                addItemSnackbarOpen("수수료를 제외한 입력값은 정수만 가능합니다.");
                return;
            }
            mergeAllValueToClassify();

        },
        checkHeaderTitleEmpty: function(){
            if($("#i_header_title").val()===''){
                return true;
            }else{
                return false;
            }
        },
        checkCategoryFailure: function(){
            if(SELECTED_CATEGORY.category1Id==0 | SELECTED_CATEGORY.category2Id==0){
                return true;
            }else{
                return false;
            }
        },
        checkOptionsEmpty: function(){
            if(OPTIONS.length<=0){
                return true;
            }else{
                return false;
            }
        },
        checkCommitionValueOverLimit: function(){
            for(let i = 0 ; i < OPTIONS.length; i++){
                for(let j = 0 ; j < OPTIONS[i].items.length; j++){
                    if(OPTIONS[i].items[j].commitionCost>100 | OPTIONS[i].items[j].commitionCost<0){
                        $(`#i_item_commition_cost_${OPTIONS[i].items[j].itemUUID}`).focus();
                        return true;
                    }
                }
            }
            return false;
        },
        checkValueMakeError: function(){
            for(let i = 0 ; i < OPTIONS.length; i++){
                for(let j = 0 ; j < OPTIONS[i].items.length; j++){
                    console.log(isInt(OPTIONS[i].items[j].price));
                    if( !isInt(OPTIONS[i].items[j].price) ){
                        $(`#i_item_price_${OPTIONS[i].items[j].itemUUID}`).focus();
                        return true;
                    } else if( !isInt(OPTIONS[i].items[j].customerTransCost) ){
                        $(`#i_item_customer_trans_cost_${OPTIONS[i].items[j].itemUUID}`).focus();
                        return true;
                    } else if( !isInt(OPTIONS[i].items[j].sellerRealTransCost) ){
                        $(`#i_item_seller_real_trans_cost_${OPTIONS[i].items[j].itemUUID}`).focus();
                        return true;
                    } else if( !isInt(OPTIONS[i].items[j].purchaseCost) ){
                        $(`#i_item_purchase_cost_${OPTIONS[i].items[j].itemUUID}`).focus();
                        return true;
                    } else if( !isInt(OPTIONS[i].items[j].purchaseTransCost) ){
                        $(`#i_item_purchase_trans_cost_${OPTIONS[i].items[j].itemUUID}`).focus();
                        return true;
                    } else if( !isInt(OPTIONS[i].items[j].extraCharge) ){
                        $(`#i_item_purchase_extra_charge_${OPTIONS[i].items[j].itemUUID}`).focus();
                        return true;
                    }
                }
            }
            return false;
        }
    }
}

function mergeAllValueToClassify(){
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
            xhr.setRequestHeader("X-CSRF-Token", $("#i_aitem_csrf").val());
        },
        success: function(returnData){
            if(returnData.message==='SUCCESS'){
                console.log(returnData);
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
    })
}