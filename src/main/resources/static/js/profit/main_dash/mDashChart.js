function chartLoader(){
    return{
        hideAndShow: function(){
            if(isMember()){
                $(".st-chart-invisible").css('display','none');
            }
            if (localStorage.getItem("MD_MGRAPH_HIDE") && localStorage.getItem("MD_MGRAPH_HIDE") == 1) {
                $('div[sttg=mdash-main-graph]').css('display', 'none');
                $('button[sttg=mdash-main-graph-btn]').html('보이기');
                $('button[sttg=mdash-main-graph-btn]').attr('onclick', 'eventChartHandler().mainGraph().show()');
            }
            if (localStorage.getItem("MD_DGRAPH_HIDE") && localStorage.getItem("MD_DGRAPH_HIDE") == 1) {
                $('div[sttg=mdash-date-graph]').css('display', 'none');
                $('button[sttg=mdash-date-graph-btn]').html('보이기');
                $('button[sttg=mdash-date-graph-btn]').attr('onclick', 'eventChartHandler().dateGraph().show()');
            }
            if (localStorage.getItem("MD_CGRAPH_HIDE") && localStorage.getItem("MD_CGRAPH_HIDE") == 1) {
                $('div[sttg=mdash-classify-graph]').css('display', 'none');
                $('button[sttg=mdash-classify-graph-btn]').html('보이기');
                $('button[sttg=mdash-classify-graph-btn]').attr('onclick', 'eventChartHandler().classifyGraph().show()');
            }
            if (localStorage.getItem("MD_IGRAPH_HIDE") && localStorage.getItem("MD_IGRAPH_HIDE") == 1) {
                $('div[sttg=mdash-item-graph]').css('display', 'none');
                $('button[sttg=mdash-item-graph-btn]').html('보이기');
                $('button[sttg=mdash-item-graph-btn]').attr('onclick', 'eventChartHandler().itemGraph().show()');
            }
        },
        load: function(){
            makeChart().getMainChart();
            makeChart().getRoAdsChart();
            makeChart().getRoInvChart();
            makeChart().getSellCountByDateChart();
            makeChart().getTotSumDataByClassifyChart();
            makeChart().getSellCountByClassifyChart();
            makeChart().getTotAdsSumDataByClassifyChart();
            makeChart().getRoInvDataByClassifyChart();
            makeChart().getRoAdsDataByClassifyChart();
            makeChart().getTotSumDataByItemChart();
            makeChart().getSellCountByItemChart();
            makeChart().getAdsSumByItemChart();
            makeChart().getRoInvDataByItemChart();
            makeChart().getRoAdsDataByItemChart();
        }
    }
}
function makeChart() {
    return {
        getMainChart: function () {
            let dataSetter = chartDataHandler().handleDataByDate();
            let datasets = [
                {
                    label: '기간별 총 수익(매출)',
                    data: dataSetter.getTotSalesSumArr(),
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor: '#c2a4ff',
                    borderWidth: 1
                },
                {
                    label: '기간별 총 순수익',
                    data: dataSetter.getTotProfitSumArr(),
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: '기간별 총 광고비',
                    data: dataSetter.getTotAdsSumArr(),
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
            MAIN_CHART.destroy();
            MAIN_CHART = new Chart(MAIN_CTX, {
                type: 'line',
                data: {
                    labels: dataSetter.getDateRange(),
                    datasets: datasets
                },
                options: CHART_OPTION.vertical.cost
            });
        },
        getRoAdsChart: function () {
            let dataSetter = chartDataHandler().handleDataByDate();
            let datasets = [
                {
                    label: '광고 대비 ROI (기간 총 순수익 / 기간 총 광고비용)',
                    data: dataSetter.getTotROIByAdsArr(),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: '광고 대비 ROAS (기간 총 수익(매출) / 기간 총 광고비용)',
                    data: dataSetter.getTotROASByAdsArr(),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
            ROADS_CHART.destroy();
            ROADS_CHART = new Chart(ROADS_CTX, {
                type: 'line',
                data: {
                    labels: dataSetter.getDateRange(),
                    datasets: isMember()?datasets:''
                },
                options: CHART_OPTION.vertical.percent
            });
        },
        getRoInvChart: function () {
            let dataSetter = chartDataHandler().handleDataByDate();
            let datasets = [
                {
                    label: '투자 대비 ROI (기간 총 순수익 / 기간 총 투자비용)',
                    data: dataSetter.getTotROIBySellArr(),
                    backgroundColor: 'rgba(1, 1, 235, 0.2)',
                    borderColor: 'rgba(1, 1, 235, 1)',
                    borderWidth: 1
                }
            ]
            ROINV_CHART.destroy();
            ROINV_CHART = new Chart(ROINV_CTX, {
                type: 'line',
                data: {
                    labels: dataSetter.getDateRange(),
                    datasets: isMember()?datasets:''
                },
                options: CHART_OPTION.vertical.percent
            });
        },
        getSellCountByDateChart: function () {
            let dataSetter = chartDataHandler().handleDataByDate();
            let datasets = [
                {
                    label: '판매 개수',
                    data: dataSetter.getSellCountSum(),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
            ];
            SCBDATE_CHART.destroy();
            SCBDATE_CHART = new Chart(SCBDATE_CTX, {
                type: 'bar',
                data: {
                    labels: dataSetter.getDateRange(),
                    datasets: isMember()?datasets:''
                },
                options: CHART_OPTION.vertical.unitBar
            });
        },
        getTotSumDataByClassifyChart: function () {
            let dataSetter = chartDataHandler().handleDataByClassifyName();
            let datasets = [
                {
                    label: '상품별 총 판매 수익(매출)',
                    data: dataSetter.getTotSalesSumArr(),
                    backgroundColor: '#c2a4ff42',
                    borderColor: '#c2a4ff',
                    borderWidth: 1
                },
                {
                    label: '상품별 총 순수익',
                    data: dataSetter.getTotProfitSumArr(),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
            ];
            TSBCLF_CHART.destroy();
            TSBCLF_CHART = new Chart(TSBCLF_CTX, {
                type: 'bar',
                data: {
                    labels: dataSetter.getItemNameRange(),
                    datasets: isMember()?datasets:''
                },
                options: CHART_OPTION.vertical.cost
            });
        },
        getSellCountByClassifyChart: function () {
            let dataSetter = chartDataHandler().handleDataByClassifyName();
            var colorArr = [];
            dataSetter.getSellCountDataArr().forEach(r => {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                colorArr.push("rgb(" + r + "," + g + "," + b + ",0.4)");
            })
            let datasets = [
                {
                    label: '상품별 총 판매 개수 [개]',
                    data: dataSetter.getSellCountDataArr(),
                    backgroundColor: colorArr,
                    borderColor: colorArr,
                    borderWidth: 1
                }
            ];
            SCBCLF_CHART.destroy();
            SCBCLF_CHART = new Chart(SCBCLF_CTX, {
                type: 'pie',
                data: {
                    labels: dataSetter.getItemNameRange(),
                    datasets: isMember()?datasets:''
                },
                options: CHART_OPTION.default
            });
        },
        getTotAdsSumDataByClassifyChart: function () {
            let dataSetter = chartDataHandler().handleDataByClassifyName();
            let datasets = [
                {
                    label: '상품별 총 광고 비용',
                    data: dataSetter.getTotAdsSumArr(),
                    backgroundColor: '#c2a4ff42',
                    borderColor: '#c2a4ff',
                    borderWidth: 1
                }
            ];
            TADSBCLF_CHART.destroy();
            TADSBCLF_CHART = new Chart(TADSBCLF_CTX, {
                type: 'bar',
                data: {
                    labels: dataSetter.getItemNameRange(),
                    datasets: isMember()?datasets:''
                },
                options: CHART_OPTION.vertical.cost
            });
        },
        getRoAdsDataByClassifyChart: function () {
            let dataSetter = chartDataHandler().handleDataByClassifyName();
            let datasets = [
                {
                    label: '광고 대비 ROI (기간 총 순수익 / 기간 총 광고비용)',
                    data: dataSetter.getTotROIByAdsArr(),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: '광고 대비 ROAS (기간 총 수익(매출) / 기간 총 광고비용)',
                    data: dataSetter.getTotROASByAdsArr(),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
            T_ROADS_BCLF_CHART.destroy();
            T_ROADS_BCLF_CHART = new Chart(T_ROADS_BCLF_CTX, {
                type: 'line',
                data: {
                    labels: dataSetter.getItemNameRange(),
                    datasets: isMember()?datasets:''
                },
                options: CHART_OPTION.vertical.percent
            });
        },
        getRoInvDataByClassifyChart: function () {
            let dataSetter = chartDataHandler().handleDataByClassifyName();
            let datasets = [
                {
                    label: '투자 대비 ROI (기간 총 순수익 / 기간 총 투자비용) [%]',
                    data: dataSetter.getTotROIBySellArr(),
                    backgroundColor: 'rgba(1, 1, 235, 0.2)',
                    borderColor: 'rgba(1, 1, 235, 1)',
                    borderWidth: 1
                }
            ]
            T_ROINV_BCLF_CHART.destroy();
            T_ROINV_BCLF_CHART = new Chart(T_ROINV_BCLF_CTX, {
                type: 'line',
                data: {
                    labels: dataSetter.getItemNameRange(),
                    datasets: isMember()?datasets:''
                },
                options: CHART_OPTION.vertical.percent
            });
        },
        getTotSumDataByItemChart: function () {
            let dataSetter = chartDataHandler().handleDataByItemName();
            let datasets = [
                {
                    label: '상세 상품별 총 판매 수익(매출)',
                    data: dataSetter.getTotSalesSumArr(),
                    backgroundColor: '#c2a4ff42',
                    borderColor: '#c2a4ff',
                    borderWidth: 1
                },
                {
                    label: '상세 상품별 총 순수익',
                    data: dataSetter.getTotProfitSumArr(),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ];
            TSBITEM_CHART.destroy();
            TSBITEM_CHART = new Chart(TSBITEM_CTX, {
                type: 'horizontalBar',
                data: {
                    labels: dataSetter.getItemNameRange(),
                    datasets: isMember()?datasets:''
                },
                options: CHART_OPTION.horizontal.cost
            });
        },
        getSellCountByItemChart: function () {
            let dataSetter = chartDataHandler().handleDataByItemName();
            let datasets = [
                {
                    label: '상세 상품별 판매 개수',
                    data: dataSetter.getSellCountDataArr(),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
            ];
            SCBITEM_CHART.destroy();
            SCBITEM_CHART = new Chart(SCBITEM_CTX, {
                type: 'horizontalBar',
                data: {
                    labels: dataSetter.getItemNameRange(),
                    datasets: isMember()?datasets:''
                },
                options: CHART_OPTION.horizontal.unit
            });
        },
        getAdsSumByItemChart: function(){
            let dataSetter = chartDataHandler().handleDataByItemName();
            let datasets = [
                {
                    label: '상세 상품별 총 광고 비용',
                    data: dataSetter.getTotAdsSumArr(),
                    backgroundColor: '#c2a4ff42',
                    borderColor: '#c2a4ff',
                    borderWidth: 1
                }
            ];
            T_ADS_BITEM_CHART.destroy();
            T_ADS_BITEM_CHART = new Chart(T_ADS_BITEM_CTX, {
                type: 'bar',
                data: {
                    labels: dataSetter.getItemNameRange(),
                    datasets: isMember()?datasets:''
                },
                options: CHART_OPTION.vertical.cost
            });
        },
        getRoInvDataByItemChart: function(){
            let dataSetter = chartDataHandler().handleDataByItemName();
            let datasets = [
                {
                    label: '투자 대비 ROI (기간 총 순수익 / 기간 총 투자비용) [%]',
                    data: dataSetter.getTotROIBySellArr(),
                    backgroundColor: 'rgba(1, 1, 235, 0.2)',
                    borderColor: 'rgba(1, 1, 235, 1)',
                    borderWidth: 1
                }
            ]
            T_ROINV_BITEM_CHART.destroy();
            T_ROINV_BITEM_CHART = new Chart(T_ROINV_BITEM_CTX, {
                type: 'line',
                data: {
                    labels: dataSetter.getItemNameRange(),
                    datasets: isMember()?datasets:''
                },
                options: CHART_OPTION.vertical.percent
            });
        },
        getRoAdsDataByItemChart: function(){
            let dataSetter = chartDataHandler().handleDataByItemName();
            let datasets = [
                {
                    label: '광고 대비 ROI (기간 총 순수익 / 기간 총 광고비용)',
                    data: dataSetter.getTotROIByAdsArr(),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: '광고 대비 ROAS (기간 총 수익(매출) / 기간 총 광고비용)',
                    data: dataSetter.getTotROASByAdsArr(),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
            T_ROADS_BITEM_CHART.destroy();
            T_ROADS_BITEM_CHART = new Chart(T_ROADS_BITEM_CTX, {
                type: 'line',
                data: {
                    labels: dataSetter.getItemNameRange(),
                    datasets: isMember()?datasets:''
                },
                options: CHART_OPTION.vertical.percent
            });
        }

    }
}

function chartDataHandler() {
    return {
        handleDataByDate: function () {
            // TODO ROAS ROI 계산법 검토
            let dateRange = getDateRangeData(DATE_SETTING.startDate, DATE_SETTING.endDate);
            let dataArr = [];
            dateRange.forEach(r => {
                let json = {
                    'sellCountSum': 0,
                    'totSalesSum': 0,
                    'totProfitSum': 0,
                    'totAdsCostSum': 0,
                    'totMarginCostSum': 0,
                    'totROIByAds': 0,
                    'totROASByAds': 0,
                    'totROIBySell': 0,
                }
                SELLED_ITEMS.forEach(d => {
                    let totValue = tableDataHandler().costValCalc(d);
                    let totSales = totValue.getTotSales();
                    let totProfit = totValue.getTotProfit();
                    let totMarginCost = totValue.getTotMarginCost();
                    let sourceDate = new Date(r);
                    let targetDate = new Date(calandarHandler().formatDateFitInput(d.sellSelldate));
                    if (+sourceDate === +targetDate) {
                        json.sellCountSum += d.sellCount;
                        json.totSalesSum += totSales;
                        json.totProfitSum += totProfit;
                        json.totAdsCostSum += d.sellTotAdsCost;
                        json.totMarginCostSum += totMarginCost;
                    }
                });

                // ORIGIN
                if (json.totAdsCostSum === 0) {
                    json.totROIByAds = 0;
                    json.totROASByAds = 0;
                } else {
                    json.totROIByAds = Number(((Number(json.totProfitSum) / Number(json.totAdsCostSum)) * 100).toFixed(2));
                    json.totROASByAds = Number(((Number(json.totSalesSum) / Number(json.totAdsCostSum)) * 100).toFixed(2));
                }

                if (json.totMarginCostSum === 0) {
                    json.totROIBySell = 0;
                } else {
                    json.totROIBySell = Number(((Number(json.totProfitSum) / Number(json.totMarginCostSum) * 100)).toFixed(2));
                }

                dataArr.push(json);
            });
            console.log('date by : ', dataArr);
            return {
                getDateRange: function () { return dateRange; },
                getSellCountSum: function () { return dataArr.map(r => r.sellCountSum); },
                getTotSalesSumArr: function () { return dataArr.map(r => r.totSalesSum) },
                getTotProfitSumArr: function () { return dataArr.map(r => r.totProfitSum); },
                getTotAdsSumArr: function () { return dataArr.map(r => r.totAdsCostSum); },
                getTotROIByAdsArr: function () { return dataArr.map(r => r.totROIByAds); },
                getTotROASByAdsArr: function () { return dataArr.map(r => r.totROASByAds); },
                getTotROIBySellArr: function () { return dataArr.map(r => r.totROIBySell); }
            }
        },
        handleDataByClassifyName: function () {
            var selledClassifySet = new Set();
            let classifyNameArr = [];
            let classifyDataArr = [];
            SELLED_ITEMS.forEach(r => {
                if (!selledClassifySet.has(r.itemData.classifyUuid)) {
                    selledClassifySet.add(r.itemData.classifyUuid);
                    classifyNameArr.push(r.itemData.classifyName);
                }
            })
            selledClassifySet.forEach(r => {
                let json = {
                    'classifyUuid': '',
                    'classifyName': '',
                    'totSalesSum': 0,
                    'totProfitSum': 0,
                    'sellCountSum': 0,
                    'totAdsCostSum': 0,
                    'totMarginCostSum': 0,
                    'totROIByAds': 0,
                    'totROASByAds': 0,
                    'totROIBySell': 0,
                }
                SELLED_ITEMS.forEach(d => {
                    if (r == d.itemData.classifyUuid) {
                        let totValue = tableDataHandler().costValCalc(d);
                        let totSales = totValue.getTotSales();
                        let totProfit = totValue.getTotProfit();
                        let totMarginCost = totValue.getTotMarginCost();
                        json.classifyUuid = d.itemData.classifyUuid;
                        json.classifyName = d.itemData.classifyName;
                        json.totSalesSum += totSales;
                        json.totProfitSum += totProfit;
                        json.sellCountSum += d.sellCount;
                        json.totAdsCostSum += d.sellTotAdsCost;
                        json.totMarginCostSum += totMarginCost;
                    }
                });
                // ORIGIN
                if (json.totAdsCostSum === 0) {
                    json.totROIByAds = 0;
                    json.totROASByAds = 0;
                } else {
                    json.totROIByAds = Number(((Number(json.totProfitSum) / Number(json.totAdsCostSum)) * 100).toFixed(2));
                    json.totROASByAds = Number(((Number(json.totSalesSum) / Number(json.totAdsCostSum)) * 100).toFixed(2));
                }

                if (json.totMarginCostSum === 0) {
                    json.totROIBySell = 0;
                } else {
                    json.totROIBySell = Number(((Number(json.totProfitSum) / Number(json.totMarginCostSum) * 100)).toFixed(2));
                }
                classifyDataArr.push(json);
            });
            return {
                getItemDataArr: function () { return classifyDataArr; },
                getItemNameRange: function () { return classifyNameArr; },
                getTotSalesSumArr: function () { return classifyDataArr.map(r => r.totSalesSum); },
                getTotProfitSumArr: function () { return classifyDataArr.map(r => r.totProfitSum); },
                getSellCountDataArr: function () { return classifyDataArr.map(r => r.sellCountSum); },
                getTotAdsSumArr: function () { return classifyDataArr.map(r => r.totAdsCostSum); },
                getTotROIByAdsArr: function () { return classifyDataArr.map(r => r.totROIByAds); },
                getTotROASByAdsArr: function () { return classifyDataArr.map(r => r.totROASByAds); },
                getTotROIBySellArr: function () { return classifyDataArr.map(r => r.totROIBySell); }
            }
        },
        handleDataByItemName: function () {
            var selledItemSet = new Set();
            let itemNameArr = [];
            let itemDataArr = [];


            SELLED_ITEMS.forEach(r => {
                if (!selledItemSet.has(r.itemId)) {
                    selledItemSet.add(r.itemId);
                    itemNameArr.push(`${r.itemData.itemName}(${r.itemData.itemStoreName})`);
                }
            });
            selledItemSet.forEach(r => {
                let json = {
                    'itemId': '',
                    'itemName': '',
                    'totSalesSum': 0,
                    'totProfitSum': 0,
                    'sellCountSum': 0,
                    'totAdsCostSum': 0,
                    'totMarginCostSum': 0,
                    'totROIByAds': 0,
                    'totROASByAds': 0,
                    'totROIBySell': 0,
                }
                SELLED_ITEMS.forEach(d => {
                    if (r == d.itemId) {
                        let totValue = tableDataHandler().costValCalc(d);
                        let totSales = totValue.getTotSales();
                        let totProfit = totValue.getTotProfit();
                        let totMarginCost = totValue.getTotMarginCost();
                        json.itemId = d.itemId;
                        json.itemName = `${d.itemData.itemName}(${d.itemData.itemStoreName})`;
                        json.totSalesSum += totSales;
                        json.totProfitSum += totProfit;
                        json.sellCountSum += d.sellCount;
                        json.totAdsCostSum += d.sellTotAdsCost;
                        json.totMarginCostSum += totMarginCost;
                    }
                });
                // ORIGIN
                if (json.totAdsCostSum === 0) {
                    json.totROIByAds = 0;
                    json.totROASByAds = 0;
                } else {
                    json.totROIByAds = Number(((Number(json.totProfitSum) / Number(json.totAdsCostSum)) * 100).toFixed(2));
                    json.totROASByAds = Number(((Number(json.totSalesSum) / Number(json.totAdsCostSum)) * 100).toFixed(2));
                }

                if (json.totMarginCostSum === 0) {
                    json.totROIBySell = 0;
                } else {
                    json.totROIBySell = Number(((Number(json.totProfitSum) / Number(json.totMarginCostSum) * 100)).toFixed(2));
                }
                itemDataArr.push(json);
            });
            return {
                getItemDataArr: function () { return itemDataArr; },
                getItemNameRange: function () { return itemNameArr; },
                getTotSalesSumArr: function () { return itemDataArr.map(r => r.totSalesSum); },
                getTotProfitSumArr: function () { return itemDataArr.map(r => r.totProfitSum); },
                getSellCountDataArr: function () { return itemDataArr.map(r => r.sellCountSum); },
                getTotAdsSumArr: function () { return itemDataArr.map(r => r.totAdsCostSum); },
                getTotROIByAdsArr: function () { return itemDataArr.map(r => r.totROIByAds); },
                getTotROASByAdsArr: function () { return itemDataArr.map(r => r.totROASByAds); },
                getTotROIBySellArr: function () { return itemDataArr.map(r => r.totROIBySell); }
            }
        }
    }
}

function loadChartBoxHtml() {

}

function eventChartHandler() {
    return {
        mainGraph: function () {
            return {
                show: function () {
                    $('button[sttg=mdash-main-graph-btn]').html('숨기기');
                    $('button[sttg=mdash-main-graph-btn]').attr('onclick', 'eventChartHandler().mainGraph().hide()');
                    localStorage.removeItem('MD_MGRAPH_HIDE');
                    $('div[sttg=mdash-main-graph]').css('display', 'block');
                },
                hide: function () {
                    $('button[sttg=mdash-main-graph-btn]').html('보이기');
                    $('button[sttg=mdash-main-graph-btn]').attr('onclick', 'eventChartHandler().mainGraph().show()');
                    localStorage.setItem('MD_MGRAPH_HIDE', 1);
                    $('div[sttg=mdash-main-graph]').css('display', 'none');
                }
            }
        },
        dateGraph: function () {
            return {
                show: function () {
                    $('button[sttg=mdash-date-graph-btn]').html('숨기기');
                    $('button[sttg=mdash-date-graph-btn]').attr('onclick', 'eventChartHandler().dateGraph().hide()');
                    localStorage.removeItem('MD_DGRAPH_HIDE');
                    $('div[sttg=mdash-date-graph]').css('display', 'block');
                },
                hide: function () {
                    $('button[sttg=mdash-date-graph-btn]').html('보이기');
                    $('button[sttg=mdash-date-graph-btn]').attr('onclick', 'eventChartHandler().dateGraph().show()');
                    localStorage.setItem('MD_DGRAPH_HIDE', 1);
                    $('div[sttg=mdash-date-graph]').css('display', 'none');
                }
            }
        },
        classifyGraph: function () {
            return {
                show: function () {
                    $('button[sttg=mdash-classify-graph-btn]').html('숨기기');
                    $('button[sttg=mdash-classify-graph-btn]').attr('onclick', 'eventChartHandler().classifyGraph().hide()');
                    localStorage.removeItem('MD_CGRAPH_HIDE');
                    $('div[sttg=mdash-classify-graph]').css('display', 'block');
                },
                hide: function () {
                    $('button[sttg=mdash-classify-graph-btn]').html('보이기');
                    $('button[sttg=mdash-classify-graph-btn]').attr('onclick', 'eventChartHandler().classifyGraph().show()');
                    localStorage.setItem('MD_CGRAPH_HIDE', 1);
                    $('div[sttg=mdash-classify-graph]').css('display', 'none');
                }
            }
        },
        itemGraph: function () {
            return {
                show: function () {
                    $('button[sttg=mdash-item-graph-btn]').html('숨기기');
                    $('button[sttg=mdash-item-graph-btn]').attr('onclick', 'eventChartHandler().itemGraph().hide()');
                    localStorage.removeItem('MD_IGRAPH_HIDE');
                    $('div[sttg=mdash-item-graph]').css('display', 'block');
                },
                hide: function () {
                    $('button[sttg=mdash-item-graph-btn]').html('보이기');
                    $('button[sttg=mdash-item-graph-btn]').attr('onclick', 'eventChartHandler().itemGraph().show()');
                    localStorage.setItem('MD_IGRAPH_HIDE', 1);
                    $('div[sttg=mdash-item-graph]').css('display', 'none');
                }
            }
        }
    }
}