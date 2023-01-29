const mongoose = require('mongoose');

const kcpSupervisorSchema = mongoose.Schema({
    dateNumeric: String,
    pli_num: Number,
    pli_name: String,
    filename: String,
    state: String,
    file_path: String

}, {
    timestamps: true
});

module.exports = mongoose.model('kcpSupervisor', kcpSupervisorSchema);