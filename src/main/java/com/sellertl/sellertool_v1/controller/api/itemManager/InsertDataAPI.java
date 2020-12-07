package com.sellertl.sellertool_v1.controller.api.itemManager;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemAddOneReqDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemReq1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionAddReqDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionPureGetDTO;
import com.sellertl.sellertool_v1.service.itemManager.InsertService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/item_manager/add")
public class InsertDataAPI {
    @Autowired
    InsertService insertService;

    // /api/item_manager/add/option/one
    @PostMapping(value = "/option/one")
    public String AddOptionOne(HttpServletRequest request, @RequestBody IOptionAddReqDTO data){
        IClassifyDefGetDTO classify = data.getClassify();
        String optionName = data.getOptionName();
        int remainingCount = data.getRemainingCount();
        String result = insertService.insertOptionOne(request, classify, optionName, remainingCount);

        if(result.equals("SUCCESS")){
            return "{\"message\":\"SUCCESS\"}";
        }else if (result.equals("USER_INVALID")){
            return "{\"message\":\"USER_INVALID\"}";
        }else{
            return "{\"message\":\"FAILURE\"}";
        }
    }

    // /api/item_manager/add/item/one
    @PostMapping(value = "/item/one")
    public String AddItemOne(HttpServletRequest request, @RequestBody IItemAddOneReqDTO data){
        IClassifyDefGetDTO classify = data.getClassify();
        IOptionPureGetDTO option = data.getOption();
        String storeType = data.getStoreType();
        String storeName = data.getStoreName();
        String result = insertService.insertItemOne(request, classify, option, storeType, storeName);

        if(result.equals("SUCCESS")){
            return "{\"message\":\"SUCCESS\"}";
        }else if (result.equals("USER_INVALID")){
            return "{\"message\":\"USER_INVALID\"}";
        }else{
            return "{\"message\":\"FAILURE\"}";
        }
    }

    // /api/item_manager/add/sell_item/one
    @PostMapping(value = "/sell_item/one")
    public String SellDashRegister(HttpServletRequest request, @RequestBody IItemReq1DTO itemsWithDate) {
        String result = insertService.insertSellItemOne(request, itemsWithDate);
        System.out.println("=======================================================================");
        if(result.equals("SUCCESS")){
            return "{\"message\":\"SUCCESS\"}";
        }else if (result.equals("USER_INVALID")){
            return "{\"message\":\"USER_INVALID\"}";
        }else{
            return "{\"message\":\"FAILURE\"}";
        }
    }
}
