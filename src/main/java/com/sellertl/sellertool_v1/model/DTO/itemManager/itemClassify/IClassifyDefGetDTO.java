package com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify;

import java.util.Date;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemCategory.ICategoryGroupDefGetDTO;

import lombok.Data;

@Data
public class IClassifyDefGetDTO {
    private Long classifyId;
    private String classifyUuid;
    private String classifyName;
    private String classifyDesc;
    private String classifyImageUrl;
    private Date classifyCreatedAt;
    private Date classifyUpdatedAt;
    private ICategoryGroupDefGetDTO category;
}
