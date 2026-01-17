const Listing = require("../models/listing");

module.exports.index = async(req, res) => {
    const allListing= await Listing.find({});
    res.render("listings/index", { allListing });

};


module.exports.renderNewForm = (req, res )=>{

   res.render("listings/new");
};

module.exports.showListings = async (req,res) =>{
    let {id} = req.params;
   const listing =  await Listing.findById(id)
   .populate("owner")
   .populate({ path : "reviews",
         populate : {
            path : "author",
         },
   });
   


   if(!listing){
     req.flash("error", "Listing you are requested for does not exist");
      return res.redirect("/listings");
   }
      console.log(listing)
   res.render("listings/show", { listing });

};

module.exports.createListings = async (req, res) => {
    const listing = new Listing(req.body.listing);
     listing.owner = req.user._id;
    
    listing.image = {
        filename: req.file.filename,
        url: req.file.path,
    }

    await listing.save();

    req.flash("success", "New listing created!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.renderEditform = async (req, res) =>{
         let {id} = req.params;
        const listing =  await Listing.findById(id);
         req.flash("success", "Listing edited");
         if(!listing){
          req.flash("error", "Listing you are requested for does not exist");
           return res.redirect("/listings");
        }

        let orignalImageUrl = listing.image.url;
        orignalImageUrl = orignalImageUrl.replace("/upload", "/upload/h_300,w_250");
        res.render("listings/edit", {listing, orignalImageUrl});
     
     };


module.exports.updateListings = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  listing.set(req.body.listing);

  if (typeof req.file !== "undefined") {
    listing.image = {
      filename: req.file.filename,
      url: req.file.path,
    };
  }

  // 4. save once
  await listing.save();

  req.flash("success", "Listing updated");
  res.redirect(`/listings/${id}`);
};


module.exports.destroyListings = async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
     req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};