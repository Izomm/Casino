// src/api/auth.ts
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const authApi = {
  login: async (data: { username: string; password: string }) => {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  },
  
  register: async (data: { username: string; email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  },
  
  logout: async () => {
    const response = await axios.post(`${API_URL}/auth/logout`);
    return response.data;
  },
  
};