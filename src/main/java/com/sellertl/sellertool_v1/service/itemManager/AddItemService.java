package com.sellertl.sellertool_v1.service.itemManager;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemClassifyOptionsItemsReqDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemClassifyOptionsReqDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemClassifyReqDTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.ItemClassifyEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.ItemItemEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.ItemOptionEntity;
import com.sellertl.sellertool_v1.model.repository.itemManager.ItemClassifyRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.ItemItemRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.ItemOptionRepository;
import com.sellertl.sellertool_v1.service.handler.DateService;
import com.sellertl.sellertool_v1.service.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddItemService {
    @Autowired
    UserService userService;

    @Autowired
    DateService dateService;

    @Autowired
    ItemClassifyRepository itemClassifyRepository;

    @Autowired
    ItemOptionRepository itemOptionRepository;

    @Autowired
    ItemItemRepository itemItemRepository;
    
    public String saveAddItems(ItemClassifyReqDTO classify, HttpServletRequest request){
        String userId = userService.getUserInfoDTO(request).getId();

        if(userId==null){
            return "USER_INVALID";
        }
        newClassifyReqDTO(classify);

        try{
            ItemClassifyEntity classifyEntity = getClassifyEntity(classify, userId);
            itemClassifyRepository.save(classifyEntity);
            
            List<ItemOptionEntity> optionEntities = getOptionEntities(classify, userId);
            itemOptionRepository.saveAll(optionEntities);

            List<ItemItemEntity> itemEntities = getItemEntities(classify, userId);
            itemItemRepository.saveAll(itemEntities);
        } catch(Exception exception){
            // System.out.println(exception);
            return "ERROR";
        }
        
        return "SUCCESS";
    }

    public void newClassifyReqDTO(ItemClassifyReqDTO classify){
        classify.setClassifyUUID(UUID.randomUUID().toString());
        for(int i = 0 ; i < classify.getOptions().size(); i++){
            classify.getOptions().get(i).setOptionUUID(UUID.randomUUID().toString());
            for(int j = 0 ; j < classify.getOptions().get(i).getItems().size(); j++){
                classify.getOptions().get(i).getItems().get(j).setItemUUID(UUID.randomUUID().toString());
            }
        }
    }

    public ItemClassifyEntity getClassifyEntity(ItemClassifyReqDTO classify, String userId){
        ItemClassifyEntity classifyEntity = new ItemClassifyEntity();
        classifyEntity.setItemClassifyUuid(classify.getClassifyUUID());
        classifyEntity.setUserId(userId);
        classifyEntity.setItemClassifyName(classify.getClassifyName());
        classifyEntity.setItemClassifyDesc(classify.getClassifyDesc());
        classifyEntity.setItemClassifyImageUrl(classify.getClassifyImage());
        classifyEntity.setItemClassifyIc1Id(classify.getCategorys().getCategory1Id());
        classifyEntity.setItemClassifyIc2Id(classify.getCategorys().getCategory2Id());
        classifyEntity.setItemClassifyIc3Id(classify.getCategorys().getCategory3Id());
        classifyEntity.setItemClassifyIc4Id(classify.getCategorys().getCategory4Id());
        classifyEntity.setItemClassifyIc1Name(classify.getCategorys().getCategory1Name());
        classifyEntity.setItemClassifyIc2Name(classify.getCategorys().getCategory2Name());
        classifyEntity.setItemClassifyIc3Name(classify.getCategorys().getCategory3Name());
        classifyEntity.setItemClassifyIc4Name(classify.getCategorys().getCategory4Name());
        classifyEntity.setItemClassifyCreatedAt(dateService.getCurrentDate());
        classifyEntity.setItemClassifyUpdatedAt(dateService.getCurrentDate());
        return classifyEntity;
    }
    
    public List<ItemOptionEntity> getOptionEntities(ItemClassifyReqDTO classify, String userId){
        List<ItemOptionEntity> optionEntityList = new ArrayList<>();
        List<ItemClassifyOptionsReqDTO> itemClassifyOptionsSetDTOs = classify.getOptions();

        for(int i = 0 ; i < itemClassifyOptionsSetDTOs.size(); i++){
            ItemOptionEntity optionEntity = new ItemOptionEntity();

            optionEntity.setUserId(userId);
            optionEntity.setItemClassifyUuid(classify.getClassifyUUID());
            optionEntity.setItemClassifyName(classify.getClassifyName());

            optionEntity.setItemOptionName(itemClassifyOptionsSetDTOs.get(i).getName());
            optionEntity.setItemOptionUuid(itemClassifyOptionsSetDTOs.get(i).getOptionUUID());
            optionEntity.setItemOptionRemainingCount(itemClassifyOptionsSetDTOs.get(i).getRemainingCount());
            optionEntity.setItemOptionSellCount(itemClassifyOptionsSetDTOs.get(i).getSellCount());
            
            optionEntity.setItemOptionImageUrl(classify.getClassifyImage());
            optionEntity.setItemOptionIc1Id(classify.getCategorys().getCategory1Id());
            optionEntity.setItemOptionIc2Id(classify.getCategorys().getCategory2Id());
            optionEntity.setItemOptionIc3Id(classify.getCategorys().getCategory3Id());
            optionEntity.setItemOptionIc4Id(classify.getCategorys().getCategory4Id());
            optionEntity.setItemOptionIc1Name(classify.getCategorys().getCategory1Name());
            optionEntity.setItemOptionIc2Name(classify.getCategorys().getCategory2Name());
            optionEntity.setItemOptionIc3Name(classify.getCategorys().getCategory3Name());
            optionEntity.setItemOptionIc4Name(classify.getCategorys().getCategory4Name());
            optionEntity.setItemOptionCreatedAt(dateService.getCurrentDate());
            optionEntity.setItemOptionUpdatedAt(dateService.getCurrentDate());

            optionEntityList.add(optionEntity);
        }
        
        return optionEntityList;
    }

    public List<ItemItemEntity> getItemEntities(ItemClassifyReqDTO classify, String userId){
        List<ItemItemEntity> itemEntities = new ArrayList<>();
        List<ItemClassifyOptionsReqDTO> itemClassifyOptionsSetDTOs = classify.getOptions();

        for(ItemClassifyOptionsReqDTO option : itemClassifyOptionsSetDTOs){
            for(ItemClassifyOptionsItemsReqDTO item : option.getItems()){
                ItemItemEntity itemEntity = new ItemItemEntity();
                itemEntity.setUserId(userId);
                itemEntity.setItemItemUuid(item.getItemUUID());
                itemEntity.setItemItemName(classify.getClassifyName()+"-"+option.getName());
                itemEntity.setItemItemStoreType(item.getStoreType());
                itemEntity.setItemItemStoreName(item.getStoreName());
                itemEntity.setItemItemCommitionCost(item.getCommitionCost());
                itemEntity.setItemItemPrice(item.getPrice());
                itemEntity.setItemItemCustomerTransCost(item.getCustomerTransCost());
                itemEntity.setItemItemSellerRealTransCost(item.getSellerRealTransCost());
                itemEntity.setItemItemPurchaseCost(item.getPurchaseCost());
                itemEntity.setItemItemPurchaseTransCost(item.getPurchaseTransCost());
                itemEntity.setItemItemExtraCharge(item.getExtraCharge());
                itemEntity.setItemItemImageUrl(classify.getClassifyImage());
                itemEntity.setItemClassifyUuid(classify.getClassifyUUID());
                itemEntity.setItemClassifyName(classify.getClassifyName());
                itemEntity.setItemOptionUuid(option.getOptionUUID());
                itemEntity.setItemOptionName(option.getName());
                itemEntity.setItemItemIc1Id(classify.getCategorys().getCategory1Id());
                itemEntity.setItemItemIc2Id(classify.getCategorys().getCategory2Id());
                itemEntity.setItemItemIc3Id(classify.getCategorys().getCategory3Id());
                itemEntity.setItemItemIc4Id(classify.getCategorys().getCategory4Id());
                itemEntity.setItemItemIc1Name(classify.getCategorys().getCategory1Name());
                itemEntity.setItemItemIc2Name(classify.getCategorys().getCategory2Name());
                itemEntity.setItemItemIc3Name(classify.getCategorys().getCategory3Name());
                itemEntity.setItemItemIc4Name(classify.getCategorys().getCategory4Name());
                itemEntity.setItemItemCreatedAt(dateService.getCurrentDate());
                itemEntity.setItemItemUpdatedAt(dateService.getCurrentDate());
                itemEntities.add(itemEntity);
            }
        }
        return itemEntities;
    }
}
