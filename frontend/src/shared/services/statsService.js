import api from "../utils/api";

/**
 * Servicio para estadísticas y métricas de usuarios
 */
export const statsService = {
  /**
   * Obtiene métricas generales de usuarios
   * @returns {Promise<{totalUsers: number, activeUsers: number, inactiveUsers: number, newUsersThisMonth: number, roleDistribution: Array, growthRate: number}>}
   */
  getUserMetrics: async () => {
    const response = await api.get("/stats/users/metrics");
    return response.data;
  },

  /**
   * Obtiene datos de crecimiento de usuarios por período
   * @param {Object} params
   * @param {'day' | 'week' | 'month' | 'year'} params.period - Período de agrupación
   * @param {string} [params.startDate] - Fecha de inicio (YYYY-MM-DD)
   * @param {string} [params.endDate] - Fecha de fin (YYYY-MM-DD)
   * @returns {Promise<Array<{date: string, count: number, label: string}>>}
   */
  getUserGrowth: async (params = {}) => {
    const response = await api.get("/stats/users/growth", { params });
    return response.data;
  },

  /**
   * Obtiene distribución de usuarios por rol
   * @returns {Promise<Array<{role: string, count: number, percentage: number}>>}
   */
  getUsersByRole: async () => {
    const response = await api.get("/stats/users/by-role");
    return response.data;
  },

  /**
   * Obtiene actividad reciente de usuarios
   * @param {number} [limit=10] - Número de registros a obtener
   * @returns {Promise<Array<{id: string, username: string, action: string, timestamp: string, ip: string}>>}
   */
  getRecentActivity: async (limit = 10) => {
    const response = await api.get("/stats/users/recent-activity", {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Obtiene usuarios con más actividad
   * @param {number} [limit=10] - Número de registros a obtener
   * @returns {Promise<Array<{id: string, username: string, loginCount: number, lastLogin: string}>>}
   */
  getMostActiveUsers: async (limit = 10) => {
    const response = await api.get("/stats/users/most-active", {
      params: { limit },
    });
    return response.data;
  },
};
