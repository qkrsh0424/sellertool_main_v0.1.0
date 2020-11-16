package com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem;

import java.util.Date;

import lombok.Data;

@Data
public class IItemDefGetDTO {
    private Long itemItemId;
    private String itemItemUuid;
    private String itemItemName;

    private String itemItemStoreType;
    private String itemItemStoreName;
    private Double itemItemCommitionCost;
    private Long itemItemPrice;
    private Long itemItemCustomerTransCost;
    private Long itemItemSellerRealTransCost;
    private Long itemItemPurchaseCost;
    private Long itemItemPurchaseTransCost;
    private Long itemItemExtraCharge;

    private String itemItemImageUrl;
    private String itemClassifyUuid;
    private String itemClassifyName;
    private String itemOptionUuid;
    private String itemOptionName;
    private int itemItemIc1Id;
    private int itemItemIc2Id;
    private int itemItemIc3Id;
    private int itemItemIc4Id;
    private String itemItemIc1Name;
    private String itemItemIc2Name;
    private String itemItemIc3Name;
    private String itemItemIc4Name;
    private Date itemItemCreatedAt;
    private Date itemItemUpdatedAt;
}
