package com.sellertl.sellertool_v1.service.rank.n_expand;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.UserLoginSessionDTO;
import com.sellertl.sellertool_v1.model.DTO.rank.n_expand.NRankAddKeywordReq1DTO;
import com.sellertl.sellertool_v1.model.entity.rank.n_expand.NRankModulePureEntity;
import com.sellertl.sellertool_v1.model.entity.rank.n_expand.NRankRkeywPureEntity;
import com.sellertl.sellertool_v1.model.repository.rank.n_expand.NRankModulePureRepository;
import com.sellertl.sellertool_v1.model.repository.rank.n_expand.NRankRkeywPureRepository;
import com.sellertl.sellertool_v1.service.handler.DateService;
import com.sellertl.sellertool_v1.service.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NRankExpandInsertDataService {
    @Autowired
    UserService userService;
    
    @Autowired
    DateService dateService;
    
    @Autowired
    NRankModulePureRepository nrankModulePureRepo;

    @Autowired
    NRankRkeywPureRepository nrankRkeywPureRepo;

    public String insertModuleOne(HttpServletRequest request){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return "USER_INVALID";
        }
        NRankModulePureEntity entity = new NRankModulePureEntity();
        entity.setUserId(user.getId());
        entity.setNrankModuleCreatedAt(dateService.getCurrentDate());
        entity.setNrankModuleUpdatedAt(dateService.getCurrentDate());
        NRankModulePureEntity savedResult = nrankModulePureRepo.save(entity);
        if(savedResult.getNrankModuleId() != null){
            return "SUCCESS";
        }else{
            return "FAILURE";
        }
    }

    public String insertKeywordOne(HttpServletRequest request, NRankAddKeywordReq1DTO reqData){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return "USER_INVALID";
        }
        NRankRkeywPureEntity entity = new NRankRkeywPureEntity();
        entity.setUserId(user.getId());
        entity.setNrankModuleId(reqData.getModuleId());
        entity.setNrankRkeywKeyword(reqData.getKeyword());
        entity.setNrankRkeywShopName(reqData.getShopName());
        entity.setNrankRkeywCreatedAt(dateService.getCurrentDate());
        entity.setNrankRkeywUpdatedAt(dateService.getCurrentDate());
        NRankRkeywPureEntity savedResult = nrankRkeywPureRepo.save(entity);
        if(savedResult.getNrankModuleId() != null){
            return "SUCCESS";
        }else{
            return "FAILURE";
        }
    }
}
