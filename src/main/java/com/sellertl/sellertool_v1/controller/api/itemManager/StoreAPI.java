package com.sellertl.sellertool_v1.controller.api.itemManager;

import java.util.ArrayList;
import java.util.List;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemStore.IStoreGetDTO;
import com.sellertl.sellertool_v1.service.itemManager.ItemStoreService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/item_store")
public class StoreAPI {
    @Autowired
    ItemStoreService itemStoreService;

    @GetMapping(value = "/get/all")
    public List<IStoreGetDTO> GetItemStoreAll(){
        return itemStoreService.searchItemStoreAll();
    }
}
