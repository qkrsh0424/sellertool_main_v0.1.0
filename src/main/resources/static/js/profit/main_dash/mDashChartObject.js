// Main Chart Render
var MAIN_CTX = $('#i_mdash_mainChart');
var MAIN_CHART = new Chart(MAIN_CTX);

// RO Ads Chart Render
var ROADS_CTX = $('#i_mdash_roAdsChart');
var ROADS_CHART = new Chart(ROADS_CTX);

// RO Investment Chart Render
var ROINV_CTX = $('#i_mdash_roInvChart');
var ROINV_CHART = new Chart(ROINV_CTX);

// SellCount by Date Chart Render
var SCBDATE_CTX = $('#i_mdash_chart_sellcount_bydate');
var SCBDATE_CHART = new Chart(SCBDATE_CTX);


// SellCount by Classify Chart Render
var SCBCLF_CTX = $('#i_mdash_chart_sellcount_byclassify');
var SCBCLF_CHART = new Chart(SCBCLF_CTX);

// Total Sum Data By Classify Chart Render
var TSBCLF_CTX = $('#i_mdash_chart_totSum_byclassify');
var TSBCLF_CHART = new Chart(TSBCLF_CTX);

// Total Ads Sum Data By Classify Chart Render
var TADSBCLF_CTX = $('#i_mdash_chart_totAdsSum_byclassify');
var TADSBCLF_CHART = new Chart(TADSBCLF_CTX);

// Total RO Ads Data By Classify Chart Render
var T_ROADS_BCLF_CTX = $('#i_mdash_chart_totRoAdsSum_byclassify');
var T_ROADS_BCLF_CHART = new Chart(T_ROADS_BCLF_CTX);

// Total RO Investment Data By Classify Chart Render
var T_ROINV_BCLF_CTX = $('#i_mdash_chart_totRoInvSum_byclassify');
var T_ROINV_BCLF_CHART = new Chart(T_ROINV_BCLF_CTX);

// SellCount by Item Chart Render
var SCBITEM_CTX = $('#i_mdash_chart_sellcount_byitem');
var SCBITEM_CHART = new Chart(SCBITEM_CTX);

// Total Sum Data By Item Chart Render
var TSBITEM_CTX = $('#i_mdash_chart_totSum_byitem');
var TSBITEM_CHART = new Chart(TSBITEM_CTX);

// Total Ads Sum Data By Item Chart Render
var T_ADS_BITEM_CTX = $('#i_mdash_chart_totAdsSum_byitem');
var T_ADS_BITEM_CHART = new Chart(T_ADS_BITEM_CTX);

// Total RO Investment Data By Item Chart Render
var T_ROINV_BITEM_CTX = $('#i_mdash_chart_totRoInvSum_byitem');
var T_ROINV_BITEM_CHART = new Chart(T_ROINV_BITEM_CTX);

// Total RO Ads Data By Item Chart Render
var T_ROADS_BITEM_CTX = $('#i_mdash_chart_totRoAdsSum_byitem');
var T_ROADS_BITEM_CHART = new Chart(T_ROADS_BITEM_CTX);

var CHART_OPTION = {
    'default':{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        }
    },
    'vertical':{
        'cost':{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        userCallback: function (value, index, values) {
                            value = value.toString();
                            return numberWithCommas(Number(value)) + ' 원';
                        }
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ' : ' + numberWithCommas(Number(tooltipItem.yLabel)) + " 원";
                    }
                }
            }
        },
        'percent':{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        userCallback: function (value, index, values) {
                            value = value.toString();
                            return value + ' %';
                        }
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ' : ' + Number(tooltipItem.yLabel) + " %";
                    }
                }
            }
        },
        'unitBar':{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        userCallback: function (value, index, values) {
                            value = value.toString();
                            return value + ' 개';
                        }
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ' : ' + Number(tooltipItem.yLabel) + " 개";
                    }
                }
            }
        }
    },
    'horizontal':{
        'cost':{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ' : ' + numberWithCommas(Number(tooltipItem.xLabel)) + " 원";
                    }
                }
            }
        },
        'unit':{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ' : ' + Number(tooltipItem.xLabel) + " 개";
                    }
                }
            }
        }
    }
}