package com.sellertl.sellertool_v1.controller.api.rank.n_expand;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.rank.n_expand.NRankModuleGet1DTO;
import com.sellertl.sellertool_v1.model.DTO.rank.n_expand.NRankRkeywGet1DTO;
import com.sellertl.sellertool_v1.service.rank.n_expand.NRankExpandDeleteDataService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/rank/naver/expand/delete")
public class NRankExpandDeleteDataAPI {
    @Autowired
    NRankExpandDeleteDataService deleteDataService;

    // /api/rank/naver/expand/delete/module/one
    @PostMapping(value = "/module/one")
    public String DeleteModuleOne(HttpServletRequest request, @RequestBody NRankModuleGet1DTO reqDto) {
        
        String deleteResult = deleteDataService.removeModuleOne(request, reqDto);
        if (deleteResult.equals("SUCCESS")) {
            return "{\"message\":\"SUCCESS\"}";
        } else if (deleteResult.equals("USER_INVALID")) {
            return "{\"message\":\"USER_INVALID\"}";
        } else {
            return "{\"message\":\"FAILURE\"}";
        }
    }

    // /api/rank/naver/expand/delete/keyword/one
    @PostMapping(value = "/keyword/one")
    public String DeleteKeywordOne(HttpServletRequest request, @RequestBody NRankRkeywGet1DTO reqDto) {
        
        String deleteResult = deleteDataService.removeKeywordOne(request, reqDto);
        if (deleteResult.equals("SUCCESS")) {
            return "{\"message\":\"SUCCESS\"}";
        } else if (deleteResult.equals("USER_INVALID")) {
            return "{\"message\":\"USER_INVALID\"}";
        } else {
            return "{\"message\":\"FAILURE\"}";
        }
    }
}
