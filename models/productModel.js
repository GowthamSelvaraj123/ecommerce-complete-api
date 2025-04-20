const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name:{type:String, trim:true, required:true}, 
        slug: { type: String, unique: true, lowercase: true, trim: true },
        description: { type: String, required: true },
        images: [{ type: String }],
        brand: { type: String, trim: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
        subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
        price:{type:String, trim:true, required:true}, 
        discountPrice: { type: Number, default: 0 },
        stock:{type:Number, trim:true, required:true}, 
        sku: { type: String, unique: true, uppercase: true },
        isFeatured: { type: Boolean, default: false },
        isAvailable: { type: Boolean, default: true },
        ratings: { type: Number, default: 0 },
        reviews: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, comment: String, rating: Number, createdAt: { type: Date, default: Date.now } }],
        tags: [String],
    },  { timestamps: true }
)
module.exports = mongoose.model('Product', productSchema)