init();

async function init(){
    await dataConnect().getClassifys();
    await dataConnect().getStores();
    loadClassifyHtml().setClassifySelect().set();
}

function testConsole(){
    console.log("CLASSIFYS : ",CLASSIFYS);
    console.log("OPTIONS : ",OPTIONS);
    console.log("ITEMS",ITEMS);
    console.log("SELECTED_CLASSIFY : ",SELECTED_CLASSIFY);
    console.log("SELECTED_CATEGORY : ",SELECTED_CATEGORY);
    console.log("SELECTED_OPTION", SELECTED_OPTION);
}