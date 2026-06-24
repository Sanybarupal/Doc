const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bio: {
        type: String,
    },
    avatar: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    address: {
        type: String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
