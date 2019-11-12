const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    image: String,
    firstName: String,
    lastName: String,
    gender: String,
    birthDate: String,
    birthAddress: String,
    address: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema);