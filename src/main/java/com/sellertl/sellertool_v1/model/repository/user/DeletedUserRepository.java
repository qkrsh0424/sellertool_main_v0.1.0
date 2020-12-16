package com.sellertl.sellertool_v1.model.repository.user;

import com.sellertl.sellertool_v1.model.entity.itemManager.user.DeletedUserEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DeletedUserRepository extends JpaRepository<DeletedUserEntity, Integer>{
    
}
