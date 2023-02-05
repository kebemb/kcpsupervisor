const mongoose = require('mongoose');

const kcpSupervisorSchema = mongoose.Schema({
    destination: String,
    subject: String,
    copy_email:String,
    index:String,
    doc_seq_Number: Number, 
    doc_filename: String,
    batch_number: Number,
    batch_page_number: Number,
    page_count:Number,
    batch_date: String,
    file_path: String

}, {
    timestamps: true
});

module.exports = mongoose.model('kcpSupervisor', kcpSupervisorSchema);