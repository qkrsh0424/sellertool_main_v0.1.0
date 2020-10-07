package com.sellertl.sellertool_v1.controller.api.margin;

public class DomesticMargin {
    private int purchaseCost = 0;
    private int purchaseTransCharge = 0;
    private int sellPrice = 0;
    private int sellTransUnitCharge = 0;
    private int realSellTransUnitCharge = 0;
    private double marketCommitionPercentage = 0;
    private double VAT_10 = 0;
    private int extraCharge = 0;

    public DomesticMargin(int purchaseCost, int purchaseTransCharge, int sellPrice, int sellTransUnitCharge, int realSellTransUnitCharge, double marketCommitionPercentage, int extraCharge){
        this.purchaseCost = purchaseCost;
        this.purchaseTransCharge = purchaseTransCharge;
        this.sellPrice = sellPrice;
        this.sellTransUnitCharge = sellTransUnitCharge;
        this.realSellTransUnitCharge = realSellTransUnitCharge;
        this.marketCommitionPercentage = marketCommitionPercentage;
        this.extraCharge = extraCharge;
    }

    public double getMargin(){
        int purchaseUnitCost = purchaseCost + purchaseTransCharge; // &매입 개당 원가
        double sellUnitPrice = sellPrice + sellTransUnitCharge;
        double unitMargin = (sellUnitPrice - sellUnitPrice * (marketCommitionPercentage/100) - purchaseUnitCost - realSellTransUnitCharge) - extraCharge; // 개당 마진
        return unitMargin;
    }

    public double getMarginRate(){
        int purchaseUnitCost = purchaseCost + purchaseTransCharge; // &매입 개당 원가
        double sellUnitPrice = sellPrice + sellTransUnitCharge;
        double unitMargin = (sellUnitPrice - sellUnitPrice * (marketCommitionPercentage/100) - purchaseUnitCost - realSellTransUnitCharge) - extraCharge; // 개당 마진
        double marginRate = (double) (Math.round(((double) (unitMargin / sellUnitPrice)*100)*100)/100.0); // 마진율 %
        return marginRate;
    }

    public double getVAT_10(){
        return Math.round(getMargin()/11);
    }

    public String DomesticMarginReturn(){
        return "{\"margin\":"+getMargin()+",\"marginRate\":" + getMarginRate()+",\"VAT_10\":" + getVAT_10()+"}";
    }

    

    @Override
    public String toString() {
		return "Element [purchaseCost=" + purchaseCost + ", purchaseTransCharge=" + purchaseTransCharge + ", sellPrice=" + sellPrice + ", realSellTransUnitCharge="
				+ realSellTransUnitCharge + ", marketCommitionPercentage=" + marketCommitionPercentage +"]";
	}
}