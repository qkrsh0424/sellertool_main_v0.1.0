package com.sellertl.sellertool_v1.service.itemManager;

import java.util.ArrayList;
import java.util.List;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemCategory.ICategoryGroupDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyPureGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemDefCategDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemGet1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemJSellDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionPureGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemSell.ISellDefGetDTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ICategoryGroupDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ICategoryGroupPureEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemClassify.IClassifyDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemClassify.IClassifyPureEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemOption.IOptionPureEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemSell.ISellJClassifyJOptionJItemJCategoryEntity;

import org.springframework.stereotype.Service;

@Service
public class SearchConverterService {
    public List<IItemGet1DTO> getRegItemEntitiesToDtos(List<IItemDefEntity> itemEntities){
        List<IItemGet1DTO> itemDtos = new ArrayList<>();
        for(int i = 0 ; i < itemEntities.size(); i++){
            IItemGet1DTO item = new IItemGet1DTO();
            item.setItemId(itemEntities.get(i).getIItemId());
            item.setClassifyUuid(itemEntities.get(i).getIClassifyUuid());
            item.setOptionUuid(itemEntities.get(i).getIOptionUuid());
            item.setItemName(itemEntities.get(i).getClassify().getIClassifyName()+"-"+itemEntities.get(i).getOption().getIOptionName());
            item.setStoreType(itemEntities.get(i).getIItemStoreType());
            item.setStoreName(itemEntities.get(i).getIItemStoreName());
            itemDtos.add(item);
        }
        return itemDtos;
    }

    public List<IItemDefGetDTO> getItemDefEntitiesToDtos(List<IItemDefEntity> itemEntities){
        List<IItemDefGetDTO> itemDtos = new ArrayList<>();
        for(IItemDefEntity itemEntity : itemEntities){
            IItemDefGetDTO itemDto = new IItemDefGetDTO();
            itemDto.setItemId(itemEntity.getIItemId());
            itemDto.setItemUuid(itemEntity.getIItemUuid());
            itemDto.setClassifyUuid(itemEntity.getIClassifyUuid());
            itemDto.setOptionUuid(itemEntity.getIOptionUuid());
            itemDto.setStoreType(itemEntity.getIItemStoreType());
            itemDto.setStoreName(itemEntity.getIItemStoreName());
            itemDto.setCommitionCost(itemEntity.getIItemCommitionCost());
            itemDto.setPrice(itemEntity.getIItemPrice());
            itemDto.setCustomerTransCost(itemEntity.getIItemCustomerTransCost());
            itemDto.setSellerRealTransCost(itemEntity.getIItemSellerRealTransCost());
            itemDto.setPurchaseCost(itemEntity.getIItemPurchaseCost());
            itemDto.setPurchaseTransCost(itemEntity.getIItemPurchaseTransCost());
            itemDto.setExtraCharge(itemEntity.getIItemExtraCharge());
            itemDto.setImageUrl(itemEntity.getIItemImageUrl());
            itemDto.setItemName(itemEntity.getIItemName());
            itemDto.setCreatedAt(itemEntity.getIItemCreatedAt());
            itemDto.setUpdatedAt(itemEntity.getIItemUpdatedAt());
            itemDto.setCategory(getPureCategoryEntityToDto(itemEntity.getCategory()));
            itemDto.setClassify(getPureClassifyEntityToDto(itemEntity.getClassify()));
            itemDto.setOption(getPureOptionEntityToDto(itemEntity.getOption()));
            itemDtos.add(itemDto);
        }
        return itemDtos;
    }
    public IItemDefCategDTO getPureCategoryEntityToDto(ICategoryGroupPureEntity pureEntity){
        IItemDefCategDTO pureDto = new IItemDefCategDTO();
        pureDto.setCategory1Id(pureEntity.getICategoryGroupCategory1Id());
        pureDto.setCategory2Id(pureEntity.getICategoryGroupCategory2Id());
        pureDto.setCategory3Id(pureEntity.getICategoryGroupCategory3Id());
        pureDto.setCategory4Id(pureEntity.getICategoryGroupCategory4Id());
        pureDto.setCategory1Name(pureEntity.getICategoryGroupCategory1Name());
        pureDto.setCategory2Name(pureEntity.getICategoryGroupCategory2Name());
        pureDto.setCategory3Name(pureEntity.getICategoryGroupCategory3Name());
        pureDto.setCategory4Name(pureEntity.getICategoryGroupCategory4Name());
        return pureDto;
    }
    public IClassifyPureGetDTO getPureClassifyEntityToDto(IClassifyPureEntity pureEntity){
        IClassifyPureGetDTO pureDto = new IClassifyPureGetDTO();
        pureDto.setClassifyId(pureEntity.getIClassifyId());
        pureDto.setClassifyUuid(pureEntity.getIClassifyUuid());
        pureDto.setClassifyName(pureEntity.getIClassifyName());
        pureDto.setClassifyDesc(pureEntity.getIClassifyDesc());
        pureDto.setClassifyImageUrl(pureEntity.getIClassifyImageUrl());
        pureDto.setClassifyCreatedAt(pureEntity.getIClassifyCreatedAt());
        pureDto.setClassifyUpdatedAt(pureEntity.getIClassifyUpdatedAt());
        return pureDto;
    }

    public List<IClassifyPureGetDTO> getPureClassifyEntitiesToDtos(List<IClassifyPureEntity> pureEntities){
        List<IClassifyPureGetDTO> pureDtos= new ArrayList<>();
        for(IClassifyPureEntity pureEntity : pureEntities){
            IClassifyPureGetDTO pureDto = new IClassifyPureGetDTO();
            pureDto.setClassifyId(pureEntity.getIClassifyId());
            pureDto.setClassifyUuid(pureEntity.getIClassifyUuid());
            pureDto.setClassifyName(pureEntity.getIClassifyName());
            pureDto.setClassifyDesc(pureEntity.getIClassifyDesc());
            pureDto.setClassifyImageUrl(pureEntity.getIClassifyImageUrl());
            pureDto.setClassifyCreatedAt(pureEntity.getIClassifyCreatedAt());
            pureDto.setClassifyUpdatedAt(pureEntity.getIClassifyUpdatedAt());
            pureDtos.add(pureDto);
        }
        return pureDtos;
    }

    public List<IClassifyDefGetDTO> getDefClassifyEntitiesToDtos(List<IClassifyDefEntity> defEntities){
        List<IClassifyDefGetDTO> defDtos= new ArrayList<>();
        for(IClassifyDefEntity defEntity : defEntities){
            IClassifyDefGetDTO defDto = new IClassifyDefGetDTO();
            
            defDto.setClassifyId(defEntity.getIClassifyId());
            defDto.setClassifyUuid(defEntity.getIClassifyUuid());
            defDto.setClassifyName(defEntity.getIClassifyName());
            defDto.setClassifyDesc(defEntity.getIClassifyDesc());
            defDto.setClassifyImageUrl(defEntity.getIClassifyImageUrl());
            defDto.setClassifyCreatedAt(defEntity.getIClassifyCreatedAt());
            defDto.setClassifyUpdatedAt(defEntity.getIClassifyUpdatedAt());
            defDto.setCategory(getCategoryGroupEntityToDto(defEntity.getCategory()));
            defDtos.add(defDto);
        }
        return defDtos;
    }

    public ICategoryGroupDefGetDTO getCategoryGroupEntityToDto(ICategoryGroupDefEntity categoryEntity){
        ICategoryGroupDefGetDTO categoryDto = new ICategoryGroupDefGetDTO();
        categoryDto.setCategory1Id(categoryEntity.getICategoryGroupCategory1Id());
        categoryDto.setCategory2Id(categoryEntity.getICategoryGroupCategory2Id());
        categoryDto.setCategory3Id(categoryEntity.getICategoryGroupCategory3Id());
        categoryDto.setCategory4Id(categoryEntity.getICategoryGroupCategory4Id());
        categoryDto.setCategory1Name(categoryEntity.getICategoryGroupCategory1Name());
        categoryDto.setCategory2Name(categoryEntity.getICategoryGroupCategory2Name());
        categoryDto.setCategory3Name(categoryEntity.getICategoryGroupCategory3Name());
        categoryDto.setCategory4Name(categoryEntity.getICategoryGroupCategory4Name());
        return categoryDto;
    }

    public IOptionPureGetDTO getPureOptionEntityToDto(IOptionPureEntity pureEntity){
            IOptionPureGetDTO pureDto = new IOptionPureGetDTO();
            pureDto.setOptionId(pureEntity.getIOptionId());
            pureDto.setOptionUuid(pureEntity.getIOptionUuid());
            pureDto.setClassifyUuid(pureEntity.getIClassifyUuid());
            pureDto.setOptionName(pureEntity.getIOptionName());
            pureDto.setOptionImageUrl(pureEntity.getIOptionImageUrl());
            pureDto.setOptionRemainingCount(pureEntity.getIOptionRemainingCount());
            pureDto.setOptionSellCount(pureEntity.getIOptionSellCount());
            pureDto.setOptionCreatedAt(pureEntity.getIOptionCreatedAt());
            pureDto.setOptionUpdatedAt(pureEntity.getIOptionUpdatedAt());
        return pureDto;
    }

    public List<IOptionPureGetDTO> getPureOptionEntitiesToDtos(List<IOptionPureEntity> pureEntities){
        List<IOptionPureGetDTO> pureDtos= new ArrayList<>();
        for(IOptionPureEntity pureEntity : pureEntities){
            IOptionPureGetDTO pureDto = new IOptionPureGetDTO();
            pureDto.setOptionId(pureEntity.getIOptionId());
            pureDto.setOptionUuid(pureEntity.getIOptionUuid());
            pureDto.setClassifyUuid(pureEntity.getIClassifyUuid());
            pureDto.setOptionName(pureEntity.getIOptionName());
            pureDto.setOptionImageUrl(pureEntity.getIOptionImageUrl());
            pureDto.setOptionRemainingCount(pureEntity.getIOptionRemainingCount());
            pureDto.setOptionSellCount(pureEntity.getIOptionSellCount());
            pureDto.setOptionCreatedAt(pureEntity.getIOptionCreatedAt());
            pureDto.setOptionUpdatedAt(pureEntity.getIOptionUpdatedAt());
            pureDtos.add(pureDto);
        }
        return pureDtos;
    }

    // SellItem Entities To Dtos
    public List<ISellDefGetDTO> getSellEntitiesToGetDefDtos(List<ISellJClassifyJOptionJItemJCategoryEntity> sellEntities){
        List<ISellDefGetDTO> sellDefaultDtos = new ArrayList<>();
        for(ISellJClassifyJOptionJItemJCategoryEntity sellEntity : sellEntities){
            ISellDefGetDTO sellDef = new ISellDefGetDTO();
            IItemJSellDefGetDTO itemDef = new IItemJSellDefGetDTO();
            IItemDefCategDTO category = new IItemDefCategDTO();
            category.setCategory1Id(sellEntity.getCategory().getICategoryGroupCategory1Id());
            category.setCategory2Id(sellEntity.getCategory().getICategoryGroupCategory2Id());
            category.setCategory3Id(sellEntity.getCategory().getICategoryGroupCategory3Id());
            category.setCategory4Id(sellEntity.getCategory().getICategoryGroupCategory4Id());
            category.setCategory1Name(sellEntity.getCategory().getICategoryGroupCategory1Name());
            category.setCategory2Name(sellEntity.getCategory().getICategoryGroupCategory2Name());
            category.setCategory3Name(sellEntity.getCategory().getICategoryGroupCategory3Name());
            category.setCategory4Name(sellEntity.getCategory().getICategoryGroupCategory4Name());

            itemDef.setItemId(sellEntity.getItem().getIItemId());
            itemDef.setItemUuid(sellEntity.getItem().getIItemUuid());
            itemDef.setItemName(sellEntity.getClassify().getIClassifyName()+"-"+sellEntity.getOption().getIOptionName());
            itemDef.setItemStoreType(sellEntity.getItem().getIItemStoreType());
            itemDef.setItemStoreName(sellEntity.getItem().getIItemStoreName());
            itemDef.setItemImageUrl(sellEntity.getItem().getIItemImageUrl());
            itemDef.setClassifyUuid(sellEntity.getItem().getIClassifyUuid());
            itemDef.setClassifyName(sellEntity.getClassify().getIClassifyName());
            itemDef.setOptionUuid(sellEntity.getItem().getIOptionUuid());
            itemDef.setOptionName(sellEntity.getOption().getIOptionName());
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
