package com.Akashi.saloon.repository;


import com.Akashi.saloon.model.Package;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageRepository extends JpaRepository<Package, Long> {
}
