const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String
    },
    confirmpassword: {
        type: String
    },
    profile_pic: {
        type: String
    },
    dateofbirth: {
        type: String
    },
    address: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
        default: 'Male'
    },
    contactNo: {
        type: Number
    },
    userType:{
        type: String,
        enum : ['Worker','User'],
        default : 'User'
    }
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;