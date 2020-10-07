package com.sellertl.sellertool_v1.service.user;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.sellertl.sellertool_v1.model.DTO.UserLoginSessionDTO;
import com.sellertl.sellertool_v1.model.VO.UserInfoVO;
import com.sellertl.sellertool_v1.service.handler.ConvertService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    RedisTemplate redisTemplate;

    @Autowired
    UserAuthService userAuthService;

    @Autowired
    ConvertService convert;

    public UserInfoVO getUserSessionDtoToVo(UserLoginSessionDTO userSessionData){
        UserInfoVO user = new UserInfoVO();
        user.setUsername(userSessionData.getUsername());
        user.setEmail(userSessionData.getEmail());
        user.setUserUrl(userSessionData.getUserUrl());
        user.setName(userSessionData.getName());
        user.setRole(userSessionData.getRole());
        user.setCreatedAt(userSessionData.getCreatedAt());
        user.setUpdatedAt(userSessionData.getUpdatedAt());
        user.setCredentialCreatedAt(userSessionData.getCredentialCreatedAt());
        user.setCredentialExpireAt(userSessionData.getCredentialExpireAt());
        return user;
    }

    public UserInfoVO getUserInfo(HttpServletRequest request){
        // **Origin**
        // if(userAuthService.isUserSessionValid(request)){
        //     UserLoginSessionDTO userLoginSessionDTO = (UserLoginSessionDTO) redisTemplate.opsForValue().get("spring:session:sessions:expires:" + request.getSession().getId());
        //     return getUserSessionDtoToVo(userLoginSessionDTO);
        // }
        // return null;

        // **TEST**
        if(userAuthService.isUserSessionValid(request)){
            // System.out.println("UserService/getUserInfo : hello");
            UserLoginSessionDTO userLoginSessionDTO = (UserLoginSessionDTO) convert.jsonString2ObjectClassConvert((String)redisTemplate.opsForValue().get("spring:session:sessions:expires:" + request.getSession().getId()), UserLoginSessionDTO.class);
            return getUserSessionDtoToVo(userLoginSessionDTO);
        }
        return null;
    }

    public void logout(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.invalidate();
        redisTemplate.delete("spring:session:sessions:" + session.getId());
    }
    
}
