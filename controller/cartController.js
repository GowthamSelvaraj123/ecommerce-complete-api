const mongoose = require('mongoose');
const Cart = require('../models/cartModel');

const addCart = async (req, res) => {
try{
    const {user, items} = req.body;
    if(!user || !items)
    {
        return res.status(404).json({message:"The field is required"})
    }
    const newCart = new Cart({user, items});
    await newCart.save();
    return res.status(200).json({message:"Cart Added Successfully"});
}
catch(err)
{
    console.log(err);
    return res.status(200).json({message:"Internal Server Error"});
}
}
const getCart = async(req, res) => {
try
{
    const cartItems = await Cart.find();
    if(!cartItems)
    {
        return res.status(404).json({message:"The Empty Data"});
    }
    return res.status(200).json({message:"Get cart Items Successfully", data:cartItems});
}
catch(err)
{
console.log(err);
return res(404).json({message:"Internal server error"})
}
}
const updateCart = async (req, res) => {
try{
    const id = req.params.id || req.query.id || req.body.id;
    const {user, items} = req.body;
    if (!user && !items) {
        return res.status(400).json({ message: "No update data found" });
      }
    const updateFields = {};
    if (user) updateFields.user = user;
    if (items) updateFields.items = items;
    updateFields.updatedAt = new Date();
    const updateCardData = await Cart.findByIdAndUpdate(id, updateFields, {new:true});
    if(!updateCardData)
    {
        return res.status(400).json({message:"Data is not found"});
    }
    return res.status(200).json({message:"Cart Updated Successfully"});

}
catch(err)
{
    console.error("Error updating cart:", err);
    return res.status(500).json({message:"Internal Server Error"});
}
}
const deleteCart = async (req, res) => {
try{
        const id = req.params.id || req.query.id || req.body.id;
        if(!mongoose.isValidObjectId(id))
        {
            return res.status(404).json({message:"Invalid Product Id"})
        }
        const deleteMatchCart = await Cart.findByIdAndDelete(id);
        if(!deleteMatchCart)
        {
            return res.status(404).json({message:"Invalid match data"});
        }
        return res.status(200).json({message:"The Delete Cart Successfully"})
}
catch(err)
{
        console.log(err);
        return res.status(404).json({message:"The internal server error"});
}
}

module.exports = {addCart, getCart, updateCart, deleteCart}