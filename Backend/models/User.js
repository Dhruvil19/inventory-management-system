const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'employee' }, // 'admin' or 'employee'
});

// Avoid overwriting the model if it already exists
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
