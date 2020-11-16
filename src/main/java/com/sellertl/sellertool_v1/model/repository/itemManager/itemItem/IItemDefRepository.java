package com.sellertl.sellertool_v1.model.repository.itemManager.itemItem;

import java.util.List;
import java.util.Optional;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemDefEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IItemDefRepository extends JpaRepository<IItemDefEntity, Long>{
    @Query(value = "SELECT * FROM i_item WHERE user_id=:userId AND i_item_deleted=:isDeleted", nativeQuery=true)
    public List<IItemDefEntity> selectAll(String userId, int isDeleted);

    @Query(value = "SELECT * FROM i_item WHERE user_id=:userId AND i_item_deleted=:isDeleted", nativeQuery=true)
    public Optional<List<IItemDefEntity>> selectAllOpt(String userId, int isDeleted);

    @Query(value = "SELECT * FROM i_item WHERE i_item_id in :itemIdList AND i_item_deleted=:isDeleted", nativeQuery=true)
    public List<IItemDefEntity> selectByitemIdList(List<Long> itemIdList, int isDeleted);

    @Query(value = "SELECT * FROM i_item WHERE i_item_id=:itemId AND i_item_deleted=:isDeleted", nativeQuery=true)
    public Optional<IItemDefEntity> selectByitemId(Long itemId, int isDeleted);
}
