async function AlphaPostShareDataInit() {
    await shareDataConnect().getPostAll();
    loadShareHtml().setShareMessageList().set();
}

function shareDataConnect() {
    return {
        getPostAll: async function (pageNum) {
            await $.ajax({
                url: '/api/item_manager/mdash/get/alpost/all',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                data:{'pageNum':pageNum?pageNum:0},
                beforeSend: function (xhr) {
                    $("#i_mdash_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mdash_loading").addClass('display-none');
                },
                success: function (returnData) {
                    ALPHA_POST.length = returnData.length;
                    ALPHA_POST.postList = returnData.postList;
                    ALPHA_POST.currentPageNum = returnData.currentPageNum;
                    ALPHA_POST.prevPageNum = returnData.prevPageNum;
                    ALPHA_POST.nextPageNum = returnData.nextPageNum;
                    ALPHA_POST.pageSize = returnData.pageSize;
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    }
                }
            });
        },
        addPostOne: async function (desc) {
            let data = JSON.stringify({
                'desc': desc,
                'image': ''
            });
            await $.ajax({
                url: '/api/item_manager/mdash/add/alpost/one',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", getCookie('XSRF-TOKEN'));
                    $("#i_mdash_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mdash_loading").addClass('display-none');
                },
                success: function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : SDGSG500");
                        return window.location.reload();
                    } {
                        alert("undefined error code : SDGSG");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDGSG");
                    }
                }
            });
        },
        deletePostOne: async function (post) {
            let data = JSON.stringify(post);
            await $.ajax({
                url: '/api/item_manager/mdash/delete/alpost/one',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-XSRF-TOKEN", getCookie('XSRF-TOKEN'));
                    $("#i_mdash_loading").removeClass('display-none');
                },
                complete: function () {
                    $("#i_mdash_loading").addClass('display-none');
                },
                success: function (returnData) {
                    if (returnData.message === 'USER_INVALID') {
                        alert("세션이 만료되었습니다.")
                        return window.location.href = '/login';
                    } else if (returnData.message === 'SUCCESS') {
                        return;
                    } else if (returnData.message === 'FAILURE') {
                        alert("DB Search error code : SDGSG500");
                        return window.location.reload();
                    } {
                        alert("undefined error code : SDGSG");
                        return window.location.reload();
                    }
                },
                error: function (error) {
                    if (error.status === 403) {
                        alert("세션이 만료되었습니다.");
                        return window.location.reload();
                    } else {
                        alert("undefined error code : SDGSG");
                        return window.location.reload();
                    }
                }
            });
        }
    }
}

function loadShareHtml() {
    return {
        setShareMessageList: function () {
            return {
                set: function () {
                    let html = ``;
                    let pageElHtml = ``;
                    let pageCount = ALPHA_POST.length/ALPHA_POST.pageSize
                    let postIndex = (ALPHA_POST.currentPageNum) * ALPHA_POST.pageSize;
                    for(let i = 0 ; i < pageCount; i++){
                        pageElHtml+=`<li class="page-item"><button class="page-link" onclick="eventShareHandler().pageLink().numberClick(${i})" st-pagenation-num=${i}>${i+1}</button></li>`;
                    }
                    let pagenationBoxHtml = `
                        <nav aria-label="Page navigation example">
                            <ul class="pagination pagination-lg justify-content-center">
                            <li class="page-item">
                                <button class="page-link" onclick="eventShareHandler().pageLink().prevClick()">
                                    <span aria-hidden="true">&laquo;</span>
                                </button>
                            </li>
                            ${pageElHtml}
                            <li class="page-item">
                                <button class="page-link" onclick="eventShareHandler().pageLink().nextClick()">
                                    <span aria-hidden="true">&raquo;</span>
                                </button>
                            </li>
                            </ul>
                        </nav>
                    `;
                    ALPHA_POST.postList.forEach((r, index) => {
                        let desc = r.desc;
                        let title = desc.length > 20 ? desc.substring(0, 20) + '...' : desc;
                        let username = r.writerName;
                        let date = dateToYYYYMMDD(r.createdAt);
                        html += `
                            <div class="card mt-2">
                                <div class="card-header">
                                    <span>${postIndex+index+1}. 유저 : ${username} | 등록일 : ${date}</span>
                                    ${r.writerType == 'SELF' ? `<span class="text-danger">[나의 글]</span><button type="button" class="btn btn-outline-danger float-right" onclick="eventShareHandler().deletePost('${r.postId}')">삭제</button>` : ''}
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">${title}</h5>
                                    <pre class="card-text">${desc}</pre>
                                </div>
                            </div>
                        `;
                    })
                    html+=`<div class="m-2">${pagenationBoxHtml}</div>`;
                    $("#i_mdash_share_message_box").html(html);
                    $(`button[st-pagenation-num=${ALPHA_POST.currentPageNum}]`).addClass('st-button-clicked');
                }
            }
        }
    }
}

function eventShareHandler() {
    return {
        shareClick: async function () {
            let textArea = $("#i_mdash_share_desc")
            if($("#i_mdash_share_desc").val().length<=0){
                return;
            }
            await shareDataConnect().addPostOne(textArea.val());
            await shareDataConnect().getPostAll();
            loadShareHtml().setShareMessageList().set();
            textArea.val('');
        },
        deletePost: async function (postId) {
            let post = ALPHA_POST.postList.filter(r => r.postId == postId)[0];
            await shareDataConnect().deletePostOne(post);
            await shareDataConnect().getPostAll(ALPHA_POST.currentPageNum);
            loadShareHtml().setShareMessageList().set();
        },
        pageLink: function(){
            goToByScroll("div[sttg=mdash-alpha-post]");
            return{
                prevClick: async function(){
                    await shareDataConnect().getPostAll(ALPHA_POST.prevPageNum);
                    loadShareHtml().setShareMessageList().set();
                },
                numberClick: async function(number){
                    await shareDataConnect().getPostAll(number);
                    loadShareHtml().setShareMessageList().set();
                },
                nextClick: async function(){
                    await shareDataConnect().getPostAll(ALPHA_POST.nextPageNum);
                    loadShareHtml().setShareMessageList().set();
                },      
            }
        }
    }
}