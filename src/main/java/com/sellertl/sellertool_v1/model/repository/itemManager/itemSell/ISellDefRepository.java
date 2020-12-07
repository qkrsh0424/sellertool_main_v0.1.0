package com.sellertl.sellertool_v1.model.repository.itemManager.itemSell;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.sellertl.sellertool_v1.model.entity.itemManager.itemSell.ISellDefEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ISellDefRepository extends JpaRepository<ISellDefEntity, Long>{
}