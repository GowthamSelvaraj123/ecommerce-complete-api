const mongoose = require('mongoose');

const addCart = (req, res) => {
try{
    const {user, items} = req.body;
    if(!user || !items)
    {
        return res.status(404).json({message:"The field is required"})
    }

}
catch(err)
{

}
}
const getCart = (req, res) => {
try
{

}
catch(err)
{

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

}
catch(err)
{

}
}

module.exports = {addCart, getCart, updateCart, deleteCart}