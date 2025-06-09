package com.Akashi.saloon.controller;



import com.Akashi.saloon.model.Review;
import com.Akashi.saloon.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // ✅ POST: Add a review (user must be logged in)
    @PostMapping
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        return ResponseEntity.ok(reviewService.saveReview(review));
    }

    // ✅ GET: View all reviews
    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    // ✅ GET: View reviews for a specific package
    @GetMapping("/package/{packageId}")
    public ResponseEntity<List<Review>> getReviewsByPackage(@PathVariable Long packageId) {
        return ResponseEntity.ok(reviewService.getReviewsByPackageId(packageId));
    }
}

