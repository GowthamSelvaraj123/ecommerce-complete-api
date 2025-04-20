const Product = require('../models/productModel');
const mongoose = require('mongoose');
const addProduct = async (req, res) => 
{
    try{
        const { name, slug, description, category, subCategory, price, discountPrice, stock, brand, images, sku, isFeatured, isAvailable, tags } = req.body;
        if(!name || !description || !category || !price || !stock)
        {
            return res.status(400).json({ message: "Required fields are missing." });
        }
        if(slug && slug !== slug.toLowerCase())
        {
            return res.status(400).json({ message: "Product slug must be in lowercase." });
        }
        const existProduct = await Product.findOne({name});
        const newProduct = new Product({ name, slug, description, category, subCategory, price, discountPrice, stock, brand, images, sku, isFeatured, isAvailable, tags });
        await newProduct.save();
        return res.status(201).json({ message: "Product added successfully!", product: newProduct });
    }
    catch(err)
    {
        console.error("Error while adding product:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const editProduct = async (req, res) => {
    try
    {
        const id = req.params.id || req.body.id || req.query.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid Product ID" });
        }
        const updatedData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({message: "Product updated successfully",data: updatedProduct});
    }
    catch(err)
    {
        console.error("Error while edit product:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteProduct = async (req, res) => {
    try
    {
        const id = req.params.id || req.body.id || req.query.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid Product ID" });
        }
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({message: "Product deleted successfully", data: deletedProduct});
    }
    catch(err)
    {
        console.error("Error while deleting product:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getProduct = async (req, res) => {
    try
    {
       const products = await Product.find();
       res.status(200).json({message: "Products fetched successfully",data: products});
    }
    catch(err)
    {
        console.error("Error while adding product:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {addProduct, editProduct, getProduct, deleteProduct};