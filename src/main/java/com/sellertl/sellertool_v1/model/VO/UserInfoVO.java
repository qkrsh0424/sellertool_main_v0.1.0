package com.sellertl.sellertool_v1.model.VO;

import java.util.Date;

import lombok.Data;

@Data
public class UserInfoVO {
    private String username;
    private String email;
    private String name;
    private String role;
    private String userUrl;
    private Date createdAt;
    private Date updatedAt;
    private Date credentialCreatedAt;
    private Date credentialExpireAt;
}
