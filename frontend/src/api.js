import axios from 'axios';

// Your FastAPI backend URL
const BASE_URL = 'http://localhost:8000';

export const runDebate = async (topic) => {
  const response = await axios.post(`${BASE_URL}/debate`, {
    topic: topic
  });
  return response.data;
};