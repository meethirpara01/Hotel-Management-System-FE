import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
});

export const login = async ({ email, password }) => {
    const response = await api.post('/login', { email, password });
    return response.data;
}

export const register = async ({ name, email, password, role, phone, ProfilePic }) => {

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("phone", phone);
    formData.append("PROPIC", ProfilePic);

    const response = await api.post('/register', formData);
    return response.data;
}

export const getMe = async () => {
    const response = await api.get('/get-me');    
    return response.data;
}

export const logout = async () => {
    const response = await api.get('/logout');    
    return response.data;
}