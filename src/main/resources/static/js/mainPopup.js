mainPopupLoad();
showMarginPagePopup();

function mainPopupLoad() {
    html = PosterMoveToNewSellertool();
    $("#mainPagePopup").html(html);

    $(document).ready(function () {
        $("#ModalEvent").modal("show"); // show or hide
    })
}

function showMarginPagePopup(){
    html = PosterMoveToNewSellertool();
    $("#marginPagePopup").html(html);

    $(document).ready(function () {
        $("#ModalEvent").modal("show"); // show or hide
    })
}

function PosterChangedUrl(){
    return `
        <div class="modal fade bd-example-modal-lg" id="ModalEvent" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" style="background:#164773">
                    <img src="https://sellertoolv1.s3.ap-northeast-2.amazonaws.com/popup2.png" width="100%"/>
                    <p style="color:white; text-align:center; font-weight:700; font-size: 15px">변경된 URL : http://profitcalc.multranslator.com -> http://www.sellertool.io</p>
                </div>
            </div>
        </div>
    `;
}
function PosterCollectBetaTester() {
    return `
        <div class="modal fade bd-example-modal-lg" id="ModalEvent" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" style="background:#fff; border:none">
                    <div style="width:100%; height:30px; background: #164773"></div>
                    <div style="padding: 20px">
                        <h3 style="color:#444; text-align:center; font-weight:700; padding: 20px 0; ">새롭게 바뀌는 셀러툴의 베타 테스터를 모집합니다!</h3>
                        <p style="color:#606060; text-align:center; font-weight:700; font-size: 15px">베타 테스터에 참여 의사가 있으신분은 아래의 이미지를 클릭해주세요.</p>
                        <a href="https://naver.me/xsYebuhs" target="_blank"><img src="/images/banner/2.jpg" width="100%"/></a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function PosterMoveToNewSellertool(){
    return `
        <div class="modal fade bd-example-modal-lg" id="ModalEvent" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" style="background:#fff; border:none;">
                    <div style="width:100%; height:30px; background: #164773"></div>
                    <div style="padding: 20px">
                        <h3 style="color:#444; text-align:center; font-weight:700; padding: 20px 0; ">📢 공지 📢</h3>
                        <h3 style="color:#444; text-align:center; font-weight:700; padding: 20px 0; line-height: 2; word-break: keep-all">
                            <div>안녕하세요 셀러님!</div>
                            <div>항상 저희 셀러툴을 이용해 주셔서 감사합니다.</div>
                            <div>
                                안타깝게도 현재 버전의 셀러툴은 더 이상 관리되지 않습니다.
                            </div>
                            <div>
                                2024년 4월부로 현재 버전의 셀러툴은 새로운 버전의 셀러툴로 완전히 대체될 예정입니다.
                            </div>
                            <div>
                                앞으로 더 다양하고 새로운 기능의 셀러툴을 이용하시려면 아래 링크를 통해 새로운 셀러툴로 이동하셔서 이용해 주시기 바랍니다.
                            </div>
                            <div>
                                감사합니다 🙇‍️
                            </div>
                        </h3>
                        <h3 style="color:#444; text-align:center; font-weight:700; padding: 20px 0; "><a href="https://v2.sellertool.io">https://v2.sellertool.io</a></h3>
                        <hr />
                        <p style="color:#606060; text-align:center; font-weight:700; font-size: 15px; word-break: keep-all;">ps. 궁금한점이나 문의사항은 austin.ppark@piaar.co.kr로 메일 남겨주시면 신속한 답변 드릴 수 있도록 하겠습니다!</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}