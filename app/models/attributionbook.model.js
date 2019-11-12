const mongoose = require('mongoose');

const AttributionbookSchema = mongoose.Schema({
    studentId: String,
    collectionId: String,
    startDate: Date,
    endDate: Date
    

}, {
    timestamps: true
});

module.exports = mongoose.model('Attributionbook', AttributionbookSchema);