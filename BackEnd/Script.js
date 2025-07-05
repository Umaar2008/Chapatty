const express = require('express');
const app = express();
const cors = require('cors');
const { Server } = require('socket.io'); 
const { createServer } = require('http'); 
const connectDB = require('./Config/DBconnection');
require('dotenv').config();

connectDB();

const server = createServer(app); 

app.use(cors({
  origin: `${process.env.FRONT_END_URL}`,
  credentials: true
}));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

app.use("/User", require('./Routes/UserRoutes'));

server.listen(process.env.PORT, () => {});


