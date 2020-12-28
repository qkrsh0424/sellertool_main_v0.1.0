package com.sellertl.sellertool_v1.model.entity.rank.n_expand;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "nrank_module")
public class NRankModulePureEntity {
    @Id
    @Column(name = "nrank_module_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long nrankModuleId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "nrank_module_created_at")
    private Date nrankModuleCreatedAt;

    @Column(name = "nrank_module_updated_at")
    private Date nrankModuleUpdatedAt;
    
    @Column(name = "nrank_module_deleted")
    private int nrankModuleDeleted;
}
