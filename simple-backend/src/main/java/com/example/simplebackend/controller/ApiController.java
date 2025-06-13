package com.example.simplebackend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class ApiController {

    @GetMapping("/api/hello")
    public String hello() {
        return "Hello from backend!";
    }

    @PostMapping("/api/auth/register")
    public ResponseEntity<String> register(@RequestBody Map<String, Object> userData) {
        System.out.println("Received registration request: " + userData);
        // For demonstration, just check if email and password are present
        if (userData.get("email") == null || userData.get("password") == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email and password are required");
        }
        // Here you would add logic to save the user to the database
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/api/auth/login")
    public ResponseEntity<String> login(@RequestBody Map<String, Object> loginData) {
        System.out.println("Received login request: " + loginData);
        if (loginData.get("email") == null || loginData.get("password") == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email and password are required");
        }
        // For demonstration, accept any login and return a dummy token
        String dummyToken = "dummy-jwt-token";
        return ResponseEntity.ok(dummyToken);
    }
}
