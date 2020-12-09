package com.sellertl.sellertool_v1.model.entity.itemManager.marketCost;

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
@Table(name = "marketing_cost")
public class MkcPureEntity{
    @Id
    @Column(name = "mkc_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mkcId;
    @Column(name = "mkc_type")
    private String mkcType;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "i_classify_uuid")
    private String iClassifyUuid;
    @Column(name = "i_option_uuid")
    private String iOptionUuid;
    @Column(name = "i_store_type")
    private String iStoreType;
    @Column(name = "mkc_ads_cost")
    private Long mkcAdsCost;
    @Column(name = "mkc_created_at")
    private Date mkcCreatedAt;
    @Column(name = "mkc_updated_at")
    private Date mkcUpdatedAt;
    @Column(name = "mkc_reg_date")
    private Date mkcRegDate;
    @Column(name = "mkc_deleted")
    private int mkcDeleted;
}
