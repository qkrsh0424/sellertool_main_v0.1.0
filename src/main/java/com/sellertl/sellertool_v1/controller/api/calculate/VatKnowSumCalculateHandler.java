package com.sellertl.sellertool_v1.controller.api.calculate;

import org.json.simple.JSONObject;

public class VatKnowSumCalculateHandler {
    private double sumPrice;
    private Long vat;
    private Long supplyPrice;
    
    public VatKnowSumCalculateHandler(double sumPrice){
        this.sumPrice = sumPrice;
        this.supplyPrice = 0L;
        this.vat = 0L;
    }

    private Long getSupplyPrice(){
        return this.supplyPrice;
    }

    private Long getVat(){
        return this.vat;
    }

    public void setterData(){
        this.supplyPrice = (Long) Math.round(sumPrice / 1.1);
        this.vat = (Long) Math.round(this.sumPrice - this.supplyPrice);
    }

    public JSONObject toJSON(){
        String supplyPrice2String = String.valueOf(getSupplyPrice());
        String vat2String = String.valueOf(getVat());

        JSONObject json = new JSONObject();
        json.put("supplyPrice", supplyPrice2String);
        json.put("vat", vat2String);
        return json;

    }
}