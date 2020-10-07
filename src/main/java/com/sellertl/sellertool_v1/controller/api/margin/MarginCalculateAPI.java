package com.sellertl.sellertool_v1.controller.api.margin;

import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MarginCalculateAPI {
    @RequestMapping(value="/api/margin/domesticCalc", method = RequestMethod.GET)
    public String domesticCalc(@RequestParam Map<String, String> param){
        //필요한 로직 처리
        int purchaseCost = Integer.parseInt(String.valueOf(param.get("purchaseCost")));
        int purchaseTransCharge = Integer.parseInt(String.valueOf(param.get("purchaseTransCharge")));
        int sellPrice = Integer.parseInt(String.valueOf(param.get("sellPrice")));
        int realSellTransUnitCharge = Integer.parseInt(String.valueOf(param.get("realSellTransUnitCharge")));
        int sellTransUnitCharge = Integer.parseInt(String.valueOf(param.get("sellTransUnitCharge")));
        double marketCommitionPercentage = Double.parseDouble(param.get("marketCommitionPercentage"));
        int extraCharge = Integer.parseInt(String.valueOf(param.get("extraCharge")));
        DomesticMargin dm = new DomesticMargin(purchaseCost, purchaseTransCharge, sellPrice, sellTransUnitCharge, realSellTransUnitCharge, marketCommitionPercentage, extraCharge);
        // System.out.println(dm.DomesticMarginReturn());
        return dm.DomesticMarginReturn();
    }
}