init();
function init() {
    setMySearchList();
}

function initializeLocalStorage() {
    let storage = window.localStorage.getItem('st_nrank_search_list');
    if (storage == null) {
        window.localStorage.setItem('st_nrank_search_list', '[]');
    }
}

function setSearchLog(keyword, storeName) {
    initializeLocalStorage();
    let storage = window.localStorage.getItem('st_nrank_search_list');
    let storageJson = JSON.parse(storage);
    let newData = {
        'searchDate': new Date(),
        'keyword': keyword,
        'storeName': storeName
    }
    console.log(storageJson.length);
    storageJson.unshift(newData);
    if (storageJson.length >= 10) {
        storageJson = storageJson.slice(0, 10);
    }
    window.localStorage.setItem('st_nrank_search_list', JSON.stringify(storageJson));
    setMySearchList();
}

function setMySearchList() {
    let html = ``;
    initializeLocalStorage();
    let storage = window.localStorage.getItem('st_nrank_search_list');
    let storageJson = JSON.parse(storage);
    storageJson.forEach(r => {
        html += `
            <tr>
                <th scope="row">${dateToYYYYMMDD(r.searchDate)}</th>
                <td>${r.keyword}</td>
                <td>${r.storeName}</td>
                <td><button type="button" class="btn btn-outline-secondary" onclick="eventNaverRankHandler().storageSearch('${r.keyword}-${r.storeName}')">조회</button></td>
            </tr>       
        `;
    });

    $('#i_nrank_my_search_list').html(html);
}

$("#searchSubmit").submit(
    function searchSubmit(e) {
        e.preventDefault();
        let keyword = $("#nSearchKeyword").val();
        let storeName = $("#nShopURL").val();
        setSearchLog(keyword, storeName);
        $(document).ready(function () {
            $.ajax({
                type: "GET", //전송방식을 지정한다 (POST,GET)
                url: "/api/rank/naverShopping",//호출 URL을 설정한다. GET방식일경우 뒤에 파라티터를 붙여서 사용해도된다.
                dataType: "text",//호출한 페이지의 형식이다. xml,json,html,text등의 여러 방식을 사용할 수 있다.
                data: {
                    // purchaseCost:document.getElementById("purchaseCost").value,
                    // purchaseTransCharge:document.getElementById("purchaseTransCharge").value,
                    // sellPrice:document.getElementById("sellPrice").value,
                    // realSellTransUnitCharge:document.getElementById("realSellTransUnitCharge").value,
                    // sellTransUnitCharge:document.getElementById("sellTransUnitCharge").value,
                    // marketCommitionPercentage:document.getElementById("marketCommitionPercentage").value
                    nSearchKeyword: keyword,
                    nShopURL: storeName,
                },
                error: function () {
                    alert("server connect failed");
                },
                success: function (Parse_data) {
                    let resData = JSON.parse(Parse_data).data;
                    document.getElementById("rankingResultBoard").style.display = 'block';

                    let resHtml = ``;
                    if (resData.length <= 0) {
                        resHtml += `
                            <div class="text-center">
                                랭킹이 300위 이하이거나 입력 내용이 잘못되었습니다.
                            </div>
                        `;
                    }
                    for (let i = 0; i < resData.length; i++) {
                        resHtml += `
                            <div class="pcy-rk-result-itemlist-wrapper">
                                <div>
                                    <img class="pcy-rk-result-itemlist-img"
                                        src="${resData[i].val.image}" />
                                </div>
                                <div class="pcy-rk-result-itemlist-box">
                                    <div class="pcy-rk-result-itemlist-label"><a href=${resData[i].val.link} target="_blank">${resData[i].val.title}</a></div>
                                    <div class="pcy-rk-result-itemlist-storename">${resData[i].val.mallName}</div>
                                    <div class="pcy-rk-result-itemlist-price">${resData[i].val.lprice} 원</div>
                                    <div class="pcy-rk-result-itemlist-category">${resData[i].val.category1}>${resData[i].val.category2}>${resData[i].val.category3}>${resData[i].val.category4}</div>
                                    <div class="pcy-rk-result-itemlist-rank">
                                        <p class="pcy-rk-result-itemlist-rank-p">현재 랭킹 : <span class="text-danger">${resData[i].rank}</span>위</p>
                                    </div>
                                </div>
                            </div>
                        `;

                    }
                    $("#rankingResultBoard").html(resHtml);
                }

            });
        });
    }
);

function eventNaverRankHandler() {
    return {
        storageSearch: function (text) {
            let keyword = text.split('-')[0];
            let storeName = text.split('-')[1];
            $('#nSearchKeyword').val(keyword);
            $('#nShopURL').val(storeName);
            $('#i_nrank_search_btn').click();
        }
    }
}