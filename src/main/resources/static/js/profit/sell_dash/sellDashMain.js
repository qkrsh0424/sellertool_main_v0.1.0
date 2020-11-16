init();

async function init(){
    calandarHandler().setInitDate();
    calandarHandler().setDateHtml();
    calandarHandler().setCurrentTimeHtml();
    itemDataConnect().firstGet();
    await goodsDataConnect().items();
    eventGoodsHandler().makeAutoComplete()
}