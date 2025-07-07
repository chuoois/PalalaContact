const mongoose = require('mongoose');

const groupSchema = mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Users', 
            required: true 
        },
        name: { type: String, required: true },
        description: { type: String },
        color: { type: String, default: '#007bff' }, // Màu sắc để phân biệt nhóm
        contacts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contacts'
        }],
        isDefault: { type: Boolean, default: false },
        status: {
            type: String,
            enum: ['Active', 'Archived'],
            default: 'Active'
        }
    },
    { timestamps: true }
);

const Group = mongoose.model('Group', groupSchema, 'groups');

module.exports = Group;
