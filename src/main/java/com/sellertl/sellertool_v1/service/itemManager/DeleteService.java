package com.sellertl.sellertool_v1.service.itemManager;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import com.sellertl.sellertool_v1.model.DTO.UserLoginSessionDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyDefResDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionPureGetDTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemDefEntity;
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
public class DeleteService {
    @Autowired
    UserService userService;

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
    
    @PersistenceContext
    EntityManager entityManager;
    public String removeItemByItem(HttpServletRequest request, IItemDefGetDTO item){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return "USER_INVALID";
        }

        iItemDefRepository.selectByUserIdAndItemId(user.getId(), item.getItemId(), EXIST_OR_NOT.IS_EXIST).ifPresent(r->{
            r.setIItemDeleted(EXIST_OR_NOT.IS_DELETED);
            iItemDefRepository.save(r);
        });

        return "SUCCESS";
    }

    public String removeOptionOne(HttpServletRequest request, IOptionPureGetDTO option){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return "USER_INVALID";
        }
        String result = deleteOptionAndItemsTransaction(user.getId(), option);
        return result;
    }

    public String removeClassifyOne(HttpServletRequest request, IClassifyDefGetDTO classify){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return "USER_INVALID";
        }
        String result = deleteClassifyAndOptionsAndItemsTransaction(user.getId(), classify);
        return result;
    }

    @Transactional
    public String deleteOptionAndItemsTransaction(String userId , IOptionPureGetDTO option){

        int deleteOptionResult = iOptionPureRepository.deleteOptionOneByOptionId(userId, option.getOptionId(), EXIST_OR_NOT.IS_DELETED);
        int deleteItemResult = iItemDefRepository.deleteItemsByOptionUuid(userId, option.getOptionUuid(), EXIST_OR_NOT.IS_DELETED);
        if(deleteOptionResult <= 0 || deleteItemResult<=0){
            return "FAILURE";
        }
        return "SUCCESS";
        
    }
    @Transactional
    public String deleteClassifyAndOptionsAndItemsTransaction(String userId , IClassifyDefGetDTO classify){

        int deleteClassifyResult = iClassifyPureRepository.deleteClassifyOneByClassifyId(userId, classify.getClassifyId(), EXIST_OR_NOT.IS_DELETED);
        int deleteOptionsResult = iOptionPureRepository.deleteOptionsByClassifyUuid(userId, classify.getClassifyUuid(), EXIST_OR_NOT.IS_DELETED);
        int deleteItemsResult = iItemDefRepository.deleteItemsByClassifyUuid(userId, classify.getClassifyUuid(), EXIST_OR_NOT.IS_DELETED);
        if(deleteClassifyResult<=0 || deleteOptionsResult <= 0 || deleteItemsResult<=0){
            return "FAILURE";
        }
        return "SUCCESS";
        
    }
}
