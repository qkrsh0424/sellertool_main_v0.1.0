package com.sellertl.sellertool_v1.service.user;

import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.PasswordChangeDTO;
import com.sellertl.sellertool_v1.model.DTO.UserLoginSessionDTO;
import com.sellertl.sellertool_v1.model.DTO.UserProfileUpdateDTO;
import com.sellertl.sellertool_v1.model.entity.UserEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.user.DeletedUserEntity;
import com.sellertl.sellertool_v1.model.repository.UserRepository;
import com.sellertl.sellertool_v1.model.repository.user.DeletedUserRepository;
import com.sellertl.sellertool_v1.service.handler.ConvertService;
import com.sellertl.sellertool_v1.service.handler.DateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    DeletedUserRepository deletedUserRepository;

    @Autowired
    RedisTemplate redisTemplate;

    @Autowired
    ConvertService convert;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    UserService userService;

    @Autowired
    DateService dateService;
    public boolean updateProfile(HttpServletRequest request, UserProfileUpdateDTO info){
        String session = (String) redisTemplate.opsForValue().get("spring:session:sessions:expires:" + request.getSession().getId());
        if( session != null && !session.isEmpty() ){
            UserLoginSessionDTO sessionData = (UserLoginSessionDTO) convert.jsonString2ObjectClassConvert(session, UserLoginSessionDTO.class);
            Optional<UserEntity> user = userRepository.findById(sessionData.getId());
            user.ifPresent(selectUser->{
                selectUser.setName(info.getName());
                selectUser.setUserUrl(info.getUserUrl());
                userRepository.save(selectUser);
            });
            user = userRepository.findById(sessionData.getId());
            if(user.isPresent()){
                UserLoginSessionDTO newUser = setUserEntityToSessionDTO(user.get());
                String dto2Str = convert.objectClass2JsonStringConvert(newUser);
                redisTemplate.opsForValue().set("spring:session:sessions:expires:" + request.getSession().getId(), dto2Str);
                return true;
            }
        }
        return false;
    }

    public String updatePassword(HttpServletRequest request, PasswordChangeDTO pcDto){
        // System.out.println(pcDto.getPassword());
        // System.out.println(pcDto.getNewPassword());
        String session = (String) redisTemplate.opsForValue().get("spring:session:sessions:expires:" + request.getSession().getId());

        if( session == null || session.isEmpty() ){
            return "SESSION_NON";
        }

        UserLoginSessionDTO sessionData = (UserLoginSessionDTO) convert.jsonString2ObjectClassConvert(session, UserLoginSessionDTO.class);
        Optional<UserEntity> userOp = userRepository.findById(sessionData.getId());

        if(userOp.isPresent()){
            UserEntity user = userOp.get();
            String mergePassword = pcDto.getPassword() + user.getSalt();
            if (encoder.matches(mergePassword, user.getPassword())) {
                // System.out.println("success");
                UUID uuidSalt = UUID.randomUUID();
                String salt = uuidSalt.toString();
                String encPassword = encoder.encode(pcDto.getNewPassword() + salt);

                userOp.ifPresent(newuser->{
                    newuser.setPassword(encPassword);
                    newuser.setSalt(salt);
                    userRepository.save(newuser);
                });

                userService.logout(request);
                
                return "SUCCESS";
            }else{
                return "PW_NOT_MATCH";
            }
        }else{
            return "USER_NON";
        }
    }

    public String singoutUser(HttpServletRequest request, String password){
        // System.out.println(pcDto.getPassword());
        // System.out.println(pcDto.getNewPassword());
        String session = (String) redisTemplate.opsForValue().get("spring:session:sessions:expires:" + request.getSession().getId());

        if( session == null || session.isEmpty() ){
            return "SESSION_NON";
        }

        UserLoginSessionDTO sessionData = (UserLoginSessionDTO) convert.jsonString2ObjectClassConvert(session, UserLoginSessionDTO.class);
        Optional<UserEntity> userOp = userRepository.findById(sessionData.getId());

        if(userOp.isPresent()){
            UserEntity user = userOp.get();
            String mergePassword = password + user.getSalt();
            if (encoder.matches(mergePassword, user.getPassword())) {
                DeletedUserEntity duEntity = new DeletedUserEntity();
                duEntity.setDuEmail(user.getEmail());
                duEntity.setDuUuid(user.getId());
                duEntity.setDuDeletedAt(dateService.getCurrentDate());

                deletedUserRepository.save(duEntity);
                userRepository.delete(user);

                userService.logout(request);
                return "SUCCESS";
            }else{
                return "PW_NOT_MATCH";
            }
        }else{
            return "USER_NON";
        }
    }


    private UserLoginSessionDTO setUserEntityToSessionDTO(UserEntity entity){
        UserLoginSessionDTO sessionData = new UserLoginSessionDTO();
        sessionData.setStatus("loged");
        sessionData.setId(entity.getId());
        sessionData.setUsername(entity.getUsername());
        sessionData.setEmail(entity.getEmail());
        sessionData.setUserUrl(entity.getUserUrl());
        sessionData.setName(entity.getName());
        sessionData.setRole(entity.getRole());
        sessionData.setCreatedAt(entity.getCreatedAt());
        sessionData.setUpdatedAt(entity.getUpdatedAt());
        sessionData.setCredentialCreatedAt(entity.getCredentialCreatedAt());
        sessionData.setCredentialExpireAt(entity.getCredentialExpireAt());
        sessionData.setDeleted(entity.getDeleted());
        return sessionData;
    }
}
