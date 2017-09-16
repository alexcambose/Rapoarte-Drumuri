const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    username: { type: String, unique: true },
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    points: { type: Number, default: 0 },
	profile_image: { type: String, default: '' },
	car: { type: String, default: '' },
	address: { type: String, default: '' },
	county: { type: String, default: '' },
	phone: { type: String, default: '' },
	sex: { type: Number, default: 1 },
	birthday: { type: Object, default: '' },
    password: String,
    created_at: { type: Date, default: Date.now },
}));