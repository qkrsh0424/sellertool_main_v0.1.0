init();


async function init() {
    regMainDashboardObjectInitialize();

    chartLoader().hideAndShow();
    calandarHandler().loadInit();
    await initializeDataConnectFetch();
    initializeLoadHtml();
    chartLoader().load();
    // Alpha post 관련
    AlphaPostShareDataInit();
}

async function searchForData() {
    await dataConnect().getSellItemByCondition();
    loadTableHtml().selledItemsSumHtml();
    chartLoader().load();
}

async function initializeDataConnectFetch() {
    await dataConnect().getItemClassifys();
    await dataConnect().getDeletedItemClassifys();
    await dataConnect().getSellItemsByDateTime();
    await dataConnect().getStores();
}

function initializeLoadHtml() {
    loadClassifyHtml().setClassifySelector();
    loadStoreHtml().setStoreSelector();
    loadTableHtml().selledItemsSumHtml();
}

function regMainDashboardObjectInitialize(){
    mainDashObjectInit();
    charObjectInit();
}