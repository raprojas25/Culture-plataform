/*
import apiClient from './apiClient';

export const categoriesApi = {
  // Obtener todas las categorías
  getAll: () => apiClient.get('/categories'),
  
  // Obtener una categoría por ID
  getById: (id) => apiClient.get(`/categories/${id}`),
  
  // Crear nueva categoría
  create: (categoryData) => 
    apiClient.post('/categories', categoryData),
  
  // Actualizar categoría
  update: (id, categoryData) => 
    apiClient.put(`/categories/${id}`, categoryData),
  
  // Eliminar categoría
  delete: (id) => apiClient.delete(`/categories/${id}`),
  
  // Obtener eventos por categoría
  getEvents: (categoryId, params = {}) =>
    apiClient.get(`/categories/${categoryId}/events`, { params }),
};

// Función específica para crear categoría con validación
export const createCategory = async (categoryData) => {
  try {
    // Validación adicional antes de enviar
    if (!categoryData.name || !categoryData.icon || !categoryData.color) {
      throw new Error('Datos incompletos');
    }
    
    // Formatear datos para el backend
    const formattedData = {
      name: categoryData.name.trim(),
      description: categoryData.description?.trim() || '',
      icon: categoryData.icon,
      color: categoryData.color,
      // Campos adicionales si el backend los requiere
      // isActive: true,
      // order: 0, // Se puede calcular dinámicamente
    };
    
    const response = await categoriesApi.create(formattedData);
    return response;
  } catch (error) {
    console.error('Error en createCategory:', error);
    throw error;
  }
};
*/
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const categoryApi = {
  // Obtener todas las categorías
  getAll: async () => {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  },

  // Obtener una categoría por ID
  getById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
    return response.data;
  },

  // Crear nueva categoría
  create: async (categoryData) => {
    const response = await axios.post(`${API_BASE_URL}/categories`, categoryData);
    return response.data;
  },

  // Actualizar categoría
  update: async (id, categoryData) => {
    const response = await axios.put(`${API_BASE_URL}/categories/${id}`, categoryData);
    return response.data;
  },

  // Eliminar categoría
  delete: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/categories/${id}`);
    return response.data;
  },

  // Cambiar estado de categoría
  toggleStatus: async (id, isActive) => {
    const response = await axios.patch(`${API_BASE_URL}/categories/${id}/status`, {
      is_active: isActive
    });
    return response.data;
  }
};

export default categoryApi;
