package com.sellertl.sellertool_v1.model.repository.itemManager.itemItem;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemDefEntity;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface IItemDefRepository extends JpaRepository<IItemDefEntity, Long>{
    // ** TODO ITEM JOIN UPDATE
    // **OLD START**
    // @Query(value = "SELECT * FROM i_item WHERE user_id=:userId AND i_item_deleted=:isDeleted", nativeQuery=true)
    // public List<IItemDefEntity> selectAll(String userId, int isDeleted);

    // @Query(value = "SELECT * FROM i_item WHERE user_id=:userId AND i_item_deleted=:isDeleted", nativeQuery=true)
    // public Optional<List<IItemDefEntity>> selectAllOpt(String userId, int isDeleted);

    // @Query(value = "SELECT * FROM i_item WHERE i_item_id in :itemIdList AND i_item_deleted=:isDeleted", nativeQuery=true)
    // public List<IItemDefEntity> selectByitemIdList(List<Long> itemIdList, int isDeleted);

    // @Query(value = "SELECT * FROM i_item WHERE i_item_id=:itemId AND i_item_deleted=:isDeleted", nativeQuery=true)
    // public Optional<IItemDefEntity> selectByitemId(Long itemId, int isDeleted);

    // @Query(value = "SELECT * FROM i_item WHERE user_id=:userId AND i_item_id=:itemId AND i_item_deleted=:isDeleted", nativeQuery=true)
    // public Optional<IItemDefEntity> selectByUserIdAndItemId(String userId, Long itemId, int isDeleted);

    // @Query(value = "SELECT * FROM i_item WHERE user_id=:userId AND i_option_uuid=:optionUuid AND i_item_deleted=:isDeleted", nativeQuery=true)
    // public List<IItemDefEntity> selectItemsByOption(String userId, String optionUuid, int isDeleted);
    // **OLD END**
    // **NEW START**
    @EntityGraph("ItemWithClassifyAndOptionAndCategory")
    @Query("SELECT i FROM IItemDefEntity i WHERE i.userId=:userId AND i.iItemDeleted=:isDeleted")
    public List<IItemDefEntity> selectAll(String userId, int isDeleted);

    @EntityGraph("ItemWithClassifyAndOptionAndCategory")
    @Query("SELECT i FROM IItemDefEntity i WHERE i.userId=:userId AND i.iItemDeleted=:isDeleted")
    public Optional<List<IItemDefEntity>> selectAllOpt(String userId, int isDeleted);

    @EntityGraph("ItemWithClassifyAndOptionAndCategory")
    @Query("SELECT i FROM IItemDefEntity i WHERE i.iItemId IN :itemIdList AND i.iItemDeleted=:isDeleted")
    public List<IItemDefEntity> selectByitemIdList(List<Long> itemIdList, int isDeleted);

    @EntityGraph("ItemWithClassifyAndOptionAndCategory")
    @Query("SELECT i FROM IItemDefEntity i WHERE i.iItemId=:itemId AND i.iItemDeleted=:isDeleted")
    public Optional<IItemDefEntity> selectByitemId(Long itemId, int isDeleted);

    @EntityGraph("ItemWithClassifyAndOptionAndCategory")
    @Query("SELECT i FROM IItemDefEntity i WHERE i.userId=:userId AND i.iItemId=:itemId AND i.iItemDeleted=:isDeleted")
    public Optional<IItemDefEntity> selectByUserIdAndItemId(String userId, Long itemId, int isDeleted);

    @EntityGraph("ItemWithClassifyAndOptionAndCategory")
    @Query("SELECT i FROM IItemDefEntity i WHERE i.userId=:userId AND i.iOptionUuid=:optionUuid AND i.iItemDeleted=:isDeleted")
    public List<IItemDefEntity> selectItemsByOption(String userId, String optionUuid, int isDeleted);
    // **NEW END**

    @Modifying
    @Transactional
    @Query(value = "UPDATE i_item SET i_item_deleted=:isDeleted WHERE user_id=:userId AND i_option_uuid=:optionUuid", nativeQuery=true)
    public int deleteItemsByOptionUuid(String userId, String optionUuid, int isDeleted);

    @Modifying
    @Transactional
    @Query(value = "UPDATE i_item SET i_item_deleted=:isDeleted WHERE user_id=:userId AND i_classify_uuid=:classifyUuid", nativeQuery=true)
    public int deleteItemsByClassifyUuid(String userId, String classifyUuid, int isDeleted);
}
