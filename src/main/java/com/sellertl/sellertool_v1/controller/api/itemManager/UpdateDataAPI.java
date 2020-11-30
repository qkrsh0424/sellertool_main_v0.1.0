package com.sellertl.sellertool_v1.controller.api.itemManager;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemCategory.ICategoryGroupDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemCategory.ICategoryWClassifyReqDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemClassify.IClassifyPureGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem.IItemDefGetDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption.IOptionPureGetDTO;
import com.sellertl.sellertool_v1.service.handler.ConvertService;
import com.sellertl.sellertool_v1.service.itemManager.UpdateService;
import com.sellertl.sellertool_v1.service.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/item_manager/update")
public class UpdateDataAPI {
    @Autowired
    UserService userService;
    
    @Autowired
    ConvertService convert;
    
    @Autowired
    UpdateService updateService;

    // /api/item_manager/update/classify/pure
    @PostMapping(value = "/classify/pure")
    public String PatchClassifyAll(HttpServletRequest request, @RequestBody IClassifyPureGetDTO classify){
        String result = updateService.saveUpdateClassify(request, classify);
        if(result.equals("SUCCESS")){
            return "{\"message\":\"SUCCESS\"}";
        }else if (result.equals("USER_INVALID")){
            return "{\"message\":\"USER_INVALID\"}";
        }else{
            return "{\"message\":\"FAILURE\"}";
        }
    }

    // /api/item_manager/update/categorygroup/def
    @PostMapping(value = "/categorygroup/def")
    public String PatchCateogyrGroup(HttpServletRequest request, @RequestBody ICategoryWClassifyReqDTO data){
        ICategoryGroupDefGetDTO category = data.getCategory();
        IClassifyDefGetDTO classify = data.getClassify();
        String result = updateService.saveUpdateCategoryGroup(request, classify, category);
        if(result.equals("SUCCESS")){
            return "{\"message\":\"SUCCESS\"}";
        }else if (result.equals("USER_INVALID")){
            return "{\"message\":\"USER_INVALID\"}";
        }else{
            return "{\"message\":\"FAILURE\"}";
        }
    }

    // /api/item_manager/update/option/pure
    @PostMapping(value = "/option/pure")
    public String PatchOptionAll(HttpServletRequest request, @RequestBody IOptionPureGetDTO option){
        String result = updateService.saveUpdateOption(request, option);
        if(result.equals("SUCCESS")){
            return "{\"message\":\"SUCCESS\"}";
        }else if (result.equals("USER_INVALID")){
            return "{\"message\":\"USER_INVALID\"}";
        }else{
            return "{\"message\":\"FAILURE\"}";
        }
    }

    // /api/item_manager/update/item/def
    @PostMapping(value = "/item/def")
    public String PatchItemDef(HttpServletRequest request, @RequestBody IItemDefGetDTO item){
        String result = updateService.saveUpdateItem(request, item);
        if(result.equals("SUCCESS")){
            return "{\"message\":\"SUCCESS\"}";
        }else if (result.equals("USER_INVALID")){
            return "{\"message\":\"USER_INVALID\"}";
        }else{
            return "{\"message\":\"FAILURE\"}";
        }
    }
}
