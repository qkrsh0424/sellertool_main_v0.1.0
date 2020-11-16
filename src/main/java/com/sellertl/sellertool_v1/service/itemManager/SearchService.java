package com.sellertl.sellertool_v1.service.itemManager;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.UserLoginSessionDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyPureGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemGet1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionPureGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemSell.ISellDefGetDTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemClassify.IClassifyPureEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemOption.IOptionPureEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemSell.ISellDefEntity;
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
import org.springframework.transaction.annotation.Transactional;

@Service
public class SearchService {
    @Autowired
    UserService userService;

    @Autowired
    SearchConverterService searConService;

    @Autowired
    SellDashConverterService sdConvertService;

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
    IItemDefRepository itemItemRepository;

    @Autowired
    ISellDefRepository iSellDefRepository;

    public List<IItemGet1DTO> getRegItemAll(HttpServletRequest request){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return new ArrayList<>();
        }

        List<IItemDefEntity> items = itemItemRepository.selectAll(user.getId(),EXIST_OR_NOT.IS_EXIST);
        
        return searConService.getRegItemEntitiesToDtos(items);
    }

    public List<ISellDefGetDTO> getSellItemsByTime(HttpServletRequest request, Date startDate, Date endDate){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return new ArrayList<>();
        }
        List<ISellDefEntity> iSellEntities = iSellDefRepository.selectSellItemsByTime(user.getId(), startDate, endDate,EXIST_OR_NOT.IS_EXIST);
        // System.out.println(iSellEntities);
        return sdConvertService.getSellEntitiesToGetDefaultDtos(iSellEntities);
    }

    public List<IClassifyPureGetDTO> getClassifysByUser(HttpServletRequest request){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return new ArrayList<>();
        }
        List<IClassifyPureEntity> pureClassifyEntities = iClassifyPureRepository.selectAllByUserId(user.getId(), EXIST_OR_NOT.IS_EXIST);

        return searConService.getPureClassifyEntitiesToDtos(pureClassifyEntities);

    }

    public List<IOptionPureGetDTO> getOptionsByClassify(HttpServletRequest request, String classifyUuid){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return new ArrayList<>();
        }
        List<IOptionPureEntity> pureOptionEntities = iOptionPureRepository.selectAllByClassifyUuid(user.getId(), classifyUuid, EXIST_OR_NOT.IS_EXIST);
        return searConService.getPureOptionEntitiesToDtos(pureOptionEntities);
    }
    
    @Transactional
    public List<IItemDefEntity> getRegItemsByList(HttpServletRequest request, List<Long> itemIds){
        List<IItemDefEntity> items = new ArrayList<>();
        for(Long itemId : itemIds){
            Optional<IItemDefEntity> itemEntityOpt = itemItemRepository.selectByitemId(itemId, EXIST_OR_NOT.IS_EXIST);
            if(itemEntityOpt.isPresent()){
                items.add(itemEntityOpt.get());
            }
        }
        return items;
    }
}
