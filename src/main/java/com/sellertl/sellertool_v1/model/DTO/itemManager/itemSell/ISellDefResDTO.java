package com.sellertl.sellertool_v1.model.DTO.itemManager.itemSell;

import java.util.List;

import lombok.Data;

@Data
public class ISellDefResDTO {
    private String message;
    private List<ISellDefGetDTO> data;
}
