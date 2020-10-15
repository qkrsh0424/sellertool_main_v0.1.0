mainPopupLoad();

function mainPopupLoad() {
    html = `
        <!-- Modal -->
        <div class="modal fade bd-example-modal-lg" id="ModalEvent" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" style="background:#164773">
                    <img src="https://sellertoolv1.s3.ap-northeast-2.amazonaws.com/popup2.png" width="100%"/>
                    <p style="color:white; text-align:center; font-weight:700; font-size: 15px">변경된 URL : http://profitcalc.multranslator.com -> http://www.sellertool.io</p>
                </div>
            </div>
        </div>
    `;
    $("#mainPagePopup").html(html);

    $(document).ready(function () {
        $("#ModalEvent").modal("show");
    })
}
