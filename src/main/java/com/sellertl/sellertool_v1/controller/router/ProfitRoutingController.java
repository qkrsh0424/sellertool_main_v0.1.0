package com.sellertl.sellertool_v1.controller.router;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sellertl.sellertool_v1.model.VO.UserInfoVO;
import com.sellertl.sellertool_v1.service.user.UserAuthService;
import com.sellertl.sellertool_v1.service.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class ProfitRoutingController {
    @Value("${app.environment}")
    private String myEnvironment;

    @Value("${app.environment.development.auth.url}")
    private String myEnvDevMainUrl;

    @Value("${app.environment.production.auth.url}")
    private String myEnvProdMainUrl;
    
    @Autowired
    UserAuthService userAuthService;

    @Autowired
    UserService userService;

    @GetMapping("/profit")
    public String ProfitDashboard(HttpServletRequest request, HttpServletResponse response, Model model){
        UserInfoVO user = userService.getUserInfo(request);
        if(user == null){
            return "/views/profit/loginError.html";
        }
        String userROLE = user.getRole();
        String uuid1 = UUID.randomUUID().toString();
        String uuid2 = UUID.randomUUID().toString();
        if(userROLE.equals("ROLE_ADMIN") || userROLE.equals("ROLE_MEMBER")){
            try {
                Cookie rolemem = new Cookie("ATHRU", uuid1);
                Cookie roleok = new Cookie("ATHO", sha256(uuid1 + uuid2));
                response.addCookie(rolemem);
                response.addCookie(roleok);
                model.addAttribute("ru", uuid2);
            } catch (NoSuchAlgorithmException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }else{
            Cookie rolemem = new Cookie("ATHRU", "0");
            Cookie roleok = new Cookie("ATHO", "0");
            response.addCookie(rolemem);
            response.addCookie(roleok);
        }
        model.addAttribute("data", user);
        
        
        return "/views/profit/dashboard_ty_v2.html";
    }

    @GetMapping("/profit/add/item")
    public String ProfitAddItem(HttpServletRequest request, Model model){
        UserInfoVO user = userService.getUserInfo(request);
        if(user == null){
            return "/views/profit/loginError.html";
        }
        model.addAttribute("data", user);
        return "/views/profit/addItem_ty2.html";
    }

    @GetMapping("/profit/sell/dashboard")
    public String ProfitSellDashboard(HttpServletRequest request, Model model){
        UserInfoVO user = userService.getUserInfo(request);
        if(user == null){
            return "/views/profit/loginError.html";
        }
        model.addAttribute("data", user);
        return "/views/profit/sellDashboard_ty.html";
    }

    @GetMapping("/profit/manage/item")
    public String ProfitManageItem(HttpServletRequest request, Model model){
        UserInfoVO user = userService.getUserInfo(request);
        if(user == null){
            return "/views/profit/loginError.html";
        }
        model.addAttribute("data", user);
        return "/views/profit/manageItem_ty.html";
    }

    /**
     * SHA-256으로 해싱하는 메소드
     * 
     * @param bytes
     * @return
     * @throws NoSuchAlgorithmException 
     */
    public static String sha256(String msg) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(msg.getBytes());
        
        return bytesToHex(md.digest());
    }
 
 
    /**
     * 바이트를 헥스값으로 변환한다
     * 
     * @param bytes
     * @return
     */
    public static String bytesToHex(byte[] bytes) {
        StringBuilder builder = new StringBuilder();
        for (byte b: bytes) {
          builder.append(String.format("%02x", b));
        }
        return builder.toString();
    }
}