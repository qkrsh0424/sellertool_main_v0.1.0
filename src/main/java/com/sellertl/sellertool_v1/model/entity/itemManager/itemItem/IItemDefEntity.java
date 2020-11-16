package com.sellertl.sellertool_v1.model.entity.itemManager.itemItem;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemOption.IOptionDefEntity;

import lombok.Data;

@Entity
@Data
@Table(name = "i_item")
public class IItemDefEntity implements Serializable{
    @Id
    @Column(name = "i_item_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long iItemId;

    @Column(name = "i_item_uuid")
    private String iItemUuid;

    @Column(name = "i_classify_uuid")
    private String iClassifyUuid;

    @Column(name = "i_option_uuid")
    private String iOptionUuid;

    @Column(name = "user_id")
    private String userId;
    
    @Column(name = "i_item_store_type")
    private String iItemStoreType;

    @Column(name = "i_item_store_name")
    private String iItemStoreName;

    @Column(name = "i_item_commition_cost")
    private Double iItemCommitionCost;

    @Column(name = "i_item_price")
    private Long iItemPrice;

    @Column(name = "i_item_customer_trans_cost")
    private Long iItemCustomerTransCost;

    @Column(name = "i_item_seller_real_trans_cost")
    private Long iItemSellerRealTransCost;

    @Column(name = "i_item_purchase_cost")
    private Long iItemPurchaseCost;

    @Column(name = "i_item_purchase_trans_cost")
    private Long iItemPurchaseTransCost;

    @Column(name = "i_item_extra_charge")
    private Long iItemExtraCharge;
    
    @Column(name = "i_item_image_url")
    private String iItemImageUrl;

    @Column(name = "i_item_created_at")
    private Date iItemCreatedAt;

    @Column(name = "i_item_updated_at")
    private Date iItemUpdatedAt;

    @Column(name = "i_item_deleted")
    private int iItemDeleted;

    @ManyToOne
    @JoinColumn(name="i_option_uuid", referencedColumnName= "i_option_uuid", insertable = false, updatable = false)
    private IOptionDefEntity option;

    public String getIItemName(){
        return option.getClassify().getIClassifyName()+"-"+option.getIOptionName();
    }
}
