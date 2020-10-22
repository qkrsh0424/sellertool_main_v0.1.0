package com.sellertl.sellertool_v1.service.itemManager;

import java.util.List;

import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemCategory1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemCategory2DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemCategory3DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemCategory4DTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.ItemCategory1Entity;
import com.sellertl.sellertool_v1.model.entity.itemManager.ItemCategory2Entity;
import com.sellertl.sellertool_v1.model.entity.itemManager.ItemCategory3Entity;
import com.sellertl.sellertool_v1.model.entity.itemManager.ItemCategory4Entity;
import com.sellertl.sellertool_v1.model.repository.itemManager.ItemCategory1Repository;
import com.sellertl.sellertool_v1.model.repository.itemManager.ItemCategory2Repository;
import com.sellertl.sellertool_v1.model.repository.itemManager.ItemCategory3Repository;
import com.sellertl.sellertool_v1.model.repository.itemManager.ItemCategory4Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemCategoryService {
    @Autowired
    ItemCategory1Repository ic1Repository;

    @Autowired
    ItemCategory2Repository ic2Repository;

    @Autowired
    ItemCategory3Repository ic3Repository;

    @Autowired
    ItemCategory4Repository ic4Repository;

    @Autowired
    ItemCategoryConverterService categoryConverter;

    // About Category 1 
    public List<ItemCategory1Entity> getItemCategory1AllForAdmin(){
        return ic1Repository.findAll();
    }

    public List<ItemCategory1DTO> getItemCategory1All(){
        return categoryConverter.convertItemCategory1EntityToDTO(
            ic1Repository.selectAllItemCategory1(EXIST_OR_NOT.IS_EXIST).get()
        );
    }

    // About Category 2
    public List<ItemCategory2Entity> getItemCategory2AllForAdmin(){
        return ic2Repository.findAll();
    }

    public List<ItemCategory2DTO> getItemCategory2All(){
        return categoryConverter.convertItemCategory2EntityToDTO(
            ic2Repository.selectAllItemCategory2(EXIST_OR_NOT.IS_EXIST).get()
        );
    }

    public List<ItemCategory2DTO> getItemCategory2ByCategory1(int category1Id){
        return categoryConverter.convertItemCategory2EntityToDTO(
            ic2Repository.selectItemsByCategory1Id(category1Id, EXIST_OR_NOT.IS_EXIST).get()
        );
    }

    // About Category 3
    public List<ItemCategory3Entity> getItemCategory3AllForAdmin(){
        return ic3Repository.findAll();
    }

    public List<ItemCategory3DTO> getItemCategory3All(){
        return categoryConverter.convertItemCategory3EntityToDTO(
            ic3Repository.selectAllItemCategory3(EXIST_OR_NOT.IS_EXIST).get()
        );
    }

    // About Category 4
    public List<ItemCategory4Entity> getItemCategory4AllForAdmin(){
        return ic4Repository.findAll();
    }

    public List<ItemCategory4DTO> getItemCategory4All(){
        return categoryConverter.convertItemCategory4EntityToDTO(
            ic4Repository.selectAllItemCategory4(EXIST_OR_NOT.IS_EXIST).get()
        );
    }
}
