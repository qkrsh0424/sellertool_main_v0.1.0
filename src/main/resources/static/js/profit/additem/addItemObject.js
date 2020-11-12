var ITEM_CLASSIFY = {
    'classifyUUID' : uuidv4(),
    'classifyName' : '',
    'classifyDesc':'',
    'classifyImage': '',
    'categorys':{},
    'options':[]
};

var STORE_LIST = [];
var CATEGORY1 = [];
var CATEGORY2 = [];
var CATEGORY3 = [];
var CATEGORY4 = [];
var SELECTED_CATEGORY = {
    'category1Id': 0,
    'category1Name': '',
    'category2Id': 0,
    'category2Name': '',
    'category3Id': 0,
    'category3Name': '',
    'category4Id': 0,
    'category4Name': ''
};
var OPTIONS = [
    // {
    //     'optionUUID': uuidv4(),
    //     'name': 'test',
    //     'remainingCount':0,
    //     'sellCount':0,
    //     'items': [
    //         {
    //             'itemUUID': uuidv4(),
    //             'storeName': '스마트 스토어',
    //             'storeType': 'TYPE_NAVER',
    //             'commitionCost': '0',
    //             'price': '0',
    //             'customerTransCost': '0',
    //             'sellerRealTransCost': '0',
    //             'purchaseCost': '0',
    //             'purchaseTransCost': '0',
    //             'extraCharge': '0'
    //         }
    //     ]
    // }
];

var OPTION_SELECTED = [];
var STORE_SELECTED = [];
var IMAGE_SELECTED = '';
var SELECTED_STORE_MODAL = [];
function testConsole() {
    console.log('분류 : ', ITEM_CLASSIFY);
    console.log('스토어 리스트 : ',STORE_LIST);
    console.log('옵션 리스트 : ',OPTIONS);
    console.log('카테고리1 : ',CATEGORY1)
    console.log('카테고리2 : ',CATEGORY2)
    console.log('카테고리3 : ',CATEGORY3)
    console.log('카테고리4 : ',CATEGORY4)
    console.log('선택된 카테고리 : ', SELECTED_CATEGORY);
    console.log('선택된 옵션 : ', OPTION_SELECTED);
    console.log('선택된 스토어 : ', STORE_SELECTED);
    console.log('선택된 이미지 : ', IMAGE_SELECTED);
    console.log($(".numOnly"));
}