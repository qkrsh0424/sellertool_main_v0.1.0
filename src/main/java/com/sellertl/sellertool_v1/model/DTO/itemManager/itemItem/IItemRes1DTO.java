package com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem;

import java.util.List;

import lombok.Data;

/**
 * SellDashboard 뷰로 검색 데이터 매핑시킬때 사용하는 응답 DTO
 */
@Data
public class IItemRes1DTO {
    private String message;
    private List<IItemGet1DTO> data;
}
