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
        IItemRes1DTO result = new IItemRes1DTO();
        
        result.setMessage("SUCCESS");
        result.setData(searchService.getRegItemAll(request));
        return result;
    }

    // /api/item_manager/search/item/all
    @GetMapping(value = "/item/all")
    public IItemDefResDTO SearchItemAll(HttpServletRequest request){
        IItemDefResDTO result = new IItemDefResDTO();
        
        result.setMessage("SUCCESS");
        result.setData(searchService.getItemAll(request));
        return result;
    }

    // /api/item_manager/search/item/partial/byoption
    @GetMapping(value = "/item/partial/byoption")
    public IItemDefResDTO SearchItemsByOpion(HttpServletRequest request, @RequestParam("optionUuid") String optionUuid){
        IItemDefResDTO result = new IItemDefResDTO();
        
        result.setMessage("SUCCESS");
        result.setData(searchService.getItemsByOption(request, optionUuid));
        return result;
    }

    // /api/item_manager/search/sellitem/time
    // 판매 등록을 위한 조회
    @GetMapping(value = "/sellitem/time")
    public ISellDefResDTO SearchSellItemByTime(HttpServletRequest request, @RequestParam("startDate") Date startDate, @RequestParam("endDate") Date endDate){
        ISellDefResDTO iSellResDto = new ISellDefResDTO();
        List<ISellDefGetDTO> iSellGetDtos = searchService.getSellItemsByTime(request, startDate, endDate);
        iSellResDto.setMessage("SUCCESS");
        iSellResDto.setData(iSellGetDtos);
        return iSellResDto;
    }

    // /api/item_manager/search/sellitem/time/order/selldate
    // 데쉬보드를 위한 조회
    @GetMapping(value = "/sellitem/time/order/selldate")
    public ISellDefResDTO SearchSellItemByTimeOrderSellDate(HttpServletRequest request, @RequestParam("startDate") Date startDate, @RequestParam("endDate") Date endDate){
        ISellDefResDTO iSellResDto = new ISellDefResDTO();
        List<ISellDefGetDTO> iSellGetDtos = searchService.getSellItemsByTimeOrderSellDate(request, startDate, endDate);
        iSellResDto.setMessage("SUCCESS");
        iSellResDto.setData(iSellGetDtos);
        return iSellResDto;
    }

    // /api/item_manager/search/sellitem/condition
    // 데쉬보드를 위한 조회2
    @GetMapping(value = "/sellitem/condition")
    public ISellDefResDTO SearchSellItemByCondition(
        HttpServletRequest request, 
        @RequestParam("startDate") Date startDate, 
        @RequestParam("endDate") Date endDate,
        @RequestParam("order") String order,
        @RequestParam("classifyUuid") String classifyUuid,
        @RequestParam("optionUuid") String optionUuid,
        @RequestParam("storeType") String storeType
    ){
        ISellDefResDTO iSellResDto = new ISellDefResDTO();
        List<ISellDefGetDTO> iSellGetDtos = searchService.getSellItemsByCondition(request, startDate, endDate, order, classifyUuid, optionUuid, storeType);
        iSellResDto.setMessage("SUCCESS");
        iSellResDto.setData(iSellGetDtos);
        return iSellResDto;
    }

    // /api/item_manager/search/classifys/byuser
    @GetMapping(value = "/classifys/byuser")
    public IClassifyPureResDTO SearchClassifysByUser(HttpServletRequest request){
        IClassifyPureResDTO pureResDto = new IClassifyPureResDTO();
        pureResDto.setMessage("SUCCESS");
        pureResDto.setClassifys(searchService.getClassifysByUser(request));
        return pureResDto;
    }
    // /api/item_manager/search/deleted_classifys/byuser
    @GetMapping(value = "/deleted_classifys/jselled")
    public IClassifyPureResDTO SearchDeletedClassifysJoinSelled(HttpServletRequest request){
        IClassifyPureResDTO pureResDto = new IClassifyPureResDTO();
        pureResDto.setMessage("SUCCESS");
        pureResDto.setClassifys(searchService.getDeletedClassifysJoinSelled(request));
        return pureResDto;
    }

    // /api/item_manager/search/classifys/def/byuser
    @GetMapping(value = "/classifys/def/byuser")
    public IClassifyDefResDTO SearchClassifysDefByUser(HttpServletRequest request){
        IClassifyDefResDTO defResDto = new IClassifyDefResDTO();
        defResDto.setMessage("SUCCESS");
        defResDto.setClassifys(searchService.getClassifysDefByUser(request));
        return defResDto;
    }

    // /api/item_manager/search/options/byuser
    @GetMapping(value = "/options/byuser")
    public IOptionPureResDTO SearchOptionsByUser(HttpServletRequest request){
        IOptionPureResDTO pureResDto = new IOptionPureResDTO();
        pureResDto.setMessage("SUCCESS");
        pureResDto.setOptions(searchService.getOptionsByUser(request));
        return pureResDto;
    }

    // /api/item_manager/search/options/byclassify
    @GetMapping(value = "/options/byclassify")
    public IOptionPureResDTO SearchOptionsByClassify(HttpServletRequest request, @RequestParam("classifyUuid") String uuid){
        IOptionPureResDTO pureResDto = new IOptionPureResDTO();
        pureResDto.setMessage("SUCCESS");
        pureResDto.setOptions(searchService.getOptionsByClassify(request, uuid));
        return pureResDto;
    }
}
