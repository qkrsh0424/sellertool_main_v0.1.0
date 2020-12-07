package com.sellertl.sellertool_v1.model.domain;

import java.util.Date;

import lombok.Data;

@Data
public class MkcDefDomain{
    private Long mkcId;
    private String mkcType;
    private String userId;
    private String iClassifyUuid;
    private String iOptionUuid;
    private String iStoreType;
    private Long mkcAdsCost;
    private Date mkcCreatedAt;
    private Date mkcUpdatedAt;
    private Date mkcRegDate;
    private int mkcDeleted;
}
