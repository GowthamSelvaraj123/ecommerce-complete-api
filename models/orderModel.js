const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required: true}, 
    items: [ { product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, quantity: { type: Number, required: true, min: [1, 'Quantity must be at least 1'] } } ],
    totalAmount: { type: Number, required: true, min: [0, 'Total amount cannot be negative'] },
    status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
    shippingAddress: { type: String, required: true, trim: true },
    placedAt:{type:Date, default:Date.now}
});

module.exports = mongoose.model('Order', orderSchema);