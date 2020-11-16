package com.sellertl.sellertool_v1.model.repository.itemManager.itemClassify;

import java.util.List;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemClassify.IClassifyPureEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IClassifyPureRepository extends JpaRepository<IClassifyPureEntity, Long>{
    @Query(value="SELECT * FROM i_classify WHERE user_id=:userId AND i_classify_deleted=:isDeleted", nativeQuery=true)
    public List<IClassifyPureEntity> selectAllByUserId( String userId, int isDeleted);
}
