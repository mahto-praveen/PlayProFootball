import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTeams = (params = {}) => api.get('/teams', { params });
export const getTeamDetails = (id) => api.get(`/teams/${id}`);
export const createTeam = (team) => api.post('/teams', team);
export const updateTeam = (id, team) => api.put(`/teams/${id}`, team);
export const deleteTeam = (id) => api.delete(`/teams/${id}`);

export const getPlayers = () => api.get('/players');
export const getPlayerById = (id) => api.get(`/players/${id}`);
export const addPlayerToTeam = (player) => api.post('/players', player);
export const assignPlayerToTeam = (playerId, teamId) => api.put(`/players/${playerId}/assign/${teamId}`);

export const getCities = () => api.get('/cities');

export default api;