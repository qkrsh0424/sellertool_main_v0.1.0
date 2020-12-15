// var ITEM_CLASSIFY = {
//     'classifyUUID' : uuidv4(),
//     'classifyName' : '',
//     'classifyDesc':'',
//     'classifyImage': '',
//     'categorys':{},
//     'options':[]
// };

// var STORE_LIST = [];
// var CATEGORY1 = [];
// var CATEGORY2 = [];
// var CATEGORY3 = [];
// var CATEGORY4 = [];
// var SELECTED_CATEGORY = {
//     'category1Id': 0,
//     'category1Name': '',
//     'category2Id': 0,
//     'category2Name': '',
//     'category3Id': 0,
//     'category3Name': '',
//     'category4Id': 0,
//     'category4Name': ''
// };
// var SEARCHED_CATEGORY = []; // TY REFACTORING
// var OPTIONS = [
//     // {
//     //     'optionUUID': uuidv4(),
//     //     'name': 'test',
//     //     'remainingCount':0,
//     //     'sellCount':0,
//     //     'items': [
//     //         {
//     //             'itemUUID': uuidv4(),
//     //             'storeName': '스마트 스토어',
//     //             'storeType': 'TYPE_NAVER',
//     //             'commitionCost': '0',
//     //             'price': '0',
//     //             'customerTransCost': '0',
//     //             'sellerRealTransCost': '0',
//     //             'purchaseCost': '0',
//     //             'purchaseTransCost': '0',
//     //             'extraCharge': '0'
//     //         }
//     //     ]
//     // }
// ];

// var OPTION_SELECTED = [];
// var STORE_SELECTED = [];
// var IMAGE_SELECTED = '';
// var SELECTED_STORE_MODAL = [];

function addItemObjectInit(){
    ITEM_CLASSIFY = {
        'classifyUUID' : uuidv4(),
        'classifyName' : '',
        'classifyDesc':'',
        'classifyImage': '',
        'categorys':{},
        'options':[]
    };
    
    STORE_LIST = [];
    CATEGORY1 = [];
    CATEGORY2 = [];
    CATEGORY3 = [];
    CATEGORY4 = [];
    SELECTED_CATEGORY = {
        'category1Id': 0,
        'category1Name': '',
        'category2Id': 0,
        'category2Name': '',
        'category3Id': 0,
        'category3Name': '',
        'category4Id': 0,
        'category4Name': ''
    };
    SEARCHED_CATEGORY = []; // TY REFACTORING
    OPTIONS = [
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
    
    OPTION_SELECTED = [];
    STORE_SELECTED = [];
    IMAGE_SELECTED = '';
    SELECTED_STORE_MODAL = [];
}