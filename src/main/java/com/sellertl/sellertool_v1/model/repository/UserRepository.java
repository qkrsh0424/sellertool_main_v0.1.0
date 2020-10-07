package com.sellertl.sellertool_v1.model.repository;

import com.sellertl.sellertool_v1.model.entity.UserEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, String>{

}
