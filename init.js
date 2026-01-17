const mongoose = require("mongoose");
const Listing = require("./models/listing"); // make sure the path is correct
const { data: sampleListings } = require("./init/data"); // adjust if your file name/path is different

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // your DB name

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("✅ Connected to MongoDB");
}

main()
  .then(async () => {
    await Listing.deleteMany({});
    console.log("🗑️ Deleted all existing listings");

    await Listing.insertMany(sampleListings);
    console.log("🌱 Sample listings added successfully");

    mongoose.connection.close();
    console.log("🔌 Connection closed");
  })
  .catch((err) => {
    console.error("❌ Error seeding data:", err);
  });
