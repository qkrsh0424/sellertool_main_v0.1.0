package com.sellertl.sellertool_v1.service.itemManager;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.UserLoginSessionDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionPureGetDTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemOption.IOptionPureEntity;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemCategory.ICategoryGroupDefRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemClassify.IClassifyDefRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemClassify.IClassifyPureRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemItem.IItemDefRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemOption.IOptionDefRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemOption.IOptionPureRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemSell.ISellDefRepository;
import com.sellertl.sellertool_v1.service.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InsertService {
    @Autowired
    UserService userService;

    @Autowired
    InsertConverterService incService;

    @Autowired
    SearchConverterService searConService;

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
    
    public String insertOptionOne(HttpServletRequest request, IClassifyDefGetDTO classify, String optionName, int remainingCount){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return "USER_INVALID";
        }
        IOptionPureEntity optionEntity = incService.getOptionPureEntity(user.getId(), classify, optionName, remainingCount);
        iOptionPureRepository.save(optionEntity);
        return "SUCCESS";
    }

    public String insertItemOne(HttpServletRequest request, IClassifyDefGetDTO classify, IOptionPureGetDTO option, String storeType, String storeName){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return "USER_INVALID";
        }
        IItemDefEntity itemEntity = incService.getItemDefEntity(user.getId(),classify,option,storeType,storeName);
        iItemDefRepository.save(itemEntity);
        return "SUCCESS";
    }
}
