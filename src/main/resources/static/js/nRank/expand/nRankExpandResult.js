function nRankExpandResultLoadHtml() {
    return {
        loadNewResult: function () {
            return {
                set: function () {
                    let html = ``;
                    SEARCH_LIST.forEach((r, index) => {
                        let itemHtml = ``;
                        r.itemList.forEach(k => {
                            itemHtml += `
                                <div class="pcy-rk-result-itemlist-wrapper row">
                                    <div class="col-sm-2 text-center">
                                        <img class="pcy-rk-result-itemlist-img m-0" src="${k.imageUrl}">
                                    </div>
                                    <div class="pcy-rk-result-itemlist-box col-sm-10">
                                        <div class="pcy-rk-result-itemlist-label"><a href="${k.mallProductUrl}" target="_blank">${k.productTitle}</a></div>
                                        <div class="pcy-rk-result-itemlist-storename"><a href="${k.mallPcUrl}" target="_blank">${k.mallName}</a></div>
                                        <div class="pcy-rk-result-itemlist-price">${numberWithCommas(k.price)} 원</div>
                                        <div class="pcy-rk-result-itemlist-rank">
                                            <p class="pcy-rk-result-itemlist-rank-p">현재 랭킹 : <span class="text-danger">${k.rank}</span>위 <a href="${k.shoppingPageUrl}" target="_blank">${k.pageNum} PAGE ${k.rankInPage} 번째</a></p>
                                        </div>
                                    </div>
                                </div>
                            `;
                        });
                        html += `
                            <div class="st-nre-box">
                                <div class="clearfix">
                                    <span class="float-left"><strong>${r.keyword}-${r.shopName}</strong> 에 대한 네이버 랭킹 조회 결과입니다. 총 <strong>${r.totalSize}</strong> 개의 결과물이 있습니다.</span>
                                    <button class="st-nre-prod-noborder-btn" type="button" data-toggle="collapse"
                                        data-target="#collapseExample${index}" aria-expanded="false" aria-controls="collapseExample${index}">
                                        <i class="fas fa-chevron-down"></i>
                                    </button>
                                </div>
            
                                <div class="collapse mt-3" id="collapseExample${index}">
                                    ${itemHtml}
                                </div>
                            </div>
                        `;
                    });
                    $('div[st-area=result]').html(html);
                }
            }
        }
    }
}