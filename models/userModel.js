const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    emailUser: {
        type: String
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
    phoneUser: {
        type: String
    },
    userTypeUser:{
        type: String,
        enum : ['Worker','User'],
        default : 'User'
    }
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;