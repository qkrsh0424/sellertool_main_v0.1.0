package com.sellertl.sellertool_v1.model.DTO.rank.n_expand;

import lombok.Data;

@Data
public class NRankItemGet1DTO {
    String id;
    String productTitle;
    String mallName;
    String price;
    String imageUrl;
    String reviewCountSum;
    String mallProductId;
    String mallProductUrl;
    String mallPcUrl;
    String rank;
    int pageNum;
    int rankInPage;
    String shoppingPageUrl;
}
