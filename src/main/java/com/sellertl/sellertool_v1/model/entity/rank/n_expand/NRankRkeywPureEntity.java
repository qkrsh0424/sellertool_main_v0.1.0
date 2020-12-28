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
@Table(name = "nrank_rkeyw")
public class NRankRkeywPureEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nrank_rkeyw_id")
    private Long nrankRkeywId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "nrank_module_id")
    private Long nrankModuleId;

    @Column(name = "nrank_rkeyw_keyword")
    private String nrankRkeywKeyword;

    @Column(name = "nrank_rkeyw_shop_name")
    private String nrankRkeywShopName;

    @Column(name = "nrank_rkeyw_created_at")
    private Date nrankRkeywCreatedAt;

    @Column(name = "nrank_rkeyw_updated_at")
    private Date nrankRkeywUpdatedAt;

    @Column(name = "nrank_rkeyw_deleted")
    private int nrankRkeywDeleted;
}
