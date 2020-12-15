init();
async function init() {
    regAddItemGlobalObjectInitialize();
    
    await loadAddItemInitializeData();
    loadAddItemInitializeHtml();
    regAddItemInitailizeHandler();
}

async function loadAddItemInitializeData(){
    await addItemDataConnect().getCategory().get('category1');
    await addItemDataConnect().getStoreData();
    
}

async function loadAddItemInitializeHtml(){
    loadStoreHtml().storeOptionListLoad();
    loadCategorySelectHtml().categorySelectHtml();
    loadCategoryHtml().getCategory1();
}

function regAddItemInitailizeHandler(){
    addItemOptionEventListener();
}

function regAddItemGlobalObjectInitialize(){
    addItemObjectInit();
}

function addItemSnackbarOpen(message) {
    var x = document.getElementById("st-aitem-snackbar");
    x.innerHTML = message;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
// input 창 숫자만 입력
/* <input type="text" class="form-control item-price-input" 
                                id="i_item_price_${r.itemUUID}" 
                                onkeypress="return isNumberKey(event)" 
                                onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');" 
                                value=${r.price}></input> */
