package com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem;

import lombok.Data;
/* IItemGet1DTOllDashboard 뷰로 검색 데이터 매핑시킬때 사용하는 맵핑 DTO. 
 * 해당 데이터 셋을 ItemItemRes1DTO로 리스트 맵핑시킨다.
 */
@Data
public class IItemGet1DTO {
    private Long itemId;
    private String classifyUuid;
    private String optionUuid;
    private String itemName;
    private String storeType;
    private String storeName;
}
