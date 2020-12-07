package com.sellertl.sellertool_v1.model.DTO.itemManager.marketCost;

import java.util.Date;

import lombok.Data;

@Data
public class MkcDefGet1DTO {
    private Long mkcId;
    private String mkcType;
    private Date mkcRegDate;
    private String classifyUuid;
    private String classifyName;
    private String optionUuid;
    private String optionName;
    private String storeType;
    private String storeName;
    private Long adsCost;
}
