package com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "item_category3")
public class ItemCategory3Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ic3_id")
    private int id;

    @Column(name = "ic3_name")
    private String name;

    @Column(name = "ic1_id")
    private int ic1Id;

    @Column(name = "ic1_name")
    private String ic1Name;

    @Column(name = "ic2_id")
    private int ic2Id;

    @Column(name = "ic2_name")
    private String ic2Name;

    @Column(name = "ic3_deleted")
    private int deleted;
}
