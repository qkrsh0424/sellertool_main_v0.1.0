package com.sellertl.sellertool_v1.model.entity.itemManager.itemSell;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.Table;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ICategoryGroupPureEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemClassify.IClassifyPureEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemItem.IItemPureEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemOption.IOptionPureEntity;

import lombok.Data;

@Entity
@Data
@NamedEntityGraph(
    name = "SellItemWithClassifyAndOptionAndItemAndCategory",
    attributeNodes = {
        @NamedAttributeNode("classify"),
        @NamedAttributeNode("option"),
        @NamedAttributeNode("item"),
        @NamedAttributeNode("category"),
    }
)
@Table(name = "i_sell")
public class ISellJClassifyJOptionJItemJCategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "i_sell_id")
    private Long iSellId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "i_classify_uuid")
    private String iClassifyUuid;

    @Column(name = "i_option_uuid")
    private String iOptionUuid;

    @Column(name = "i_item_id")
    private Long iItemId;

    @Column(name = "i_sell_tag")
    private String iSellTag;

    @Column(name = "i_sell_commition_cost")
    private Double iSellCommitionCost;

    @Column(name = "i_sell_price")
    private Long iSellPrice;

    @Column(name = "i_sell_customer_trans_cost")
    private Long iSellCustomerTransCost;

    @Column(name = "i_sell_seller_real_trans_cost")
    private Long iSellSellerRealTransCost;

    @Column(name = "i_sell_purchase_cost")
    private Long iSellPurchaseCost;

    @Column(name = "i_sell_purchase_trans_cost")
    private Long iSellPurchaseTransCost;

    @Column(name = "i_sell_extra_charge")
    private Long iSellExtraCharge;

    @Column(name = "i_sell_selled_count")
    private int iSellSelledCount;

    @Column(name = "i_sell_tot_ads_cost")
    private Long iSellTotAdsCost;

    @Column(name = "i_sell_tot_expenses_cost")
    private Long iSellTotExpensesCost;

    @Column(name = "i_sell_tot_earning_cost")
    private Long iSellTotEarningCost;

    @Column(name = "i_sell_tot_customer_trans_cost")
    private Long iSellTotCustomerTransCost;

    @Column(name = "i_sell_tot_seller_real_trans_cost")
    private Long iSellTotSellerRealTransCost;

    @Column(name = "i_sell_tot_purchase_trans_cost")
    private Long iSellTotPurchaseTransCost;

    @Column(name = "i_sell_created_at")
    private Date iSellCreatedAt;

    @Column(name = "i_sell_updated_at")
    private Date iSellUpdatedAt;

    @Column(name = "i_sell_selled_date")
    private Date iSellSelledDate;

    @Column(name = "i_sell_deleted")
    private int iSellDeleted;

    @ManyToOne
    @JoinColumn(name = "i_classify_uuid",referencedColumnName = "i_classify_uuid", insertable = false, updatable = false)
    private IClassifyPureEntity classify;

    @ManyToOne
    @JoinColumn(name = "i_option_uuid",referencedColumnName = "i_option_uuid", insertable = false, updatable = false)
    private IOptionPureEntity option;

    @ManyToOne
    @JoinColumn(name = "i_item_id",referencedColumnName = "i_item_id", insertable = false, updatable = false)
    private IItemPureEntity item;

    @ManyToOne
    @JoinColumn(name = "i_classify_uuid",referencedColumnName = "i_classify_uuid", insertable = false, updatable = false)
    private ICategoryGroupPureEntity category;
}
