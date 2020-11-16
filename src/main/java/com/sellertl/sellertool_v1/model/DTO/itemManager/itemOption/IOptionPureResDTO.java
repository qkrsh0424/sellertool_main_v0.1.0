package com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption;

import java.util.List;

import lombok.Data;

@Data
public class IOptionPureResDTO {
    private String message;
    private List<IOptionPureGetDTO> options;
}
