package com.sellertl.sellertool_v1.repository.rank.n_expand;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Date;

import com.sellertl.sellertool_v1.model.entity.rank.n_expand.NRankModulePureEntity;
import com.sellertl.sellertool_v1.model.repository.rank.n_expand.NRankModulePureRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class NRankModuleRepositoryTest {
    @Autowired
    NRankModulePureRepository nrankModulePureRepository;

    @Test
    public void setRepoTest(){
        NRankModulePureEntity entity = new NRankModulePureEntity();
        entity.setUserId("abcd");
        entity.setNrankModuleCreatedAt(new Date());
        entity.setNrankModuleUpdatedAt(new Date());
        nrankModulePureRepository.save(entity);
    }

    @Test
    public void getDataTest(){
        NRankModulePureEntity entity = new NRankModulePureEntity();
        entity.setUserId("abcd");
        entity.setNrankModuleCreatedAt(new Date());
        entity.setNrankModuleUpdatedAt(new Date());
        nrankModulePureRepository.save(entity);

        int realSize = nrankModulePureRepository.findAll().size();
        int expectSize = 1;

        assertEquals(expectSize, realSize);
    }
}
