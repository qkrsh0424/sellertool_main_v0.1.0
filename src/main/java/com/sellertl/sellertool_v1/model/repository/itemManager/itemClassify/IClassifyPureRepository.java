package com.sellertl.sellertool_v1.model.repository.itemManager.itemClassify;

import java.util.List;

import javax.transaction.Transactional;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemClassify.IClassifyPureEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface IClassifyPureRepository extends JpaRepository<IClassifyPureEntity, Long>{
    @Query(value="SELECT * FROM i_classify WHERE user_id=:userId AND i_classify_deleted=:isDeleted", nativeQuery=true)
    public List<IClassifyPureEntity> selectAllByUserId( String userId, int isDeleted);

    @Query(value="SELECT DISTINCT c.* FROM i_item i\n"+
                    "JOIN i_classify c ON i.i_classify_uuid = c.i_classify_uuid AND c.i_classify_deleted=:classifyIsDeleted\n"+
                    "JOIN i_sell s ON i.i_item_id = s.i_item_id AND s.i_sell_deleted=:sellIsDeleted\n"+
                    "WHERE i.user_id=:userId"
    , nativeQuery=true)
    public List<IClassifyPureEntity> selectDeletedAllJoinSelled( String userId, int classifyIsDeleted, int sellIsDeleted);

    @Modifying
    @Transactional
    @Query(value="UPDATE i_classify SET i_classify_deleted=:isDeleted WHERE user_id=:userId AND i_classify_id=:classifyId", nativeQuery=true)
    public int deleteClassifyOneByClassifyId( String userId, Long classifyId, int isDeleted);
}
