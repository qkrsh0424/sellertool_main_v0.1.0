package com.sellertl.sellertool_v1.service.itemManager;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemDefCategDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemJSellDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemSell.ISellDefGetDTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemSell.ISellDefEntity;
import com.sellertl.sellertool_v1.service.handler.DateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SellDashConverterService {
    @Autowired
    DateService dateService;

    public List<ISellDefEntity> getItemToSellEntities(List<IItemDefEntity> itemEntities, Date sellDate){
        List<ISellDefEntity> sellEntities = new ArrayList<>();
        for(IItemDefEntity itemEntity: itemEntities){
            ISellDefEntity sellEntity = new ISellDefEntity();
            sellEntity.setUserId(itemEntity.getUserId());
            sellEntity.setIItemId(itemEntity.getIItemId());
            sellEntity.setISellTag("");
            sellEntity.setISellCommitionCost(itemEntity.getIItemCommitionCost());
            sellEntity.setISellPrice(itemEntity.getIItemPrice());
            sellEntity.setISellCustomerTransCost(itemEntity.getIItemCustomerTransCost());
            sellEntity.setISellSellerRealTransCost(itemEntity.getIItemSellerRealTransCost());
            sellEntity.setISellPurchaseCost(itemEntity.getIItemPurchaseCost());
            sellEntity.setISellPurchaseTransCost(itemEntity.getIItemPurchaseTransCost());
            sellEntity.setISellExtraCharge(itemEntity.getIItemExtraCharge());
            sellEntity.setISellSelledCount(0);
            sellEntity.setISellTotAdsCost(0L);
            sellEntity.setISellTotExpensesCost(0L);
            sellEntity.setISellTotEarningCost(0L);
            sellEntity.setISellTotCustomerTransCost(0L);
            sellEntity.setISellTotSellerRealTransCost(0L);
            sellEntity.setISellTotPurchaseTransCost(0L);
            sellEntity.setISellCreatedAt(dateService.getCurrentDate());
            sellEntity.setISellUpdatedAt(dateService.getCurrentDate());
            sellEntity.setISellSelledDate(sellDate);
            sellEntity.setItem(itemEntity);
            sellEntities.add(sellEntity);
        }
        return sellEntities;
    }

    // **TODO : 엔티티 -> GET1 DTO**
    public List<ISellDefGetDTO> getSellEntitiesToGetDefaultDtos(List<ISellDefEntity> sellEntities){
        List<ISellDefGetDTO> sellDefaultDtos = new ArrayList<>();
        for(ISellDefEntity sellEntity : sellEntities){
            ISellDefGetDTO sellDef = new ISellDefGetDTO();
            IItemJSellDefGetDTO itemDef = new IItemJSellDefGetDTO();
            IItemDefCategDTO category = new IItemDefCategDTO();
            category.setCategory1Id(sellEntity.getItem().getOption().getClassify().getCategory().getICategoryGroupCategory1Id());
            category.setCategory2Id(sellEntity.getItem().getOption().getClassify().getCategory().getICategoryGroupCategory2Id());
            category.setCategory3Id(sellEntity.getItem().getOption().getClassify().getCategory().getICategoryGroupCategory3Id());
            category.setCategory4Id(sellEntity.getItem().getOption().getClassify().getCategory().getICategoryGroupCategory4Id());
            category.setCategory1Name(sellEntity.getItem().getOption().getClassify().getCategory().getICategoryGroupCategory1Name());
            category.setCategory2Name(sellEntity.getItem().getOption().getClassify().getCategory().getICategoryGroupCategory2Name());
            category.setCategory3Name(sellEntity.getItem().getOption().getClassify().getCategory().getICategoryGroupCategory3Name());
            category.setCategory4Name(sellEntity.getItem().getOption().getClassify().getCategory().getICategoryGroupCategory4Name());

            itemDef.setItemId(sellEntity.getItem().getIItemId());
            itemDef.setItemUuid(sellEntity.getItem().getIItemUuid());
            itemDef.setItemName(sellEntity.getItem().getIItemName());
            itemDef.setItemStoreType(sellEntity.getItem().getIItemStoreType());
            itemDef.setItemStoreName(sellEntity.getItem().getIItemStoreName());
            itemDef.setItemImageUrl(sellEntity.getItem().getIItemImageUrl());
            itemDef.setClassifyUuid(sellEntity.getItem().getIClassifyUuid());
            itemDef.setClassifyName(sellEntity.getItem().getOption().getClassify().getIClassifyName());
            itemDef.setOptionUuid(sellEntity.getItem().getIOptionUuid());
            itemDef.setOptionName(sellEntity.getItem().getOption().getIOptionName());
            itemDef.setCategoryData(category);

            sellDef.setSellId(sellEntity.getISellId());
            sellDef.setItemId(sellEntity.getIItemId());
            sellDef.setSellTag(sellEntity.getISellTag());
            sellDef.setSellCommitionCost(sellEntity.getISellCommitionCost());
            sellDef.setSellPrice(sellEntity.getISellPrice());
            sellDef.setSellCustomerTransCost(sellEntity.getISellCustomerTransCost());
            sellDef.setSellSellerRealTransCost(sellEntity.getISellSellerRealTransCost());
            sellDef.setSellPurchaseCost(sellEntity.getISellPurchaseCost());
            sellDef.setSellPurchaseTransCost(sellEntity.getISellPurchaseTransCost());
            sellDef.setSellExtraCharge(sellEntity.getISellExtraCharge());
            sellDef.setSellCount(sellEntity.getISellSelledCount());
            sellDef.setSellTotAdsCost(sellEntity.getISellTotAdsCost());
            sellDef.setSellTotExpensesCost(sellEntity.getISellTotExpensesCost());
            sellDef.setSellTotEarningCost(sellEntity.getISellTotEarningCost());
            sellDef.setSellTotCustomerTransCost(sellEntity.getISellTotCustomerTransCost());
            sellDef.setSellTotSellerRealTransCost(sellEntity.getISellTotSellerRealTransCost());
            sellDef.setSellTotPurchaseTransCost(sellEntity.getISellTotPurchaseTransCost());
            sellDef.setSellCreatedAt(sellEntity.getISellCreatedAt());
            sellDef.setSellUpdatedAt(sellEntity.getISellUpdatedAt());
            sellDef.setSellSelldate(sellEntity.getISellSelledDate());
            sellDef.setItemData(itemDef);
            sellDefaultDtos.add(sellDef);
        }
        return sellDefaultDtos;
    }
}
