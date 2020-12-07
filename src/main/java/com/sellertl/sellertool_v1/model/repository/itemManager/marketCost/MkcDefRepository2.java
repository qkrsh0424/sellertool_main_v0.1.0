package com.sellertl.sellertool_v1.model.repository.itemManager.marketCost;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.sellertl.sellertool_v1.model.domain.MkcDefDomain;
import com.sellertl.sellertool_v1.model.entity.itemManager.marketCost.MkcDefEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.marketCost.MkcDefEntity2;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MkcDefRepository2 extends JpaRepository<MkcDefEntity2, Long>{
    @Query(value = "SELECT * FROM marketing_cost mc \n"+
                    "LEFT OUTER JOIN i_option o ON o.i_option_uuid=mc.i_option_uuid\n"+
                    "WHERE mc.mkc_deleted=:isDeleted AND mc.mkc_reg_date BETWEEN :startDate AND :endDate", nativeQuery = true)
    List<MkcDefEntity2> selectAllByUserAndBDateTest(int isDeleted, Date startDate, Date endDate);
}
