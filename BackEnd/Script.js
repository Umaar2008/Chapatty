const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./Config/DBconnection');
require('dotenv').config();

connectDB();

app.use(cors({
  origin: `${process.env.FRONT_END_URL}`,
  credentials: true
}));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

app.use("/User", require('./Routes/UserRoutes'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
//umar//