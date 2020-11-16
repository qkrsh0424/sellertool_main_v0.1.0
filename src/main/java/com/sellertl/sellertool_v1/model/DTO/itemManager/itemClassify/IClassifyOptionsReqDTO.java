package com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify;

import java.util.List;

import lombok.Data;

@Data
public class IClassifyOptionsReqDTO {
    private String optionUUID;
    private String name;
    private int remainingCount;
    private int sellCount;
    private List<IClassifyOptionsItemsReqDTO> items;
}