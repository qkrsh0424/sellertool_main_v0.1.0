package com.sellertl.sellertool_v1.model.DTO.rank.n_expand;

import java.util.Date;

import lombok.Data;

@Data
public class NRankRkeywGet1DTO {
    private Long id;
    private Long moduleId;
    private String keyword;
    private String shopName;
    private Date createdAt;
    private Date updatedAt;
    private int totalSize;
}
