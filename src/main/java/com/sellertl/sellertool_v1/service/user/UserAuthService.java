package com.sellertl.sellertool_v1.service.user;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.UserLoginSessionDTO;
import com.sellertl.sellertool_v1.service.handler.ConvertService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserAuthService {
    @Autowired
    RedisTemplate redisTemplate;

    @Autowired
    ConvertService convert;
    
    public Boolean isUserSessionValid(HttpServletRequest request){
    // **Origin**
    //     Object session = redisTemplate.opsForValue().get("spring:session:sessions:expires:" + request.getSession().getId());
    //     if( session != null && session.getClass().getSimpleName().equals("UserLoginSessionDTO") ){
    //         UserLoginSessionDTO sessionData = (UserLoginSessionDTO) session;
    //         if(sessionData.getStatus().equals("loged")){
    //             return true;
    //         }
    //         return false;
    //     }
    //     return false;

    // **TEST**
        String session = (String) redisTemplate.opsForValue().get("spring:session:sessions:expires:" + request.getSession().getId());
        // System.out.println(session.isEmpty());
        if( session != null && !session.isEmpty() ){
            // System.out.println("UserAuthService/isUserSessionValid : hello");
            UserLoginSessionDTO sessionData = (UserLoginSessionDTO) convert.jsonString2ObjectClassConvert(session, UserLoginSessionDTO.class);
            // System.out.println(sessionData.getStatus());
            if(sessionData.getStatus().equals("loged")){
                return true;
            }
            return false;
        }
        return false;
    }
}
