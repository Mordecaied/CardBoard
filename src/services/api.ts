// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchReleaseData = async () => {
  try {
    const [progressResponse, teamsResponse, timelineResponse] = await Promise.all([
      api.get('/release/progress'),
      api.get('/teams'),
      api.get('/timeline'),
    ]);

    return {
      progress: progressResponse.data,
      teams: teamsResponse.data,
      timeline: timelineResponse.data,
    };
  } catch (error) {
    console.error('Error fetching release data:', error);
    throw error;
  }
};

export default api;