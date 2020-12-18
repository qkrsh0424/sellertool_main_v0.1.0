package com.sellertl.sellertool_v1.model.repository.rank;

import java.util.Optional;

import com.sellertl.sellertool_v1.model.entity.rank.NRankLogPureEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NRankLogPureRepository extends JpaRepository<NRankLogPureEntity, Long> {
    @Query("SELECT l FROM NRankLogPureEntity l WHERE l.nrankLogKeyword=:keyword AND l.nrankLogShopName=:shopName AND user_id=:userId")
    Optional<NRankLogPureEntity> selectByKeywordAndShopNameAndUser(String keyword, String shopName, String userId);
}
