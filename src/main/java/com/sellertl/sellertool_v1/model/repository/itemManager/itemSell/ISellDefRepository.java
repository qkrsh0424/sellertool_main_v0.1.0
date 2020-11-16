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

    @Query(value = "SELECT * FROM i_sell WHERE i_sell_id=:id AND i_sell_deleted=:isDeleted", nativeQuery=true)
    public Optional<ISellDefEntity> selectOneById(Long id, int isDeleted);
}