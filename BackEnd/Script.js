const express = require('express');
const app = express();
const IsUserLoggedIn = require('./Middlewares/IsUserLoggedIn');
const cors = require('cors');
const connectDB = require('./Config/DBconnection')
require('dotenv').config();

connectDB();
app.use(cors({
    origin: 'exp://192.168.0.107:8081',
    credentials: true
  }));

const server = app.listen(5000, '192.168.0.107', () => {
    console.log('Server is running on http://192.168.0.107:5000');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
    res.send("testt good");
});

app.use("/User", require('./Routes/UserRoutes'));

