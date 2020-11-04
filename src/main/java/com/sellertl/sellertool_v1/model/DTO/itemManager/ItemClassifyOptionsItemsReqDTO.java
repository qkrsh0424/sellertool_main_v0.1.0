package com.sellertl.sellertool_v1.model.DTO.itemManager;

import lombok.Data;

@Data
public class ItemClassifyOptionsItemsReqDTO {
    private String itemUUID;
    private String storeName;
    private String storeType;
    private Double commitionCost;
    private Long price;
    private Long customerTransCost;
    private Long sellerRealTransCost;
    private Long purchaseCost;
    private Long purchaseTransCost;
    private Long extraCharge;
}
