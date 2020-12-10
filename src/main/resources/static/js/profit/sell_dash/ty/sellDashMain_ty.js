init();

async function init() {
    calandarHandler().designCalandar_ty();
    calandarHandler().setCurrentTimeHtml();
    calandarHandler().setInitDate();
    
    await loadSellDashInitializeData();
    loadSellDashInitializeHtml();
}

async function loadSellDashInitializeData(){
    await goodsDataConnect().getClassifys();
    await storeDataConnect().getAll();
    itemDataConnect().firstGet();
    await goodsDataConnect().items();
}

async function loadSellDashInitializeHtml(){
    loadStoreHtml().setInitStore();
    eventGoodsHandler().showHaveItemList();
}