const mongoose = require('mongoose');

const ProfessorSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    image: String,
    speciality: String,
    userId: String,
    

}, {
    timestamps: true
});

module.exports = mongoose.model('Professor', ProfessorSchema);