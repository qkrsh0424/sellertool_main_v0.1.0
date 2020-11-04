package com.sellertl.sellertool_v1.model.repository.itemManager;

import com.sellertl.sellertool_v1.model.entity.itemManager.ItemOptionEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemOptionRepository extends JpaRepository<ItemOptionEntity, Long>{
    
}
