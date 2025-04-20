const mongoose = require('mongoose');

const categorySchmea = new mongoose.Schema({
    name:{type:String, trim:true, required:true},
    description:{type:String, trim:true},
    parentCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    createdAt:{type:Date, default:Date.now}
})

module.exports = mongoose.model('Category', categorySchmea)