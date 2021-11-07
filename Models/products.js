const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    productsId: { type: String, required: true },
    typeproducts: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required:true },
    price:{ type:Number, required:true},
    country: { type: String, required:true},
    quantity:{type: Number, required:true},
});

module.exports = mongoose.model('products', productsSchema);