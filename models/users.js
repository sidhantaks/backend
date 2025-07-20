const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    } 
});

const User = mongoose.model('User', userSchema);
module.exports = User;