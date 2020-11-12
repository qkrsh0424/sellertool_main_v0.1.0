package com.sellertl.sellertool_v1.controller.router;

import javax.servlet.http.HttpServletRequest;

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
    public String ProfitDashboard(HttpServletRequest request, Model model){
        UserInfoVO user = userService.getUserInfo(request);
        if(user == null){
            return "/views/profit/loginError.html";
        }
        model.addAttribute("data", user);
        return "/views/profit/dashboard.html";
    }

    @GetMapping("/profit/add/classify")
    public String ProfitAddClassify(HttpServletRequest request, Model model){
        UserInfoVO user = userService.getUserInfo(request);
        if(user == null){
            return "/views/profit/loginError.html";
        }
        model.addAttribute("data", user);
        return "/views/profit/addClassify.html";
    }

    @GetMapping("/profit/manage/classify")
    public String ProfitManageClassify(HttpServletRequest request, Model model){
        UserInfoVO user = userService.getUserInfo(request);
        if(user == null){
            return "/views/profit/loginError.html";
        }
        model.addAttribute("data", user);
        return "/views/profit/manageClassify.html";
    }

    @GetMapping("/profit/add/item")
    public String ProfitAddItem(HttpServletRequest request, Model model){
        UserInfoVO user = userService.getUserInfo(request);
        if(user == null){
            return "/views/profit/loginError.html";
        }
        model.addAttribute("data", user);
        return "/views/profit/addItem_ty.html";
    }
}