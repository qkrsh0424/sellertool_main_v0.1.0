package com.sellertl.sellertool_v1.controller.api.itemManager;

import javax.servlet.http.HttpServletRequest;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemReq1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemSell.ISellDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemSell.ISellDefResDTO;
import com.sellertl.sellertool_v1.model.VO.UserInfoVO;
import com.sellertl.sellertool_v1.service.itemManager.SellDashService;
import com.sellertl.sellertool_v1.service.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/item_manager/selldash")
public class SellDashAPI {

    @Autowired
    UserService userService;

    @Autowired
    SellDashService sellDashService;

    // /api/item_manager/selldash/reg
    @PostMapping(value = "/reg")
    public ISellDefResDTO SellDashRegister(HttpServletRequest request, @RequestBody IItemReq1DTO items) {
        ISellDefResDTO itemSellRes1Dto = new ISellDefResDTO();
        UserInfoVO user = userService.getUserInfo(request);
        if(user == null){
            itemSellRes1Dto.setMessage("USER_INVALID");
            itemSellRes1Dto.setData(null);
            return itemSellRes1Dto;
        }
        itemSellRes1Dto.setMessage("SUCCESS");
        itemSellRes1Dto.setData(sellDashService.getItemSellGet1Dtos(items.getItems(), items.getSellDate()));
        
        return itemSellRes1Dto;
    }

    // /api/item_manager/selldash/update/sellitem
    @PostMapping(value = "/update/sellitem")
    public String SellDashUpdateSellItem(HttpServletRequest request, @RequestBody ISellDefGetDTO item) {
        UserInfoVO user = userService.getUserInfo(request);
        if(user == null){
            return "{\"message\":\"USER_INVALID\"}";
        }
        String returnStr = sellDashService.updateSellItem(item);
        if( returnStr.equals("FAILURE")){
            return "{\"message\":\"FAILURE\"}";
        }
        return "{\"message\":\"SUCCESS\"}";
    }

    // /api/item_manager/selldash/delete/sellitem
    @PostMapping(value = "/delete/sellitem")
    public String SellDashDeleteSellItem(HttpServletRequest request, @RequestBody ISellDefGetDTO item) {
        UserInfoVO user = userService.getUserInfo(request);
        if(user == null){
            return "{\"message\":\"USER_INVALID\"}";
        }
        String returnStr = sellDashService.deleteSellItem(item);
        if( returnStr.equals("FAILURE")){
            return "{\"message\":\"FAILURE\"}";
        }
        return "{\"message\":\"SUCCESS\"}";
    }
}
