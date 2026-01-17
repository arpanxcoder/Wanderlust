const Listing = require("../models/listing");
const Review = require("../models/reviews")

module.exports.createreview = async (req, res) => {
    console.log(req.params.id);
    let listings = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);

    listings.reviews.push(newReview);

    await newReview.save();
    await listings.save();
     req.flash("success", "new Review Created !");

    res.redirect(`/listings/${listings._id}`);
};

module.exports.destroyReview = async (req, res ) =>{
    let {id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId} });
    await Review.findByIdAndDelete(reviewId);
     req.flash("success", "review deleted !");
    res.redirect(`/listings/${id}`);
};