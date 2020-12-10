package com.sellertl.sellertool_v1.model.DTO.itemManager.alphaPost;

import java.util.Date;

import lombok.Data;

@Data
public class AlphaPostGet1DTO {
    private int postId;
    private String writerName;
    private String writerType;
    private String desc;
    private String image;
    private Date createdAt;
    private Date updatedAt;

}
