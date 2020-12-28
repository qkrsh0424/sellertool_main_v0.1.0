package com.sellertl.sellertool_v1.model.DTO.rank.n_expand;

import java.util.List;

import lombok.Data;

@Data
public class NRankSearchRes1DTO {
    private String message;
    private List<NRankItemRes1DTO> searchList;
}
