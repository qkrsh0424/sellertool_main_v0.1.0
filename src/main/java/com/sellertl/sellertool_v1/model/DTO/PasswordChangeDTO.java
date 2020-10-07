package com.sellertl.sellertool_v1.model.DTO;

import lombok.Data;

@Data
public class PasswordChangeDTO {
    private String password;
    private String newPassword;
}
