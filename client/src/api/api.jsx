import axios from "axios";

const API_BASE_URL = 'http://localhost:8000/api';

export const createContent = async (token, formData) => {
  return await axios.post(`${API_BASE_URL}/content-upload-images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`, 
    },
  });
};

export const getContents = async (token) => {
  return await axios.get(`${API_BASE_URL}/getcontent`, {
    headers: {
      'Authorization': `Bearer ${token}`, 
    },
  });
};

export const updateContent = async (token, id, formData) => {
  return await axios.put(`${API_BASE_URL}/content/${id}`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`, 
    },
  });
};

export const deleteContent = async (token, id) => {
  return await axios.delete(`${API_BASE_URL}/delete/content/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`, 
    },
  });
};