import { Badge } from "@/shared/components/ui/Badge";
import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useMemo } from "react";

/**
 * @typedef {Object} UserStatsCardsProps
 * @property {Object} [metrics] - Métricas de usuarios
 * @property {number} [metrics.totalUsers] - Total de usuarios
 * @property {number} [metrics.activeUsers] - Usuarios activos
 * @property {number} [metrics.inactiveUsers] - Usuarios inactivos
 * @property {number} [metrics.newUsersThisMonth] - Nuevos usuarios este mes
 * @property {number} [metrics.growthRate] - Tasa de crecimiento (%)
 * @property {boolean} [loading] - Estado de carga
 */

/**
 * Componente de tarjetas de estadísticas para usuarios
 *
 * @param {UserStatsCardsProps} props
 * @returns {JSX.Element}
 */
export const UserStatsCards = ({ metrics, loading = false }) => {
  const statsCards = useMemo(() => {
    const growthRate = metrics?.growthRate || 0;
    const isPositiveGrowth = growthRate >= 0;

    return [
      {
        title: "Total Usuarios",
        value: metrics?.totalUsers ?? 0,
        icon: Users,
        iconBg: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        subtitle: "Usuarios registrados",
        trend: {
          value: `${Math.abs(growthRate)}%`,
          isPositive: isPositiveGrowth,
        },
      },
      {
        title: "Usuarios Activos",
        value: metrics?.activeUsers ?? 0,
        icon: UserCheck,
        iconBg: "bg-green-100 dark:bg-green-900/30",
        iconColor: "text-green-600 dark:text-green-400",
        subtitle: "Actualmente activos",
        trend: null,
      },
      {
        title: "Usuarios Inactivos",
        value: metrics?.inactiveUsers ?? 0,
        icon: UserX,
        iconBg: "bg-red-100 dark:bg-red-900/30",
        iconColor: "text-red-600 dark:text-red-400",
        subtitle: "Cuentas inactivas",
        trend: null,
      },
      {
        title: "Nuevos este Mes",
        value: metrics?.newUsersThisMonth ?? 0,
        icon: UserPlus,
        iconBg: "bg-purple-100 dark:bg-purple-900/30",
        iconColor: "text-purple-600 dark:text-purple-400",
        subtitle: "Registro este mes",
        trend: {
          value: `${Math.abs(growthRate)}%`,
          isPositive: isPositiveGrowth,
        },
      },
    ];
  }, [metrics]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 animate-pulse"
          >
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
      {statsCards.map((stat) => (
        <div
          key={stat.title}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all hover:shadow-lg"
        >
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-xl ${stat.iconBg}`}
          >
            <stat.icon className={`size-6 ${stat.iconColor}`} />
          </div>

          <div className="mt-5">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {stat.title}
            </span>
            <h4 className="mt-1 font-extrabold text-gray-800 text-2xl dark:text-white/90">
              {stat.value.toLocaleString("es-ES")}
            </h4>

            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {stat.subtitle}
              </span>
              {stat.trend && (
                <Badge
                  variant={stat.trend.isPositive ? "success" : "danger"}
                  size="sm"
                  leftIcon={stat.trend.isPositive ? TrendingUp : TrendingDown}
                >
                  {stat.trend.value}
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
