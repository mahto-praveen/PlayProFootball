import axios from 'axios';

const API_BASE = 'http://localhost:8081/api/auth';

export const loginAPI = async (credentials) => {
  const res = await axios.post(`${API_BASE}/login`, credentials);
  return res.data;
};

export const registerAPI = async (data) => {
  const res = await axios.post(`${API_BASE}/register`, data);
  return res.data;
};
