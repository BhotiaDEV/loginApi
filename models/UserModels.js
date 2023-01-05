const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:Number,
    role:String
})

mongoose.model('users',userSchema);
module.exports = mongoose.model('users')