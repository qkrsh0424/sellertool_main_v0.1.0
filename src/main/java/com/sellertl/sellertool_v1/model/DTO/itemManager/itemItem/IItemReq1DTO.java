package com.sellertl.sellertool_v1.model.DTO.itemManager.itemItem;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class IItemReq1DTO {
    private List<IItemGet1DTO> items;
    private Date sellDate;
}
