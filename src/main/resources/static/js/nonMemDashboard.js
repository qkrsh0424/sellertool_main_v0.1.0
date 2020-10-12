init();
function init() {
    loadItems();
}

function loadItems() {
    let items = JSON.parse(window.localStorage.getItem("nonmemberItems"));
    if (items) {
        let html = ``;
        for (let i = 0; i < items.length; i++) {
            html += `
                <div class="nms-dash-itembox" id="nonmemItem-${items[i].id}">
                    
                    ${loadTitleHtml(items[i]).load(i+1)}
                    ${loadMarginAndUnitHtml(items[i]).load()}
                    ${loadSumAndViewDetailBtnHtml(items[i]).load()}
                    <div class="collapse" id="nonMemCollapse-${items[i].id}">
                        <div class="card card-body">
                            <div class="row">
                                ${loadUnitDetail(jsonToBase64(items[i])).load()}
                                ${loadTotalDetailHtml(jsonToBase64(items[i])).load()}
                                
                            </div>
                            <div class="row p-2" style="border-top:1px solid #f1f1f1;">
                                ${loadUnitDetailResultHtml(items[i]).load()}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        $("#nonMemItemsList").html(html);
        calculateSum().getIncome();
    }
}

function loadTitleHtml(item){
    
    return {
        load:function(num){
            return `<div id="nonMemDashboard-title-${item.id}" class="clearfix">
                        <h5 class="float-left mt-2">${num}. 상품명 : ${item.name}</h5>
                        <button class="nms-dash-trash-button float-left" onclick="itemDelete().one('${item.id}')">
                            <svg  width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-trash2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M3.18 4l1.528 9.164a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836L12.82 4H3.18zm.541 9.329A2 2 0 0 0 5.694 15h4.612a2 2 0 0 0 1.973-1.671L14 3H2l1.721 10.329z"/>
                                <path d="M14 3c0 1.105-2.686 2-6 2s-6-.895-6-2 2.686-2 6-2 6 .895 6 2z"/>
                                <path fill-rule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z"/>
                            </svg>
                        </button>
                    </div>`;
        },
        reload:function(num){
            $(`#nonMemDashboard-title-${item.id}`).html(
                `<h5 class="float-left mt-2">${num}. 상품명 : ${item.name}</h5>
                <button class="nms-dash-trash-button float-left" onclick="itemDelete().one('${item.id}')">
                    <svg  width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-trash2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M3.18 4l1.528 9.164a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836L12.82 4H3.18zm.541 9.329A2 2 0 0 0 5.694 15h4.612a2 2 0 0 0 1.973-1.671L14 3H2l1.721 10.329z"/>
                        <path d="M14 3c0 1.105-2.686 2-6 2s-6-.895-6-2 2.686-2 6-2 6 .895 6 2z"/>
                        <path fill-rule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z"/>
                    </svg>
                </button>`
            );
        }
    }
}

function loadMarginAndUnitHtml(item){
    return{
        load:function(){
            return `
                <div class="row" id="nonMemDashboard-margin-and-unit-${item.id}">
                    <div class="col-sm-6 col-xs-12 text-left">
                        <h6 id="profit-${item.id}">순수익 : ${item.margin} 원 (세전)</h6>
                    </div>
                    <div class="col-sm-6 col-xs-12 text-right">
                        <span>수량 : <span id="unit-${item.id}">${item.unit}</span>개</span>
                        <button type="button" class="btn btn-success" onclick="addUnit('${item.id}')">+</button>
                        <button type="button" class="btn btn-danger" onclick="subUnit('${item.id}')">-</button>
                    </div>
                </div>
            `;
        },
        reload:function(){
            $(`#nonMemDashboard-margin-and-unit-${item.id}`).html(
                `<div class="col-sm-6 col-xs-12 text-left">
                    <h6 id="profit-${item.id}">순수익 : ${item.margin} 원 (세전)</h6>
                </div>
                <div class="col-sm-6 col-xs-12 text-right">
                    <span>수량 : <span id="unit-${item.id}">${item.unit}</span> 개</span>
                    <button type="button" class="btn btn-success" onclick="addUnit('${item.id}',${item.margin})">+</button>
                    <button type="button" class="btn btn-danger" onclick="subUnit('${item.id}',${item.margin})">-</button>
                </div>`
            );
        }
    }
}

function loadSumAndViewDetailBtnHtml(item){
    return {
        load:function(){
            return `
                <div class="clearfix" id="nonMemDashboard-sum-and-viewDetail-${item.id}">
                    <h4 class="float-right pt-2">합계 : <span class="text-danger" id="sum-${item.id}">${item.margin * item.unit - Number(item.marketingCharge) + Number(item.totallyAdditionalIncome)}</span> 원 (세전)</h4>
                    <div class="float-left">
                    <button class="nms-dash-button1" type="button" data-toggle="collapse" data-target="#nonMemCollapse-${item.id}" aria-expanded="false" aria-controls="nonMemCollapse-${item.id}">
                        상품 상세보기
                    </button>
                    </div>
                </div>
            `;
        },
        reload:function(){
            $(`#nonMemDashboard-sum-and-viewDetail-${item.id}`).html(
                `
                <h4 class="float-right pt-2">합계 : <span class="text-danger" id="sum-${item.id}">${item.margin * item.unit - Number(item.marketingCharge) + Number(item.totallyAdditionalIncome)}</span> 원</h4>
                <div class="float-left">
                    <button class="nms-dash-button1" type="button" data-toggle="collapse" data-target="#nonMemCollapse-${item.id}" aria-expanded="false" aria-controls="nonMemCollapse-${item.id}">
                        상품 상세보기
                    </button>
                </div>
                `
            );
        }
    }
}

function loadUnitDetail(encItem){
    let item = base64ToJson(encItem);
    return{
        load:function(){
            return `
                <div class="col-sm-6" id="nonMemDashboard-unit-detail-${item.id}">
                    <h3>개당 상세 <span id="fixItemUnitDetailBtn-${item.id}"><button type="button" class="btn" onclick="loadUnitDetail('${encItem}').openUpdate();">수정</button><span></h3>
                    <div id="unit-item-detail-${item.id}" class="m-2">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">판매가격 (+) : <span>${item.sellPrice}</span> 원</li>
                            <li class="list-group-item">소비자 부담 운임비 (+) : ${item.sellTransUnitCharge} 원</li>
                            <li class="list-group-item">매입 가격 (-) : ${item.purchaseCost} 원</li>
                            <li class="list-group-item">매입 운송 비용 (-) : ${item.purchaseTransCharge} 원</li>
                            <li class="list-group-item">판매자 실질 부담 운임비 (-) : ${item.realSellTransUnitCharge} 원</li>
                            <li class="list-group-item">기타 비용 (-) : ${item.extraCharge} 원</li>
                            <li class="list-group-item">오픈 마켓 수수료 : ${item.marketCommitionPercentage} %</li>
                        </ul>
                    </div>
                </div>
            `;
        },
        openUpdate:function(){
            $(`#nonMemDashboard-unit-detail-${item.id}`).html(
                `
                    <h3>개당 상세 <span id="fixItemUnitDetailBtn-${item.id}"><button type="button" class="btn" onclick="loadUnitDetail('${encItem}').closeOrReloadUpdate()">취소</button><span></h3>
                    <form id="fixUnitItemDetailSubmit-${item.id}">
                        <input hidden id="unitItemDetailData-${item.id}" value="${encItem}"/>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">판매가격 (+) : <input type="text" name="sellPrice" value=${item.sellPrice}></input> 원</li>
                            <li class="list-group-item">소비자 부담 운임비 (+) : <input type="text" name="sellTransUnitCharge" value=${item.sellTransUnitCharge}></input> 원</li>
                            <li class="list-group-item">매입 가격 (-) : <input type="text" name="purchaseCost" value=${item.purchaseCost}></input> 원</li>
                            <li class="list-group-item">매입 운송 비용 (-) : <input type="text" name="purchaseTransCharge" value=${item.purchaseTransCharge}></input> 원</li>
                            <li class="list-group-item">판매자 실질 부담 운임비 (-) : <input type="text" name="realSellTransUnitCharge" value=${item.realSellTransUnitCharge}></input> 원</li>
                            <li class="list-group-item">기타 비용 (-) : <input type="text" name="extraCharge" value=${item.extraCharge}></input> 원</li>
                            <li class="list-group-item">오픈 마켓 수수료 : <input type="text" name="marketCommitionPercentage" value=${item.marketCommitionPercentage}></input> %</li>
                        </ul>
                        <button type="button" class="btn btn-primary" onclick="fixUnitItemDetailSave('${item.id}')">저장</button>
                    </form>
                `
            );
        },
        closeOrReloadUpdate:function(){
            $(`#nonMemDashboard-unit-detail-${item.id}`).html(
                `
                    <h3>개당 상세 <span id="fixItemUnitDetailBtn-${item.id}"><button type="button" class="btn" onclick="loadUnitDetail('${encItem}').openUpdate();">수정</button><span></h3>
                    <div id="unit-item-detail-${item.id}" class="m-2">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">판매가격 (+) : <span>${item.sellPrice}</span> 원</li>
                            <li class="list-group-item">소비자 부담 운임비 (+) : ${item.sellTransUnitCharge} 원</li>
                            <li class="list-group-item">매입 가격 (-) : ${item.purchaseCost} 원</li>
                            <li class="list-group-item">매입 운송 비용 (-) : ${item.purchaseTransCharge} 원</li>
                            <li class="list-group-item">판매자 실질 부담 운임비 (-) : ${item.realSellTransUnitCharge} 원</li>
                            <li class="list-group-item">기타 비용 (-) : ${item.extraCharge} 원</li>
                            <li class="list-group-item">오픈 마켓 수수료 : ${item.marketCommitionPercentage} 원</li>
                        </ul>
                    </div>
                `
            );
        }
    }
}

function loadTotalDetailHtml(encItem){
    let item = base64ToJson(encItem);
    return{
        load:function(){
            return `
                <div class="col-sm-6" id="nonMemDashboard-total-detail-${item.id}">
                    <h3>합산 상세<span id="fixItemTotalDetailBtn-${item.id}"><button type="button" class="btn" onclick="loadTotalDetailHtml('${encItem}').openUpdate();">수정</button><span></h3>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">총 기타 수익(+) : ${item.totallyAdditionalIncome} 원</li>
                        <li class="list-group-item">총 광고 비용(-) : ${item.marketingCharge} 원</li>
                    </ul>
                </div>
            `;
        },
        openUpdate:function(){
            $(`#nonMemDashboard-total-detail-${item.id}`).html(
                `
                    <h3>합산 상세<span id="fixItemTotalDetailBtn-${item.id}"><button type="button" class="btn" onclick="loadTotalDetailHtml('${encItem}').closeOrReloadUpdate();">취소</button><span></h3>
                    <form id="fixTotalItemDetailSubmit-${item.id}">
                        <ul class="list-group list-group-flush">
                            <input hidden value=${encItem} id="totalItemDetailData-${item.id}"/>
                            <li class="list-group-item">총 기타 수익(+) : <input type="text" name="totallyAdditionalIncome" value=${item.totallyAdditionalIncome}></input> 원</li>
                            <li class="list-group-item">총 광고 비용(-) : <input type="text" name="marketingCharge" value=${item.marketingCharge}></input> 원</li>
                        </ul>
                        <button type="button" class="btn btn-primary" onclick="totalItemDetailUpdate('${item.id}')">저장</button>
                    </form>
                `
            )
        },
        closeOrReloadUpdate:function(){
            $(`#nonMemDashboard-total-detail-${item.id}`).html(
                `
                    <h3>합산 상세<span id="fixItemTotalDetailBtn-${item.id}"><button type="button" class="btn" onclick="loadTotalDetailHtml('${encItem}').openUpdate();">수정</button><span></h3>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">총 기타 수익(+) : ${item.totallyAdditionalIncome}</li>
                        <li class="list-group-item">총 광고 비용(-) : ${item.marketingCharge}</li>
                    </ul>
                `
            );
        }
    }
}

function loadUnitDetailResultHtml(item){
    return{
        load:function(){
            return `
                <div class="col-sm-12" id="unitDetailResult-${item.id}">
                    개당 순수익 : ${item.margin} 원 | 개당 수익률 : ${item.marginRate} % | 개당 VAT(10%) : ${item.VAT_10} 원 | 개당 순수익(세후 10%) : ${item.margin - item.VAT_10} 원
                </div>
            `;
        },
        reload:function(){
            $(`#unitDetailResult-${item.id}`).html(
                `
                    개당 순수익 : ${item.margin} 원 | 개당 수익률 : ${item.marginRate} % | 개당 VAT(10%) : ${item.VAT_10} 원 | 개당 순수익(세후 10%) : ${item.margin - item.VAT_10} 원
                `
            );
        }
    }
}

function addUnit(id) {
    let items = JSON.parse(window.localStorage.getItem("nonmemberItems"));
    let item = items.filter(r=>r.id===id)[0];
    item.unit = item.unit+1;

    let jsonArr = [];
    items.map(r=>{
        if(r.id===id){
            jsonArr.push(item);
        }else{
            jsonArr.push(r);
        }
    })
    $("#unit-" + id).html(item.unit);
    $("#sum-" + id).html(item.unit * item.margin + Number(item.totallyAdditionalIncome) - Number(item.marketingCharge));
    window.localStorage.setItem("nonmemberItems", JSON.stringify(jsonArr));
    calculateSum().getIncome();
}

function subUnit(id) {
    let items = JSON.parse(window.localStorage.getItem("nonmemberItems"));
    let item = items.filter(r=>r.id===id)[0];
    item.unit = item.unit-1;

    let jsonArr = [];
    items.map(r=>{
        if(r.id===id){
            jsonArr.push(item);
        }else{
            jsonArr.push(r);
        }
    })
    $("#unit-" + id).html(item.unit);
    $("#sum-" + id).html(item.unit * item.margin + Number(item.totallyAdditionalIncome) - Number(item.marketingCharge));
    window.localStorage.setItem("nonmemberItems", JSON.stringify(jsonArr));
    calculateSum().getIncome();
}

function fixUnitItemDetailSave(id) {
    let items = JSON.parse(window.localStorage.getItem("nonmemberItems")); 
    let item = items.filter(r=>r.id===id)[0];
    let inputData = $(`#fixUnitItemDetailSubmit-${id}`).serializeObject();

    if(isNotNumber(
            inputData.purchaseCost,
            inputData.purchaseTransCharge,
            inputData.sellPrice,
            inputData.realSellTransUnitCharge,
            inputData.sellTransUnitCharge,
            inputData.marketCommitionPercentage,
            inputData.extraCharge
        )
    ){
        alert("숫자만 입력하세요.");
        return;
    }
    $.ajax({
        type: "GET", //전송방식을 지정한다 (POST,GET)
        url: "/api/margin/domesticCalc",//호출 URL을 설정한다. GET방식일경우 뒤에 파라티터를 붙여서 사용해도된다.
        dataType: "text",//호출한 페이지의 형식이다. xml,json,html,text등의 여러 방식을 사용할 수 있다.
        data: {
            purchaseCost: inputData.purchaseCost ? inputData.purchaseCost : "0",
            purchaseTransCharge: inputData.purchaseTransCharge ? inputData.purchaseTransCharge : "0",
            sellPrice: inputData.sellPrice ? inputData.sellPrice : "0",
            realSellTransUnitCharge: inputData.realSellTransUnitCharge ? inputData.realSellTransUnitCharge : "0",
            sellTransUnitCharge: inputData.sellTransUnitCharge ? inputData.sellTransUnitCharge : "0",
            marketCommitionPercentage: inputData.marketCommitionPercentage ? inputData.marketCommitionPercentage : "0",
            extraCharge:inputData.extraCharge ? inputData.extraCharge : "0"
        },
        error: function () {
            alert("server connect failed");
        },
        success: function (Parse_data) {
            let data = JSON.parse(Parse_data);

            item.purchaseCost = inputData.purchaseCost ? inputData.purchaseCost : "0";
            item.purchaseTransCharge = inputData.purchaseTransCharge ? inputData.purchaseTransCharge : "0";
            item.sellPrice = inputData.sellPrice ? inputData.sellPrice : "0";
            item.realSellTransUnitCharge = inputData.realSellTransUnitCharge ? inputData.realSellTransUnitCharge : "0";
            item.sellTransUnitCharge = inputData.sellTransUnitCharge ? inputData.sellTransUnitCharge : "0";
            item.marketCommitionPercentage = inputData.marketCommitionPercentage ? inputData.marketCommitionPercentage : "0";
            item.extraCharge = inputData.extraCharge ? inputData.extraCharge : "0";
            item.margin = data.margin;
            item.marginRate = data.marginRate;
            item.VAT_10 = data.VAT_10;
            item.marginAfterVAT_10 = data.margin - data.VAT_10;

            let jsonArr = [];
            items.map(r=>{
                if(r.id === id){
                    jsonArr.push(item);
                }else{
                    jsonArr.push(r);
                }
            })
            let jsonToStr = JSON.stringify(jsonArr);
            window.localStorage.setItem("nonmemberItems",jsonToStr);
            
            loadMarginAndUnitHtml(item).reload();
            loadSumAndViewDetailBtnHtml(item).reload();
            loadUnitDetailResultHtml(item).reload();
            loadUnitDetail(jsonToBase64(item)).closeOrReloadUpdate();
            calculateSum().getIncome();
        }
    });
}

function totalItemDetailUpdate(id){
    let items = JSON.parse(window.localStorage.getItem("nonmemberItems")); 
    let item = items.filter(r=>r.id===id)[0];

    let inputData = $(`#fixTotalItemDetailSubmit-${id}`).serializeObject();
    let newMarketingCharge = inputData.marketingCharge ? inputData.marketingCharge : "0";
    let newTotallyAdditionalIncome = inputData.totallyAdditionalIncome ? inputData.totallyAdditionalIncome : "0";
    
    item.marketingCharge=newMarketingCharge
    item.totallyAdditionalIncome=newTotallyAdditionalIncome

    let jsonArr = [];

    items.map(r=>{
        if(r.id === id){
            jsonArr.push(item);
        }else{
            jsonArr.push(r);
        }
    })

    let jsonToStr = JSON.stringify(jsonArr);
    window.localStorage.setItem("nonmemberItems",jsonToStr);
    loadMarginAndUnitHtml(item).reload();
    loadSumAndViewDetailBtnHtml(item).reload();
    loadTotalDetailHtml(jsonToBase64(item)).closeOrReloadUpdate();
    calculateSum().getIncome();
}

function calculateSum(){
    return{
        getIncome:function(){
            let items = JSON.parse(window.localStorage.getItem("nonmemberItems"));
            let sum = 0;
            items.map(r=>{
                sum += r.margin * r.unit - Number(r.marketingCharge) + Number(r.totallyAdditionalIncome);
            });
            $("#sumAllIncome").html(sum);
        }
    }
}

function itemDelete(){
    return{
        one:function(id){
            let items = JSON.parse(window.localStorage.getItem("nonmemberItems"));
            items = items.filter(r=>r.id!=id);
            let jsonToStr = JSON.stringify(items);
            window.localStorage.setItem("nonmemberItems",jsonToStr);
            loadItems();
        },
        all:function(){
            if(confirm("정말로 모두 삭제하시겠습니까?")){
                let jsonArr = [];
                let jsonToStr = JSON.stringify(jsonArr);
                window.localStorage.setItem("nonmemberItems",jsonToStr);
                loadItems();
            }
        }
    }
    
}