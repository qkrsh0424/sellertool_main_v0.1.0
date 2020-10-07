init();
function init(){
    loadItems();
}

function loadItems(){
    let items = JSON.parse(window.localStorage.getItem("nonmemberItems"));
    if(items){
        let html = ``;
        for(let i = 0 ; i < items.length; i++){
            html += `
                
                <div style="border: 2px solid gray; border-radius: 10px; padding:15px; margin:8px 0;" id="nonmemItem-${items[i].id}">
                    <h5>${i+1}. 상품명 : ${items[i].name}</h5>
                    <div class="row">
                        <div class="col-sm-6 col-xs-12 text-left">
                            <h6 id="profit-${items[i].id}">순수익 : ${items[i].margin} 원 (세전)</h6>
                        </div>
                        <div class="col-sm-6 col-xs-12 text-right">
                            <span>수량 : <span id="unit-${items[i].id}">${items[i].unit}</span>개</span>
                            <button type="button" class="btn btn-success" onclick="addUnit('${items[i].id}',${items[i].margin})">+</button>
                            <button type="button" class="btn btn-danger" onclick="subUnit('${items[i].id}',${items[i].margin})">-</button>
                        </div>
                    </div>
                    <div class="clearfix">
                        <h4 class="float-right pt-2">합계 : <span class="text-danger" id="sum-${items[i].id}">${items[i].margin * items[i].unit}</span></h4>
                        <div class="float-left">
                        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#nonMemCollapse-${items[i].id}" aria-expanded="false" aria-controls="nonMemCollapse-${items[i].id}">
                            상품 상세보기
                        </button>
                        </div>
                    </div>
                    <div class="collapse" id="nonMemCollapse-${items[i].id}">
                        <div class="card card-body">
                            판매가격 : ${items[i].sellPrice}
                            소비자 부담 운임비 : ${items[i].sellTransUnitCharge}
                            판매자 실질 부담 운임비 : ${items[i].realSellTransUnitCharge}
                            매입 가격 : ${items[i].purchaseCost}
                            매입 운송 비용 : ${items[i].purchaseTransCharge}
                            기타 비용 : ${items[i].extraCharge}
                            오픈 마켓 수수료 : ${items[i].marketCommitionPercentage}
                            순수익 : ${items[i].margin}
                            수익률 : ${items[i].marginRate}
                            VAT(10%) : ${items[i].VAT_10}
                            순수익(세후 10%) : ${items[i].margin - items[i].VAT_10}
                        </div>
                    </div>
                </div>
            `;
        }
        $("#nonMemItemsList").html(html);
    }
}

function addUnit(id, margin){
    let items = [];
    items = items.concat(JSON.parse(window.localStorage.getItem("nonmemberItems")));
    console.log(id);
    
    let m = 0;
    items.map(r=>{
        if(r.id===id){
            m = ++r.unit;
        }
    });
    $("#unit-"+id).html(m);
    $("#sum-"+id).html(m*margin);
    window.localStorage.setItem("nonmemberItems",JSON.stringify(items));
}

function subUnit(id, margin){
    let items = [];
    items = items.concat(JSON.parse(window.localStorage.getItem("nonmemberItems")));
    let m = 0;
    items.map(r=>{
        if(r.id===id && r.unit>0){
            m = --r.unit;
        }
    });
    $("#unit-"+id).html(m);
    $("#sum-"+id).html(m*margin);
    window.localStorage.setItem("nonmemberItems",JSON.stringify(items));
}