const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const welcomeController = (req, res) => {
    try
    {
        res.status(200).send("This is home page");
    }
    catch(err)
    {
        console.error("Home page error", err);
        return res.status(500).json({ message: "Home page error successfully" });
    }
}
const registerController = async (req, res) => {
    try
    {
    const {name, email, password} =  req.body;
    if (!name || !email || !password) {
        return res.status(400).send("All fields are required");
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).send("Already email available");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({name, email, password:hashPassword});
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
    }
    catch(err)
    {
        console.error("Registration Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const loginController = async (req, res) => {
    try{
    const {email, password} = req.body;
    if(!email || !password)
    {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const checkUser = await User.findOne({email});
    if (!checkUser) {
        return res.status(404).send("User not found");
    }
    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch) {
        return res.status(401).send("Invalid password");
    }
    const payload = {
        userId: checkUser._id,
        email: checkUser.email,
        role: checkUser.role
    };
    const token = jwt.sign(payload, 'color@123', {
        expiresIn: '1h'
    });
    res.status(200).json({
        message: "Login successful",
        token
    });
}
catch(err)
{
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
}
}

const resetController =  async (req, res) => {
    try
    {
    const {email, password} = req.body;
    if(!email || !password)
    {
        return res.status(400).json({ message: "Email and new password are required" });                                                                                                    
    }
        const checkUser = await User.findOne({email});
        if (!checkUser) {
            return res.status(404).json({ message: "User not found" });
        }
            checkUser.password = await bcrypt.hash(password, 10);
            checkUser.save();
            return res.status(200).json({ message: "Password updated successfully" });
    }
    catch(err)
    {
        console.error("Password Reset Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
const logoutController = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully" });
}
module.exports = {welcomeController, registerController, loginController, resetController, logoutController};