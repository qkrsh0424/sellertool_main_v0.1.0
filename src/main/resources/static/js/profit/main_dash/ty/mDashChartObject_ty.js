// Main Chart Render
var MAIN_CTX = $('#i_mdash_mainChart');
var MAIN_CHART = new Chart(MAIN_CTX);

// RO Ads Chart Render
// var ROADS_CTX = $('#i_mdash_roAdsChart');
// var ROADS_CHART = new Chart(ROADS_CTX);

// RO Investment Chart Render
// var ROINV_CTX = $('#i_mdash_roInvChart');
// var ROINV_CHART = new Chart(ROINV_CTX);

// SellCount by Date Chart Render
// var SCBDATE_CTX = $('#i_mdash_chart_sellcount_bydate');
// var SCBDATE_CHART = new Chart(SCBDATE_CTX);


// SellCount by Classify Chart Render
// var SCBCLF_CTX = $('#i_mdash_chart_sellcount_byclassify');
// var SCBCLF_CHART = new Chart(SCBCLF_CTX);

// Total Sum Data By Classify Chart Render
// var TSBCLF_CTX = $('#i_mdash_chart_totSum_byclassify');
// var TSBCLF_CHART = new Chart(TSBCLF_CTX);

// Total Ads Sum Data By Classify Chart Render
// var TADSBCLF_CTX = $('#i_mdash_chart_totAdsSum_byclassify');
// var TADSBCLF_CHART = new Chart(TADSBCLF_CTX);

// Total RO Ads Data By Classify Chart Render
// var T_ROADS_BCLF_CTX = $('#i_mdash_chart_totRoAdsSum_byclassify');
// var T_ROADS_BCLF_CHART = new Chart(T_ROADS_BCLF_CTX);

// Total RO Investment Data By Classify Chart Render
// var T_ROINV_BCLF_CTX = $('#i_mdash_chart_totRoInvSum_byclassify');
// var T_ROINV_BCLF_CHART = new Chart(T_ROINV_BCLF_CTX);

// SellCount by Item Chart Render
// var SCBITEM_CTX = $('#i_mdash_chart_sellcount_byitem');
// var SCBITEM_CHART = new Chart(SCBITEM_CTX);

// Total Sum Data By Item Chart Render
// var TSBITEM_CTX = $('#i_mdash_chart_totSum_byitem');
// var TSBITEM_CHART = new Chart(TSBITEM_CTX);

// Total Ads Sum Data By Item Chart Render
// var T_ADS_BITEM_CTX = $('#i_mdash_chart_totAdsSum_byitem');
// var T_ADS_BITEM_CHART = new Chart(T_ADS_BITEM_CTX);

// Total RO Investment Data By Item Chart Render
// var T_ROINV_BITEM_CTX = $('#i_mdash_chart_totRoInvSum_byitem');
// var T_ROINV_BITEM_CHART = new Chart(T_ROINV_BITEM_CTX);

// Total RO Ads Data By Item Chart Render
// var T_ROADS_BITEM_CTX = $('#i_mdash_chart_totRoAdsSum_byitem');
// var T_ROADS_BITEM_CHART = new Chart(T_ROADS_BITEM_CTX);

//hover vertical line
Chart.plugins.register({
    // afterDatasetsDraw: function(chart) {
    //     if (chart.tooltip._active && chart.tooltip._active.length) {
    //         var activePoint = chart.tooltip._active[0],
    //             ctx = chart.ctx,
    //             y_axis = chart.scales['y-axis-0'],
    //             x = activePoint.tooltipPosition().x,
    //             topY = y_axis.top,
    //             bottomY = y_axis.bottom;
    //         // draw line
    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.moveTo(x, topY);
    //         ctx.lineTo(x, bottomY);
    //         ctx.lineWidth = 1;
    //         ctx.strokeStyle = '#b2bec3';
    //         ctx.stroke();
    //         ctx.restore();
    //     }
    // }
});

//tooltip on mouse
Chart.Tooltip.positioners.cursor = function(chartElements, coordinates) {
    return coordinates;
};

var CHART_OPTION = {

    'default': {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        },
    },
    'vertical': {
        'cost': {
            bezierCurve: false,
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false,
                        offsetGridLines: true
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        userCallback: function(value, index, values) {
                            value = value.toString();
                            return numberWithCommas(Number(value)) + ' 원';
                        }
                    }
                }]
            },
            tooltips: {
                mode: 'index',
                titleFontColor: 'black',
                bodyFontColor: 'black',
                position: 'cursor',
                intersect: false,
                callbacks: {
                    label: function(tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ' : ' + numberWithCommas(Number(tooltipItem.yLabel)) + " 원";
                    }
                },
                backgroundColor: '#ffffff',
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                xPadding: 12,
                yPadding: 12,
                cornerRadius: 4,
            },
            hover: {
                mode: 'index',
                intersect: false,
            },
            elements: {
                line: {
                    //그래프 직선
                    tension: 0
                }
            }
        },
        'percent': {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        userCallback: function(value, index, values) {
                            value = value.toString();
                            return value + ' %';
                        }
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ' : ' + Number(tooltipItem.yLabel) + " %";
                    }
                }
            }
        },
        'unitBar': {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        userCallback: function(value, index, values) {
                            value = value.toString();
                            return value + ' 개';
                        }
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ' : ' + Number(tooltipItem.yLabel) + " 개";
                    }
                }
            }
        }
    },
    'horizontal': {
        'cost': {
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
                    label: function(tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ' : ' + numberWithCommas(Number(tooltipItem.xLabel)) + " 원";
                    }
                }
            }
        },
        'unit': {
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
                    label: function(tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ' : ' + Number(tooltipItem.xLabel) + " 개";
                    }
                }
            }
        }
    }
}