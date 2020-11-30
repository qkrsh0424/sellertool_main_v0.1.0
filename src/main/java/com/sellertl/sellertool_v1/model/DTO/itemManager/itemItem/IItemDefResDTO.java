package com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem;

import java.util.List;

import lombok.Data;

@Data
public class IItemDefResDTO {
    private String message;
    private List<IItemDefGetDTO> data;
}
