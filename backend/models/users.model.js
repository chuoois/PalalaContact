const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        address: {
            street: { type: String },
            city: { type: String },
            country: { type: String },
        },
        phone: { type: String },
        picture: { type: String },
        status: {
            type: String,
            enum: ['Active', 'Inactive', 'Pending'],
        },
        role: {
            type: String,
            enum: ['user', 'admin']
        }
    },
    { timestamps: true }
);

const Users = mongoose.model('Users', userSchema, 'users');

module.exports = Users;