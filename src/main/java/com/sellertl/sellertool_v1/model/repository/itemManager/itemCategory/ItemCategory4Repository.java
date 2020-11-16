package com.sellertl.sellertool_v1.model.repository.itemManager.itemCategory;

import java.util.List;
import java.util.Optional;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ItemCategory4Entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemCategory4Repository extends JpaRepository<ItemCategory4Entity, Integer>{
    @Query(value = "SELECT * FROM item_category4 WHERE ic4_deleted=:deleted", nativeQuery = true)
    Optional<List<ItemCategory4Entity>> selectAllItemCategory4(int deleted);

    @Query(value = "SELECT * FROM item_category4 WHERE ic1_id=:category1Id AND ic2_id=:category2Id AND ic3_id=:category3Id AND ic4_deleted=:deleted AND ic4_name NOT LIKE :emptyString", nativeQuery = true)
    Optional<List<ItemCategory4Entity>> selectItemsByC1C2C3(int category1Id, int category2Id, int category3Id, int deleted, String emptyString);
}
