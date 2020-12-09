package com.sellertl.sellertool_v1.model.repository.itemManager.itemClassify;

import java.util.List;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemClassify.IClassifyDefEntity;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IClassifyDefRepository extends JpaRepository<IClassifyDefEntity, Long>{
    @EntityGraph(attributePaths = {"category"})
    @Query("SELECT c FROM IClassifyDefEntity c INNER JOIN c.category categ WHERE c.userId=:userId AND c.iClassifyDeleted=:isDeleted")
    public List<IClassifyDefEntity> selectAllByUserId( String userId, int isDeleted);
}
