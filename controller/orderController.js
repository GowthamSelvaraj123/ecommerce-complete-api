const mongoose = require('mongoose');
const Order = require('../models/orderModel');

const addOrder = async (req, res) => {
    try
    {
        const {user, items, totalAmount, status, shippingAddress, placedAt} = req.body;
        if(!user || !items || !totalAmount || !status || !shippingAddress)
        {
            return res.status(200).json({message:"The field is required"})
        }
        const newOrder = new Order({user, items, totalAmount, status, shippingAddress, placedAt});
        await newOrder.save();
        res.status(200).json({message:"Add Order Successfully"});
    }
    catch(err)
    {
        console.log(err);
        res.status(404).json({message:"Internal Server Error"});
    }
};

const editOrder = async (req, res) => {
    try
    {
        res.status(200).json({message:"Add Order Successfully"});
    }
    catch(err)
    {
        res.status(404).json({message:"Internal Server Error"});
    }
}

const deleteOrder = async (req, res) => {
    try
    {
        res.status(200).json({message:"Add Order Successfully"});
    }
    catch(err)
    {
        res.status(404).json({message:"Internal Server Error"});
    }
}

const getOrder = async (req, res) => {
    try
    {
        res.status(200).json({message:"Add Order Successfully"});
    }
    catch(err)
    {
        res.status(404).json({message:"Internal Server Error"});
    }
}

module.exports = {addOrder, editOrder, deleteOrder, getOrder};