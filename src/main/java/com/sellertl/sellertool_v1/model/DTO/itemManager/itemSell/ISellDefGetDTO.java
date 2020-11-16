package com.sellertl.sellertool_v1.model.DTO.itemManager.itemSell;

import java.util.Date;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemJSellDefGetDTO;

import lombok.Data;

/**
 * ISellDefaultGetDTO 생성시 
 * IItemJSellDefGetDTO 를 생성해서 포함시켜줘야한다. 
 * IItemDefCategDTO 를 생성해서 IItemJSellDefGetDTO로 포함시켜야 한다.
 * 포함 관계 -> ISellDefaultGetDTO > IItemJSellDefGetDTO > IItemDefCategDTO
 */

@Data
public class ISellDefGetDTO {
    private Long sellId;
    private Long itemId;
    private String sellTag;
    private Double sellCommitionCost;
    private Long sellPrice;
    private Long sellCustomerTransCost;
    private Long sellSellerRealTransCost;
    private Long sellPurchaseCost;
    private Long sellPurchaseTransCost;
    private Long sellExtraCharge;
    private int sellCount;
    private Long sellTotAdsCost;
    private Long sellTotExpensesCost;
    private Long sellTotEarningCost;
    private Long sellTotCustomerTransCost;
    private Long sellTotSellerRealTransCost;
    private Long sellTotPurchaseTransCost;
    private Date sellCreatedAt;
    private Date sellUpdatedAt;
    private Date sellSelldate;
    // IItemJSellDefGetDTO -> 하위 포함하는 DTO => (IItemDefCategDTO)
    private IItemJSellDefGetDTO itemData;
}
