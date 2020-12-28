package com.sellertl.sellertool_v1.controller.api.rank.n_expand;

import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.rank.n_expand.NRankModuleGet1DTO;
import com.sellertl.sellertool_v1.model.DTO.rank.n_expand.NRankModuleJRkeywRes1DTO;
import com.sellertl.sellertool_v1.model.DTO.rank.n_expand.NRankSearchRes1DTO;
import com.sellertl.sellertool_v1.service.rank.n_expand.NRankExpandSearchDataService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping(value = "/api/rank/naver/expand/search")
public class NRankExpandSearchDataAPI {
    @Autowired
    NRankExpandSearchDataService searchDataService;

    // /api/rank/naver/expand/search/modules_n_keywords/all
    @GetMapping("/modules_n_keywords/all")
    public NRankModuleJRkeywRes1DTO SearchModulesAndKeywordsAll(HttpServletRequest request){
        return searchDataService.getModulesAndKeywordsAll(request);
    }

    // /api/rank/naver/expand/search/rank/by_module
    @PostMapping(value="/rank/by_module")
    public NRankSearchRes1DTO SearchRankByModule(HttpServletRequest request, @RequestBody NRankModuleGet1DTO reqDto) {
        // Long startTime = Calendar.getInstance().getTimeInMillis();
        NRankSearchRes1DTO result = searchDataService.getRankByModule(request, reqDto);
        // Long endTime = Calendar.getInstance().getTimeInMillis();
        // System.out.println("time : " + (endTime - startTime));
        return result;
    }
    
}
