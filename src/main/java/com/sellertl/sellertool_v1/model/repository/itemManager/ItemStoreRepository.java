package com.sellertl.sellertool_v1.model.repository.itemManager;

import com.sellertl.sellertool_v1.model.entity.itemManager.ItemStoreEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemStoreRepository extends JpaRepository<ItemStoreEntity, Integer>{
    
}
