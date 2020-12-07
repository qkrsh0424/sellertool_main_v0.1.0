package com.sellertl.sellertool_v1.model.repository.itemManager.itemSell;

import java.util.Optional;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemSell.ISellPureEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ISellPureRepository extends JpaRepository<ISellPureEntity, Long>{
    @Query(value = "SELECT * FROM i_sell WHERE i_sell_id=:id AND i_sell_deleted=:isDeleted", nativeQuery=true)
    public Optional<ISellPureEntity> selectOneById(Long id, int isDeleted);
}
