package com.sellertl.sellertool_v1.controller.router;

import javax.servlet.http.HttpServletRequest;

import com.sellertl.sellertool_v1.model.VO.UserInfoVO;
import com.sellertl.sellertool_v1.service.user.UserAuthService;
import com.sellertl.sellertool_v1.service.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class RoutingController {
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
    
    @GetMapping("/")
    public String HomePage(HttpServletRequest request, Model model){
        model.addAttribute("data", userService.getUserInfo(request));
        // CookieCsrfTokenRepository a = new CookieCsrfTokenRepository();
        // System.out.println(a.loadToken(request).getToken());
        return "views/index";
    }

    @GetMapping("/margin/dashboard")
    public String MarginCalcPage(HttpServletRequest request, Model model){
        model.addAttribute("data", userService.getUserInfo(request));
        return "views/margin/dashboard";
    }

    @GetMapping("/margin/nonmem/dashboard")
    public String MarginNonMemberPage(HttpServletRequest request, Model model){
        model.addAttribute("data", userService.getUserInfo(request));
        return "views/margin/nonmember_service/dashboard";
    }

    @GetMapping("/margin/nonmem/additem")
    public String MarginNonMemberAddPage(HttpServletRequest request, Model model){
        model.addAttribute("data", userService.getUserInfo(request));
        return "views/margin/nonmember_service/additem";
    }

    @GetMapping("/rank/naver")
    public String rankingNaverDashboard(HttpServletRequest request, Model model){
        model.addAttribute("data", userService.getUserInfo(request));
        return "views/rank/naver/dashboard";
    }

    @GetMapping(value="/calculate/vat")
    public String vatCalcualteDashboard(HttpServletRequest request, Model model) {
        model.addAttribute("data", userService.getUserInfo(request));
        return "views/calculate/vat/dashboard";
    }

    @GetMapping(value="/profile")
    public String ProfilePage(HttpServletRequest request, Model model) {
        UserInfoVO user = userService.getUserInfo(request);
        if(user == null){
            return "redirect:/";
        }

        model.addAttribute("data", user);
        return "views/user/profile";
    }

    // 프로필 업데이트 페이지
    @GetMapping(value="/profile/update")
    public String ProfileUpdatePage(HttpServletRequest request, Model model) {
        UserInfoVO user = userService.getUserInfo(request);
        if(user == null){
            return "redirect:/";
        }
        model.addAttribute("data", user);
        return "views/user/update";
    }

    // 비밀번호 변경 페이지
    @GetMapping(value="/profile/password")
    public String ProfilePasswordPage(HttpServletRequest request, Model model) {
        UserInfoVO user = userService.getUserInfo(request);
        if(user == null){
            return "redirect:/";
        }

        model.addAttribute("data", user);
        return "views/user/password";
    }

    // 회원 탈퇴 페이지
    @GetMapping(value="/profile/signout")
    public String ProfileSignoutPage(HttpServletRequest request, Model model) {
        UserInfoVO user = userService.getUserInfo(request);
        if(user == null){
            return "redirect:/";
        }

        model.addAttribute("data", user);
        return "views/user/signout";
    }

    @GetMapping("/login")
    public String LoginPage(){
        if(myEnvironment.equals("production")){
            return "redirect:"+myEnvProdMainUrl+"/login";
        }else{
            return "redirect:"+myEnvDevMainUrl+"/login";
        }
    }

    @GetMapping(value = "/error")
    public String Error404Page(){
        return "views/error/page404";
    }
    
}