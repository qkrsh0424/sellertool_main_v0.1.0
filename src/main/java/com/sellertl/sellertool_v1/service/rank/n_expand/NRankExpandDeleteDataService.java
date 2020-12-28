package com.sellertl.sellertool_v1.service.rank.n_expand;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.UserLoginSessionDTO;
import com.sellertl.sellertool_v1.model.DTO.rank.n_expand.NRankAddKeywordReq1DTO;
import com.sellertl.sellertool_v1.model.DTO.rank.n_expand.NRankModuleGet1DTO;
import com.sellertl.sellertool_v1.model.DTO.rank.n_expand.NRankRkeywGet1DTO;
import com.sellertl.sellertool_v1.model.entity.rank.n_expand.NRankModulePureEntity;
import com.sellertl.sellertool_v1.model.entity.rank.n_expand.NRankRkeywPureEntity;
import com.sellertl.sellertool_v1.model.repository.rank.n_expand.NRankModulePureRepository;
import com.sellertl.sellertool_v1.model.repository.rank.n_expand.NRankRkeywPureRepository;
import com.sellertl.sellertool_v1.service.handler.DateService;
import com.sellertl.sellertool_v1.service.itemManager.EXIST_OR_NOT;
import com.sellertl.sellertool_v1.service.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NRankExpandDeleteDataService {
    @Autowired
    UserService userService;
    
    @Autowired
    DateService dateService;
    
    @Autowired
    NRankModulePureRepository nrankModulePureRepo;

    @Autowired
    NRankRkeywPureRepository nrankRkeywPureRepo;

    public String removeModuleOne(HttpServletRequest request, NRankModuleGet1DTO reqDto) {
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return "USER_INVALID";
        }
        nrankModulePureRepo.selectOneByKeyIdAndUser(user.getId(), reqDto.getId(), EXIST_OR_NOT.IS_EXIST).ifPresent(r->{
            r.setNrankModuleDeleted(EXIST_OR_NOT.IS_DELETED);
            r.setNrankModuleUpdatedAt(dateService.getCurrentDate());
            nrankModulePureRepo.save(r);
        });
        int keywordDeleteResult = nrankRkeywPureRepo.deleteAllByModuleIdAndUser(user.getId(), reqDto.getId(), EXIST_OR_NOT.IS_DELETED);
		return "SUCCESS";
    }
    
    public String removeKeywordOne(HttpServletRequest request, NRankRkeywGet1DTO reqData){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return "USER_INVALID";
        }
        nrankRkeywPureRepo.selectOneByKeyIdAndUser(user.getId(), reqData.getId(), EXIST_OR_NOT.IS_EXIST).ifPresent(r->{
            r.setNrankRkeywDeleted(EXIST_OR_NOT.IS_DELETED);
            r.setNrankRkeywUpdatedAt(dateService.getCurrentDate());
            nrankRkeywPureRepo.save(r);
        });
        return "SUCCESS";
    }

	
}
