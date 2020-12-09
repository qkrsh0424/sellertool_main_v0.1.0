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
    await marketingDataConnect().getMarketingData();
}

async function loadSellDashInitializeHtml(){
    loadStoreHtml().setInitStore()
    eventGoodsHandler().showHaveItemList()
    loadMarketingHtml().tableHtml().set();
}