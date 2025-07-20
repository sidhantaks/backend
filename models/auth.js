const mongoose = require('mongoose');
const authSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    } 
});

const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;