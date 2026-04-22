import api from "../utils/api";

export const eventService = {
  getEvents: async (filters) => {
    const response = await api.get("/events", { params: filters });
    return response.data;
  },

  getEventById: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await api.post("/events", eventData);
    return response.data;
  },

  updateEvent: async (id, eventData) => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  },

  updateEventStatus: async (id, status) => {
    const response = await api.patch(`/events/${id}/status`, { status });
    return response.data;
  },

  deleteEvent: async (id) => {
    await api.delete(`/events/${id}`);
  },

  likeEvent: async (id) => {
    const response = await api.post(`/events/${id}/like`);
    return response.data;
  },

  unlikeEvent: async (id) => {
    await api.delete(`/events/${id}/like`);
  },

  getUserLikes: async (userId, page = 1, limit = 10) => {
    const response = await api.get(`/events/user/${userId}/likes`, {
      params: { page, limit },
    });
    return response.data;
  },

  getUpcomingEvents: async (limit = 5) => {
    const response = await api.get("/events/upcoming", { params: { limit } });
    return response.data;
  },

  getFeaturedEvents: async () => {
    const response = await api.get("/events/featured");
    return response.data;
  },
};
