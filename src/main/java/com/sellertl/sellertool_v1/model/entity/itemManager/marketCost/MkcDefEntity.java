package com.sellertl.sellertool_v1.model.entity.itemManager.marketCost;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.Table;

import com.sellertl.sellertool_v1.model.entity.itemManager.ItemStoreEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemClassify.IClassifyPureEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemOption.IOptionPureEntity;

import org.springframework.lang.Nullable;

import lombok.Data;

@Entity
@Data
@NamedEntityGraph(
    name = "MarketingCostWithClassifyAndOptionAndStore",
    attributeNodes = {
        @NamedAttributeNode("classify"),
        @NamedAttributeNode("option"),
        @NamedAttributeNode("store")
    }
)
@Table(name = "marketing_cost")
public class MkcDefEntity{
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

    @ManyToOne
    @JoinColumn(name="i_classify_uuid", referencedColumnName= "i_classify_uuid", insertable = false, updatable = false)
    private IClassifyPureEntity classify;

    @ManyToOne
    @JoinColumn(name="i_option_uuid", referencedColumnName= "i_option_uuid", insertable = false, updatable = false)
    private IOptionPureEntity option;

    @ManyToOne
    @JoinColumn(name="i_store_type", referencedColumnName= "item_store_type", insertable = false, updatable = false)
    private ItemStoreEntity store;

}
