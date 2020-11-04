package com.sellertl.sellertool_v1.model.entity.itemManager;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "item_store")
public class ItemStoreEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_store_id")
    private int itemStoreId;
    @Column(name = "item_store_name_ko")
    private String itemStoreNameKo;
    @Column(name = "item_store_name_en")
    private String itemStoreNameEn;
    @Column(name = "item_store_type")
    private String itemStoreType;
    
}
