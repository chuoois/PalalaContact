const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        fullName: { type: String }, // Tự động tạo từ firstName + lastName
        email: { type: String },
        phone: { type: String, required: true, },
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            country: { type: String },
            zipCode: { type: String }
        },
        company: { type: String },
        jobTitle: { type: String },
        website: { type: String },
        birthday: { type: Date },
        notes: { type: String },
        picture: { type: String },
        tags: [{ type: String }], // Thẻ phân loại: gia đình, bạn bè, công việc, v.v.
        category: {
            type: String,
            enum: ['family', 'friends', 'work', 'business', 'other'],
            default: 'other'
        },
        isFavorite: { type: Boolean, default: false },
        status: {
            type: String,
            enum: ['Active', 'Archived', 'Blocked'],
            default: 'Active'
        },
        socialMedia: {
            facebook: { type: String },
            twitter: { type: String },
            linkedin: { type: String },
            instagram: { type: String }
        }
    },
    { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema, 'contacts');

module.exports = Contact;