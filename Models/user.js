const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required:true},
    phone: { type: String, required:true },
    adress: { type: String, required:true},
    role: { type:String, required:true},
});

module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}