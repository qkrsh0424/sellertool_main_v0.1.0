package com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify;

import java.util.List;

import lombok.Data;

@Data
public class IClassifyPureResDTO {
    private String message;
    private List<IClassifyPureGetDTO> classifys;
    
}
