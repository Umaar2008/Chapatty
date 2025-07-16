const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MY_MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
