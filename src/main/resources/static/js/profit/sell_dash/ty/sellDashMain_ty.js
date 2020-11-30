init();

async function init() {
    calandarHandler().designCalandar_ty();
    calandarHandler().setCurrentTimeHtml();
    calandarHandler().setInitDate();
    itemDataConnect().firstGet();
    await goodsDataConnect().items();
    await loadStoreHtml().setInitStore()
    eventGoodsHandler().showHaveItemList()


}