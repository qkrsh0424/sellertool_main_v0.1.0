package com.sellertl.sellertool_v1.service.itemManager;

import java.util.ArrayList;
import java.util.List;

import com.sellertl.sellertool_v1.model.DTO.itemManager.itemCategory.ICategory1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemCategory.ICategory2DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemCategory.ICategory3DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.itemCategory.ICategory4DTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ItemCategory1Entity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ItemCategory2Entity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ItemCategory3Entity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemCategory.ItemCategory4Entity;

import org.springframework.stereotype.Service;

@Service
public class ItemCategoryConverterService {
    public List<ICategory1DTO> convertItemCategory1EntityToDTO(List<ItemCategory1Entity> entityList){
        List<ICategory1DTO> ic1DtoList = new ArrayList<>();
        entityList.stream().forEach(r->{
            ICategory1DTO ic1Dto = new ICategory1DTO();
            ic1Dto.setId(r.getId());
            ic1Dto.setName(r.getName());
            ic1DtoList.add(ic1Dto);
        });
        return ic1DtoList;
    }

    public List<ICategory2DTO> convertItemCategory2EntityToDTO(List<ItemCategory2Entity> entityList){
        List<ICategory2DTO> ic2DtoList = new ArrayList<>();
        entityList.stream().forEach(r->{
            ICategory2DTO ic2Dto = new ICategory2DTO();
            ic2Dto.setId(r.getId());
            ic2Dto.setName(r.getName());
            ic2Dto.setIc1Id(r.getIc1Id());
            ic2Dto.setIc1Name(r.getIc1Name());
            ic2DtoList.add(ic2Dto);
        });
        return ic2DtoList;
    }

    public List<ICategory3DTO> convertItemCategory3EntityToDTO(List<ItemCategory3Entity> entityList){
        List<ICategory3DTO> ic3DtoList = new ArrayList<>();
        entityList.stream().forEach(r->{
            ICategory3DTO ic3Dto = new ICategory3DTO();
            ic3Dto.setId(r.getId());
            ic3Dto.setName(r.getName());
            ic3Dto.setIc1Id(r.getIc1Id());
            ic3Dto.setIc1Name(r.getIc1Name());
            ic3Dto.setIc2Id(r.getIc2Id());
            ic3Dto.setIc2Name(r.getIc2Name());
            ic3DtoList.add(ic3Dto);
        });
        return ic3DtoList;
    }

    public List<ICategory4DTO> convertItemCategory4EntityToDTO(List<ItemCategory4Entity> entityList){
        List<ICategory4DTO> ic4DtoList = new ArrayList<>();
        entityList.stream().forEach(r->{
            ICategory4DTO ic4Dto = new ICategory4DTO();
            ic4Dto.setId(r.getId());
            ic4Dto.setName(r.getName());
            ic4Dto.setIc1Id(r.getIc1Id());
            ic4Dto.setIc1Name(r.getIc1Name());
            ic4Dto.setIc2Id(r.getIc2Id());
            ic4Dto.setIc2Name(r.getIc2Name());
            ic4Dto.setIc3Id(r.getIc3Id());
            ic4Dto.setIc3Name(r.getIc3Name());
            ic4DtoList.add(ic4Dto);
        });
        return ic4DtoList;
    }
}
