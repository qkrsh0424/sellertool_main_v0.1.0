package com.sellertl.sellertool_v1.controller.api.itemManager;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemCategory1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemCategory2DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemCategory3DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemCategory4DTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.ItemCategory1Entity;
import com.sellertl.sellertool_v1.model.entity.itemManager.ItemCategory2Entity;
import com.sellertl.sellertool_v1.service.itemManager.ItemCategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/item_manger/category")
public class CategoryAPI {
    @Autowired
    ItemCategoryService itemCategoryService;

    @GetMapping(value = "/get_category1/all")
    public List<ItemCategory1DTO> getItemCategory1AllApi(){
        return itemCategoryService.getItemCategory1All();
    }

    @GetMapping(value = "/get_category2/all")
    public List<ItemCategory2DTO> getItemCategory2AllApi(){
        return itemCategoryService.getItemCategory2All();
    }

    @GetMapping(value = "/get_category3/all")
    public List<ItemCategory3DTO> getItemCategory3AllApi(){
        return itemCategoryService.getItemCategory3All();
    }

    @GetMapping(value = "/get_category4/all")
    public List<ItemCategory4DTO> getItemCategory4AllApi(){
        return itemCategoryService.getItemCategory4All();
    }

    @GetMapping(value = "/get_category2/val")
    public List<ItemCategory2DTO> getItemCategory2GetApi(@RequestParam(value = "cid1", required = false) Optional<Integer> cid1){
        
        if(cid1.isEmpty()){
            return new ArrayList<>();
        }
        System.out.println(cid1);
        
        return itemCategoryService.getItemCategory2ByCategory1(cid1.get());
    }
}
