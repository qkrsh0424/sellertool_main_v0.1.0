package com.sellertl.sellertool_v1.model.entity.itemManager.itemOption;

import java.io.Serializable;
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
@Table(name = "i_option")
public class IOptionPureEntity implements Serializable{
    @Id
    @Column(name = "i_option_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long iOptionId;

    @Column(name = "i_option_uuid")
    private String iOptionUuid;

    @Column(name = "i_classify_uuid")
    private String iClassifyUuid;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "i_option_name")
    private String iOptionName;

    @Column(name = "i_option_remaining_count")
    private int iOptionRemainingCount;

    @Column(name = "i_option_sell_count")
    private int iOptionSellCount;

    @Column(name = "i_option_image_url")
    private String iOptionImageUrl;

    @Column(name = "i_option_created_at")
    private Date iOptionCreatedAt;

    @Column(name = "i_option_updated_at")
    private Date iOptionUpdatedAt;

    @Column(name = "i_option_deleted")
    private int iOptionDeleted;
}
