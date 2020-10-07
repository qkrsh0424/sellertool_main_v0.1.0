package com.sellertl.sellertool_v1.controller.api.calculate;

import org.json.simple.JSONObject;

public class VatKnowSupplyCalculateHandler {
    private double supplyPrice;
    private Long sum;
    private Long vat;
    
    public VatKnowSupplyCalculateHandler(double supplyPrice){
        this.supplyPrice = supplyPrice;
        this.sum = 0L;
        this.vat = 0L;
    }

    private Long getSupplyPrice(){
        return (Long) Math.round(this.supplyPrice);
    }

    private Long getSum(){
        return this.sum;
    }

    private Long getVat(){
        return this.vat;
    }

    public void setterData(){
        this.vat = (Long) Math.round(this.supplyPrice * 0.1);
        this.sum = (Long) Math.round(this.supplyPrice + vat);
    }

    public JSONObject toJSON(){
        String supplyPrice2String = String.valueOf(getSupplyPrice());
        String sum2String = String.valueOf(getSum());
        String vat2String = String.valueOf(getVat());

        JSONObject json = new JSONObject();
        json.put("supplyPrice", supplyPrice2String);
        json.put("sum", sum2String);
        json.put("vat", vat2String);
        return json;

    }
}