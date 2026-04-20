import { useState, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";
import { statsService } from "@/shared/services/statsService";

/**
 * Hook para obtener estadísticas y métricas de usuarios
 * @param {Object} options
 * @param {boolean} [options.autoFetch=true] - Si se debe ejecutar automáticamente al montar
 * @returns {Object} Datos y funciones para estadísticas de usuarios
 */
export const useUserStats = (options = {}) => {
  const { autoFetch = true } = options;

  const [metrics, setMetrics] = useState(null);
  const [growthData, setGrowthData] = useState([]);
  const [roleDistribution, setRoleDistribution] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [mostActiveUsers, setMostActiveUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Obtiene todas las métricas de usuarios
   */
  const fetchAllMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [metricsData, roleData] = await Promise.all([
        statsService.getUserMetrics(),
        statsService.getUsersByRole(),
      ]);

      setMetrics(metricsData);
      setRoleDistribution(roleData);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Error al cargar métricas de usuarios";
      setError(errorMsg);
      console.warn("Stats endpoint not available, using fallback:", errorMsg);
      // Fallback a datos de muestra si el backend no responde
      setMetrics(getFallbackMetrics());
      setRoleDistribution(getFallbackRoleDistribution());
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtiene datos de crecimiento de usuarios
   * @param {Object} params
   */
  const fetchGrowthData = useCallback(async (params = {}) => {
    try {
      const data = await statsService.getUserGrowth(params);
      setGrowthData(data);
    } catch (err) {
      console.warn("Growth data not available, using fallback");
      setGrowthData(getFallbackGrowthData(params.period || "month"));
    }
  }, []);

  /**
   * Obtiene actividad reciente
   * @param {number} [limit=10]
   */
  const fetchRecentActivity = useCallback(async (limit = 10) => {
    try {
      const data = await statsService.getRecentActivity(limit);
      setRecentActivity(data);
    } catch (err) {
      console.warn("Recent activity not available, using fallback");
      setRecentActivity(getFallbackRecentActivity());
    }
  }, []);

  /**
   * Obtiene usuarios más activos
   * @param {number} [limit=10]
   */
  const fetchMostActiveUsers = useCallback(async (limit = 10) => {
    try {
      const data = await statsService.getMostActiveUsers(limit);
      setMostActiveUsers(data);
    } catch (err) {
      console.warn("Most active users not available, using fallback");
      setMostActiveUsers(getFallbackMostActiveUsers());
    }
  }, []);

  /**
   * Carga todos los datos de estadísticas
   */
  const fetchAll = useCallback(async () => {
    await fetchAllMetrics();
    await fetchGrowthData({ period: "month" });
    await fetchRecentActivity(10);
    await fetchMostActiveUsers(10);
  }, [fetchAllMetrics, fetchGrowthData, fetchRecentActivity, fetchMostActiveUsers]);

  useEffect(() => {
    if (autoFetch) {
      fetchAll();
    }
  }, [autoFetch, fetchAll]);

  return {
    metrics,
    growthData,
    roleDistribution,
    recentActivity,
    mostActiveUsers,
    loading,
    error,
    fetchAll,
    fetchAllMetrics,
    fetchGrowthData,
    fetchRecentActivity,
    fetchMostActiveUsers,
  };
};

// ========================
// Datos de muestra (fallback)
// ========================

function getFallbackMetrics() {
  return {
    totalUsers: 3,
    activeUsers: 2,
    inactiveUsers: 1,
    newUsersThisMonth: 1,
    growthRate: 12.5,
  };
}

function getFallbackRoleDistribution() {
  return [
    { role: "admin", count: 1, percentage: 33.3 },
    { role: "moderator", count: 2, percentage: 66.7 },
    { role: "user", count: 0, percentage: 0 },
    { role: "organizer", count: 0, percentage: 0 },
  ];
}

function getFallbackGrowthData(period = "month") {
  const labels = {
    day: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    week: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    month: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
    year: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
  };

  const counts = {
    day: [0, 1, 2, 5, 3, 2],
    week: [1, 2, 0, 3, 4, 2, 1],
    month: [3, 5, 8, 12],
    year: [2, 3, 5, 8, 12, 15, 18, 22, 25, 28, 30, 33],
  };

  return (labels[period] || labels.month).map((label, i) => ({
    date: label,
    count: (counts[period] || counts.month)[i] || 0,
    label,
  }));
}

function getFallbackRecentActivity() {
  return [
    {
      id: "1",
      username: "Root users",
      action: "Inicio de sesión",
      timestamp: new Date().toISOString(),
      ip: "192.168.1.1",
    },
    {
      id: "2",
      username: "Raúl Pocori",
      action: "Actualizó perfil",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      ip: "192.168.1.2",
    },
    {
      id: "3",
      username: "admin_user",
      action: "Cambió contraseña",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      ip: "192.168.1.3",
    },
  ];
}

function getFallbackMostActiveUsers() {
  return [
    {
      id: "1",
      username: "admin_user",
      loginCount: 45,
      lastLogin: new Date().toISOString(),
    },
    {
      id: "2",
      username: "Root users",
      loginCount: 23,
      lastLogin: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "3",
      username: "Raúl Pocori",
      loginCount: 12,
      lastLogin: new Date(Date.now() - 172800000).toISOString(),
    },
  ];
}
