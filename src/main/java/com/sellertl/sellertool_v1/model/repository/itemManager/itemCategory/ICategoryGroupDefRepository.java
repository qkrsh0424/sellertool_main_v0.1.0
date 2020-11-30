package com.sellertl.sellertool_v1.model.repository.itemManager.itemCategory;

import java.util.List;
import java.util.Optional;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ICategoryGroupDefEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ICategoryGroupDefRepository extends JpaRepository<ICategoryGroupDefEntity, Long>{
    @Query(value="SELECT * FROM i_category_group WHERE user_id=:userId AND i_classify_uuid=:classifyUuid", nativeQuery=true)
    public Optional<ICategoryGroupDefEntity> selectByUserIdAndClassifyUuid( String userId, String classifyUuid);
}
