const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    typeproducts: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required:true },
    price:{ type:String, required:true},
    quantity:{type: String, required:true},
});

module.exports = mongoose.model('product', productsSchema);
module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}