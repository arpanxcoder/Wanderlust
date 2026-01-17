const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ref } = require("joi");
const reviews = require("./reviews");

  
const listingSchema = new Schema({
    title : {
        type:String,
        required : true,
    }, 
    description: String, 
    image: {
      filename: String,
      url:String,
  
  },
    price : Number , 
    location : String ,
    country : String,

    // schema for reviews
    reviews : [
      {
        type : Schema.Types.ObjectId,
        ref: "Review" ,
      },
    ],
    // schema for owner (schema for identity of the person)
    owner :
     {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
     },
    

});

listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing) {
      await reviews.deleteMany({ _id: { $in : listing.reviews}});
    }
});

const Listing = mongoose.model("listing", listingSchema);
module.exports= Listing;