init();

async function init() {
    calandarHandler().designCalandar_ty();
    calandarHandler().setCurrentTimeHtml();
    calandarHandler().setInitDate();
    
    await loadSellDashInitializeData();
    loadStoreHtml().setInitStore()
    eventGoodsHandler().showHaveItemList()
}

async function loadSellDashInitializeData(){
    await goodsDataConnect().getClassifys();
    await storeDataConnect().getAll();
    itemDataConnect().firstGet();
    await goodsDataConnect().items();
}