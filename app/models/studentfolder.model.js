const mongoose = require('mongoose');

const StudentfolderSchema = mongoose.Schema({
    studentId: String,
    notes: String,
  
    

}, {
    timestamps: true
});

module.exports = mongoose.model('Studentfolder', StudentfolderSchema);