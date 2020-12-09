package com.sellertl.sellertool_v1.model.repository.itemManager.itemItem;

import java.util.Optional;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemPureEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IItemPureRepository extends JpaRepository<IItemPureEntity, Long>{
    @Query(value = "SELECT * FROM i_item i WHERE i.i_item_id=:itemId AND i.i_item_deleted=:isDeleted", nativeQuery=true)
    public Optional<IItemPureEntity> selectByitemId(Long itemId, int isDeleted);

    @Query("SELECT i FROM IItemPureEntity i WHERE i.userId=:userId AND i.iItemId=:itemId AND i.iItemDeleted=:isDeleted")
    public Optional<IItemPureEntity> selectByUserIdAndItemId(String userId, Long itemId, int isDeleted);
}
