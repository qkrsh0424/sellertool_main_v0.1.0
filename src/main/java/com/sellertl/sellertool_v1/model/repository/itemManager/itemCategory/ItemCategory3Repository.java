package com.sellertl.sellertool_v1.model.repository.itemManager.itemCategory;

import java.util.List;
import java.util.Optional;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ItemCategory3Entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemCategory3Repository extends JpaRepository<ItemCategory3Entity, Integer>{
    @Query(value = "SELECT * FROM item_category3 WHERE ic3_deleted=:deleted", nativeQuery = true)
    Optional<List<ItemCategory3Entity>> selectAllItemCategory3(int deleted);

    @Query(value = "SELECT * FROM item_category3 WHERE ic1_id=:category1Id AND ic2_id=:category2Id AND ic3_deleted=:deleted AND ic3_name NOT LIKE :emptyString", nativeQuery = true)
    Optional<List<ItemCategory3Entity>> selectItemsByC1C2(int category1Id, int category2Id, int deleted, String emptyString);
}
