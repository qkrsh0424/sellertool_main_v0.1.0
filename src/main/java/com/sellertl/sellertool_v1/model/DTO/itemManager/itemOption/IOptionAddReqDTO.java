package com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyDefGetDTO;

import lombok.Data;

@Data
public class IOptionAddReqDTO {
    private IClassifyDefGetDTO classify;
    private String optionName;
    private int remainingCount;
}
