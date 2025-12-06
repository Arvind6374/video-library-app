import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/videos';

export const fetchAllVideos = () => axios.get(API_BASE);
export const fetchVideoById = (id) => axios.get(`${API_BASE}/${id}`);
export const createVideo = (data) => axios.post(API_BASE, data);
export const updateVideo = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteVideo = (id) => axios.delete(`${API_BASE}/${id}`);

// search
export const searchVideos = (q) =>
  axios.get(`${API_BASE}/search`, { params: { q } });
