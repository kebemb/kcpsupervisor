const mongoose = require('mongoose');

const CommandeSchema = mongoose.Schema({
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

module.exports = mongoose.model('Commande', CommandeSchema);