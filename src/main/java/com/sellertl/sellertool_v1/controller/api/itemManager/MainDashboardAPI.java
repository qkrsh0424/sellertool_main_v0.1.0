package com.sellertl.sellertool_v1.controller.api.itemManager;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.itemManager.alphaPost.AlphaPostGet1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.alphaPost.AlphaPostRes1DTO;
import com.sellertl.sellertool_v1.service.itemManager.AlphaPostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(value = "/api/item_manager/mdash")
public class MainDashboardAPI {
    @Autowired
    AlphaPostService alpostService;
    @GetMapping(value="/get/sum/sell_item")
    public String getSumSellItem() {
        return "";
    }

    // /api/item_manager/mdash/get/alpost/all
    @GetMapping(value = "/get/alpost/all")
    public AlphaPostRes1DTO getAlphaPostAll(HttpServletRequest request, @RequestParam("pageNum") int pageNum){
        int PAGESIZE = 20;
        AlphaPostRes1DTO resData = new AlphaPostRes1DTO();
        Long length = alpostService.getPostLength();
        List<AlphaPostGet1DTO> postList = alpostService.searchAlphaPostAll(request, pageNum, PAGESIZE);
        resData.setMessage("SUCCESS");
        resData.setPostList(postList);
        resData.setLength(length);
        resData.setCurrentPageNum(pageNum);
        resData.setPrevPageNum(pageNum<=0?0:pageNum-1);
        resData.setNextPageNum(pageNum>=(length/PAGESIZE) ? pageNum:pageNum+1);
        resData.setPageSize(PAGESIZE);
        return resData;
    }

    // /api/item_manager/mdash/add/alpost/one
    @PostMapping(value = "/add/alpost/one")
    public String AddAlphaPostOne(HttpServletRequest request, @RequestBody AlphaPostGet1DTO dto){
        // System.out.println(dto);
        // String result = "SUCCESS";
        String result = alpostService.insertAlphaPostOne(request, dto);
        if(result.equals("SUCCESS")){
            return "{\"message\":\"SUCCESS\"}";
        }else if(result.equals("USER_INVALID")){
            return "{\"message\":\"USER_INVALID\"}";
        }else{
            return "{\"message\":\"FAILURE\"}";
        }
    }

    // /api/item_manager/mdash/delete/alpost/one
    @PostMapping(value = "/delete/alpost/one")
    public String DeleteAlphaPostOne(HttpServletRequest request, @RequestBody AlphaPostGet1DTO dto){
        String result = alpostService.removeAlphaPostOne(request, dto);
        if(result.equals("SUCCESS")){
            return "{\"message\":\"SUCCESS\"}";
        }else if(result.equals("USER_INVALID")){
            return "{\"message\":\"USER_INVALID\"}";
        }else{
            return "{\"message\":\"FAILURE\"}";
        }
    }
    
}
