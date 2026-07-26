import api from "@/shared/utils/api";

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Credenciales incorrectas",
      );
    }
  },
  // login: async (credentials) => {
  //   const response = await api.post("/auth/login", credentials);
  //   return response.data;
  // },
  //
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response?.data?.error || "Error al registrar");
    }
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  refreshToken: async () => {
    const response = await api.post("/auth/refresh-token");
    return response.data;
  },

  // funciones que no sirven

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};
