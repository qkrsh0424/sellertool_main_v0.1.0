package com.sellertl.sellertool_v1.service.itemManager;

import java.util.ArrayList;
import java.util.List;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemCategory.ICategoryGroupDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyPureGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemDefCategDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemGet1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionPureGetDTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ICategoryGroupDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemClassify.IClassifyDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemClassify.IClassifyPureEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemOption.IOptionDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemOption.IOptionPureEntity;

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
            item.setItemName(itemEntities.get(i).getOption().getClassify().getIClassifyName()+"-"+itemEntities.get(i).getOption().getIOptionName());
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
            itemDto.setCategory(getPureCategoryEntityToDto(itemEntity.getOption().getClassify().getCategory()));
            itemDto.setClassify(getPureClassifyEntityToDto(itemEntity.getOption().getClassify()));
            itemDto.setOption(getPureOptionEntityToDto(itemEntity.getOption()));
            itemDtos.add(itemDto);
        }
        return itemDtos;
    }
    public IItemDefCategDTO getPureCategoryEntityToDto(ICategoryGroupDefEntity pureEntity){
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
    public IClassifyPureGetDTO getPureClassifyEntityToDto(IClassifyDefEntity pureEntity){
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

    public IOptionPureGetDTO getPureOptionEntityToDto(IOptionDefEntity pureEntity){
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
}
