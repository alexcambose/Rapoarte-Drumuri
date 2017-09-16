const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = mongoose.model('Report', new Schema({
    title: String,
    description: String,
    location: String,
    severity: Number,
    type: String,
    user_id: String,
    images: Array,
    views: { type: Number, default: 0},
    useful: { type: Number, default: 0},
    reports: { type: Number, default: 0},
    created_at: { type: Date, default: Date.now },
}));