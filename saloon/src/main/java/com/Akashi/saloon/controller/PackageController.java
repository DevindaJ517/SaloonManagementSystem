package com.Akashi.saloon.controller;



import com.Akashi.saloon.model.Package;
import com.Akashi.saloon.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "*") // Allow frontend requests
public class PackageController {

    @Autowired
    private PackageService packageService;

    // ✅ PUBLIC: Get all packages
    @GetMapping
    public List<Package> getAllPackages() {
        return packageService.getAllPackages();
    }

    // ✅ PUBLIC: Get one package by ID
    @GetMapping("/{id}")
    public ResponseEntity<Package> getPackageById(@PathVariable Long id) {
        Optional<Package> pkg = packageService.getPackageById(id);
        return pkg.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // ✅ ADMIN: Add new package
    @PostMapping
    public ResponseEntity<Package> createPackage(@RequestBody Package pkg) {
        return ResponseEntity.ok(packageService.savePackage(pkg));
    }

    // ✅ ADMIN: Update package
    @PutMapping("/{id}")
    public ResponseEntity<Package> updatePackage(@PathVariable Long id, @RequestBody Package updated) {
        Optional<Package> optionalPackage = packageService.getPackageById(id);
        if (optionalPackage.isPresent()) {
            Package pkg = optionalPackage.get();
            pkg.setName(updated.getName());
            pkg.setDescription(updated.getDescription());
            pkg.setPrice(updated.getPrice());
            pkg.setPhotoUrl(updated.getPhotoUrl());
            return ResponseEntity.ok(packageService.savePackage(pkg));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ ADMIN: Delete package
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        packageService.deletePackage(id);
        return ResponseEntity.ok().build();
    }
}
