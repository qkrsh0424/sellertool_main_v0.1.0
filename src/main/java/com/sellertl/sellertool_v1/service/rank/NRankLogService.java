package com.sellertl.sellertool_v1.service.rank;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.UserLoginSessionDTO;
import com.sellertl.sellertool_v1.model.entity.rank.NRankLogPureEntity;
import com.sellertl.sellertool_v1.model.repository.rank.NRankLogPureRepository;
import com.sellertl.sellertool_v1.service.handler.DateService;
import com.sellertl.sellertool_v1.service.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NRankLogService {
    @Autowired
    UserService userService;
    
    @Autowired
    DateService dateService;

    @Autowired
    NRankLogPureRepository nrankLogPureRepository;

    public String setNRankLog(HttpServletRequest request, String keyword, String shopName){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        NRankLogPureEntity entity = new NRankLogPureEntity();
        // System.out.println(keyword);
        String userType = "";
        String userId = "";
        if(user==null){
            userType = "TYPE_NO_MEMBER";
            userId = "no-member";
        }else{
            userType = "TYPE_IS_MEMBER";
            userId = user.getId();
        }
        Optional<NRankLogPureEntity> searchDataEntityOpt = nrankLogPureRepository.selectByKeywordAndShopNameAndUser(keyword, shopName, userId);
        if(searchDataEntityOpt.isPresent()){
            searchDataEntityOpt.ifPresent(r->{
                r.setNrankLogSearchCount(r.getNrankLogSearchCount()+1);
                nrankLogPureRepository.save(r);
            });
            return "SUCCESS";
        }

        entity.setNrankLogUserType(userType);
        entity.setUserId(userId);
        entity.setNrankLogKeyword(keyword);
        entity.setNrankLogShopName(shopName);
        entity.setNrankLogSearchCount(0);
        entity.setNrankLogCreatedAt(dateService.getCurrentDate());
        NRankLogPureEntity returnEntity = nrankLogPureRepository.save(entity);
        if(returnEntity.getNrankLogId()!=null){
            return "SUCCESS";
        }else{
            return "FAILURE";
        }
    }
}
