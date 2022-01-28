const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String
    },
    adminEmail: {
        type: String,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    adminPassword: {
        type: String
    },
    adminConfirmPassword: {
        type: String
    }
});

const Admins = mongoose.model('Admin', adminSchema);

module.exports = Admins;