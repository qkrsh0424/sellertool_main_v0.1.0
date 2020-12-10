package com.sellertl.sellertool_v1.service.itemManager;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.UserLoginSessionDTO;
import com.sellertl.sellertool_v1.model.DTO.itemManager.alphaPost.AlphaPostGet1DTO;
import com.sellertl.sellertool_v1.model.entity.itemManager.alphaPost.AlphaPostJUserProj;
import com.sellertl.sellertool_v1.model.entity.itemManager.alphaPost.AlphaPostPureEntity;
import com.sellertl.sellertool_v1.model.repository.itemManager.alphaPost.AlphaPostPureRepository;
import com.sellertl.sellertool_v1.service.handler.DateService;
import com.sellertl.sellertool_v1.service.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AlphaPostService {
    @Autowired
    UserService userService;

    @Autowired
    DateService dateService;

    @Autowired
    AlphaPostPureRepository alphaPostPureRepository;
    
    public List<AlphaPostGet1DTO> searchAlphaPostAll(HttpServletRequest request, int pageNum, int PAGESIZE){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return new ArrayList<>();
        }
        if(pageNum<=0){
            pageNum = 0;
        }
        Pageable pageable = PageRequest.of(pageNum, PAGESIZE);
        List<AlphaPostJUserProj> projs = alphaPostPureRepository.selectAllProjByExist(pageable);
        List<AlphaPostGet1DTO> dtos = this.convertAlphaPostProjToDtos(projs, user);
        return dtos;
    }

    public Long getPostLength(){
        return alphaPostPureRepository.postLength();
    }

    public String insertAlphaPostOne(HttpServletRequest request, AlphaPostGet1DTO dto){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return "USER_INVALID";
        }
        AlphaPostPureEntity entity = this.convertAlphaPostDtoToEntityForPure(dto, user);
        alphaPostPureRepository.save(entity);
        return "SUCCESS";
    }

    public String removeAlphaPostOne(HttpServletRequest request, AlphaPostGet1DTO dto){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return "USER_INVALID";
        }
        Optional<AlphaPostPureEntity> entityOpt = alphaPostPureRepository.findById(dto.getPostId());

        if(!entityOpt.isPresent() || !user.getId().equals(entityOpt.get().getUserId())){
            return "FAILURE";
        }

        entityOpt.ifPresent(r->{
            r.setAlpostDeleted(EXIST_OR_NOT.IS_DELETED);
            r.setAlpostDeletedAt(dateService.getCurrentDate());
            alphaPostPureRepository.save(r);
        });
        return "SUCCESS";
    }

    private List<AlphaPostGet1DTO> convertAlphaPostProjToDtos(List<AlphaPostJUserProj> projs, UserLoginSessionDTO user){
        List<AlphaPostGet1DTO> dtos = new ArrayList<>();
        for(AlphaPostJUserProj proj : projs){
            // System.out.println(proj.getLength());
            if(proj == null || proj.getPost()==null || proj.getUser() ==null){
                System.out.println("anything null : AlphaPostService.convertAlphaPostProjToDtos");
                break;
            }
            AlphaPostGet1DTO dto = new AlphaPostGet1DTO();
            dto.setPostId(proj.getPost().getAlpostId());
            dto.setWriterType("USER");
            if(proj.getUser().getRole().equals("ROLE_ADMIN")){
                dto.setWriterName("관리자");
            }else{
                dto.setWriterName("**"+proj.getUser().getUsername().substring(2, 5) + "****");
            }
            if(proj.getUser().getId().equals(user.getId())){
                dto.setWriterType("SELF");
            }
            dto.setDesc(proj.getPost().getAlpostDesc());
            dto.setImage(proj.getPost().getAlpostImg());
            dto.setCreatedAt(proj.getPost().getAlpostCreatedAt());
            dto.setUpdatedAt(proj.getPost().getAlpostUpdatedAt());
            dtos.add(dto);
        }
        return dtos;
    }

    private AlphaPostPureEntity convertAlphaPostDtoToEntityForPure(AlphaPostGet1DTO dto, UserLoginSessionDTO user){
        AlphaPostPureEntity entity = new AlphaPostPureEntity();
        entity.setUserId(user.getId());
        entity.setAlpostUserType("USER");
        entity.setAlpostDesc(dto.getDesc());
        entity.setAlpostImg(dto.getImage());
        entity.setAlpostCreatedAt(dateService.getCurrentDate());
        entity.setAlpostUpdatedAt(dateService.getCurrentDate());
        entity.setAlpostDeletedAt(null);
        return entity;
    }
}
