const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js"); 
const{listingSchema,reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const reviewController = require("../controllers/review.js");

// review validation 

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body); // Use reviewSchema for validation
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

// Review 

// post routes 
router.post("/", validateReview,wrapAsync(reviewController.createReview));

// delete review route 

router.delete("/:reviewId", wrapAsync(reviewController.destroyReview)
);

module.exports = router;