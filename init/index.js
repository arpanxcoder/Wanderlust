require("dotenv").config();
const mongoose  = require("mongoose");
const initData = require("./data.js");

const Listing = require("../models/listing.js");


const dbUrl = process.env.ATLASDB_URL;

 main()
    .then(()=>{
     console.log("connected to the DB");
 }).catch((err)=>{
      console.log(err);
 });

async function main() {
    await mongoose.connect(dbUrl);
}
const initDB = async  () =>{
     await Listing.deleteMany({});
     initData.data = initData.data.map((obj) => ({
        ...obj,
        owner :"6962f251a10a261d233d3734",
     }));
     await Listing.insertMany(initData.data);
     console.log("data was initialize");
};

initDB();