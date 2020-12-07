package com.sellertl.sellertool_v1.model.repository.itemManager.marketCost;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.sellertl.sellertool_v1.model.entity.itemManager.marketCost.MkcDefEntity;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MkcDefRepository extends JpaRepository<MkcDefEntity, Long>{
    @EntityGraph("MarketingCostWithClassifyAndOptionAndStore")
    @Query("SELECT mkc FROM MkcDefEntity mkc \n"+
                    "WHERE mkc.userId=:userId AND mkc.mkcDeleted=:isDeleted AND mkc.mkcRegDate BETWEEN :startDate AND :endDate"
            )
    List<MkcDefEntity> selectAllByUserAndBDate(String userId, int isDeleted, Date startDate, Date endDate);

    @Query(value = "SELECT * FROM marketing_cost WHERE user_id=:userId AND mkc_id=:mkcId ANd mkc_deleted=:isDeleted", nativeQuery = true)
    Optional<MkcDefEntity> selectOneByUserAndId(String userId, Long mkcId, int isDeleted);
}
