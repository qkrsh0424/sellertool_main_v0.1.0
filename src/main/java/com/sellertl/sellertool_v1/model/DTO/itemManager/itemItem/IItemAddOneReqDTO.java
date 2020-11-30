package com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionPureGetDTO;

import lombok.Data;

@Data
public class IItemAddOneReqDTO {
    private IClassifyDefGetDTO classify;
    private IOptionPureGetDTO option;
    private String storeType;
    private String storeName;
}
