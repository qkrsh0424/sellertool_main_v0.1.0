package com.sellertl.sellertool_v1.model.repository.itemManager;

import java.util.List;
import java.util.Optional;

import com.sellertl.sellertool_v1.model.entity.itemManager.ItemCategory1Entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemCategory1Repository extends JpaRepository<ItemCategory1Entity, Integer>{
    @Query(value = "SELECT * FROM item_category1 WHERE ic1_deleted=:deleted", nativeQuery = true)
    Optional<List<ItemCategory1Entity>> selectAllItemCategory1(int deleted);
}
