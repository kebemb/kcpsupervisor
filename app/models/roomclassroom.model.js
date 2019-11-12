const mongoose = require('mongoose');

const RoomclassroomSchema = mongoose.Schema({
    classRoomId: String,
    roomId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Roomclassroom', RoomclassroomSchema);