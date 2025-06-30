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

    signupGoogle: async (token) => {
        const response = await api.post('/signup-google', { token });
        return response;
    },
};

export default authService;
