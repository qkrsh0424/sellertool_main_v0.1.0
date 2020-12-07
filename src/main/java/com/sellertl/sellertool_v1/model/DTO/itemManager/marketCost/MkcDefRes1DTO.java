package com.sellertl.sellertool_v1.model.DTO.itemManager.marketCost;

import java.util.List;

import lombok.Data;

@Data
public class MkcDefRes1DTO {
    private String message;
    private List<MkcDefGet1DTO> data;
}
