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
@Table(name = "item_classify")
public class ItemClassifyEntity {
    @Id
    @Column(name = "item_classify_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemClassifyId;

    @Column(name = "item_classify_uuid")
    private String itemClassifyUuid;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "item_classify_name")
    private String itemClassifyName;

    @Column(name = "item_classify_desc")
    private String itemClassifyDesc;

    @Column(name = "item_classify_image_url")
    private String itemClassifyImageUrl;

    @Column(name = "item_classify_ic1_id")
    private int itemClassifyIc1Id;

    @Column(name = "item_classify_ic2_id")
    private int itemClassifyIc2Id;

    @Column(name = "item_classify_ic3_id")
    private int itemClassifyIc3Id;

    @Column(name = "item_classify_ic4_id")
    private int itemClassifyIc4Id;

    @Column(name = "item_classify_ic1_name")
    private String itemClassifyIc1Name;

    @Column(name = "item_classify_ic2_name")
    private String itemClassifyIc2Name;

    @Column(name = "item_classify_ic3_name")
    private String itemClassifyIc3Name;

    @Column(name = "item_classify_ic4_name")
    private String itemClassifyIc4Name;

    @Column(name = "item_classify_created_at")
    private Date itemClassifyCreatedAt;

    @Column(name = "item_classify_updated_at")
    private Date itemClassifyUpdatedAt;

    @Column(name = "item_classify_deleted")
    private int itemClassifyDeleted;
}
