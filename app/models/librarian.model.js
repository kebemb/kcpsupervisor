const mongoose = require('mongoose');

const LibrarianSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    image: String,
    userId: String,
    

}, {
    timestamps: true
});

module.exports = mongoose.model('Librarian', LibrarianSchema);