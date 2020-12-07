package com.sellertl.sellertool_v1.service.itemManager;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionPureGetDTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemPureEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemOption.IOptionPureEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemSell.ISellPureEntity;
import com.sellertl.sellertool_v1.service.handler.DateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InsertConverterService {
    @Autowired
    DateService dateService;
    
    public IOptionPureEntity getOptionPureEntity(String userId, IClassifyDefGetDTO classify, String optionName, int remainingCount){
        IOptionPureEntity pureEntity = new IOptionPureEntity();
        String optionUuid = UUID.randomUUID().toString();

        pureEntity.setIClassifyUuid(classify.getClassifyUuid());
        pureEntity.setIOptionUuid(optionUuid);
        pureEntity.setUserId(userId);
        pureEntity.setIOptionName(optionName);
        pureEntity.setIOptionRemainingCount(remainingCount);
        pureEntity.setIOptionSellCount(0);
        pureEntity.setIOptionImageUrl(classify.getClassifyImageUrl());
        pureEntity.setIOptionCreatedAt(dateService.getCurrentDate());
        pureEntity.setIOptionUpdatedAt(dateService.getCurrentDate());
        return pureEntity;
    }

    public IItemDefEntity getItemDefEntity(String userId, IClassifyDefGetDTO classify, IOptionPureGetDTO option, String storeType, String storeName){
        IItemDefEntity itemEntity = new IItemDefEntity();
        itemEntity.setIItemUuid(UUID.randomUUID().toString());
        itemEntity.setIClassifyUuid(classify.getClassifyUuid());
        itemEntity.setIOptionUuid(option.getOptionUuid());
        itemEntity.setUserId(userId);
        itemEntity.setIItemStoreType(storeType);
        itemEntity.setIItemStoreName(storeName);
        itemEntity.setIItemCommitionCost(0.0);
        itemEntity.setIItemPrice(0L);
        itemEntity.setIItemCustomerTransCost(0L);
        itemEntity.setIItemSellerRealTransCost(0L);
        itemEntity.setIItemPurchaseCost(0L);
        itemEntity.setIItemPurchaseTransCost(0L);
        itemEntity.setIItemExtraCharge(0L);

        itemEntity.setIItemImageUrl(option.getOptionImageUrl());
        itemEntity.setIItemCreatedAt(dateService.getCurrentDate());
        itemEntity.setIItemUpdatedAt(dateService.getCurrentDate());
        return itemEntity;
    }

	public List<ISellPureEntity> getItemToSellEntities(List<IItemPureEntity> itemEntities, Date sellDate) {
        List<ISellPureEntity> sellEntities = new ArrayList<>();
        for(IItemPureEntity itemEntity: itemEntities){
            ISellPureEntity sellEntity = new ISellPureEntity();
            sellEntity.setUserId(itemEntity.getUserId());
            sellEntity.setIClassifyUuid(itemEntity.getIClassifyUuid());
            sellEntity.setIOptionUuid(itemEntity.getIOptionUuid());
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
            sellEntities.add(sellEntity);
        }
        return sellEntities;
	}
}
