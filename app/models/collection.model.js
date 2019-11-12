const mongoose = require('mongoose');

const CollectionSchema = mongoose.Schema({
    collectionName: String,
    booksCount: Number,
    collectionImage: String,
    leve: String,
    

}, {
    timestamps: true
});

module.exports = mongoose.model('Collection', CollectionSchema);