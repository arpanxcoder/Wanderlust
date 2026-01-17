const Listing = require("../models/listing.js");
const express = require("express");
const router = express.Router();
const expressError = require("../Utils/expressErrors.js");
const wrapAsync = require("../Utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});


router
  .route("/")
              // index route
  .get(wrapAsync(listingController.index))

             // create route 
  .post(
     isLoggedIn,
    upload.single("image"),
     validateListing, 
     wrapAsync(listingController.createListings)
    );


// new route 
  router.get("/new", isLoggedIn, listingController.renderNewForm);



router.route("/:id")
              // show route  
  .get((listingController.showListings))
              // update route 
  .put(
      isLoggedIn,
      isOwner,
      upload.single("image"),
      validateListing,
      wrapAsync(listingController.updateListings))
              // delete route 
  .delete(isLoggedIn,isOwner,  wrapAsync(listingController.destroyListings));


// edit route 
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditform));
module.exports = router;