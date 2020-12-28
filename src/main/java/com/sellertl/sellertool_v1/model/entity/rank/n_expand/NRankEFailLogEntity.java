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
@Table(name = "nrank_e_fail_log")
public class NRankEFailLogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="nrank_e_fail_log_id")
    private Long nrankEFailLogId;

    @Column(name="user_id")
    private String userId;

    @Column(name="nrank_module_id")
    private Long nrankModuleId;

    @Column(name="nrank_rkeyw_id")
    private Long nrankRkeywId;

    @Column(name="nrank_e_fail_log_keyword")
    private String nrankEFailLogKeyword;

    @Column(name="nrank_e_fail_log_shop_name")
    private String nrankEFailLogShopName;

    @Column(name="nrank_e_fail_log_created_at")
    private Date nrankEFailLogCreatedAt;

    @Column(name="nrank_e_fail_log_updated_at")
    private Date nrankEFailLogUpdatedAt;

    @Column(name="nrank_e_fail_log_deleted")
    private int nrankEFailLogDeleted;
}
