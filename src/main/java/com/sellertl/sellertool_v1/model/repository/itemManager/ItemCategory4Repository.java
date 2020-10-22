package com.sellertl.sellertool_v1.model.repository.itemManager;

import java.util.List;
import java.util.Optional;

import com.sellertl.sellertool_v1.model.entity.itemManager.ItemCategory4Entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemCategory4Repository extends JpaRepository<ItemCategory4Entity, Integer>{
    @Query(value = "SELECT * FROM item_category4 WHERE ic4_deleted=:deleted", nativeQuery = true)
    Optional<List<ItemCategory4Entity>> selectAllItemCategory4(int deleted);
}
