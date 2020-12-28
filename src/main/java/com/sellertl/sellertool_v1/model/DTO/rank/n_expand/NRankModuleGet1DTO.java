package com.sellertl.sellertool_v1.model.DTO.rank.n_expand;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class NRankModuleGet1DTO {
    private Long id;
    private Date createdAt;
    private Date updatedAt;
    private int totalSize;
    private List<NRankRkeywGet1DTO> keywords;
}
