import axios from 'axios'
// const baseURL = "http://localhost:4000/api";

export const register = async (userData) => {
    try {
        const res = await axios.post(`/auth/register`, userData)
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const login = async (userData) => {
    try {
        const res = await axios.post('/auth/login', userData)
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const logout = async () => {
    try {
        const res = await axios.get('/auth/logout')
        return res.data;
    } catch (error) {
        return null;
    }
}

export const validateUser = async () => {
    try {
        const res = await axios.get('/auth/validateUser')
        return res.data;
    } catch (error) {
        return console.error(error.response.data);
    }
}