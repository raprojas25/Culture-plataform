import axios from "axios";
/*
const API_BASE_URL = "http://localhost:3000/api";

const roleApi = {
  // Obtener todas las categorías
  getAll: async () => {
    const response = await axios.get(`${API_BASE_URL}/roles`);
    return response.data;
  },

  // Obtener una categoría por ID
  getById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/roles/${id}`);
    return response.data;
  },

  // Crear nueva categoría
  create: async (roleData) => {
    const response = await axios.post(`${API_BASE_URL}/roles`, roleData);
    return response.data;
  },

  // Actualizar categoría
  update: async (id, roleData) => {
    const response = await axios.put(`${API_BASE_URL}/roles/${id}`, roleData);
    return response.data;
  },

  // Eliminar categoría
  delete: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/roles/${id}`);
    return response.data;
  },
};

export default roleApi;
*/
import apiClient from './apiClient';

export const rolesApi = {
  // Obtener todas las categorías
  getAll: () => apiClient.get('/roles'),
  
  // Obtener una categoría por ID
  getById: (id) => apiClient.get(`/roles/${id}`),
  
  // Crear nueva categoría
  create: (roleData) => 
    apiClient.post('/roles', roleData),
  
  // Actualizar categoría
  update: (id, roleData) => 
    apiClient.put(`/roles/${id}`, roleData),
  
  // Eliminar categoría
  delete: (id) => apiClient.delete(`/roles/${id}`),
  
  // Obtener eventos por categoría
  getEvents: (roleId, params = {}) =>
    apiClient.get(`/categories/${roleId}/events`, { params }),
};

export default rolesApi;
