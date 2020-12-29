nRankInit();
async function nRankInit(){
    nRankExpandObjectInit();
    await nRankExpandDataConnectInitialize();
    nRankExpandLoadHtmlInitialize();
    // setTimeout(()=>{
    //     $('div[st-alert=top]').alert('close');
    // },5000)
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