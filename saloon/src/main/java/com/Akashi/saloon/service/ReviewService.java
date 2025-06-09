package com.Akashi.saloon.service;



import com.Akashi.saloon.model.Review;
import com.Akashi.saloon.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public List<Review> getReviewsByPackageId(Long packageId) {
        return reviewRepository.findByPackageId(packageId);
    }
}
