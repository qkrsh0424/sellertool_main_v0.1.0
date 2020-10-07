package com.sellertl.sellertool_v1.controller.api.profile;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.PasswordChangeDTO;
import com.sellertl.sellertool_v1.model.DTO.UserProfileUpdateDTO;
import com.sellertl.sellertool_v1.service.user.ProfileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
public class ProfileApiController {

    @Autowired
    ProfileService profileService;

    @PostMapping(value = "/profile/update")
    public String updateProfile(HttpServletRequest request, @RequestBody UserProfileUpdateDTO info){
        if(profileService.updateProfile(request, info)){
            return "{\"message\":\"success\"}";
        }else{
            return "{\"message\":\"failure\"}";
        }   
    }

    @PostMapping(value = "/profile/password")
    public String changePassword(HttpServletRequest request, @RequestBody PasswordChangeDTO info){
        String result = profileService.updatePassword(request, info);
        if(result.equals("SESSION_NON") || result.equals("USER_NON")){
            return "{\"message\":\"USER_NON\"}";
        }else if(result.equals("PW_NOT_MATCH")){
            return "{\"message\":\"PW_NOT_MATCH\"}";
        }else if(result.equals("SUCCESS")){
            return "{\"message\":\"success\"}";
        }
        return "{\"message\":\"error\"}";
    }
}
