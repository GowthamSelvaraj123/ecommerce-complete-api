const Category = require('../models/categoryModel');
const mongoose = require('mongoose');
const addCategory = async (req, res) => {
    try
    {
        const {name, description } = req.body;
        if(!name || !description)
        {
            return res.status(200).json({message:"The Field is required"});
        }
        const existCategory = await Category.findOne({ name:name})
        if(existCategory){
            return res.status(200).json({message:"This is already category"});
        }
        const addCategory = new Category({ name: name.trim(), description: description.trim() });
        await addCategory.save();
        return res.status(200).json({message:"Category added successfully"})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
const editCategory = async (req, res) => {
    try
    {
        const id = req.params.id || req.body.id || req.query.id;
        const {name} =  req.body;
        if (!id || !name) {
            return res.status(400).json({ message: "ID and Name are required for update." });
        }
        const updateCategory = await Category.findByIdAndUpdate(id, {name: name.trim()}, {new:true});
        if (!updateCategory) {
            return res.status(404).json({ message: "Category not found." });
        }
        return res.status(200).json({message:"Category Updated Successfully"});
    }
    catch(err){
        console.error("Error updating category:", err);
        return res.status(500).json({message:"Internal Server Error"});
    }
}
const deleteCategory = async (req, res) => {
    try
    {
        const id = req.params.id || req.body.id || req.query.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid Product ID" });
        }
        const deleteCategory = await Category.findByIdAndDelete(id);
        if (!deleteCategory) {
            return res.status(404).json({ message: "Category not found." });
        }
        return res.status(200).json({message:"Category Deleted Successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(200).json({message:"Internal Server Error"});
    }
}
const getCategory = async (req, res) => {
    try
    {
        const category = await Category.find();
        return res.status(200).json({message:"Category Read Successfully", data:category});
    }
    catch(err){
        console.log(err);
        return res.staus(200).json({message:"Internal Server Error"});
    }
}

module.exports = {addCategory, editCategory, deleteCategory, getCategory}