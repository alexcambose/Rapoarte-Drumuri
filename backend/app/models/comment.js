const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = mongoose.model('Comment', new Schema({
    content: String,
    user_id: String,
    report_id: String,
    useful: { type: Array, default: []},
    reports: { type: Array, default: []},
    created_at: { type: Date, default: Date.now },
}));