init();

async function init(){
    regManageItemObjectInitialize();

    await loadManageItemInitializeData();
    loadManageItemInitializeHtml();
}

async function loadManageItemInitializeData(){
    await dataConnect().getClassifys();
    await dataConnect().getStores();
}

function loadManageItemInitializeHtml(){
    loadClassifyHtml().setClassifySelect().set();
}

function regManageItemObjectInitialize(){
    manageItemObjectInit();
}