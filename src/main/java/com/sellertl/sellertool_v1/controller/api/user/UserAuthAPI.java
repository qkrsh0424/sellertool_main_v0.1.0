package com.sellertl.sellertool_v1.controller.api.user;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sellertl.sellertool_v1.model.DTO.user.UserDefResDTO;
import com.sellertl.sellertool_v1.model.VO.UserInfoVO;
import com.sellertl.sellertool_v1.service.user.UserAuthService;
import com.sellertl.sellertool_v1.service.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserAuthAPI {
    @Autowired
    UserAuthService userAuthService;

    @Autowired
    UserService userService;
    
    // /api/user/authenticate
    @GetMapping(value = "/authenticate")
    public UserDefResDTO UserAuthenticate(HttpServletRequest request, HttpServletResponse response){
        UserDefResDTO userDefResDto = new UserDefResDTO();
        UserInfoVO user = userService.getUserInfo(request);
        if(user==null){
            userDefResDto.setMessage("USER_INVALID");
            userDefResDto.setData(null);
            return userDefResDto;
        }
        userDefResDto.setMessage("SUCCESS");
        userDefResDto.setData(userService.getUserInfo(request));
        return userDefResDto;
    }
}
