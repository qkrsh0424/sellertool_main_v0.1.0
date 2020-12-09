package com.sellertl.sellertool_v1.controller.api.itemManager;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyDefResDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionPureGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemSell.ISellDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.marketCost.MkcDefGet1DTO;
import com.sellertl.sellertool_v1.service.itemManager.DeleteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/item_manager/delete")
public class DeleteDataAPI {
    @Autowired
    DeleteService deleteService;
    // /api/item_manager/delete/item/one
    @PostMapping(value = "/item/one")
    public String DeleteItemOneByDef(HttpServletRequest request, @RequestBody IItemDefGetDTO item){
        
        String result = deleteService.removeItemByItem(request, item);

        if(result.equals("SUCCESS")){
            return "{\"message\":\"SUCCESS\"}";
        }else if (result.equals("USER_INVALID")){
            return "{\"message\":\"USER_INVALID\"}";
        }else{
            return "{\"message\":\"FAILURE\"}";
        }
    }

    // /api/item_manager/delete/option/one
    @PostMapping(value = "/option/one")
    public String DeleteOptionOne(HttpServletRequest request, @RequestBody IOptionPureGetDTO option){
        
        String result = deleteService.removeOptionOne(request, option);

        if(result.equals("SUCCESS")){
            return "{\"message\":\"SUCCESS\"}";
        }else if (result.equals("USER_INVALID")){
            return "{\"message\":\"USER_INVALID\"}";
        }else{
            return "{\"message\":\"FAILURE\"}";
        }
    }

    // /api/item_manager/delete/classify/one
    @PostMapping(value = "/classify/one")
    public String DeleteClassifyOne(HttpServletRequest request, @RequestBody IClassifyDefGetDTO classify){
        
        String result = deleteService.removeClassifyOne(request, classify);

        if(result.equals("SUCCESS")){
            return "{\"message\":\"SUCCESS\"}";
        }else if (result.equals("USER_INVALID")){
            return "{\"message\":\"USER_INVALID\"}";
        }else{
            return "{\"message\":\"FAILURE\"}";
        }
    }

    // /api/item_manager/delete/sell_item/one
    @PostMapping(value = "/sell_item/one")
    public String DeleteSellItemOne(HttpServletRequest request, @RequestBody ISellDefGetDTO sellItem){
        
        String result = deleteService.removeSellItemOne(request, sellItem);

        if(result.equals("SUCCESS")){
            return "{\"message\":\"SUCCESS\"}";
        }else if (result.equals("USER_INVALID")){
            return "{\"message\":\"USER_INVALID\"}";
        }else{
            return "{\"message\":\"FAILURE\"}";
        }
    }

    // /api/item_manager/delete/marketing_cost/one
    @PostMapping(value = "/marketing_cost/one")
    public String DeleteMarketingCostOne(HttpServletRequest request, @RequestBody MkcDefGet1DTO mkcDefGetDto){
        
        String result = deleteService.removeMarketingCostOne(request, mkcDefGetDto);

        if(result.equals("SUCCESS")){
            return "{\"message\":\"SUCCESS\"}";
        }else if (result.equals("USER_INVALID")){
            return "{\"message\":\"USER_INVALID\"}";
        }else{
            return "{\"message\":\"FAILURE\"}";
        }
    }
}
