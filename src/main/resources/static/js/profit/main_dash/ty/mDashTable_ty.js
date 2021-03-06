function loadTableHtml() {
    return {
        selledItemsHtml: function() {
            let bodyListHtml = `
                
            `;
            SELLED_ITEMS.forEach((r, index) => {
                // Value Data Model => 매출 합계, 수익 합계
                let totValue = tableDataHandler().costValCalc(r);
                let totSales = totValue.getTotSales();
                let totProfit = totValue.getTotProfit();
                bodyListHtml += `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <th scope="row">
                            ${calandarHandler().formatDateFitInput(r.sellSelldate)}
                        </th>
                        <th>${r.itemData.itemName}</th>
                        <td>${r.itemData.itemStoreName}</td>
                        <td id="i_td_sellTag_box_${r.sellId}">
                            <span>${r.sellTag}</span>
                        </td>
                        <td id="i_td_sellCount_box_${r.sellId}">
                            <span>${r.sellCount}</span>
                        </td>
                        <td>${numberWithCommas(totSales)}</td>
                        <td>${numberWithCommas(totValue.getTotSalesMargin())}</td>
                        <td>${numberWithCommas(totProfit)}</td>
                        <td>${numberWithCommas(r.sellTotAdsCost)}</td>
                        <td>${totSales !=0 ? ((totProfit/totSales)*100).toFixed(2) : '매출 데이터 오류'}</td>
                        <td>${r.sellTotAdsCost !=0 ? ((totProfit/r.sellTotAdsCost)*100).toFixed(2) : '0'}</td>
                    </tr>
                `
            })

            let footListHtml = ``
            let totalValueSum = tableDataHandler().handleDataTotalSumValue().getTotalValueArr();
            footListHtml += `
                    <tr>
                        <th scope="row">총합계</th>
                        <th scope="row">${totalValueSum.startDate}~${totalValueSum.endDate}</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        
                        <th id="i_td_sellCount_box_${totalValueSum.itemId}">
                            <span>${totalValueSum.sellCountSum}</span>
                        </th>
                        <th>${numberWithCommas(totalValueSum.totSalesSum)}</th>
                        <th>${numberWithCommas(totalValueSum.totSalesMarginSum)}</th>
                        <th>${numberWithCommas(totalValueSum.totProfitSum)}</th>
                        <th>${numberWithCommas(totalValueSum.totAdsCostSum)}</th>
                        <th>${totalValueSum.totSalesSum != 0 ? ((totalValueSum.totProfitSum / totalValueSum.totSalesSum) * 100).toFixed(2):'매출 데이터 오류'}</th>
                        <th>${totalValueSum.totAdsCostSum != 0 ? ((totalValueSum.totProfitSum / totalValueSum.totAdsCostSum) * 100).toFixed(2):'0'}</th>
                    </tr>
            `

            let html = `
                <table class="table overflow-table text-center table-hover ty-st-mDash-table">
                    <thead class="ty-st-mDash-thead">
                    <tr>
                        <th scope="col" width="70">#</th>
                        <th scope="col" width="200">판매 날짜&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-outline-light" onclick="tableDataHandler().turnOrderByClick()"><i class="fas fa-sort"></i></button></th>
                        <th scope="col" width="200">상품명</th>
                        <th scope="col" width="100">마켓 종류</th>
                        <th scope="col" width="100">상품 태그</th>
                        <th scope="col" width="80">판매 개수 <div class="st-sd-sell-unit">단위 : [개]</div></th>
                        <th scope="col" width="150">수익(매출) 합계<div class="st-sd-sell-unit">단위 : [원]</div></th>
                        <th scope="col" width="150">합계 매출총이익<div class="st-sd-sell-unit">단위 : [원]</div></th>
                        <th scope="col" width="150">순수익 합계<div class="st-sd-sell-unit">단위 : [원]</div></th>
                        <th scope="col" width="150">광고비 합계<div class="st-sd-sell-unit">단위 : [원]</div></th>
                        <th scope="col" width="150">순수익율<div class="st-sd-sell-unit">단위 : [%]</div></th>
                        <th scope="col" width="150">ROI<div class="st-sd-sell-unit">단위 : [%]</div></th>
                    </tr>
                    </thead>
                    <tbody>
                        ${bodyListHtml}
                    </tbody>
                    <tfoot class="ty-st-mDash-tfoot">
                        ${footListHtml}
                    </tfoot>
                  
                </table>
            `;

            $("#i_ty_table_date_sum").removeClass("ty-st-mDash-table-date-btn-active-left")
            $("#i_ty_table_date_data").addClass("ty-st-mDash-table-date-btn-active-right")

            $("#i_mdash_selled_item_list").html(html);

        },
        selledItemsSumHtml: function() {
            let bodyListHtml = `
                
            `;

            let itemTotalValueSum = tableDataHandler().handleDataByItemName().getItemDataArr();
            itemTotalValueSum.forEach((r, index) => {
                bodyListHtml += `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <th scope="row">${r.startDate}~${r.endDate}</th>
                        <th>${r.itemName}</th>
                        <td>${r.itemStoreName}</td>
                        <td id="i_td_sellCount_box_${r.itemId}">
                            <span>${r.sellCountSum}</span>
                        </td>
                        <td>${numberWithCommas(r.totSalesSum)}</td>
                        <td>${numberWithCommas(r.totSalesMarginSum)}</td>
                        <td>${numberWithCommas(r.totProfitSum)}</td>
                        <td>${numberWithCommas(r.totAdsCostSum)}</td>
                        <td>${r.totSalesSum !=0 ? ((r.totProfitSum/r.totSalesSum)*100).toFixed(2) : '매출 데이터 오류'}</td>
                        <td>${r.totAdsCostSum !=0 ? ((r.totProfitSum/r.totAdsCostSum)*100).toFixed(2) : '0'}</td>
                    </tr>
                `
            })

            let footListHtml = ``
            let totalValueSum = tableDataHandler().handleDataTotalSumValue().getTotalValueArr();
            footListHtml += `
                    <tr>
                        <th scope="row">총합계</th>
                        <th scope="row">${totalValueSum.startDate}~${totalValueSum.endDate}</th>
                        <th></th>
                        <th></th>
                        <th id="i_td_sellCount_box_${totalValueSum.itemId}">
                            <span>${totalValueSum.sellCountSum}</span>
                        </th>
                        <th>${numberWithCommas(totalValueSum.totSalesSum)}</th>
                        <th>${numberWithCommas(totalValueSum.totSalesMarginSum)}</th>
                        <th>${numberWithCommas(totalValueSum.totProfitSum)}</th>
                        <th>${numberWithCommas(totalValueSum.totAdsCostSum)}</th>
                        <th>${totalValueSum.totSalesSum != 0 ? ((totalValueSum.totProfitSum / totalValueSum.totSalesSum) * 100).toFixed(2):'매출 데이터 오류'}</th>
                        <th>${totalValueSum.totAdsCostSum != 0 ? ((totalValueSum.totProfitSum / totalValueSum.totAdsCostSum) * 100).toFixed(2):'0'}</th>
                    </tr>
                `
            let html = `
                <table class="table overflow-table text-center table-hover ty-st-mDash-table">
                    <thead class="ty-st-mDash-thead">
                    <tr>
                        <th scope="col" width="70">#</th>
                        <th scope="col" width="200">판매 날짜&nbsp;&nbsp;&nbsp;</th>
                        <th scope="col" width="200">상품명</th>
                        <th scope="col" width="120">마켓 종류</th>
                        <th scope="col" width="120">판매 개수 <div class="st-sd-sell-unit">단위 : [개]</div></th>
                        <th scope="col" width="150">수익(매출) 합계<div class="st-sd-sell-unit">단위 : [원]</div></th>
                        <th scope="col" width="150">합계 매출총이익<div class="st-sd-sell-unit">단위 : [원]</div></th>
                        <th scope="col" width="150">순수익 합계<div class="st-sd-sell-unit">단위 : [원]</div></th>
                        <th scope="col" width="150">광고비 합계<div class="st-sd-sell-unit">단위 : [원]</div></th>
                        <th scope="col" width="150">순수익율<div class="st-sd-sell-unit">단위 : [%]</div></th>
                        <th scope="col" width="150">ROI<div class="st-sd-sell-unit">단위 : [%]</div></th>
                    </tr>
                    </thead>
                    <tbody>
                        ${bodyListHtml}
                    </tbody>
                    <tfoot class="ty-st-mDash-tfoot">
                        ${footListHtml}
                    </tfoot>
                </table>
            `;

            $("#i_ty_table_date_data").removeClass("ty-st-mDash-table-date-btn-active-right")
            $("#i_ty_table_date_sum").addClass("ty-st-mDash-table-date-btn-active-left")

            $("#i_mdash_selled_item_list").html(html);
        }
    }
}

function tableDataHandler() {
    return {
        // TODO ROAS ROI 계산법 검토
        costValCalc: function(rData) {
            // ** 개당 데이터 **
            let cc = Number(rData.sellCommitionCost); // 수수료
            let up = Number(rData.sellPrice); // 개당 판매가
            let uct = Number(rData.sellCustomerTransCost); // 개당 소비자 운임 비용
            let ust = Number(rData.sellSellerRealTransCost); // 개당 판매자 실질 부담 운임비용
            let upu = Number(rData.sellPurchaseCost); // 개당 매입 가격
            let uput = Number(rData.sellPurchaseTransCost); // 개당 매입 운임비용
            let ue = Number(rData.sellExtraCharge); //개당 기타 비용
            // ** 총 데이터 **
            let n = Number(rData.sellCount); // 판매 개수
            let tads = Number(rData.sellTotAdsCost); // 총 광고 비용
            let texp = Number(rData.sellTotExpensesCost); // 총 추가 지출
            let tear = Number(rData.sellTotEarningCost); // 총 추가 수익
            let tput = Number(rData.sellTotPurchaseTransCost); // 총 매입 운임 비용
            let tct = Number(rData.sellTotCustomerTransCost); // 총 소비자 운임 비용
            let tst = Number(rData.sellTotSellerRealTransCost); // 총 판매자 실질 부담 운임 비용
            // ** 개당 조합 데이터 **
            let unitSales = up + uct; // 실질판매가 개당 매출 sau
            let mf = parseInt(unitSales * (cc / 100)); // 마켓 수수료비 mf= 실질 판매가( 판매가 + 소비자 부담 운임비) * 수수료(%)
            let unitMarginCost = upu + uput + ust + ue + mf; // 개당 마진 원가 | 개당 매출 원가 | 개당 매입 원가 cpu
            let unitProfit = unitSales - unitMarginCost; // 개당 수익
            let unitProfitRate = 0; // 개당 수익율

            if (unitSales === 0) {
                unitProfitRate = 0;
            } else {
                unitProfitRate = Number((unitProfit / ((unitSales)) * 100).toFixed(2));
            }
            // ** 합계 조합 데이터 **
            let totSales = unitSales * n + tct; // 합계 매출 sam = 개당 실질 판매가 * 개수 + 총 소비자 운임비용
            let totMarginCost = unitMarginCost * n + tads + texp - tear + tput + parseInt((tct * (cc / 100))) + tst; // 합계 마진 원가 | 합계 매출 원가 | 합계 매입 원가 cpm
            let totProfit = totSales - totMarginCost; // 합계 수익 npm
            let totSalesMargin = totSales - n*( upu ) - ( n*uput+tput )
            let adsROAS = 0;
            let adsROI = 0;
            let sellROI = 0;
            if (tads != 0) {
                adsROAS = Number(((totSales / tads) * 100).toFixed(2));
                adsROI = Number(((totProfit / tads) * 100).toFixed(2));
            }
            if (totMarginCost != 0) {
                sellROI = Number(((totProfit / totMarginCost) * 100).toFixed(2));
            }

            return {
                getUnitSales: function() { return unitSales; },
                getUnitProfit: function() { return unitProfit; },
                getUnitProfitRate: function() { return unitProfitRate; },
                getTotProfit: function() { return totProfit; },
                getTotSales: function() { return totSales; },
                getAdsROAS: function() { return adsROAS; },
                getAdsROI: function() { return adsROI; },
                getSellROI: function() { return sellROI; },
                getTotMarginCost: function() { return totMarginCost; },
                getTotSalesMargin: function(){ return totSalesMargin }
            }
        },
        handleDataByItemName: function() {
            var selledItemSet = new Set();
            let itemDataArr = [];
            let itemNameArr = [];
            let itemStoreArr = [];
            SELLED_ITEMS.forEach(r => {
                if (r.sellCount > 0) {
                    if (!selledItemSet.has(r.itemId)) {
                        selledItemSet.add(r.itemId);
                        itemNameArr.push(`${r.itemData.itemName}`);
                        itemStoreArr.push(`${r.itemData.itemStoreName}`);
                    }
                }
            });
            selledItemSet.forEach(s => {
                let json = {
                    'itemId': '',
                    'itemName': '',
                    'totSalesSum': 0,
                    'totProfitSum': 0,
                    'sellCountSum': 0,
                    'totAdsCostSum': 0,
                    'totMarginCostSum': 0,
                    'sellSelldate': '',
                    'totSalesMarginSum':0,
                    'startDate': calandarHandler().formatDateFitInput(DATE_SETTING.startDate),
                    'endDate': calandarHandler().formatDateFitInput(DATE_SETTING.endDate)
                }
                SELLED_ITEMS.forEach(d => {
                    if (s == d.itemId) {
                        let totValue = tableDataHandler().costValCalc(d);
                        let totSales = totValue.getTotSales();
                        let totProfit = totValue.getTotProfit();
                        let totMarginCost = totValue.getTotMarginCost();
                        json.itemId = d.itemId;
                        json.itemName = `${d.itemData.itemName}`;
                        json.itemStoreName = `${d.itemData.itemStoreName}`;
                        json.totSalesSum += totSales;
                        json.totProfitSum += totProfit;
                        json.sellCountSum += d.sellCount;
                        json.totAdsCostSum += d.sellTotAdsCost;
                        json.totMarginCostSum += totMarginCost;
                        json.sellSelldate = d.sellSelldate;
                        json.totSalesMarginSum += totValue.getTotSalesMargin();
                    }
                });
                // ORIGIN
                itemDataArr.push(json);
            })


            return {
                getItemDataArr: function() { return itemDataArr; },
                getItemNameRange: function() { return itemNameArr; },
                getItemStoreRange: function() { return itemStoreArr; },
                getTotSalesSumArr: function() { return itemDataArr.map(r => r.totSalesSum); },
                getTotProfitSumArr: function() { return itemDataArr.map(r => r.totProfitSum); },
                getSellCountDataArr: function() { return itemDataArr.map(r => r.sellCountSum); },
                getTotAdsSumArr: function() { return itemDataArr.map(r => r.totAdsCostSum); },
                getTotSalesMarginSum: function(){ return itemDataArr.map(r => r.totSalesMarginSum); }
            }
        },
        handleDataTotalSumValue: function() {
            let totalValueByDate = {};

            let json = {
                'totSalesSum': 0,
                'totProfitSum': 0,
                'sellCountSum': 0,
                'totAdsCostSum': 0,
                'totMarginCostSum': 0,
                'sellSelldate': '',
                'totSalesMarginSum':0,
                'startDate': calandarHandler().formatDateFitInput(DATE_SETTING.startDate),
                'endDate': calandarHandler().formatDateFitInput(DATE_SETTING.endDate)
            }
            SELLED_ITEMS.forEach(d => {
                let totValue = tableDataHandler().costValCalc(d);
                let totSales = totValue.getTotSales();
                let totProfit = totValue.getTotProfit();
                let totMarginCost = totValue.getTotMarginCost();
                json.totSalesSum += totSales;
                json.totProfitSum += totProfit;
                json.sellCountSum += d.sellCount;
                json.totAdsCostSum += d.sellTotAdsCost;
                json.totMarginCostSum += totMarginCost;
                json.sellSelldate = d.sellSelldate;
                json.totSalesMarginSum += totValue.getTotSalesMargin();

            });
            // ORIGIN
            // totalValueByDate.push(json);
            totalValueByDate=json;

            return {
                getTotalValueArr: function() { return totalValueByDate; },
                getTotSalesSum: function() { return totalValueByDate.totSalesSum; },
                getTotProfitSum: function() { return totalValueByDate.totProfitSum; },
                getTotSellCount: function() { return totalValueByDate.sellCountSum; },
                getTotAdsSum: function() { return totalValueByDate.totAdsCostSum; },
                getTotSalesMarginSum: function(){ return totalValueByDate.totSalesMarginSum; }
            }
        },
        turnOrderByClick: async function() {
            if (ORDERBY === 'DESC') {
                ORDERBY = 'ASC';
            } else {
                ORDERBY = 'DESC';
            }
            await dataConnect().getSellItemByCondition();
            loadTableHtml().selledItemsHtml();
            // loadTableHtml().selledItemsSumHtml();
        },
        tableModeChangeClick: function() {
            return {
                setSum: function() {
                    loadTableHtml().selledItemsSumHtml();
                },
                setDate: function() {
                    loadTableHtml().selledItemsHtml();
                }
            }
        }
    }
}