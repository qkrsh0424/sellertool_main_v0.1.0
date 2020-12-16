package com.sellertl.sellertool_v1.model.entity.itemManager.user;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "deleted_user")
public class DeletedUserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "du_id")
    private int duId;

    @Column(name = "du_uuid")
    private String duUuid;

    @Column(name = "du_email")
    private String duEmail;

    @Column(name = "du_deleted_at")
    private Date duDeletedAt;
}
