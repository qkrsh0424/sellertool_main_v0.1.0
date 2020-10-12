package com.sellertl.sellertool_v1.controller.api.ranking;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RankNaverAPI {
    @Value("${naver.clientId}")
    String naver_clientId;
    @Value("${naver.clientSecret}")
    String naver_clientSecret;

    @RequestMapping(value = "/api/rank/naverShopping", method = RequestMethod.GET)
    public String naverShopping(@RequestParam Map<String, String> param) {
        JSONArray resArr = new JSONArray();
        JSONObject resObj = new JSONObject();
        for(int i = 0 ; i < 3; i++){
            resArr.addAll(requestSearchAPI(param.get("nSearchKeyword"),param.get("nShopURL"),i));
        }
        resObj.put("data", resArr);
        return resObj.toString();
    }

    public JSONArray requestSearchAPI(String keyword, String iURL, int startIdx) {
        String clientId = naver_clientId;// 애플리케이션 클라이언트 아이디값";
        String clientSecret = naver_clientSecret;// 애플리케이션 클라이언트 시크릿값";

        int sIdxUnit = 100;
        int sIdx = (startIdx*sIdxUnit)+1;

        JSONArray resp = null;
        // System.out.println("SIDX : " + sIdx);
        try {
            String text = URLEncoder.encode(keyword, "UTF-8");
            String apiURL = "https://openapi.naver.com/v1/search/shop.json?query=" + text + "&start="+sIdx+"&display="+sIdxUnit;
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("X-Naver-Client-Id", clientId);
            con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
            con.setDoOutput(true);
            int responseCode = con.getResponseCode();
            BufferedReader br;
            if (responseCode == 200) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else { // 에러 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();
            resp = (JSONArray) getShopData(response.toString(), iURL, sIdx);
            // System.out.println(resp);

        } catch (Exception e) {
            System.out.println(e);
        }
        return resp;
    }

    public JSONArray getShopData(String searchRes, String mallName, int sIdx){
        JSONParser parser = new JSONParser();
        JSONObject obj = null;
        JSONArray arr = null;

        
        JSONArray resArr = new JSONArray();
        try {
            obj = (JSONObject)parser.parse(searchRes);
            arr = (JSONArray) obj.get("items");
            // System.out.println("===========================================");
            for(int i = 0; i< arr.size(); i++){                
                JSONObject data = (JSONObject)arr.get(i);
                if(mallName.equalsIgnoreCase(data.get("mallName").toString())){
                    JSONObject makeObj = new JSONObject();
                    makeObj.put("rank", sIdx+i);
                    makeObj.put("val", data);
                    resArr.add(makeObj);
                }
            }
       } catch (ParseException e) {
            System.out.println("변환에 실패");
            e.printStackTrace();
       }
    //    System.out.println(resData.get("data"));
       return resArr;
    }
}