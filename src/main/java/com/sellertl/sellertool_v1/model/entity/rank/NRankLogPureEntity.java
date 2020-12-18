package com.sellertl.sellertool_v1.model.entity.rank;

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
@Table(name = "nrank_log")
public class NRankLogPureEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nrank_log_id")
    private Long nrankLogId;

    @Column(name = "nrank_log_user_type")
    private String nrankLogUserType;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "nrank_log_keyword")
    private String nrankLogKeyword;

    @Column(name = "nrank_log_shop_name")
    private String nrankLogShopName;

    @Column(name = "nrank_log_search_count")
    private int nrankLogSearchCount;

    @Column(name = "nrank_log_created_at")
    private Date nrankLogCreatedAt;
    
    @Column(name = "nrank_log_deleted")
    private int nrankLogDeleted;
}
