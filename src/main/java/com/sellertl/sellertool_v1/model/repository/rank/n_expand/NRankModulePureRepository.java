package com.sellertl.sellertool_v1.model.repository.rank.n_expand;

import java.util.List;
import java.util.Optional;

import com.sellertl.sellertool_v1.model.entity.rank.n_expand.NRankModulePureEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NRankModulePureRepository extends JpaRepository<NRankModulePureEntity, Long>{
    @Query("SELECT m FROM NRankModulePureEntity m WHERE m.userId=:userId AND m.nrankModuleDeleted=:isDeleted")
    List<NRankModulePureEntity> selectAllByUser(String userId, int isDeleted);

    @Query("SELECT COUNT(m) FROM NRankModulePureEntity m WHERE m.userId=:userId AND m.nrankModuleDeleted=:isDeleted")
    int countByUser(String userId, int isDeleted);

    @Query("SELECT m FROM NRankModulePureEntity m WHERE m.userId=:userId AND m.nrankModuleId=:moduleId AND m.nrankModuleDeleted=:isDeleted")
    Optional<NRankModulePureEntity> selectOneByKeyIdAndUser(String userId, Long moduleId, int isDeleted);
}
