const mongoose = require('mongoose');

const CommandeSchema = mongoose.Schema({
    command: String,
    clientFirstName: String,
    clientLastName: String,
    date: String,
    address: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Commande', CommandeSchema);