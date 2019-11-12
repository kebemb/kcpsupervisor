const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    date: String,
    classRoomId: String,
    professorId: String,
    missings: Array
    

}, {
    timestamps: true
});

module.exports = mongoose.model('Course', CourseSchema);