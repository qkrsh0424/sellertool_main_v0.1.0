nRankInit();
async function nRankInit(){
    nRankExpandObjectInit();
    await nRankExpandDataConnectInitialize();
    nRankExpandLoadHtmlInitialize();
}

async function nRankExpandDataConnectInitialize(){
    await nrankExpandDataConnect().getModules();
}

function nRankExpandLoadHtmlInitialize(){
    nrankExpandModuleLoadHtml().setModuleList().set();
}

function testConsole(){
    console.log(MODULES)
    console.log(SELECTED_MODULE)
}