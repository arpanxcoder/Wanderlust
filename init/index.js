const mongoose  = require("mongoose");
const initData = require("./data.js");

const Listing = require("../models/listing.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
 main()
    .then(()=>{
     console.log("connected to the DB");
 }).catch((err)=>{
      console.log(err);
 });

async function main() {
    await mongoose.connect(MONGO_URL);
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