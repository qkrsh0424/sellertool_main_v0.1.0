package com.sellertl.sellertool_v1.model.entity.itemManager.itemClassify;

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

import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ICategoryGroupDefEntity;

import org.hibernate.annotations.NaturalId;

import lombok.Data;

@Entity
@Data
@Table(name = "i_classify")
public class IClassifyDefEntity implements Serializable{
    @Id
    @Column(name = "i_classify_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemClassifyId;

    @NaturalId
    @Column(name = "i_classify_uuid")
    private String iClassifyUuid;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "i_classify_name")
    private String iClassifyName;

    @Column(name = "i_classify_desc")
    private String iClassifyDesc;

    @Column(name = "i_classify_image_url")
    private String iClassifyImageUrl;

    @Column(name = "i_classify_created_at")
    private Date iClassifyCreatedAt;

    @Column(name = "i_classify_updated_at")
    private Date iClassifyUpdatedAt;

    @Column(name = "i_classify_deleted")
    private int iClassifyDeleted;

    @ManyToOne
    @JoinColumn(name="i_classify_uuid", referencedColumnName= "i_classify_uuid",insertable = false, updatable = false)
    private ICategoryGroupDefEntity category;
}
