const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
require('dotenv').config;
connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', authRoutes);
app.use('/admin/products/', productRoutes);
app.use('/admin/categories/', categoryRoutes);
app.use('/admin/orders/', orderRoutes);
app.use('/admin/cart/', cartRoutes);
app.use('/admin/payment/', paymentRoutes);
app.get('/', (req, res) => {
    res.send('✅ API working on Vercel');
  });
  
app.listen(process.env.PORT); 