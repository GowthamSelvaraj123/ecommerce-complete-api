const mongoose = require('mongoose');
require('dotenv').config;
const connectDB = async () => {
    await mongoose.connect(process.env.DB_URI).then(() => console.log('Connected !')).catch((err) => console.log(err));
}

module.exports = connectDB;