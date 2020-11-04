package com.sellertl.sellertool_v1.model.DTO.itemManager;

import java.util.List;

import lombok.Data;

@Data
public class ItemClassifyReqDTO {
    private String classifyUUID;
    private String classifyName;
    private String classifyDesc;
    private String classifyImage;
    private ItemClassifyCategorysReqDTO categorys;
    private List<ItemClassifyOptionsReqDTO> options;
}
