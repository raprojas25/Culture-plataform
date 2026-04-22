import api from "../utils/api";

export const userService = {
  getAll: async (filters) => {
    const response = await api.get("/users", { params: filters });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  create: async (userData) => {
    const response = await api.post("/users", userData);
    return response.data;
  },

  update: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/users/${id}`);
  },

  updatePassword: async (id, userData) => {
    const response = await api.put(`/users/${id}/password`, userData);
    return response.data;
  },

  deactivate: async (id, userData) => {
    const response = await api.put(`/users/${id}/deactivate`, userData);
    return response.data;
  },
};
