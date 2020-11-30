package com.sellertl.sellertool_v1.model.repository.itemManager.itemOption;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemOption.IOptionPureEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface IOptionPureRepository extends JpaRepository<IOptionPureEntity, Long>{
    @Query(value = "SELECT * FROM i_option WHERE user_id=:userId AND i_option_deleted=:isDeleted", nativeQuery = true)
    public List<IOptionPureEntity> selectAllByUserId(String userId, int isDeleted);

    @Query(value = "SELECT * FROM i_option WHERE user_id=:userId AND i_classify_uuid=:classifyUuid AND i_option_deleted=:isDeleted", nativeQuery = true)
    public List<IOptionPureEntity> selectAllByClassifyUuid(String userId, String classifyUuid, int isDeleted);

    @Query(value = "SELECT * FROM i_option WHERE user_id=:userId AND i_option_id=:optionId AND i_option_deleted=:isDeleted", nativeQuery = true)
    public Optional<IOptionPureEntity> selectByOptionId(String userId, Long optionId, int isDeleted);

    @Modifying
    @Transactional
    @Query(value = "UPDATE i_option SET i_option_deleted = :isDeleted WHERE user_id = :userId AND i_option_id = :optionId", nativeQuery = true)
    public int deleteOptionOneByOptionId(String userId, Long optionId, int isDeleted);

    @Modifying
    @Transactional
    @Query(value = "UPDATE i_option SET i_option_deleted = :isDeleted WHERE user_id = :userId AND i_classify_uuid = :classifyUuid", nativeQuery = true)
    public int deleteOptionsByClassifyUuid(String userId, String classifyUuid, int isDeleted);

}
