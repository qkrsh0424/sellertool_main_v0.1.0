/**
    'label':``,
    'value':``,
    'itemId':'',
    'itemName':'',
    'storeType':'',
    'storeName':''
 */
var SEARCH_EL_ITEMS = [];
var SELECTED_SEARCH_ITEMS = [];
var SELL_ITEMS = [];
var DATE_SETTING = {
    'startDate': '',
    'endDate': '',
    'sellDate':''
}
var MODAL_DATA;
var CLASSIFYS = [];
var OPTIONS = [];
var BATCH_ITEM_SELECTED = [];
var TOOLTIP_TEXT = {
    'unitCustomerTransCost':'소비자 부담 운임비란?</br>소비자(구매자) -> 판매자(나) [지불하는 금액]',
    'unitSellerRealTransCost':'판매자 실질 부담 운임비란?</br>판매자(나) -> 배송업체 [지불하는 금액]',
    'unitProfit':'개당 매출 [a] = </br>[2] + [3]<hr/>개당 수익 [b] = </br>[a] * (100-[1])% - [4] - [5] - [6] - [7]',
    'unitProfitRate':'개당 수익율 [c] = </br>( ( [b] / [a] ) * 100 )%',
    'totAdsCost':'해당 판매 등록 상품에 대한 총 집행 광고 또는 마케팅 비용입니다.',
    'totExpensesCost':'해당 판매 등록 상품에 대한 총 추가 지출입니다.',
    'totEarningCost':'해당 판매 등록 상품에 대한 총 추가 수익입니다.',
    'totPurchaseTransCost':'해당 판매 등록 상품에 대한 총 매입 운임 비용입니다. <b>개당 매입 운임 비용과 대조되는 항목이며</b>, 총 매입 운임비용 등록 시 <b>개당 매입 운임비용</b>을 한 번 더 확인해 주세요.',
    'totCustomerTransCost':'해당 판매 등록 상품에 대한 총 소비자 부담 운임 비용입니다. <b>개당 소비자 부담 운임 비용과 대조되는 항목이며</b>, 총 소비자 부담 운임비용 등록 시 <b>개당 소비자 부담 운임비용</b>을 한 번 더 확인해 주세요.<hr/>소비자 부담 운임비란?</br>소비자(구매자) -> 판매자(나) [지불하는 금액]',
    'totSellerRealTransCost':'해당 판매 등록 상품에 대한 총 판매자 실질 부담 운임 비용입니다. <b>개당 판매자 실질 부담 운임 비용과 대조되는 항목이며</b>, 총 판매자 실질 부담 운임비용 등록 시 <b>개당 판매자 실질 부담 운임비용</b>을 한 번 더 확인해 주세요.<hr/>판매자 실질 부담 운임비란?</br>판매자(나) -> 배송업체 [지불하는 금액]',
    'totSales':'매출 합계 [d] = </br>[a] * [8]',
    'totProfit':'수익 합계 [e] = </br>[b] * [8] + [13] * (100-[1])% + [11] - [9] - [10] - [12] - [14]'
}
function testConsole(){
    console.log(SEARCH_EL_ITEMS);
    console.log(SELECTED_SEARCH_ITEMS);
    console.log(DATE_SETTING);
    console.log(MODAL_DATA);
}