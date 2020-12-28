package com.sellertl.sellertool_v1.model.repository.rank.n_expand;

import java.util.Optional;

import com.sellertl.sellertool_v1.model.entity.rank.n_expand.NRankELogEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NRankELogRepository extends JpaRepository<NRankELogEntity, Long>{
    @Query("SELECT l FROM NRankELogEntity l WHERE l.nrankRkeywId=:keywordId")
    Optional<NRankELogEntity> selectOneBykeywordId(Long keywordId); 
}
