import axios from 'axios';

const API_URL =` ${import.meta.env.VITE_API_URL}/api/tasks`;

export const getTasks = async () => {
  return axios.get(API_URL);
};

export const createTask = async (task) => {
  return axios.post(API_URL + '/create', task);
};

export const updateTask = async (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteTask = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};