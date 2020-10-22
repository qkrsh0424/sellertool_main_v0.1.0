package com.sellertl.sellertool_v1.controller.api.itemManager;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemCategory1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemCategory2DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemCategory3DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemCategory4DTO;
import com.sellertl.sellertool_v1.model.repository.itemManager.ItemCategory4Repository;
import com.sellertl.sellertool_v1.service.itemManager.ItemCategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

    // **TODO 서치 알고리즘 계속해서 추가** 
    
    @GetMapping(value = "/get_category2/val")
    public List<ItemCategory2DTO> getItemCategory2GetApi(
        @RequestParam(value = "ic1", required = false) Optional<Integer> ic1
    ){
        
        if(ic1.isEmpty()){
            return new ArrayList<>();
        }
        
        return itemCategoryService.getItemCategory2ByC1(ic1.get());
    }

    @GetMapping(value = "/get_category3/val")
    public List<ItemCategory3DTO> getItemCategory3GetApi(
        @RequestParam(value = "ic1", required = false) Optional<Integer> ic1,
        @RequestParam(value = "ic2", required = false) Optional<Integer> ic2
    ){
        
        if(ic1.isEmpty() || ic2.isEmpty()){
            return new ArrayList<>();
        }
        
        return itemCategoryService.getItemCategory3ByC1C2(ic1.get(), ic2.get());
    }

    @GetMapping(value = "/get_category4/val")
    public List<ItemCategory4DTO> getItemCategory4GetApi(
        @RequestParam(value = "ic1", required = false) Optional<Integer> ic1,
        @RequestParam(value = "ic2", required = false) Optional<Integer> ic2,
        @RequestParam(value = "ic3", required = false) Optional<Integer> ic3
    ){
        
        if(ic1.isEmpty() || ic2.isEmpty() || ic3.isEmpty()){
            return new ArrayList<>();
        }
        return itemCategoryService.getItemCategory4ByC1C2C3(ic1.get(), ic2.get(), ic3.get());
    }
}
