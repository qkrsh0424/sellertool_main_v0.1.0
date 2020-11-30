package com.sellertl.sellertool_v1.model.repository.itemManager.itemSell;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemSell.ISellDefEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ISellDefRepository extends JpaRepository<ISellDefEntity, Long>{
    @Query(value = "SELECT * FROM i_sell WHERE user_id=:userId AND i_sell_selled_date BETWEEN :start AND :end AND i_sell_deleted=:isDeleted ORDER BY i_sell_created_at DESC", nativeQuery=true)
    public List<ISellDefEntity> selectSellItemsByTime(String userId, Date start, Date end, int isDeleted);

    @Query(value = "SELECT * FROM i_sell WHERE user_id=:userId AND i_sell_selled_date BETWEEN :start AND :end AND i_sell_deleted=:isDeleted ORDER BY i_sell_selled_date DESC", nativeQuery=true)
    public List<ISellDefEntity> selectSellItemsByTimeOrdBySell(String userId, Date start, Date end, int isDeleted);

    @Query(
        value = "SELECT * FROM i_sell as s\n"+
            "JOIN i_item as i ON s.i_item_id=i.i_item_id AND i.i_classify_uuid LIKE %:classifyUuid% AND i.i_option_uuid LIKE %:optionUuid% AND i.i_item_store_type LIKE %:storeType%\n"+
            "WHERE s.user_id=:userId AND s.i_sell_selled_date BETWEEN :start AND :end AND s.i_sell_deleted=:isDeleted\n"+
            "ORDER BY\n"+ 
                "CASE WHEN :order = 'DESC' THEN s.i_sell_selled_date END DESC,\n"+
                "CASE WHEN :order = 'ASC' THEN s.i_sell_selled_date END ASC", 
        nativeQuery=true
    )
    public List<ISellDefEntity> selectSellItemsByCondition(String userId, Date start, Date end, String order, String classifyUuid, String optionUuid, String storeType, int isDeleted);

    @Query(value = "SELECT * FROM i_sell WHERE i_sell_id=:id AND i_sell_deleted=:isDeleted", nativeQuery=true)
    public Optional<ISellDefEntity> selectOneById(Long id, int isDeleted);
}