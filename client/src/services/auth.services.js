import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

const authService = {
    signup: async (data) => {
        const response = await api.post('/signup', data);
        return response;
    },

    signupGoogle: async (tokenGoogle) => {
        const response = await api.post('/signup-google', {
            tokenId: tokenGoogle
        });
        return response;
    },

    signin: async (data) => {
        const response = await api.post('/signin', data);
        return response;
    },

    signinGoogle: async (tokenGoogle) => {
        const response = await api.post('/signin-google', {
            idToken: tokenGoogle
        });
        return response;
    },

    sendOTP: async (email) => {
        const response = await api.post('/send-otp', {
            email: email
        });
        return response;
    },

    verifyOTP: async (email, otp) => {
        const response = await api.post('/verify-otp', {
            email: email,
            otp: otp
        });
        return response;
    },

    forgotPassword: async (email) => {
        const response = await api.post('/forgot-password', {
            email: email
        });
        return response;
    },
};

export default authService;