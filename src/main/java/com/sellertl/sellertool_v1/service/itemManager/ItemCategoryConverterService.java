package com.sellertl.sellertool_v1.service.itemManager;

import java.util.ArrayList;
import java.util.List;

import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemCategory1DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemCategory2DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemCategory3DTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.ItemCategory4DTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.ItemCategory1Entity;
import com.sellertl.sellertool_v1.model.entity.itemManager.ItemCategory2Entity;
import com.sellertl.sellertool_v1.model.entity.itemManager.ItemCategory3Entity;
import com.sellertl.sellertool_v1.model.entity.itemManager.ItemCategory4Entity;

import org.springframework.stereotype.Service;

@Service
public class ItemCategoryConverterService {
    public List<ItemCategory1DTO> convertItemCategory1EntityToDTO(List<ItemCategory1Entity> entityList){
        List<ItemCategory1DTO> ic1DtoList = new ArrayList<>();
        entityList.stream().forEach(r->{
            ItemCategory1DTO ic1Dto = new ItemCategory1DTO();
            ic1Dto.setId(r.getId());
            ic1Dto.setName(r.getName());
            ic1DtoList.add(ic1Dto);
        });
        return ic1DtoList;
    }

    public List<ItemCategory2DTO> convertItemCategory2EntityToDTO(List<ItemCategory2Entity> entityList){
        List<ItemCategory2DTO> ic2DtoList = new ArrayList<>();
        entityList.stream().forEach(r->{
            ItemCategory2DTO ic2Dto = new ItemCategory2DTO();
            ic2Dto.setId(r.getId());
            ic2Dto.setName(r.getName());
            ic2Dto.setIc1Id(r.getIc1Id());
            ic2Dto.setIc1Name(r.getIc1Name());
            ic2DtoList.add(ic2Dto);
        });
        return ic2DtoList;
    }

    public List<ItemCategory3DTO> convertItemCategory3EntityToDTO(List<ItemCategory3Entity> entityList){
        List<ItemCategory3DTO> ic3DtoList = new ArrayList<>();
        entityList.stream().forEach(r->{
            ItemCategory3DTO ic3Dto = new ItemCategory3DTO();
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

    public List<ItemCategory4DTO> convertItemCategory4EntityToDTO(List<ItemCategory4Entity> entityList){
        List<ItemCategory4DTO> ic4DtoList = new ArrayList<>();
        entityList.stream().forEach(r->{
            ItemCategory4DTO ic4Dto = new ItemCategory4DTO();
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
