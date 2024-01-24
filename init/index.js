// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//   .then(() => {
//     console.log("connected to db");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//   await Listing.deleteMany({});
//   initData.data = initData.data.map((obj) => ({
//     ...obj,
//     owner: "65324c7137d6844f18c312a3",
//   }));
//   await Listing.insertMany(initData.data);
//   console.log("data was intilized");
// };

// initDB();


if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
  }
  const mongoose = require("mongoose");
  const initData = require("./data.js");
  const Listing = require("../models/listing.js");
  
  // const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
  const DB_URL = process.env.ATLASDB_URL;
  main()
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => console.log(err));
  
  async function main() {
    //   await mongoose.connect(MONGO_URL);
    await mongoose.connect(DB_URL);
  }
  
  const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "65326f898945d63e510e2655",
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
  };
  initDB();
  
  