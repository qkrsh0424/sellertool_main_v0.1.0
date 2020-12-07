package com.sellertl.sellertool_v1.model.DTO.itemManager2.itemOption;

import java.util.List;

import com.sellertl.sellertool_v1.model.DTO.itemManager2.itemItem.ItemGet1DTO;

import lombok.Data;

@Data
public class OptionJItemGet1DTO {
    private String optionUUID;
    private String name;
    private int remainingCount;
    private int sellCount;
    private List<ItemGet1DTO> items;
}
