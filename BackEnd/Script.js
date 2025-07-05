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
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

app.get('/test', (req, res) => {
  res.send("Running");
});

app.use("/User", require('./Routes/UserRoutes'));

server.listen(5000, () => {});


