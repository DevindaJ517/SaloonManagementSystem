package com.Akashi.saloon.service;



import com.Akashi.saloon.model.Package;
import com.Akashi.saloon.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PackageService {

    @Autowired
    private PackageRepository packageRepository;

    public List<Package> getAllPackages() {
        return packageRepository.findAll();
    }

    public Optional<Package> getPackageById(Long id) {
        return packageRepository.findById(id);
    }

    public Package savePackage(Package pkg) {
        return packageRepository.save(pkg);
    }

    public void deletePackage(Long id) {
        packageRepository.deleteById(id);
    }
}
