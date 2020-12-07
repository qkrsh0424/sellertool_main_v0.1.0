package com.sellertl.sellertool_v1.model.DTO.itemManager2.itemMerged;

import java.util.List;

import com.sellertl.sellertool_v1.model.DTO.itemManager2.itemCategory.CategoryGroupGet1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager2.itemOption.OptionJItemGet1DTO;

import lombok.Data;

@Data
public class MergedReqDTO {
    private String classifyUUID;
    private String classifyName;
    private String classifyDesc;
    private String classifyImage;
    private CategoryGroupGet1DTO categorys;
    private List<OptionJItemGet1DTO> options;
}
