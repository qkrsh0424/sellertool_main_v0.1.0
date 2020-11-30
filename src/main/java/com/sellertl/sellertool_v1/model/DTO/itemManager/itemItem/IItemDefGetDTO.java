package com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem;

import java.util.Date;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyPureGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionPureGetDTO;

import lombok.Data;

@Data
public class IItemDefGetDTO {
    private Long itemId;
    private String itemUuid;
    private String classifyUuid;
    private String optionUuid;
    private String storeType;
    private String storeName;
    private Double commitionCost;
    private Long price;
    private Long customerTransCost;
    private Long sellerRealTransCost;
    private Long purchaseCost;
    private Long purchaseTransCost;
    private Long extraCharge;
    private String imageUrl;
    private String itemName;
    private Date createdAt;
    private Date updatedAt;
    private IItemDefCategDTO category;
    private IClassifyPureGetDTO classify;
    private IOptionPureGetDTO option;
}
