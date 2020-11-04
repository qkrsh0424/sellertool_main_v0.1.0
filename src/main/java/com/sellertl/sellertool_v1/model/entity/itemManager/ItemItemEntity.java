package com.sellertl.sellertool_v1.model.entity.itemManager;

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
@Table(name = "item_item")
public class ItemItemEntity {
    @Id
    @Column(name = "item_item_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemItemId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "item_item_uuid")
    private String itemItemUuid;

    @Column(name = "item_item_name")
    private String itemItemName;
    
    @Column(name = "item_item_store_type")
    private String itemItemStoreType;

    @Column(name = "item_item_store_name")
    private String itemItemStoreName;

    @Column(name = "item_item_commition_cost")
    private Double itemItemCommitionCost;

    @Column(name = "item_item_price")
    private Long itemItemPrice;

    @Column(name = "item_item_customer_trans_cost")
    private Long itemItemCustomerTransCost;

    @Column(name = "item_item_seller_real_trans_cost")
    private Long itemItemSellerRealTransCost;

    @Column(name = "item_item_purchase_cost")
    private Long itemItemPurchaseCost;

    @Column(name = "item_item_purchase_trans_cost")
    private Long itemItemPurchaseTransCost;

    @Column(name = "item_item_extra_charge")
    private Long itemItemExtraCharge;
    
    @Column(name = "item_item_image_url")
    private String itemItemImageUrl;

    @Column(name = "item_classify_uuid")
    private String itemClassifyUuid;

    @Column(name = "item_classify_name")
    private String itemClassifyName;

    @Column(name = "item_option_uuid")
    private String itemOptionUuid;

    @Column(name = "item_option_name")
    private String itemOptionName;

    @Column(name = "item_item_ic1_id")
    private int itemItemIc1Id;

    @Column(name = "item_item_ic2_id")
    private int itemItemIc2Id;

    @Column(name = "item_item_ic3_id")
    private int itemItemIc3Id;

    @Column(name = "item_item_ic4_id")
    private int itemItemIc4Id;

    @Column(name = "item_item_ic1_name")
    private String itemItemIc1Name;

    @Column(name = "item_item_ic2_name")
    private String itemItemIc2Name;

    @Column(name = "item_item_ic3_name")
    private String itemItemIc3Name;

    @Column(name = "item_item_ic4_name")
    private String itemItemIc4Name;

    @Column(name = "item_item_created_at")
    private Date itemItemCreatedAt;

    @Column(name = "item_item_updated_at")
    private Date itemItemUpdatedAt;

    @Column(name = "item_item_deleted")
    private int itemItemDeleted;
}
