package com.sellertl.sellertool_v1.model.repository.rank.n_expand;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.sellertl.sellertool_v1.model.entity.rank.n_expand.NRankRkeywPureEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface NRankRkeywPureRepository extends JpaRepository<NRankRkeywPureEntity, Long>{
    @Query("SELECT k FROM NRankRkeywPureEntity k WHERE k.userId=:userId AND k.nrankModuleId=:moduleId AND k.nrankRkeywDeleted=:isDeleted")
    List<NRankRkeywPureEntity> selectAllByUserAndModule(String userId, Long moduleId, int isDeleted);

    @Query("SELECT COUNT(k) FROM NRankRkeywPureEntity k WHERE k.userId=:userId AND k.nrankModuleId=:moduleId AND k.nrankRkeywDeleted=:isDeleted")
    int countByUserAndModule(String userId, Long moduleId, int isDeleted);

    @Query("SELECT k FROM NRankRkeywPureEntity k WHERE k.userId=:userId AND k.nrankRkeywId=:keywordId AND k.nrankRkeywDeleted=:isDeleted")
    Optional<NRankRkeywPureEntity> selectOneByKeyIdAndUser(String userId, Long keywordId, int isDeleted);

    @Transactional
    @Modifying
    @Query("UPDATE NRankRkeywPureEntity k SET k.nrankRkeywDeleted=:isDeleted WHERE k.userId=:userId AND k.nrankModuleId=:moduleId")
    int deleteAllByModuleIdAndUser(String userId, Long moduleId, int isDeleted);
}
