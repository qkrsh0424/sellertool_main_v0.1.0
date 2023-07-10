mainPopupLoad();

function mainPopupLoad() {
    html = `
        <!-- Modal -->
<!--        <div class="modal fade bd-example-modal-lg" id="ModalEvent" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">-->
<!--            <div class="modal-dialog modal-lg">-->
<!--                <div class="modal-content" style="background:#164773">-->
<!--                    <img src="https://sellertoolv1.s3.ap-northeast-2.amazonaws.com/popup2.png" width="100%"/>-->
<!--                    <p style="color:white; text-align:center; font-weight:700; font-size: 15px">변경된 URL : http://profitcalc.multranslator.com -> http://www.sellertool.io</p>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
        <div class="modal fade bd-example-modal-lg" id="ModalEvent" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" style="background:#fff; border:none">
<!--                <div class="modal-content" style="background:#164773; padding: 20px;">-->
                    <div style="width:100%; height:30px; background: #164773"></div>
                    <div style="padding: 20px">
                        <h3 style="color:#444; text-align:center; font-weight:700; padding: 20px 0; ">새롭게 바뀌는 셀러툴의 베타 테스터를 모집합니다!</h3>
                        <p style="color:#606060; text-align:center; font-weight:700; font-size: 15px">베타 테스터에 참여 의사가 있으신분은 아래의 이미지를 클릭해주세요.</p>
                        <a href="https://naver.me/xsYebuhs" target="_blank"><img src="/images/banner/2.jpg" width="100%"/></a>
<!--                        <p style="color:#606060; text-align:center; font-weight:700; font-size: 15px; margin-top: 10px">위 이미지를 클릭하시면 유튜브 페이지로 이동합니다.</p>-->
                    </div>
                </div>
            </div>
        </div>
    `;
    $("#mainPagePopup").html(html);

    $(document).ready(function () {
        $("#ModalEvent").modal("hide"); // show or hide
    })
}
