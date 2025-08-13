import axios from 'axios';

const BASE_URL = 'http://localhost:8082/api/tournaments';

export const fetchTournaments = async (token,orgId) => {
  console.log("Using token:", token);
  let url = BASE_URL;

  if (orgId !== null && orgId !== undefined) {
    url += `?orgId=${orgId}`;
  }
  // const url = orgId != null ? `${BASE_URL}?orgId=${orgId}` : BASE_URL;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    throw error;
  }
};

export const createTournament = async (data, token) => {
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.post(BASE_URL, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating tournament:', error);
    throw error;
  }
};

export const publishTournament = async (id, token) => {
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.put(`${BASE_URL}/${id}/publish`, {}, { headers });
    return response.data;
  } catch (error) {
    console.error('Error publishing tournament:', error);
    throw error;
  }
};

export const unpublishTournament = async (id, token) => {
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.put(`${BASE_URL}/${id}/unpublish`, {}, { headers });
    return response.data;
  } catch (error) {
    console.error('Error unpublishing tournament:', error);
    throw error;
  }
};
