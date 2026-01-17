const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../Utils/wrapAsync.js");
const expressError = require("../Utils/expressErrors.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const{validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// reviews

// post route 
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createreview));
// delete review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));


module.exports = router;

