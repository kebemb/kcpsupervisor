const mongoose = require('mongoose');

const classroomSchema = mongoose.Schema({
    name: String,
    level: String,
    serie: String,
    

}, {
    timestamps: true
});

module.exports = mongoose.model('Classrooms', classroomSchema);