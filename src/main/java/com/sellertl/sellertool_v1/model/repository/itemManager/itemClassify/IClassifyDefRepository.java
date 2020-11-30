package com.sellertl.sellertool_v1.model.repository.itemManager.itemClassify;

import java.util.List;

import javax.transaction.Transactional;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemClassify.IClassifyDefEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface IClassifyDefRepository extends JpaRepository<IClassifyDefEntity, Long>{
    @Query(value="SELECT * FROM i_classify WHERE user_id=:userId AND i_classify_deleted=:isDeleted", nativeQuery=true)
    public List<IClassifyDefEntity> selectAllByUserId( String userId, int isDeleted);    
}
