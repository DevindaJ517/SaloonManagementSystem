package com.Akashi.saloon.config;

import com.Akashi.saloon.model.User;
import com.Akashi.saloon.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.*;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Map<String, Object> attributes = oAuth2User.getAttributes();
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");

        userRepository.findByEmail(email).ifPresentOrElse(
                existingUser -> {
                    // Optionally update user name/provider if needed
                    existingUser.setName(name);
                    existingUser.setAuthProvider("google");
                    userRepository.save(existingUser);
                },
                () -> {
                    User newUser = User.builder()
                            .email(email)
                            .name(name)
                            .role("USER")
                            .authProvider("google")
                            .build();
                    userRepository.save(newUser);
                }
        );

        return oAuth2User;
    }
}
