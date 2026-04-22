import api from "../utils/api";

export const categoriesService = {
  // getAll: async (includeInactive = false) => {
  //   const response = await api.get('/categories', {
  //     params: { include_inactive: includeInactive },
  //   });
  //   return response.data;
  // },

  // Obtener todas las categorías
  getAll: async () => {
    const response = await api.get("/categories");
    return response.data;
  },

  // Obtener una categoría por ID
  getById: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  // Crear nueva categoría
  create: async (categoryData) => {
    const response = await api.post("/categories", categoryData);
    return response.data;
  },

  // Actualizar categoría
  update: async (id, categoryData) => {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  // Eliminar categoría
  delete: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },

  // Cambiar estado de categoría
  toggleStatus: async (id, isActive) => {
    const response = await api.put(`/categories/${id}/status`, {
      is_active: isActive,
    });
    return response.data;
  },
};
