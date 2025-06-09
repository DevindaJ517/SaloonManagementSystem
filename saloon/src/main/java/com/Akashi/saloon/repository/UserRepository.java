// repository/UserRepository.java
package com.Akashi.saloon.repository;

import com.Akashi.saloon.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
