package com.sellertl.sellertool_v1.model.repository.itemManager.itemCategory;

import java.util.List;
import java.util.Optional;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ItemCategory2Entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemCategory2Repository extends JpaRepository<ItemCategory2Entity, Integer>{
    @Query(value = "SELECT * FROM item_category2 WHERE ic2_deleted=:deleted", nativeQuery = true)
    Optional<List<ItemCategory2Entity>> selectAllItemCategory2(int deleted);

    @Query(value = "SELECT * FROM item_category2 WHERE ic1_id=:category1Id AND ic2_deleted=:deleted", nativeQuery = true)
    Optional<List<ItemCategory2Entity>> selectItemsByC1(int category1Id,int deleted);
}
