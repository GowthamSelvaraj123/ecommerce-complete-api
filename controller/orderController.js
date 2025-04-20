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
        res.status(200).json({message:"Order Added Successfully"});
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
        const id = req.params.id || req.query.id || req.body.id;
        if (!mongoose.isValidObjectId(id)) {
                    return res.status(400).json({ message: "Invalid Product ID" });
        }
        const order = req.body;
        const updateOrder = await Order.findByIdAndUpdate(id, order, {new:true});
        if(!updateOrder)
        {
            return res.status(200).json({message:"Order not found"});
        }
        res.status(200).json({message:"Update Order Successfully", data:updateOrder});
    }
    catch(err)
    {
        console.log(err);
        res.status(404).json({message:"Internal Server Error"});
    }
}

const deleteOrder = async (req, res) => {
    try
    {
        const id = req.params.id || req.query.id || req.body.id;
        if(!mongoose.isValidObjectId(id))
        {
            return res.status(200).json({message:"Invalid Product ID"});
        }
        const deleteOrder = await Order.findByIdAndDelete(id);
        if(!deleteOrder)
        {
            return res.status(200).json({message:"Order not found"})
        }
        res.status(200).json({message:"Order Deleted Successfully"});
    }
    catch(err)
    {
        console.log(err);
        res.status(404).json({message:"Internal Server Error"});
    }
}

const getOrder = async (req, res) => {
    try
    {
        const orders = await Order.find().populate('user', 'name email').populate('items.product', 'name price');;
        res.status(200).json({message:"List Order Successfully", data:orders});
    }
    catch(err)
    {
        console.log(err);
        res.status(404).json({message:"Internal Server Error"});
    }
}

module.exports = {addOrder, editOrder, deleteOrder, getOrder};