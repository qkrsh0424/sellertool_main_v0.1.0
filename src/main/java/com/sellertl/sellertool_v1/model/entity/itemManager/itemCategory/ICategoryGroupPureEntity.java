package com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "i_category_group")
public class ICategoryGroupPureEntity implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "i_category_group_id")
    private int iCategoryGroupId;

    @Column(name = "i_classify_uuid")
    private String iClassifyUuid;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "i_category_group_category1_id")
    private int iCategoryGroupCategory1Id;

    @Column(name = "i_category_group_category2_id")
    private int iCategoryGroupCategory2Id;

    @Column(name = "i_category_group_category3_id")
    private int iCategoryGroupCategory3Id;

    @Column(name = "i_category_group_category4_id")
    private int iCategoryGroupCategory4Id;

    @Column(name = "i_category_group_category1_name")
    private String iCategoryGroupCategory1Name;

    @Column(name = "i_category_group_category2_name")
    private String iCategoryGroupCategory2Name;

    @Column(name = "i_category_group_category3_name")
    private String iCategoryGroupCategory3Name;

    @Column(name = "i_category_group_category4_name")
    private String iCategoryGroupCategory4Name;
}
