const mongoose = require('mongoose');

const CensorSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    image: String,
    userId: String,
    

}, {
    timestamps: true
});

module.exports = mongoose.model('Censor', CensorSchema);