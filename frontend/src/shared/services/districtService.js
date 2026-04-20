import api from "../utils/api";

export const districtService = {
  getAll: async (filters) => {
    const response = await api.get("/districts", { params: filters });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/districts/${id}`);
    return response.data;
  },

  create: async (districtData) => {
    const response = await api.post("/districts", districtData);
    return response.data;
  },

  update: async (id, districtData) => {
    const response = await api.put(`/districts/${id}`, districtData);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/districts/${id}`);
  },

  getProvinces: async () => {
    const response = await api.get("/districts/provinces");
    return response.data;
  },

  getRegions: async () => {
    const response = await api.get("/districts/regions");
    return response.data;
  },

  getByProvince: async (province) => {
    const response = await api.get(`/districts/province/${province}`);
    return response.data;
  },

  getByRegion: async (region) => {
    const response = await api.get(`/districts/region/${region}`);
    return response.data;
  },

  getStatistics: async () => {
    const response = await api.get("/districts/statistics");
    return response.data;
  },

  getDistrictStatistics: async (id) => {
    const response = await api.get(`/districts/${id}/statistics`);
    return response.data;
  },
};
