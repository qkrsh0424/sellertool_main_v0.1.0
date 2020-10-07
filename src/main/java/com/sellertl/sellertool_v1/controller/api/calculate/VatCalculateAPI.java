package com.sellertl.sellertool_v1.controller.api.calculate;

import java.util.Map;

import com.sellertl.sellertool_v1.controller.api.calculate.VatKnowSumCalculateHandler;

import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class VatCalculateAPI {
    @RequestMapping(value="/api/calculate/vat/knowSum", method=RequestMethod.GET)
    public String requestVatKnowSum(@RequestParam Map<String, String> param) {
        double sumPrice = Double.parseDouble(param.get("vatKnowSum"));
        JSONObject jsonObject = new JSONObject();

        VatKnowSumCalculateHandler vk_sum_ch = new VatKnowSumCalculateHandler(sumPrice);
        vk_sum_ch.setterData();

        jsonObject.put("data", vk_sum_ch.toJSON());
        return jsonObject.toString();
    }

    @RequestMapping(value="/api/calculate/vat/knowSupply", method=RequestMethod.GET)
    public String requestVatKnowSupply(@RequestParam Map<String, String> param) {
        double supplyPrice = Double.parseDouble(param.get("vatKnowSupply"));
        JSONObject jsonObject = new JSONObject();

        VatKnowSupplyCalculateHandler vk_supply_ch = new VatKnowSupplyCalculateHandler(supplyPrice);
        vk_supply_ch.setterData();

        jsonObject.put("data", vk_supply_ch.toJSON());
        return jsonObject.toString();
    }
}