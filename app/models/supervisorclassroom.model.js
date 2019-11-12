const mongoose = require('mongoose');

const SupervisorclassroomSchema = mongoose.Schema({
    classRoomId: String,
    supervisorId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Supervisorclassroom', SupervisorclassroomSchema);