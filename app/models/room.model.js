const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    numRoom: String,
   
    

}, {
    timestamps: true
});

module.exports = mongoose.model('Room', RoomSchema);