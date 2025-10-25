const mongoose = require("mongoose");

const dbconnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/VotingApp");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};



module.exports = dbconnection;
