const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String },
            country: { type: String },
        },
        phone: { type: String },
        role: {
            type: String,
            enum: ['customer', 'admin']
        }
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
