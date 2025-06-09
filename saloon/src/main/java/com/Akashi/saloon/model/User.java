
package com.Akashi.saloon.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private String role; // "USER", "ADMIN", "EMPLOYEE"

    private boolean oauthUser = false; // if login via Google/Facebook
}

