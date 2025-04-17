const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('../config/db');
const authRoutes = require('../routes/authRoutes')
connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('✅ API working on Vercel');
  });

  const serverless = require('serverless-http');
  module.exports = serverless(app);