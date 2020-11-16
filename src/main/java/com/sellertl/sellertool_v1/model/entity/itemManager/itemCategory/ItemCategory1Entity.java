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
@Table(name = "item_category1")
public class ItemCategory1Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ic1_id")
    private int id;

    @Column(name = "ic1_name")
    private String name;

    @Column(name = "ic1_deleted")
    private int deleted;
}
