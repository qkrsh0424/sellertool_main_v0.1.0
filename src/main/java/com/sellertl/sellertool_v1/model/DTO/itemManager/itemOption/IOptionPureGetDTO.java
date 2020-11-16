package com.sellertl.sellertool_v1.model.DTO.itemManager.itemOption;

import java.util.Date;

import lombok.Data;

@Data
public class IOptionPureGetDTO {
    private Long optionId;
    private String optionUuid;
    private String classifyUuid;
    private String optionName;
    private int optionRemainingCount;
    private int optionSellCount;
    private String optionImageUrl;
    private Date optionCreatedAt;
    private Date optionUpdatedAt;
}
