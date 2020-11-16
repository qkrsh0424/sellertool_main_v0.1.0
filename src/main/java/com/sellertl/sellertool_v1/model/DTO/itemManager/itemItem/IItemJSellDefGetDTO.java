package com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem;

import lombok.Data;

@Data
public class IItemJSellDefGetDTO {
    private Long itemId;
    private String itemUuid;
    private String itemName;

    private String itemStoreType;
    private String itemStoreName;

    private String itemImageUrl;
    private String classifyUuid;
    private String classifyName;
    private String optionUuid;
    private String optionName;
    private IItemDefCategDTO categoryData;
}
