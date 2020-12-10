function loadOptionHtml() {
    return {
        setOptionSelect: function() {
            return {
                set: function() {
                    let optionListHtml = ``;
                    OPTIONS.forEach(r => {
                        optionListHtml += `
                            <span id="i_mitem_option_select_el_box_${r.optionUuid}">
                                <button class="btn ty-st-mItem-item-btn" id="i_ty_mitem_option_select_el_btn_${r.optionUuid}"onclick="eventOptionHandler().optionInfoOpenClick('${r.optionUuid}')">${r.optionName}</button>
                            </span>
                        `;
                    })
                    let html = `
                        <div class="st-mitem-wrapper">
                            <div class="st-mitem-box">
                                <div class="st-mitem-title-box">
                                    <h4 class="st-mitem-title-el">
                                        옵션 선택<button class="float-right btn btn-outline-primary btn-lg" onclick="eventOptionHandler().addOptionModalOpen()">옵션 추가</button>
                                    </h4>
                                </div>
                                <div class="st-mitem-content-box">
                                    <div>
                                        ${optionListHtml}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    $("#i_mitem_option_selector_box").html(html);
                },
                clear: function() {
                    $("#i_mitem_option_selector_box").html('');
                }
            }
        },
        setAddOptionModalContent: function() {
            return {
                set: function() {
                    let modalHeaderHtml = `
                        <div class="modal-header">
                            <h5 class="modal-title">옵션 추가</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `;
                    let modalBodyHtml = `
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="i_mitem_add_option_name_input">옵션명</label>
                                <input type="text" class="form-control" name="i_mitem_add_option_name_input" id="i_mitem_add_option_name_input">
                            </div>
                        </div>
                    `;
                    let modalFooterHtml = `
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onclick="eventOptionHandler().addOptionSubmitClick()">추가</button>
                            <button type="button" class="btn btn-primary" onclick="eventOptionHandler().modalClose()">닫기</button>
                        </div>
                    `;
                    let html = `
                        <div class="modal-content">
                            ${modalHeaderHtml}
                            ${modalBodyHtml}
                            ${modalFooterHtml}
                        </div>
                    `;
                    $("#i_mitem_modal_regular_box").html(html);
                },
                clear: function() {
                    $("#i_mitem_modal_regular_box").html('');
                }
            }
        },
        setOptionInfoHtml: function() {
            return {
                set: function() {
                    let html = `
                        <div class="st-mitem-wrapper">
                            <div class="st-mitem-box">
                                <div class="st-mitem-title-box">
                                    <h4 class="st-mitem-title-el">
                                        옵션 정보
                                        <button type="button" class="btn btn-outline-danger btn-lg float-right" onclick="eventOptionHandler().optionDeleteClick('${SELECTED_OPTION.optionUuid}')">
                                            옵션 삭제
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </h4>
                                </div>
                                <div class="st-mitem-content-box">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <label for="i_mitem_info_classify_name" class="st-aitem-required-text">*옵션명 (필수)</label>
                                            <div class="input-group mb-3">
                                                <input type="text" class="ty-st-aitem-input form-control" id="i_mitem_info_option_name" name="i_mitem_info_option_name" value="${SELECTED_OPTION.optionName}" disabled>
                                                <div class="input-group-append">
                                                    <button class="btn btn-outline-secondary" type="button" id="i_mitem_info_option_name_fix_btn" onclick="eventOptionHandler().infoOptionNameBtnClick().edit()"><i class="fas fa-pen"></i></button>
                                                </div>
                                            </div>
                                            <div class="ty-st-aitem-box-footer">*관리하기 편하신 이름으로 설정해주세요.</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <label for="i_mitem_info_classify_name">재고수량 (선택)</label>
                                                <div class="input-group mb-3">
                                                    <input type="number" class="ty-st-aitem-input form-control" id="i_mitem_info_option_remaining" name="i_mitem_info_option_remaining" value="${SELECTED_OPTION.optionRemainingCount}" disabled>
                                                    <div class="input-group-append">
                                                        <button class="btn btn-outline-secondary" type="button" id="i_mitem_info_option_remaining_fix_btn" onclick="eventOptionHandler().infoOptionRemainingBtnClick().edit()"><i class="fas fa-pen"></i></button>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    $("#i_mitem_option_info_box").html(html);
                },
                clear: function() {
                    $("#i_mitem_option_info_box").html('');
                }
            }
        }
    }
}

function optionObjectControl() {
    return {
        selectedOptionFlush: function() {
            SELECTED_OPTION = {};
        }
    }
}

function eventOptionHandler() {
    return {
        addOptionModalOpen: function() {
            loadOptionHtml().setAddOptionModalContent().set();
            $("#i_mitem_modal_regular").modal('show');
        },
        modalClose: function() {
            $("#i_mitem_modal_regular").modal('hide');
            $("#i_mitem_add_option_name_input").val('');
        },
        addOptionSubmitClick: async function() {
            let optionName = $("#i_mitem_add_option_name_input").val();
            if (optionName == '' | optionName == null) {
                alert("추가하실 옵션명을 입력해 주세요.");
                return;
            }
            await dataConnect().addOption(optionName);
            await dataConnect().getOptions();
            loadOptionHtml().setOptionSelect().set();

            $("#i_mitem_modal_regular").modal('hide');
            $("#i_mitem_add_option_name_input").val('');
        },
        optionInfoOpenClick: async function(optionUuid) {
            loadOptionHtml().setOptionSelect().set();
            SELECTED_OPTION = OPTIONS.filter(r => r.optionUuid == optionUuid)[0];
            loadOptionHtml().setOptionInfoHtml().set();
            await dataConnect().getItems();
            loadItemHtml().setItemsTableHtml().set();

            $(`#i_ty_mitem_option_select_el_btn_${SELECTED_CLASSIFY.classifyUuid}`).addClass('ty-st-mItem-item-btn-active')
        },
        infoOptionNameBtnClick: function() {
            let inputTag = $("#i_mitem_info_option_name");
            let fixBtn = $("#i_mitem_info_option_name_fix_btn");
            return {
                edit: function() {
                    inputTag.attr("disabled", false);
                    fixBtn.attr("onclick", "eventOptionHandler().infoOptionNameBtnClick().ok()");
                    fixBtn.html('<i class="far fa-check-square"></i>');
                },
                ok: async function() {
                    let newName = inputTag.val();
                    if (textIsEmpty(newName) | newName == null) {
                        alert('비어있는 옵션명은 사용하실수 없습니다.');
                        return;
                    }

                    SELECTED_OPTION.optionName = newName;
                    await dataConnect().updateOptionData();
                    await dataConnect().getOptions();
                    loadOptionHtml().setOptionSelect().set();
                    $(`#i_mitem_option_select_el_box_${SELECTED_OPTION.optionUuid}`).css('border', '2px solid #f2a057');
                    inputTag.attr("disabled", true);
                    fixBtn.attr("onclick", "eventOptionHandler().infoOptionNameBtnClick().edit()");
                    fixBtn.html('<i class="fas fa-pen"></i>');
                    return;
                }
            }
        },
        infoOptionRemainingBtnClick: function() {
            let inputTag = $("#i_mitem_info_option_remaining");
            let fixBtn = $("#i_mitem_info_option_remaining_fix_btn");
            return {
                edit: function() {
                    inputTag.attr("disabled", false);
                    fixBtn.attr("onclick", "eventOptionHandler().infoOptionRemainingBtnClick().ok()");
                    fixBtn.html('<i class="far fa-check-square"></i>');
                },
                ok: async function() {
                    let newVal = inputTag.val();
                    if (!isInt(newVal)) {
                        alert("재고수량은 정수만 입력 가능합니다.");
                        return;
                    }

                    SELECTED_OPTION.optionRemainingCount = newVal;
                    await dataConnect().updateOptionData();
                    await dataConnect().getOptions();
                    loadOptionHtml().setOptionSelect().set();
                    $(`#i_mitem_option_select_el_box_${SELECTED_OPTION.optionUuid}`).css('border', '2px solid #f2a057');
                    inputTag.attr("disabled", true);
                    fixBtn.attr("onclick", "eventOptionHandler().infoOptionRemainingBtnClick().edit()");
                    fixBtn.html('<i class="fas fa-pen"></i>');
                    return;
                }
            }
        },
        optionDeleteClick: function(optionUuid) {
            if (confirm("해당 옵션을 삭제하게 되면 상세 상품 데이터들도 함께 삭제 됩니다. 계속 하시겠습니까?")) {
                let option = {};
                OPTIONS = OPTIONS.filter(r => {
                    if (r.optionUuid == optionUuid) {
                        option = r;
                    }
                    return r.optionUuid != optionUuid;
                });
                loadOptionHtml().setOptionSelect().set();
                loadOptionHtml().setOptionInfoHtml().clear();
                loadItemHtml().setItemsTableHtml().clear();
                dataConnect().deleteOptionData(option);
                SELECTED_OPTION = {};
                SELECTED_ITEM = {};
            }

        }
    }
}