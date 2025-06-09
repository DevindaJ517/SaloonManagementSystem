package com.Akashi.saloon.config;

import com.Akashi.saloon.security.JwtUtil;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String token = jwtUtil.generateToken(email);

        // Option 1: Redirect with token in URL (for frontend to grab and store)
        response.sendRedirect("http://localhost:5173/oauth2/success?token=" + token);

        // Option 2: Or respond with token directly (uncomment to use JSON response)
        /*
        response.setContentType("application/json");
        response.getWriter().write("{\"token\": \"" + token + "\"}");
        response.getWriter().flush();
        */
    }
}

