const mongoose = require('mongoose');

const SupervisorSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    image: String,
    userId: String,
    

}, {
    timestamps: true
});

module.exports = mongoose.model('Supervisor', SupervisorSchema);