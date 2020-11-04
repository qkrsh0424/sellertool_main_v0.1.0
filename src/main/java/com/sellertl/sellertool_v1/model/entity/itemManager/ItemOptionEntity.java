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
@Table(name = "item_option")
public class ItemOptionEntity {
    @Id
    @Column(name = "item_option_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemOptionId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "item_classify_uuid")
    private String itemClassifyUuid;

    @Column(name = "item_classify_name")
    private String itemClassifyName;

    @Column(name = "item_option_uuid")
    private String itemOptionUuid;

    @Column(name = "item_option_name")
    private String itemOptionName;

    @Column(name = "item_option_remaining_count")
    private int itemOptionRemainingCount;

    @Column(name = "item_option_sell_count")
    private int itemOptionSellCount;

    @Column(name = "item_option_image_url")
    private String itemOptionImageUrl;

    @Column(name = "item_option_ic1_id")
    private int itemOptionIc1Id;

    @Column(name = "item_option_ic2_id")
    private int itemOptionIc2Id;

    @Column(name = "item_option_ic3_id")
    private int itemOptionIc3Id;

    @Column(name = "item_option_ic4_id")
    private int itemOptionIc4Id;

    @Column(name = "item_option_ic1_name")
    private String itemOptionIc1Name;

    @Column(name = "item_option_ic2_name")
    private String itemOptionIc2Name;

    @Column(name = "item_option_ic3_name")
    private String itemOptionIc3Name;

    @Column(name = "item_option_ic4_name")
    private String itemOptionIc4Name;

    @Column(name = "item_option_created_at")
    private Date itemOptionCreatedAt;

    @Column(name = "item_option_updated_at")
    private Date itemOptionUpdatedAt;

    @Column(name = "item_option_deleted")
    private int itemOptionDeleted;
}
