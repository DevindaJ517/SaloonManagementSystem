package com.Akashi.saloon.repository;


import com.Akashi.saloon.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByPackageId(Long packageId);
}
