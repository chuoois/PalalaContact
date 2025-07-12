const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String },
        picture: { type: String },
        status: {
            type: String,
            enum: ['Active', 'Suspended', 'Pending'],
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