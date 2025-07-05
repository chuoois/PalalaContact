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

    verifyEmail: async (token, email) => {
        const response = await api.get('/verify-email', {
            params: { token, email }
        });
        return response;
    }
};

export default authService;