package com.sellertl.sellertool_v1.model.DTO.itemManager;

import java.util.List;

import lombok.Data;

@Data
public class ItemClassifyOptionsReqDTO {
    private String optionUUID;
    private String name;
    private int remainingCount;
    private int sellCount;
    private List<ItemClassifyOptionsItemsReqDTO> items;
}