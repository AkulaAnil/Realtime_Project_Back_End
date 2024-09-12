const mongoose = require('mongoose');

const USER_SCHEMA = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"]
    },
    full_name: {
        type: String,
        required: [true, "username is required"]
    },
    email: {
        type: String,
        required: [true, "username is required"]
    },
    password: {
        type: String,
        required: [true, "username is required"]
    },
    mobile: {
        type: String,
        required: [true, "username is required"]
    },
    is_admin: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("users", USER_SCHEMA);