package com.sellertl.sellertool_v1.controller.api.itemManager;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyReqDTO;
import com.sellertl.sellertool_v1.service.itemManager.AddItemService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@RequestMapping(value = "/api/item_manager/additem")
public class AddItemAPI {
    @Autowired
    AddItemService addItemService;

    // /api/item_manager/additem/add
    @PostMapping(value = "/add")
    public String AddItemDataApi(@RequestBody IClassifyReqDTO classify, HttpServletRequest request){
        String saveResult = addItemService.saveAddItems(classify, request);
        if(saveResult.equals("USER_INVALID")){
            return "{\"message\":\"USER_INVALID\"}";
        }else if(saveResult.equals("ERROR")){
            return "{\"message\":\"ERROR\"}";
        }
        return "{\"message\":\"SUCCESS\"}";
    }
}
