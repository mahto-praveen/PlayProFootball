import axios from 'axios';

const BASE_URL = 'http://localhost:8082/api/tournaments';

// Fetch tournaments, optionally scoped to one org
export const fetchTournaments = async (orgId, token) => {
  const url = orgId != null
    ? `${BASE_URL}?orgId=${orgId}`
    : BASE_URL;
  const response = await axios.get(url, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {}
  });
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

// Publish tournament (PUT)
export const publishTournament = async (id, token) => {
  const response = await axios.put(`${BASE_URL}/${id}/publish`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Unpublish tournament (PUT)
export const unpublishTournament = async (id, token) => {
  const response = await axios.put(`${BASE_URL}/${id}/unpublish`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

