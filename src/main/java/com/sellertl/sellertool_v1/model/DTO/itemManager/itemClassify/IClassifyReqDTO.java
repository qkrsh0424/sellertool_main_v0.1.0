package com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify;

import java.util.List;

import lombok.Data;

@Data
public class IClassifyReqDTO {
    private String classifyUUID;
    private String classifyName;
    private String classifyDesc;
    private String classifyImage;
    private IClassifyCategorysReqDTO categorys;
    private List<IClassifyOptionsReqDTO> options;
}
