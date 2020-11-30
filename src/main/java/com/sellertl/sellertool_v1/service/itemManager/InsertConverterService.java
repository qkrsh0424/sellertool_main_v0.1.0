package com.sellertl.sellertool_v1.service.itemManager;

import java.util.UUID;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionPureGetDTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemOption.IOptionPureEntity;
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
}
