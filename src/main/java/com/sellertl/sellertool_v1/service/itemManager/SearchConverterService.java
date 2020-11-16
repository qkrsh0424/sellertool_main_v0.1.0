package com.sellertl.sellertool_v1.service.itemManager;

import java.util.ArrayList;
import java.util.List;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyPureGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemGet1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionPureGetDTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemClassify.IClassifyPureEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemDefEntity;
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
