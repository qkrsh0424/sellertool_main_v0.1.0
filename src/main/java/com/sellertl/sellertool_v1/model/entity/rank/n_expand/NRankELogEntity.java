package com.sellertl.sellertool_v1.model.entity.rank.n_expand;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "nrank_e_log")
public class NRankELogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nrank_e_log_id")
    private Long nrankELogId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "nrank_module_id")
    private Long nrankModuleId;

    @Column(name = "nrank_rkeyw_id")
    private Long nrankRkeywId;

    @Column(name = "nrank_e_log_keyword")
    private String nrankELogKeyword;

    @Column(name = "nrank_e_log_shop_name")
    private String nrankELogShopName;

    @Column(name = "nrank_e_log_search_count")
    private int nrankELogSearchCount;

    @Column(name = "nrank_e_log_created_at")
    private Date nrankELogCreatedAt;

    @Column(name = "nrank_e_log_updated_at")
    private Date nrankELogUpdatedAt;

    @Column(name = "nrank_e_log_deleted")
    private int nrankELogDeleted;

}
