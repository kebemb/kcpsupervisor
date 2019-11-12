const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    login: String,
    password: String,
    profil: String,
    

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);