init();

async function init() {
    loadSellDashInitializeObject();
    calandarHandler().designCalandar_ty();
    calandarHandler().setCurrentTimeHtml();
    calandarHandler().setInitDate();

    await loadSellDashInitializeData();
    loadSellDashInitializeHtml();
}

async function loadSellDashInitializeData() {
    await sellDashDataConnect().getClassifys();
    await sellDashDataConnect().getStores();
    await sellDashDataConnect().getSellItems();
    await sellDashDataConnect().getRegItems();
}

async function loadSellDashInitializeHtml() {
    loadStoreHtml().setInitStore();
    loadItemHtml().sellItemsHtml();
    eventGoodsHandler().showHaveItemList();
}

function loadSellDashInitializeObject(){
    sellDashObjectInit();
}