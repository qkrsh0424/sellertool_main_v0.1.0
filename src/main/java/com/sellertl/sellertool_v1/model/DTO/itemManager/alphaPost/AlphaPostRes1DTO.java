package com.sellertl.sellertool_v1.model.DTO.itemManager.alphaPost;

import java.util.List;

import lombok.Data;

@Data
public class AlphaPostRes1DTO {
    private String message;
    private List<AlphaPostGet1DTO> postList;
    private Long length;
    private int currentPageNum;
    private int prevPageNum;
    private int nextPageNum;
    private int pageSize;
}
