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
        owner :"696b8edddbfd00a3afb0e9e4",
     }));
     await Listing.insertMany(initData.data);
     console.log("data was initialize");
     mongoose.connection.close();

};

initDB();