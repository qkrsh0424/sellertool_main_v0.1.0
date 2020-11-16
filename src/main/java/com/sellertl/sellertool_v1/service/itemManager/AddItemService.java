package com.sellertl.sellertool_v1.service.itemManager;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyOptionsItemsReqDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyOptionsReqDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyReqDTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ICategoryGroupDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemClassify.IClassifyDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemOption.IOptionDefEntity;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemCategory.ICategoryGroupDefRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemClassify.IClassifyDefRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemItem.IItemDefRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemOption.IOptionDefRepository;
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
    ICategoryGroupDefRepository iCategoryGroupDefRepository;

    @Autowired
    IClassifyDefRepository iClassifyDefRepository;

    @Autowired
    IOptionDefRepository iOptionDefRepository;

    @Autowired
    IItemDefRepository iItemDefRepository;
    
    public String saveAddItems(IClassifyReqDTO classify, HttpServletRequest request){
        String userId = userService.getUserInfoDTO(request).getId();

        if(userId==null){
            return "USER_INVALID";
        }
        newClassifyReqDTO(classify);

        try{
            ICategoryGroupDefEntity categoryGroup = getCategoryGroupEntity(classify, userId);
            iCategoryGroupDefRepository.save(categoryGroup);

            IClassifyDefEntity classifyEntity = getClassifyEntity(classify, userId);
            iClassifyDefRepository.save(classifyEntity);
            
            List<IOptionDefEntity> optionEntities = getOptionEntities(classify, userId);
            iOptionDefRepository.saveAll(optionEntities);

            List<IItemDefEntity> itemEntities = getItemEntities(classify, userId);
            iItemDefRepository.saveAll(itemEntities);
        } catch(Exception exception){
            // System.out.println(exception);
            return "ERROR";
        }
        
        return "SUCCESS";
    }

    public void newClassifyReqDTO(IClassifyReqDTO classify){
        classify.setClassifyUUID(UUID.randomUUID().toString());
        for(int i = 0 ; i < classify.getOptions().size(); i++){
            classify.getOptions().get(i).setOptionUUID(UUID.randomUUID().toString());
            for(int j = 0 ; j < classify.getOptions().get(i).getItems().size(); j++){
                classify.getOptions().get(i).getItems().get(j).setItemUUID(UUID.randomUUID().toString());
            }
        }
    }

    public ICategoryGroupDefEntity getCategoryGroupEntity(IClassifyReqDTO classify, String userId){
        ICategoryGroupDefEntity categoryEntity = new ICategoryGroupDefEntity();
        categoryEntity.setUserId(userId);
        categoryEntity.setIClassifyUuid(classify.getClassifyUUID());
        categoryEntity.setICategoryGroupCategory1Id(classify.getCategorys().getCategory1Id());
        categoryEntity.setICategoryGroupCategory2Id(classify.getCategorys().getCategory2Id());
        categoryEntity.setICategoryGroupCategory3Id(classify.getCategorys().getCategory3Id());
        categoryEntity.setICategoryGroupCategory4Id(classify.getCategorys().getCategory4Id());
        categoryEntity.setICategoryGroupCategory1Name(classify.getCategorys().getCategory1Name());
        categoryEntity.setICategoryGroupCategory2Name(classify.getCategorys().getCategory2Name());
        categoryEntity.setICategoryGroupCategory3Name(classify.getCategorys().getCategory3Name());
        categoryEntity.setICategoryGroupCategory4Name(classify.getCategorys().getCategory4Name());
        return categoryEntity;

    }
    public IClassifyDefEntity getClassifyEntity(IClassifyReqDTO classify, String userId){
        IClassifyDefEntity classifyEntity = new IClassifyDefEntity();
        classifyEntity.setIClassifyUuid(classify.getClassifyUUID());
        classifyEntity.setUserId(userId);
        classifyEntity.setIClassifyName(classify.getClassifyName());
        classifyEntity.setIClassifyDesc(classify.getClassifyDesc());
        classifyEntity.setIClassifyImageUrl(classify.getClassifyImage());
        classifyEntity.setIClassifyCreatedAt(dateService.getCurrentDate());
        classifyEntity.setIClassifyUpdatedAt(dateService.getCurrentDate());
        return classifyEntity;
    }
    
    public List<IOptionDefEntity> getOptionEntities(IClassifyReqDTO classify, String userId){
        List<IOptionDefEntity> optionEntityList = new ArrayList<>();
        List<IClassifyOptionsReqDTO> itemClassifyOptionsSetDTOs = classify.getOptions();

        for(int i = 0 ; i < itemClassifyOptionsSetDTOs.size(); i++){
            IOptionDefEntity optionEntity = new IOptionDefEntity();

            optionEntity.setIOptionUuid(itemClassifyOptionsSetDTOs.get(i).getOptionUUID());
            optionEntity.setIClassifyUuid(classify.getClassifyUUID());
            optionEntity.setUserId(userId);
            optionEntity.setIOptionName(itemClassifyOptionsSetDTOs.get(i).getName());
            optionEntity.setIOptionRemainingCount(itemClassifyOptionsSetDTOs.get(i).getRemainingCount());
            optionEntity.setIOptionSellCount(itemClassifyOptionsSetDTOs.get(i).getSellCount());
            optionEntity.setIOptionImageUrl(classify.getClassifyImage());
            optionEntity.setIOptionCreatedAt(dateService.getCurrentDate());
            optionEntity.setIOptionUpdatedAt(dateService.getCurrentDate());

            optionEntityList.add(optionEntity);
        }
        
        return optionEntityList;
    }

    public List<IItemDefEntity> getItemEntities(IClassifyReqDTO classify, String userId){
        List<IItemDefEntity> itemEntities = new ArrayList<>();
        List<IClassifyOptionsReqDTO> itemClassifyOptionsSetDTOs = classify.getOptions();

        for(IClassifyOptionsReqDTO option : itemClassifyOptionsSetDTOs){
            for(IClassifyOptionsItemsReqDTO item : option.getItems()){
                IItemDefEntity itemEntity = new IItemDefEntity();
                itemEntity.setIItemUuid(item.getItemUUID());
                itemEntity.setIClassifyUuid(classify.getClassifyUUID());
                itemEntity.setIOptionUuid(option.getOptionUUID());
                itemEntity.setUserId(userId);
                itemEntity.setIItemStoreType(item.getStoreType());
                itemEntity.setIItemStoreName(item.getStoreName());
                itemEntity.setIItemCommitionCost(item.getCommitionCost());
                itemEntity.setIItemPrice(item.getPrice());
                itemEntity.setIItemCustomerTransCost(item.getCustomerTransCost());
                itemEntity.setIItemSellerRealTransCost(item.getSellerRealTransCost());
                itemEntity.setIItemPurchaseCost(item.getPurchaseCost());
                itemEntity.setIItemPurchaseTransCost(item.getPurchaseTransCost());
                itemEntity.setIItemExtraCharge(item.getExtraCharge());
                itemEntity.setIItemImageUrl(classify.getClassifyImage());
                itemEntity.setIItemCreatedAt(dateService.getCurrentDate());
                itemEntity.setIItemUpdatedAt(dateService.getCurrentDate());
                itemEntities.add(itemEntity);
            }
        }
        return itemEntities;
    }
}
