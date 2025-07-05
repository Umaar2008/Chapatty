const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MY_MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,   
      useUnifiedTopology: true 
    });
  } catch (err) {
    process.exit(1); 
  }
};

module.exports = connectDB;
