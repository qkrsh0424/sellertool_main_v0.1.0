package com.sellertl.sellertool_v1.service.itemManager;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemCategory.ICategory1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemCategory.ICategory2DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemCategory.ICategory3DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemCategory.ICategory4DTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ItemCategory1Entity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ItemCategory2Entity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ItemCategory3Entity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ItemCategory4Entity;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemCategory.ItemCategory1Repository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemCategory.ItemCategory2Repository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemCategory.ItemCategory3Repository;
import com.sellertl.sellertool_v1.model.repository.itemManager.itemCategory.ItemCategory4Repository;

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

    public List<ICategory1DTO> getItemCategory1All(){
        return categoryConverter.convertItemCategory1EntityToDTO(
            ic1Repository.selectAllItemCategory1(EXIST_OR_NOT.IS_EXIST).get()
        );
    }

    // About Category 2
    public List<ItemCategory2Entity> getItemCategory2AllForAdmin(){
        return ic2Repository.findAll();
    }

    public List<ICategory2DTO> getItemCategory2All(){
        return categoryConverter.convertItemCategory2EntityToDTO(
            ic2Repository.selectAllItemCategory2(EXIST_OR_NOT.IS_EXIST).get()
        );
    }

    public List<ICategory2DTO> getItemCategory2ByC1(int category1Id){
        Optional<List<ItemCategory2Entity>> resCategoryList = 
            ic2Repository.selectItemsByC1(category1Id, EXIST_OR_NOT.IS_EXIST);

        if( resCategoryList.isEmpty()){
            return new ArrayList<>();
        }
        
        return categoryConverter.convertItemCategory2EntityToDTO(resCategoryList.get());
    }

    // About Category 3
    public List<ItemCategory3Entity> getItemCategory3AllForAdmin(){
        return ic3Repository.findAll();
    }

    public List<ICategory3DTO> getItemCategory3All(){
        return categoryConverter.convertItemCategory3EntityToDTO(
            ic3Repository.selectAllItemCategory3(EXIST_OR_NOT.IS_EXIST).get()
        );
    }

    public List<ICategory3DTO> getItemCategory3ByC1C2(int category1Id,int category2Id){
        Optional<List<ItemCategory3Entity>> resCategoryList = 
            ic3Repository.selectItemsByC1C2(
                category1Id, category2Id, EXIST_OR_NOT.IS_EXIST, EXIST_OR_NOT.EMPTY_STRING
            );

        if ( resCategoryList.isEmpty() ){
            return new ArrayList<>();
        }
        return categoryConverter.convertItemCategory3EntityToDTO(resCategoryList.get());
    }

    // About Category 4
    public List<ItemCategory4Entity> getItemCategory4AllForAdmin(){
        return ic4Repository.findAll();
    }

    public List<ICategory4DTO> getItemCategory4All(){
        return categoryConverter.convertItemCategory4EntityToDTO(
            ic4Repository.selectAllItemCategory4(EXIST_OR_NOT.IS_EXIST).get()
        );
    }

    public List<ICategory4DTO> getItemCategory4ByC1C2C3(int category1Id,int category2Id, int category3Id){
        Optional<List<ItemCategory4Entity>> resCategoryList = 
            ic4Repository.selectItemsByC1C2C3(
                category1Id, category2Id, category3Id, EXIST_OR_NOT.IS_EXIST, EXIST_OR_NOT.EMPTY_STRING
            );

        if ( resCategoryList.isEmpty() ){
            return new ArrayList<>();
        }
        return categoryConverter.convertItemCategory4EntityToDTO(resCategoryList.get());
    }
}
