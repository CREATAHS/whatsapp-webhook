const mongoose = require('mongoose');

const UserProfile = new mongoose.Schema({
    user_id: {
        type: String
    },
    profile: {
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
});

const UserProfileUpdate = mongoose.model("StudentProfile", UserProfile)

module.exports = UserProfileUpdate;