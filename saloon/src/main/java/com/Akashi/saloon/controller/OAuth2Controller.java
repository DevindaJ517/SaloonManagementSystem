package com.Akashi.saloon.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/oauth2")
public class OAuth2Controller {

    @GetMapping("/success")
    public String success(@AuthenticationPrincipal OAuth2User user) {
        String email = user.getAttribute("email");
        String name = user.getAttribute("name");
        return "Login successful! Welcome " + name + " (" + email + ")";
    }

    @GetMapping("/failure")
    public String failure() {
        return "OAuth2 login failed.";
    }
}
