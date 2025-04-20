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
const updateCart = (req, res) => {
try{

}
catch(err)
{

}
}
const deleteCart = (req, res) => {
try{
        const id = req.params.id || req.query.id || req.body.id;
        if(!mongoose.isValidObjectId(id))
        {
            return res.status(404).json({message:"Invalid Product Id"})
        }
        const deleteMatchCart = Cart.findOne({id});
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