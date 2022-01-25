const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    workerName: {
        type: String
    },
    workerEmail: {
        type: String,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    workerPassword: {
        type: String
    },
    workerProfile_pic: {
        type: String
    },
    workerDateOfBirth: {
        type: String
    },
    workerAddress: {
        type: String
    },
    workerGender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
        default: 'Male'
    },
    workerContactNo: {
        type: String
    },
});

const Workers = mongoose.model('Worker', workerSchema);

module.exports = Workers;