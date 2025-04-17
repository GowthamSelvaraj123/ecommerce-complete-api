const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://gowthamdeveloper94:j4MrbOibMJIwFzsQ@cluster0.beikt.mongodb.net/test').then(() => console.log('Connected !')).catch((err) => console.log(err));
}

module.exports = connectDB;