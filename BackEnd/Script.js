const express = require('express');
const app = express();
const IsUserLoggedIn = require('./Middlewares/IsUserLoggedIn');
const cors = require('cors');
const connectDB = require('./Config/DBconnection')
require('dotenv').config();
const CLIENT_URL = process.env.API_URL;
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

connectDB();
app.use(cors({
    origin: true,
    credentials: true
  }));
  
const server = app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
    res.send("testt good");
});

app.use("/User", require('./Routes/UserRoutes'));

