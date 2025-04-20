const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String, required:true, minlength:6}, 
    email:{type:String, required:true, minlength:6, unique: true},
    password:{type:String, required:true, minlength:6},
    role:{type:String, enum:['user', 'admin'], default:'user'}, 
    address:String, 
    phone:String,
    createdAt:{type:Date, default:Date.now}
})
const User = mongoose.model('User', userSchema);

module.exports = User;