import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/contact',
    headers: {
        'Content-Type': 'application/json',
    },
});

const contactService = {
    getContactbyUserId: async (params = {}) => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            throw new Error('No token found');
        }

        const response = await api.get(`/list`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params
        });
        return response.data;
    },

    getContactdetails: async (id) => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            throw new Error('No token found');
        }

        const response = await api.get(`/details/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    },

    togleFavorite: async (id) => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            throw new Error('No token found');
        }

        const response = await api.put(`/toggle-favorite/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    },

    deleteContact: async (id, userId) => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            throw new Error('No token found');
        }

        const response = await api.delete(`/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: { userId }
        });
        return response.data;
    },

    createContact: async (contactData) => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            throw new Error('No token found');
        }

        const response = await api.post(`/create`, contactData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    },

    updateContact: async (id, contactData) => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            throw new Error('No token found');
        }

        const response = await api.put(`/update/${id}`, contactData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    },
};

export default contactService;