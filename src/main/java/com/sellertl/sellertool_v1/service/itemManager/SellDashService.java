package com.sellertl.sellertool_v1.service.itemManager;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemGet1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemSell.ISellDefGetDTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemSell.ISellDefEntity;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemItem.IItemDefRepository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemSell.ISellDefRepository;
import com.sellertl.sellertool_v1.service.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SellDashService {
    @Autowired
    UserService userService;

    @Autowired
    IItemDefRepository iItemDefRepository;

    @Autowired
    ISellDefRepository iSellDefRepository;

    @Autowired
    SearchService searchService;

    @Autowired
    SellDashConverterService sdConverterService;

    public List<ISellDefGetDTO> getItemSellGet1Dtos(List<IItemGet1DTO> items, Date sellDate){
        List<Long> itemIds = new ArrayList<>();
        items.stream().map(r->r.getItemId()).forEach(itemIds::add);

        // List<IItemDefEntity> itemEntities = iItemDefRepository.findAllById(itemIds);
        List<IItemDefEntity> itemEntities = getItemDefEntitiesByIds(itemIds);
        List<ISellDefEntity> sellEntities = sdConverterService.getItemToSellEntities(itemEntities, sellDate);
        List<ISellDefEntity> savedSellEntities = iSellDefRepository.saveAll(sellEntities);
        List<ISellDefGetDTO> savedSellGetDefaultDTOs = sdConverterService.getSellEntitiesToGetDefaultDtos(savedSellEntities);

        return savedSellGetDefaultDTOs;
    }

    public String updateSellItem(ISellDefGetDTO item){
        Optional<ISellDefEntity> iSellDefEntity = iSellDefRepository.selectOneById(item.getSellId(),EXIST_OR_NOT.IS_EXIST);
        if(iSellDefEntity.isPresent()){
            iSellDefEntity.ifPresent(r->{
                r.setISellTag(item.getSellTag());
                r.setISellCommitionCost(item.getSellCommitionCost());
                r.setISellPrice(item.getSellPrice());
                r.setISellCustomerTransCost(item.getSellCustomerTransCost());
                r.setISellSellerRealTransCost(item.getSellSellerRealTransCost());
                r.setISellPurchaseCost(item.getSellPurchaseCost());
                r.setISellPurchaseTransCost(item.getSellPurchaseTransCost());
                r.setISellExtraCharge(item.getSellExtraCharge());
                r.setISellSelledCount(item.getSellCount());
                r.setISellTotAdsCost(item.getSellTotAdsCost());
                r.setISellTotExpensesCost(item.getSellTotExpensesCost());
                r.setISellTotEarningCost(item.getSellTotEarningCost());
                r.setISellTotCustomerTransCost(item.getSellTotCustomerTransCost());
                r.setISellTotSellerRealTransCost(item.getSellTotSellerRealTransCost());
                r.setISellTotPurchaseTransCost(item.getSellTotPurchaseTransCost());
                iSellDefRepository.save(r);
            });
            return "SUCCESS";
        }else{
            return "FAILURE";
        }
    }

    public String deleteSellItem(ISellDefGetDTO item){
        Optional<ISellDefEntity> iSellDefEntity = iSellDefRepository.selectOneById(item.getSellId(),EXIST_OR_NOT.IS_EXIST);
        if(iSellDefEntity.isPresent()){
            iSellDefEntity.ifPresent(r->{
                r.setISellDeleted(EXIST_OR_NOT.IS_DELETED);
                iSellDefRepository.save(r);
            });
            return "SUCCESS";
        }else{
            return "FAILURE";
        }
        
    }

    @Transactional(readOnly = true)
    public List<IItemDefEntity> getItemDefEntitiesByIds(List<Long> itemIds){
        List<IItemDefEntity> itemDefEntities = new ArrayList<>();

        for( Long id : itemIds ){
            Optional<IItemDefEntity> itemEntityOpt = iItemDefRepository.selectByitemId(id,EXIST_OR_NOT.IS_EXIST);
            if(itemEntityOpt.isPresent()){
                itemDefEntities.add(itemEntityOpt.get());
            }
        }
        return itemDefEntities;   
    }
}
