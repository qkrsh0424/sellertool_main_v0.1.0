package com.sellertl.sellertool_v1.model.entity.itemManager.alphaPost;

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
@Table(name = "alpha_post")
public class AlphaPostPureEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alpost_id")
    private int alpostId;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "alpost_user_type")
    private String alpostUserType;
    @Column(name = "alpost_desc")
    private String alpostDesc;
    @Column(name = "alpost_img")
    private String alpostImg;
    @Column(name = "alpost_created_at")
    private Date alpostCreatedAt;
    @Column(name = "alpost_updated_at")
    private Date alpostUpdatedAt;
    @Column(name = "alpost_deleted_at")
    private Date alpostDeletedAt;
    @Column(name = "alpost_deleted")
    private int alpostDeleted;
    


}
