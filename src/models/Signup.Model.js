const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const Signup = new mongoose.Schema({
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile_no: {
        type: Number,
    },
    token: {
        type: String
    },
    account_verification:{
        type:String
    },
    is_active: {
        type: Number,
        default: 1
    },
    is_deleted: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

Signup.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_KEY
    );
    user.token = token;
    await user.save()
    return token;
}


const User_Signup = mongoose.model("SignUp", Signup);


module.exports = User_Signup 