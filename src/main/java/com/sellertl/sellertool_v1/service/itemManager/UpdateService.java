package com.sellertl.sellertool_v1.service.itemManager;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.UserLoginSessionDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemCategory.ICategoryGroupDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyPureGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionPureGetDTO;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemCategory.ICategoryGroupDefRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemClassify.IClassifyDefRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemClassify.IClassifyPureRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemItem.IItemDefRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemOption.IOptionDefRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemOption.IOptionPureRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemSell.ISellDefRepository;
import com.sellertl.sellertool_v1.service.handler.DateService;
import com.sellertl.sellertool_v1.service.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateService {
    @Autowired
    UserService userService;

    @Autowired
    DateService dateService;

    @Autowired
    SearchConverterService searConService;

    @Autowired
    SellDashConverterService sdConvertService;

    @Autowired
    UpdateConverterService updConvertService;

    @Autowired
    ICategoryGroupDefRepository iCategoryGroupDefRepository;

    @Autowired
    IClassifyDefRepository iClassifyDefRepository;

    @Autowired
    IClassifyPureRepository iClassifyPureRepository;

    @Autowired
    IOptionDefRepository iOptionDefRepository;

    @Autowired
    IOptionPureRepository iOptionPureRepository;

    @Autowired
    IItemDefRepository iItemDefRepository;

    @Autowired
    ISellDefRepository iSellDefRepository;

    public String saveUpdateClassify(HttpServletRequest request, IClassifyPureGetDTO classify){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return "USER_INVALID";
        }
        iClassifyPureRepository.findById(classify.getClassifyId()).ifPresent(r->{
            r.setIClassifyName(classify.getClassifyName());
            r.setIClassifyDesc(classify.getClassifyDesc());
            r.setIClassifyImageUrl(classify.getClassifyImageUrl());
            r.setIClassifyUpdatedAt(dateService.getCurrentDate());
            iClassifyPureRepository.save(r);
        });
        return "SUCCESS";
    }

    public String saveUpdateOption(HttpServletRequest request, IOptionPureGetDTO option){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return "USER_INVALID";
        }
        iOptionPureRepository.findById(option.getOptionId()).ifPresent(r->{
            r.setIOptionName(option.getOptionName());
            r.setIOptionRemainingCount(option.getOptionRemainingCount());
            r.setIOptionSellCount(option.getOptionSellCount());
            r.setIOptionImageUrl(option.getOptionImageUrl());
            r.setIOptionUpdatedAt(dateService.getCurrentDate());
            iOptionPureRepository.save(r);
        });
        return "SUCCESS";
    }

    public String saveUpdateItem(HttpServletRequest request, IItemDefGetDTO item){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return "USER_INVALID";
        }
        iItemDefRepository.findById(item.getItemId()).ifPresent(r->{
            r.setIItemCommitionCost(item.getCommitionCost());
            r.setIItemPrice(item.getPrice());
            r.setIItemCustomerTransCost(item.getCustomerTransCost());
            r.setIItemSellerRealTransCost(item.getSellerRealTransCost());
            r.setIItemPurchaseCost(item.getPurchaseCost());
            r.setIItemPurchaseTransCost(item.getPurchaseTransCost());
            r.setIItemExtraCharge(item.getExtraCharge());
            r.setIItemImageUrl(item.getImageUrl());
            r.setIItemUpdatedAt(dateService.getCurrentDate());
            iItemDefRepository.save(r);
        });
        return "SUCCESS";
    }

    public String saveUpdateCategoryGroup(HttpServletRequest request, IClassifyDefGetDTO classify, ICategoryGroupDefGetDTO category){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return "USER_INVALID";
        }
        
        iCategoryGroupDefRepository.selectByUserIdAndClassifyUuid(user.getId(),classify.getClassifyUuid()).ifPresent(r->{
            r.setICategoryGroupCategory1Id(category.getCategory1Id());
            r.setICategoryGroupCategory2Id(category.getCategory2Id());
            r.setICategoryGroupCategory3Id(category.getCategory3Id());
            r.setICategoryGroupCategory4Id(category.getCategory4Id());
            r.setICategoryGroupCategory1Name(category.getCategory1Name());
            r.setICategoryGroupCategory2Name(category.getCategory2Name());
            r.setICategoryGroupCategory3Name(category.getCategory3Name());
            r.setICategoryGroupCategory4Name(category.getCategory4Name());
            iCategoryGroupDefRepository.save(r);
        });
        return "SUCCESS";
    }
}
