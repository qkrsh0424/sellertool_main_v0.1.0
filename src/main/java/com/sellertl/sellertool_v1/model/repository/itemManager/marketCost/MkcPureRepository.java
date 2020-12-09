package com.sellertl.sellertool_v1.model.repository.itemManager.marketCost;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.sellertl.sellertool_v1.model.entity.itemManager.marketCost.MkcJClassifyJOptionJStoreProj;
import com.sellertl.sellertool_v1.model.entity.itemManager.marketCost.MkcPureEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MkcPureRepository extends JpaRepository<MkcPureEntity, Long> {
    @Query(value = "SELECT * FROM marketing_cost WHERE user_id=:userId AND mkc_id=:mkcId AND mkc_deleted=:isDeleted", nativeQuery = true)
    public Optional<MkcPureEntity> selectOneByUserAndMkcId(String userId, Long mkcId, int isDeleted);

    @Query("SELECT mkc AS mkc, c AS classify, o AS option, s AS store FROM MkcPureEntity mkc\n"
            + "LEFT OUTER JOIN IClassifyPureEntity c ON c.iClassifyUuid=mkc.iClassifyUuid\n"
            + "LEFT OUTER JOIN IOptionPureEntity o ON o.iOptionUuid=mkc.iOptionUuid\n"
            + "LEFT OUTER JOIN ItemStoreEntity s ON s.itemStoreType=mkc.iStoreType\n"
            + "WHERE mkc.userId=:userId AND mkc.mkcDeleted=:isDeleted AND mkc.mkcRegDate BETWEEN :startDate AND :endDate")
    public List<MkcJClassifyJOptionJStoreProj> selectAllByUserAndBDateConClassifyAndOptionAndStore(String userId, Date startDate,Date endDate, int isDeleted);
}
