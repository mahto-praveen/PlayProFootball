// src/api/tournamentAPI.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/tournaments';

// Fetch all tournaments (GET)
export const fetchTournaments = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Create tournament (POST) — needs ORG token
export const createTournament = async (data, token) => {
  const response = await axios.post(BASE_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
