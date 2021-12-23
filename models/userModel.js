const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    emailUser: {
        type: String,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    passwordUser: {
        type: String
    },
    confirmpasswordUser: {
        type: String
    },
    profile_picUser: {
        type: String
    },
    dateofbirthUser: {
        type: String
    },
    addressUser: {
        type: String
    },
    genderUser: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
        default: 'Male'
    },
    contactNoUser: {
        type: Number
    },
    userTypeUser:{
        type: String,
        enum : ['Worker','User'],
        default : 'User'
    }
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;