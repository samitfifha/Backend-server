const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique : true},
    password: { type: String, required:true},
    phone: { type: String, required:true },
    adress: { type: String, required:true},
    role: { type:String, required:false},
    image: {
        type:String,
        required:false
    },
    token: { type:String},
    panier:[{
        type:String,
        required:false,
        
    }]
});

module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}