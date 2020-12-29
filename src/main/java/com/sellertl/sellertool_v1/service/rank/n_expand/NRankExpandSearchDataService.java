package com.sellertl.sellertool_v1.service.rank.n_expand;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.DTO.UserLoginSessionDTO;
import com.sellertl.sellertool_v1.model.DTO.rank.n_expand.NRankAddKeywordReq1DTO;
import com.sellertl.sellertool_v1.model.DTO.rank.n_expand.NRankItemGet1DTO;
import com.sellertl.sellertool_v1.model.DTO.rank.n_expand.NRankItemRes1DTO;
import com.sellertl.sellertool_v1.model.DTO.rank.n_expand.NRankModuleGet1DTO;
import com.sellertl.sellertool_v1.model.DTO.rank.n_expand.NRankModuleJRkeywRes1DTO;
import com.sellertl.sellertool_v1.model.DTO.rank.n_expand.NRankRkeywGet1DTO;
import com.sellertl.sellertool_v1.model.DTO.rank.n_expand.NRankSearchRes1DTO;
import com.sellertl.sellertool_v1.model.entity.rank.n_expand.NRankEFailLogEntity;
import com.sellertl.sellertool_v1.model.entity.rank.n_expand.NRankELogEntity;
import com.sellertl.sellertool_v1.model.entity.rank.n_expand.NRankModulePureEntity;
import com.sellertl.sellertool_v1.model.entity.rank.n_expand.NRankRkeywPureEntity;
import com.sellertl.sellertool_v1.model.repository.rank.n_expand.NRankEFailLogRepository;
import com.sellertl.sellertool_v1.model.repository.rank.n_expand.NRankELogRepository;
import com.sellertl.sellertool_v1.model.repository.rank.n_expand.NRankModulePureRepository;
import com.sellertl.sellertool_v1.model.repository.rank.n_expand.NRankRkeywPureRepository;
import com.sellertl.sellertool_v1.service.handler.DateService;
import com.sellertl.sellertool_v1.service.itemManager.EXIST_OR_NOT;
import com.sellertl.sellertool_v1.service.user.UserService;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.jsoup.Jsoup;
import org.jsoup.Connection;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NRankExpandSearchDataService {
    @Autowired
    UserService userService;

    @Autowired
    NRankModulePureRepository nrankModulePureRepo;

    @Autowired
    NRankRkeywPureRepository nrankRkeywPureRepo;

    @Autowired
    NRankELogRepository nrankELogRepo;

    @Autowired
    NRankEFailLogRepository nrankEFailLogRepo;

    @Autowired
    DateService dateService;

    public String checkAddModuleAble(HttpServletRequest request){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return "USER_INVALID";
        }
        int moduleCount = nrankModulePureRepo.countByUser(user.getId(), EXIST_OR_NOT.IS_EXIST);
        String userRole = user.getRole();
        if(userRole.equals("ROLE_USER") && moduleCount>=3){
            return "OVER_LIMIT";
        }else if(userRole.equals("ROLE_TEST") && moduleCount>=6){
            return "OVER_LIMIT";
        }

        return "SUCCESS";
    }

	public NRankModuleJRkeywRes1DTO getModulesAndKeywordsAll(HttpServletRequest request) {
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        NRankModuleJRkeywRes1DTO res = new NRankModuleJRkeywRes1DTO();
        if(user==null){
            res.setMessage("USER_INVALID");
            return res;
        }
        List<NRankModuleGet1DTO> moduleDtos = convModulesEntitiesToDtos(nrankModulePureRepo.selectAllByUser(user.getId(), EXIST_OR_NOT.IS_EXIST));
        for(NRankModuleGet1DTO moduleDto : moduleDtos){
            List<NRankRkeywGet1DTO> rkeywDtos = convRkeywEntitsToDtos(nrankRkeywPureRepo.selectAllByUserAndModule(user.getId(), moduleDto.getId(), EXIST_OR_NOT.IS_EXIST));
            moduleDto.setKeywords(rkeywDtos);
        }
        res.setMessage("SUCCESS");
        res.setModule(moduleDtos);
        return res;
        
    }
    
    public List<NRankModuleGet1DTO> convModulesEntitiesToDtos(List<NRankModulePureEntity> entities){
        List<NRankModuleGet1DTO> dtos = new ArrayList<>();
        for(NRankModulePureEntity entity : entities){
            NRankModuleGet1DTO dto = new NRankModuleGet1DTO();
            dto.setId(entity.getNrankModuleId());
            dto.setCreatedAt(entity.getNrankModuleCreatedAt());
            dto.setUpdatedAt(entity.getNrankModuleUpdatedAt());
            dto.setTotalSize(entities.size());
            dtos.add(dto);
        }
        return dtos;
    }

    public List<NRankRkeywGet1DTO> convRkeywEntitsToDtos(List<NRankRkeywPureEntity> entities){
        List<NRankRkeywGet1DTO> dtos = new ArrayList<>();
        for(NRankRkeywPureEntity entity : entities){
            NRankRkeywGet1DTO dto = new NRankRkeywGet1DTO();
            dto.setId(entity.getNrankRkeywId());
            dto.setModuleId(entity.getNrankModuleId());
            dto.setKeyword(entity.getNrankRkeywKeyword());
            dto.setShopName(entity.getNrankRkeywShopName());
            dto.setCreatedAt(entity.getNrankRkeywCreatedAt());
            dto.setUpdatedAt(entity.getNrankRkeywUpdatedAt());
            dto.setTotalSize(entities.size());
            dtos.add(dto);
        }
        return dtos;
    }

	public String checkAddKeywordAble(HttpServletRequest request, NRankAddKeywordReq1DTO reqData) {
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            return "USER_INVALID";
        }
        int regKeywordCount = nrankRkeywPureRepo.countByUserAndModule(user.getId(), reqData.getModuleId(), EXIST_OR_NOT.IS_EXIST);
        String userRole = user.getRole();
        if(userRole.equals("ROLE_USER") && regKeywordCount>=5){
            return "OVER_LIMIT";
        }
		return "SUCCESS";
	}

	public NRankSearchRes1DTO getRankByModule(HttpServletRequest request, NRankModuleGet1DTO reqDto) {
        NRankSearchRes1DTO searchRes = new NRankSearchRes1DTO();

        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user==null){
            searchRes.setMessage("USER_INVALID");
            searchRes.setSearchList(new ArrayList<>());
            return searchRes;
        }

        List<NRankRkeywPureEntity> keywordEntities = nrankRkeywPureRepo.selectAllByUserAndModule(user.getId(), reqDto.getId(), EXIST_OR_NOT.IS_EXIST);

        List<NRankItemRes1DTO> mergedItemList = new ArrayList<>();
        for(NRankRkeywPureEntity keywordData : keywordEntities){
            Optional<NRankELogEntity> logEntityOpt = nrankELogRepo.selectOneBykeywordId(keywordData.getNrankRkeywId());
            if(logEntityOpt.isPresent()){
                logEntityOpt.ifPresent(r->{
                    r.setNrankELogSearchCount(r.getNrankELogSearchCount()+1);
                    nrankELogRepo.save(r);
                });
            }else{
                NRankELogEntity logEntity = makeKeywordToELogEntity(keywordData);
                nrankELogRepo.save(logEntity);
            }

            boolean canContinue = true;
            NRankItemRes1DTO itemList = new NRankItemRes1DTO();
            itemList.setItemList(new ArrayList<>());
            for(int c = 1; c<=3; c++){
                NRankItemRes1DTO itemRes1Dto = searchRankByCrawling(keywordData, c);
                if(itemRes1Dto.getMessage().equals("SUCCESS")){
                    itemList.setMessage("SUCCESS");
                    itemList.setModuleId(keywordData.getNrankModuleId());
                    itemList.setKeyword(keywordData.getNrankRkeywKeyword());
                    itemList.setShopName(keywordData.getNrankRkeywShopName());
                    itemList.getItemList().addAll(itemRes1Dto.getItemList());
                }else{
                    canContinue = false;
                    break;
                }
            }
            itemList.setTotalSize(itemList.getItemList().size());
            
            if(canContinue == false){
                searchRes.setMessage("FAILURE");
                searchRes.setSearchList(new ArrayList<>());
                return searchRes;
            }
            mergedItemList.add(itemList);
        }
        searchRes.setMessage("SUCCESS");
        searchRes.setSearchList(mergedItemList);
        return searchRes;
    }
    
    private NRankItemRes1DTO searchRankByCrawling(NRankRkeywPureEntity keywordEntity, int pag){
        String crawlingUrl = "https://search.shopping.naver.com/search/all?frm=NVSHATC&origQuery="
                + keywordEntity.getNrankRkeywKeyword() + "&pagingIndex=" + pag + "&pagingSize=100&productSet=total&query="
                + keywordEntity.getNrankRkeywKeyword() + "&sort=rel&timestamp=&viewType=list";
        String USER_AGENT1 = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36";
        NRankItemRes1DTO res1dto = new NRankItemRes1DTO();
        try {
            Thread.sleep(200);
        } catch (InterruptedException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        try {
            Document doc = Jsoup.connect(crawlingUrl).header("Content-Type", "application/json;charset=UTF-8")
                    .userAgent(USER_AGENT1).method(Connection.Method.GET).ignoreContentType(true).get();
            Elements contents = doc.select("script[id=__NEXT_DATA__]");
            Element element = contents.get(0);
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObj = (JSONObject) jsonParser.parse(element.childNode(0).toString());
            String page = jsonObj.get("page").toString();
            // System.out.println(page + " : " + page.equals("/too-many-request"));
            if(page.equals("/too-many-request")){
                res1dto.setMessage("TOO_MANY_REQUEST");
                res1dto.setItemList(new ArrayList<>());
                NRankEFailLogEntity failLogEntity = makeKeywordEntityToFailLogEntity(keywordEntity);
                nrankEFailLogRepo.save(failLogEntity);
                return res1dto;
            }
            JSONObject propsJson = (JSONObject) jsonObj.get("props");
            JSONObject pagePropsJson = (JSONObject) propsJson.get("pageProps");
            JSONObject initialStateJson = (JSONObject) pagePropsJson.get("initialState");
            JSONObject productsJson = (JSONObject) initialStateJson.get("products");
            JSONArray itemsJsonArr = (JSONArray) productsJson.get("list");
            // System.out.println(itemsJsonArr.size());
            List<NRankItemGet1DTO> itemList = makeRankList(itemsJsonArr, keywordEntity.getNrankRkeywShopName(), keywordEntity.getNrankRkeywKeyword());
            res1dto.setMessage("SUCCESS");
            res1dto.setItemList(itemList);
        } catch (IOException | ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return res1dto;
    }

    private List<NRankItemGet1DTO> makeRankList(JSONArray itemListJson, String shopName, String keyword){
        List<NRankItemGet1DTO> nrankItems = new ArrayList<>();
        for( int i = 0 ; i < itemListJson.size(); i++){
            JSONObject itemJson = (JSONObject)((JSONObject)itemListJson.get(i)).get("item");
            if(itemJson.get("mallName").equals(shopName) && itemJson.get("adId")==null){
                NRankItemGet1DTO nrankItem = new NRankItemGet1DTO();
                
                String id = itemJson.get("id").toString();
                String productTitle = itemJson.get("productTitle").toString();
                String mallName = itemJson.get("mallName").toString();
                String price = itemJson.get("price").toString();
                String imageUrl = itemJson.get("imageUrl").toString();
                String reviewCountSum = itemJson.get("reviewCountSum").toString();
                String mallProductId = itemJson.get("mallProductId").toString();
                String mallProductUrl = itemJson.get("mallProductUrl").toString();
                String mallPcUrl = itemJson.get("mallPcUrl").toString();
                String rank = itemJson.get("rank").toString();
                int pageNum = (int) Math.ceil(Double.parseDouble(rank) / 40);
                int rankInPage = Integer.parseInt(rank)%40 == 0 ? 40 : Integer.parseInt(rank)%40;
                String shoppingPageUrl = "https://search.shopping.naver.com/search/all?frm=NVSHATC&origQuery="+ keyword + "&pagingIndex=" + pageNum + "&pagingSize=40&productSet=total&query="+ keyword + "&sort=rel&timestamp=&viewType=list";
                // System.out.println(itemJson.get("mallName") + "-"+itemJson.get("productTitle")+" : "+itemJson.get("rank").toString() + "위 " + pageNum + "page " + rankInPage+"번째");
                nrankItem.setId(id);
                nrankItem.setProductTitle(productTitle);
                nrankItem.setMallName(mallName);
                nrankItem.setPrice(price);
                nrankItem.setImageUrl(imageUrl);
                nrankItem.setReviewCountSum(reviewCountSum);
                nrankItem.setMallProductId(mallProductId);
                nrankItem.setMallProductUrl(mallProductUrl);
                nrankItem.setMallPcUrl(mallPcUrl);
                nrankItem.setRank(rank);
                nrankItem.setPageNum(pageNum);
                nrankItem.setRankInPage(rankInPage);
                nrankItem.setShoppingPageUrl(shoppingPageUrl);
                nrankItems.add(nrankItem);
            }
        }
        return nrankItems;
    }

    private NRankEFailLogEntity makeKeywordEntityToFailLogEntity(NRankRkeywPureEntity keywordEntity){
        NRankEFailLogEntity entity = new NRankEFailLogEntity();
        entity.setUserId(keywordEntity.getUserId());
        entity.setNrankModuleId(keywordEntity.getNrankModuleId());
        entity.setNrankRkeywId(keywordEntity.getNrankRkeywId());
        entity.setNrankEFailLogKeyword(keywordEntity.getNrankRkeywKeyword());
        entity.setNrankEFailLogShopName(keywordEntity.getNrankRkeywShopName());
        entity.setNrankEFailLogCreatedAt(dateService.getCurrentDate());
        entity.setNrankEFailLogUpdatedAt(dateService.getCurrentDate());
        return entity;
    }

    private NRankELogEntity makeKeywordToELogEntity(NRankRkeywPureEntity keywordEntity){
        NRankELogEntity logEntity = new NRankELogEntity();
        logEntity.setUserId(keywordEntity.getUserId());
        logEntity.setNrankModuleId(keywordEntity.getNrankModuleId());
        logEntity.setNrankRkeywId(keywordEntity.getNrankRkeywId());
        logEntity.setNrankELogKeyword(keywordEntity.getNrankRkeywKeyword());
        logEntity.setNrankELogShopName(keywordEntity.getNrankRkeywShopName());
        logEntity.setNrankELogSearchCount(0);
        logEntity.setNrankELogUpdatedAt(dateService.getCurrentDate());
        logEntity.setNrankELogCreatedAt(dateService.getCurrentDate());
        return logEntity;
    }
}
