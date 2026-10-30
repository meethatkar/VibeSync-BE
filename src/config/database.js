const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Databased connected");
  } catch (error) {
    console.log("Error in Database conenction", error);
  }
}

module.exports = connectToDb;
