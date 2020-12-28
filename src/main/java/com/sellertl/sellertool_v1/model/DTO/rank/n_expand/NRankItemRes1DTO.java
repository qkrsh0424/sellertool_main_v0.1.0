package com.sellertl.sellertool_v1.model.DTO.rank.n_expand;

import java.util.List;

import lombok.Data;

@Data
public class NRankItemRes1DTO {
    private String message;
    private Long moduleId;
    private String keyword;
    private String shopName;
    private List<NRankItemGet1DTO> itemList;
	public int totalSize;
}
