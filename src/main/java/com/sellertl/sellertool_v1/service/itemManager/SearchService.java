package com.sellertl.sellertool_v1.service.itemManager;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.UserLoginSessionDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyPureGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemGet1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionPureGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemSell.ISellDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.marketCost.MkcDefGet1DTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemClassify.IClassifyDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemClassify.IClassifyPureEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemPureEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemOption.IOptionPureEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemSell.ISellJClassifyJOptionJItemJCategoryEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.marketCost.MkcJClassifyJOptionJStoreProj;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemCategory.ICategoryGroupDefRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemClassify.IClassifyDefRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemClassify.IClassifyPureRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemItem.IItemDefRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemItem.IItemPureRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemOption.IOptionDefRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemOption.IOptionPureRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemSell.ISellDefRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemSell.ISellJClassifyJOptionJItemJCategoryRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.marketCost.MkcPureRepository;
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
    IItemPureRepository iItemPureRepository;

    @Autowired
    ISellDefRepository iSellDefRepository;

    @Autowired
    ISellJClassifyJOptionJItemJCategoryRepository iSellJClassifyJOptionJItemJCategoryRepository;

    @Autowired
    MkcPureRepository mkcPureRepository;

    public List<IItemGet1DTO> getRegItemAll(HttpServletRequest request){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return new ArrayList<>();
        }

        List<IItemDefEntity> items = iItemDefRepository.selectAll(user.getId(),EXIST_OR_NOT.IS_EXIST);
        return searConService.getRegItemEntitiesToDtos(items);
    }

    public List<IItemDefGetDTO> getItemAll(HttpServletRequest request){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return new ArrayList<>();
        }

        List<IItemDefEntity> items = iItemDefRepository.selectAll(user.getId(),EXIST_OR_NOT.IS_EXIST);
        return searConService.getItemDefEntitiesToDtos(items);
    }

    public List<IItemDefGetDTO> getItemsByOption(HttpServletRequest request, String optionUuid){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return new ArrayList<>();
        }

        List<IItemDefEntity> items = iItemDefRepository.selectItemsByOption(user.getId(), optionUuid, EXIST_OR_NOT.IS_EXIST);
        return searConService.getItemDefEntitiesToDtos(items);
    }

    // 판매 등록을 위한 판매 아이템 조회
    // order by created at
    public List<ISellDefGetDTO> getSellItemsByTime(HttpServletRequest request, Date startDate, Date endDate){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return new ArrayList<>();
        }
        List<ISellJClassifyJOptionJItemJCategoryEntity> iSellEntities = iSellJClassifyJOptionJItemJCategoryRepository.selectSellItemsByTime(user.getId(), startDate, endDate,EXIST_OR_NOT.IS_EXIST);
        // System.out.println(iSellEntities);
        return searConService.getSellEntitiesToGetDefDtos(iSellEntities);
    }

    // 데쉬보드를 위한 판매 아이템 조회
    // order by sell date DESC
    public List<ISellDefGetDTO> getSellItemsByTimeOrderSellDate(HttpServletRequest request, Date startDate, Date endDate){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return new ArrayList<>();
        }
        List<ISellJClassifyJOptionJItemJCategoryEntity> iSellEntities = iSellJClassifyJOptionJItemJCategoryRepository.selectSellItemsByTimeOrdBySell(user.getId(), startDate, endDate,EXIST_OR_NOT.IS_EXIST);
        return searConService.getSellEntitiesToGetDefDtos(iSellEntities);
    }

    // 데쉬보드를 위한 판매 아이템 조회2
    public List<ISellDefGetDTO> getSellItemsByCondition(
        HttpServletRequest request, 
        Date startDate, 
        Date endDate,
        String order,
        String classifyUuid,
        String optionUuid,
        String storeType
    ){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return new ArrayList<>();
        }
        if(classifyUuid.equals("none")){
            classifyUuid = "";
        }
        if(optionUuid.equals("none")){
            optionUuid="";
        }
        if(storeType.equals("none")){
            storeType="";
        }
        List<ISellJClassifyJOptionJItemJCategoryEntity> iSellEntities = iSellJClassifyJOptionJItemJCategoryRepository.selectSellItemsByCondition(user.getId(), startDate, endDate, order, classifyUuid, optionUuid, storeType, EXIST_OR_NOT.IS_EXIST);
        return searConService.getSellEntitiesToGetDefDtos(iSellEntities);
    }

    public List<IClassifyPureGetDTO> getClassifysByUser(HttpServletRequest request){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return new ArrayList<>();
        }
        List<IClassifyPureEntity> pureClassifyEntities = iClassifyPureRepository.selectAllByUserId(user.getId(), EXIST_OR_NOT.IS_EXIST);

        return searConService.getPureClassifyEntitiesToDtos(pureClassifyEntities);
    }

    public List<IClassifyPureGetDTO> getDeletedClassifysJoinSelled(HttpServletRequest request){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return new ArrayList<>();
        }
        List<IClassifyPureEntity> pureClassifyEntities = iClassifyPureRepository.selectDeletedAllJoinSelled(user.getId(), EXIST_OR_NOT.IS_DELETED,EXIST_OR_NOT.IS_EXIST);

        return searConService.getPureClassifyEntitiesToDtos(pureClassifyEntities);
    }

    public List<IClassifyDefGetDTO> getClassifysDefByUser(HttpServletRequest request){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return new ArrayList<>();
        }
        List<IClassifyDefEntity> defClassifyEntities = iClassifyDefRepository.selectAllByUserId(user.getId(), EXIST_OR_NOT.IS_EXIST);

        return searConService.getDefClassifyEntitiesToDtos(defClassifyEntities);
    }

    public List<IOptionPureGetDTO> getOptionsByUser(HttpServletRequest request){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return new ArrayList<>();
        }
        List<IOptionPureEntity> pureOptionEntities = iOptionPureRepository.selectAllByUserId(user.getId(), EXIST_OR_NOT.IS_EXIST);
        return searConService.getPureOptionEntitiesToDtos(pureOptionEntities);
    }

    public List<IOptionPureGetDTO> getOptionsByClassify(HttpServletRequest request, String classifyUuid){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return new ArrayList<>();
        }
        List<IOptionPureEntity> pureOptionEntities = iOptionPureRepository.selectAllByClassifyUuid(user.getId(), classifyUuid, EXIST_OR_NOT.IS_EXIST);
        return searConService.getPureOptionEntitiesToDtos(pureOptionEntities);
    }
    
    public List<MkcDefGet1DTO> getMarketingCostByTime(HttpServletRequest request, Date startDate, Date endDate) {
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return new ArrayList<>();
        }
        List<MkcJClassifyJOptionJStoreProj> mkcProjList = mkcPureRepository.selectAllByUserAndBDateConClassifyAndOptionAndStore(user.getId(), startDate, endDate, EXIST_OR_NOT.IS_EXIST);
        return searConService.getMkcDefGet1DtosByProjection(mkcProjList);
    }
    
    @Transactional
    public List<IItemDefEntity> getRegItemsByList(HttpServletRequest request, List<Long> itemIds){
        List<IItemDefEntity> items = new ArrayList<>();
        for(Long itemId : itemIds){
            Optional<IItemDefEntity> itemEntityOpt = iItemDefRepository.selectByitemId(itemId, EXIST_OR_NOT.IS_EXIST);
            if(itemEntityOpt.isPresent()){
                items.add(itemEntityOpt.get());
            }
        }
        return items;
    }

    @Transactional(readOnly = true)
    public List<IItemPureEntity> getItemPureEntitiesByIds(List<Long> itemIds){
        List<IItemPureEntity> itemPureEntities = new ArrayList<>();

        for( Long id : itemIds ){
            Optional<IItemPureEntity> itemEntityOpt = iItemPureRepository.selectByitemId(id,EXIST_OR_NOT.IS_EXIST);
            if(itemEntityOpt.isPresent()){
                itemPureEntities.add(itemEntityOpt.get());
            }
        }
        return itemPureEntities;   
    }
}
