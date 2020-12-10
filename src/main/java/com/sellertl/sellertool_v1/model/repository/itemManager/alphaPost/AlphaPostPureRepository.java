package com.sellertl.sellertool_v1.model.repository.itemManager.alphaPost;

import java.util.List;

import com.sellertl.sellertool_v1.model.entity.itemManager.alphaPost.AlphaPostJUserProj;
import com.sellertl.sellertool_v1.model.entity.itemManager.alphaPost.AlphaPostPureEntity;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AlphaPostPureRepository extends JpaRepository<AlphaPostPureEntity, Integer>{
    @Query("SELECT p FROM AlphaPostPureEntity p WHERE p.alpostDeleted=0 ORDER BY p.alpostCreatedAt DESC")
    public List<AlphaPostPureEntity> selectAllByExist();
    @Query("SELECT p AS post, u AS user FROM AlphaPostPureEntity p INNER JOIN UserEntity u ON u.id=p.userId WHERE p.alpostDeleted=0 ORDER BY p.alpostCreatedAt DESC")
    public List<AlphaPostJUserProj> selectAllProjByExist(Pageable pageable);
    @Query("SELECT COUNT(p) FROM AlphaPostPureEntity p WHERE p.alpostDeleted=0")
    public Long postLength();
}
