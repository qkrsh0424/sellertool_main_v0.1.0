package com.sellertl.sellertool_v1.model.repository.itemManager.itemCategory;

import java.util.Optional;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ICategoryGroupPureEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ICategoryGroupPureRepository extends JpaRepository<ICategoryGroupPureEntity, Long>{
    // @Query(value="SELECT * FROM i_category_group WHERE user_id=:userId AND i_classify_uuid=:classifyUuid", nativeQuery=true)
    // public Optional<ICategoryGroupPureEntity> selectByUserIdAndClassifyUuid( String userId, String classifyUuid);
}
