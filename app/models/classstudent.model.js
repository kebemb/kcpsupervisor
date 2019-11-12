const mongoose = require('mongoose');

const ClassstudentSchema = mongoose.Schema({
    classRoomId: String,
    studentId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Classstudent', ClassstudentSchema);