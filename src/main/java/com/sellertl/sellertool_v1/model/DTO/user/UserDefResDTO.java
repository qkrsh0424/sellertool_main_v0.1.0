package com.sellertl.sellertool_v1.model.DTO.user;

import com.sellertl.sellertool_v1.model.VO.UserInfoVO;

import lombok.Data;

@Data
public class UserDefResDTO {
    private String message;
    private UserInfoVO data;
}
