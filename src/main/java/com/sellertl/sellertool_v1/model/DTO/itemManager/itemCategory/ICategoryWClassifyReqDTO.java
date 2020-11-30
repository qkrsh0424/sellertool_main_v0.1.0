package com.sellertl.sellertool_v1.model.DTO.itemManager.itemCategory;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyDefGetDTO;

import lombok.Data;

@Data
public class ICategoryWClassifyReqDTO {
    private ICategoryGroupDefGetDTO category;
    private IClassifyDefGetDTO classify;
}
