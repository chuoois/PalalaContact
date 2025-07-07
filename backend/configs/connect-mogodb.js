const mongoose = require('mongoose');
const { env } = require('./environment');

const connectDB = async () => {
    try {
        await mongoose.connect(`${env.MONGODB_URL}`);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = connectDB;