package com.sellertl.sellertool_v1.service.item_manager;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.sellertl.sellertool_v1.model.entity.itemManager.ItemStoreEntity;
import com.sellertl.sellertool_v1.model.repository.itemManager.ItemStoreRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

// @ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ItemStoreServiceTest {
    // @Autowired
    // ItemStoreRepository itemStoreRepository;

    // @Test
    // public void saveRunTest(){
    //     ItemStoreEntity entity = new ItemStoreEntity();
    //     entity.setItemStoreNameEn("TEST");
    //     entity.setItemStoreNameKo("테스트");
    //     entity.setItemStoreType("TYPE_TEST");
    //     itemStoreRepository.save(entity);
    // }

    // @Test
    // public void findAllRunTest(){
    //     itemStoreRepository.findAll();
    //     System.out.println(itemStoreRepository.findAll());
    // }

    // @Test
    // public void compareCount(){
    //     assertEquals(11, itemStoreRepository.findAll().size());
    // }
}
