package com.sellertl.sellertool_v1.service.itemManager;

import java.util.ArrayList;
import java.util.List;

import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemStoreGetDTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.ItemStoreEntity;
import com.sellertl.sellertool_v1.model.repository.itemManager.ItemStoreRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemStoreService {
    @Autowired
    ItemStoreRepository itemStoreRepository;

    public List<ItemStoreGetDTO> searchItemStoreAll(){
        List<ItemStoreEntity> stores = itemStoreRepository.findAll();

        return getItemStoresEntityToDto(stores);
    }

    public List<ItemStoreGetDTO> getItemStoresEntityToDto(List<ItemStoreEntity> storeEntities){
        List<ItemStoreGetDTO> itemStoreListDto = new ArrayList<>();
        for (ItemStoreEntity storeEntity : storeEntities) {
            ItemStoreGetDTO sGetDto = new ItemStoreGetDTO();
            sGetDto.setStoreName(storeEntity.getItemStoreNameKo());
            sGetDto.setStoreType(storeEntity.getItemStoreType());
            itemStoreListDto.add(sGetDto);
        }
        return itemStoreListDto;
    }
}
