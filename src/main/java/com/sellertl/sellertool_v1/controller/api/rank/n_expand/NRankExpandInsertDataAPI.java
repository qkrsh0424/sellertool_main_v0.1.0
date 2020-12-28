package com.sellertl.sellertool_v1.controller.api.rank.n_expand;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.rank.n_expand.NRankAddKeywordReq1DTO;
import com.sellertl.sellertool_v1.service.rank.n_expand.NRankExpandInsertDataService;
import com.sellertl.sellertool_v1.service.rank.n_expand.NRankExpandSearchDataService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(value = "/api/rank/naver/expand/add")
public class NRankExpandInsertDataAPI {
    @Autowired
    NRankExpandSearchDataService searchDataService;

    @Autowired
    NRankExpandInsertDataService insertDataService;

    // /api/rank/naver/expand/add/module/one
    @PostMapping(value="/module/one")
    public String AddModuleOne(HttpServletRequest request) {
        String checkAddAble = searchDataService.checkAddModuleAble(request);
        if(checkAddAble.equals("SUCCESS")){
            String insertResult = insertDataService.insertModuleOne(request);
            if(insertResult.equals("SUCCESS")){
                return "{\"message\":\"SUCCESS\"}";
            }else if(insertResult.equals("USER_INVALID")){
                return "{\"message\":\"USER_INVALID\"}";
            } else{
                return "{\"message\":\"FAILURE\"}";
            }
            
        }else if(checkAddAble.equals("USER_INVALID")){
            return "{\"message\":\"USER_INVALID\"}";
        }else if(checkAddAble.equals("OVER_LIMIT")){
            return "{\"message\":\"OVER_LIMIT\"}";
        }else{
            return "{\"message\":\"FAILURE\"}";
        }
    }

    // /api/rank/naver/expand/add/keyword/one
    @PostMapping(value = "/keyword/one")
    public String AddKeywordOneByModuleId(HttpServletRequest request, @RequestBody NRankAddKeywordReq1DTO reqData){
        String checkAddAble = searchDataService.checkAddKeywordAble(request, reqData);
        if(checkAddAble.equals("SUCCESS")){
            String insertResult = insertDataService.insertKeywordOne(request, reqData);
            if(insertResult.equals("SUCCESS")){
                return "{\"message\":\"SUCCESS\"}";
            }else if(insertResult.equals("USER_INVALID")){
                return "{\"message\":\"USER_INVALID\"}";
            } else{
                return "{\"message\":\"FAILURE\"}";
            }
            
        }else if(checkAddAble.equals("USER_INVALID")){
            return "{\"message\":\"USER_INVALID\"}";
        }else if(checkAddAble.equals("OVER_LIMIT")){
            return "{\"message\":\"OVER_LIMIT\"}";
        }else{
            return "{\"message\":\"FAILURE\"}";
        }
    }

}
