const mongoose = require('mongoose');

const UserProfile = new mongoose.Schema({
    student_name: {
        type: String,
        required: true
    },
    student_age: {
        type: String,
    },
    student_dob: {
        type: String,
    },
    student_email: {
        type: String,
        required: true
    },
    student_profile: {
        type: Array
    },
    student_id: {
        type: String
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

const UserDetail = mongoose.model("UserProfile", UserProfile)

module.exports = UserDetail;