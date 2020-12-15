package com.sellertl.sellertool_v1.controller.api.itemManager;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyDefResDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyPureResDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemDefResDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemRes1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionPureGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionPureResDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemSell.ISellDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemSell.ISellDefResDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.marketCost.MkcDefGet1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.marketCost.MkcDefRes1DTO;
import com.sellertl.sellertool_v1.service.itemManager.SearchService;
import com.sellertl.sellertool_v1.service.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/item_manager/search")

public class SearchDataAPI {
    @Autowired
    SearchService searchService;

    @Autowired
    UserService userService;

    // /api/item_manager/search/regitem/all
    @GetMapping(value = "/regitem/all")
    public IItemRes1DTO SearchRegItemAll(HttpServletRequest request){
        return searchService.getRegItemAll(request);
    }

    // /api/item_manager/search/item/all
    @GetMapping(value = "/item/all")
    public IItemDefResDTO SearchItemAll(HttpServletRequest request){
        return searchService.getItemAll(request);
    }

    // /api/item_manager/search/item/partial/byoption
    @GetMapping(value = "/item/partial/byoption")
    public IItemDefResDTO SearchItemsByOpion(HttpServletRequest request, @RequestParam("optionUuid") String optionUuid){
        return searchService.getItemsByOption(request, optionUuid);
    }

    // /api/item_manager/search/sellitem/time
    // 판매 등록을 위한 조회
    @GetMapping(value = "/sell_item/time")
    public ISellDefResDTO SearchSellItemByTime(HttpServletRequest request, @RequestParam("startDate") Date startDate, @RequestParam("endDate") Date endDate){
        return searchService.getSellItemsByTime(request, startDate, endDate);
    }

    // /api/item_manager/search/sellitem/time/order/selldate
    // 데쉬보드를 위한 조회
    @GetMapping(value = "/sell_item/time/order/selldate")
    public ISellDefResDTO SearchSellItemByTimeOrderSellDate(HttpServletRequest request, @RequestParam("startDate") Date startDate, @RequestParam("endDate") Date endDate){
        return searchService.getSellItemsByTimeOrderSellDate(request, startDate, endDate);
    }

    // /api/item_manager/search/sellitem/condition
    // 데쉬보드를 위한 조회2
    @GetMapping(value = "/sell_item/condition")
    public ISellDefResDTO SearchSellItemByCondition(
        HttpServletRequest request, 
        @RequestParam("startDate") Date startDate, 
        @RequestParam("endDate") Date endDate,
        @RequestParam("order") String order,
        @RequestParam("classifyUuid") String classifyUuid,
        @RequestParam("optionUuid") String optionUuid,
        @RequestParam("storeType") String storeType
    ){
        return searchService.getSellItemsByCondition(request, startDate, endDate, order, classifyUuid, optionUuid, storeType);
    }

    // /api/item_manager/search/classifys/byuser
    @GetMapping(value = "/classifys/byuser")
    public IClassifyPureResDTO SearchClassifysByUser(HttpServletRequest request){
        return searchService.getClassifysByUser(request);
    }
    // /api/item_manager/search/deleted_classifys/byuser
    @GetMapping(value = "/deleted_classifys/jselled")
    public IClassifyPureResDTO SearchDeletedClassifysJoinSelled(HttpServletRequest request){
        return searchService.getDeletedClassifysJoinSelled(request);
    }

    // /api/item_manager/search/classifys/def/byuser
    @GetMapping(value = "/classifys/def/byuser")
    public IClassifyDefResDTO SearchClassifysDefByUser(HttpServletRequest request){
        return searchService.getClassifysDefByUser(request);
    }

    // /api/item_manager/search/options/byuser
    @GetMapping(value = "/options/byuser")
    public IOptionPureResDTO SearchOptionsByUser(HttpServletRequest request){
        return searchService.getOptionsByUser(request);
    }

    // /api/item_manager/search/options/byclassify
    @GetMapping(value = "/options/byclassify")
    public IOptionPureResDTO SearchOptionsByClassify(HttpServletRequest request, @RequestParam("classifyUuid") String uuid){
        return searchService.getOptionsByClassify(request, uuid);
    }

    // /api/item_manager/search/marketing_cost/bytime
    @GetMapping(value = "/marketing_cost/bytime")
    public MkcDefRes1DTO SearchMarketingCostByTime(HttpServletRequest request, @RequestParam("startDate") Date startDate, @RequestParam("endDate") Date endDate){
        return searchService.getMarketingCostByTime(request, startDate, endDate);
    }
}
