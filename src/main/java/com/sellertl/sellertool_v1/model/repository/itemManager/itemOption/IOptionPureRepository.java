package com.sellertl.sellertool_v1.model.repository.itemManager.itemOption;

import java.util.List;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemOption.IOptionPureEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IOptionPureRepository extends JpaRepository<IOptionPureEntity, Long>{
    @Query(value = "SELECT * FROM i_option WHERE user_id=:userId AND i_classify_uuid=:classifyUuid AND i_option_deleted=:isDeleted", nativeQuery = true)
    public List<IOptionPureEntity> selectAllByClassifyUuid(String userId, String classifyUuid, int isDeleted);
}
