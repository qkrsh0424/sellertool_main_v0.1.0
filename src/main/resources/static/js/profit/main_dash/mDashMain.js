init();


async function init(){
    chartLoader().hideAndShow();
    calandarHandler().loadInit();
    await initializeDataConnectFetch();
    initializeLoadHtml();
    chartLoader().load();
}

async function searchForData(){
    await dataConnect().getSellItemByCondition();
    loadTableHtml().selledItemsHtml();
    chartLoader().load();
}

async function initializeDataConnectFetch(){
    await dataConnect().getItemClassifys();
    await dataConnect().getDeletedItemClassifys();
    await dataConnect().getSellItemsByDateTime();
    await dataConnect().getStores();
    return;
}

function initializeLoadHtml(){
    loadClassifyHtml().setClassifySelector();
    loadStoreHtml().setStoreSelector();
    loadTableHtml().selledItemsHtml();
}

function testConsole(){
    console.log("DATE_SETTING : ", DATE_SETTING);
    console.log("SELLED_ITEMS : ",SELLED_ITEMS);
    console.log(SELECTED_CLASSIFY,
        SELECTED_OPTION,
        SELECTED_STORE)
    
    console.log(classifyDataArr);
}