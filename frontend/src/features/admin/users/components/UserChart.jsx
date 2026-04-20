import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

/**
 * @typedef {'day' | 'week' | 'month' | 'year'} GrowthPeriod
 */

/**
 * @typedef {Object} UserChartProps
 * @property {Array<{date: string, count: number, label: string}>} [data] - Datos de crecimiento
 * @property {(params: {period: GrowthPeriod}) => void} [onPeriodChange] - Callback al cambiar período
 * @property {boolean} [loading] - Estado de carga
 */

/**
 * Componente de gráfico de crecimiento de usuarios
 *
 * @param {UserChartProps} props
 * @returns {JSX.Element}
 */
export const UserChart = ({ data = [], onPeriodChange, loading = false }) => {
  const [period, setPeriod] = useState("month");

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    onPeriodChange?.({ period: newPeriod });
  };

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.map((item) => ({
      name: item.label || item.date,
      usuarios: item.count,
      fecha: item.date,
    }));
  }, [data]);

  const totalGrowth = useMemo(() => {
    if (chartData.length === 0) return 0;
    return chartData.reduce((sum, item) => sum + item.usuarios, 0);
  }, [chartData]);

  const periodOptions = [
    { value: "day", label: "Día" },
    { value: "week", label: "Semana" },
    { value: "month", label: "Mes" },
    { value: "year", label: "Año" },
  ];

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4" />
        <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white/90">
            Crecimiento de Usuarios
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {totalGrowth} nuevos usuarios en el período seleccionado
          </p>
        </div>

        {/* Período selector */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {periodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handlePeriodChange(option.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  period === option.value
                    ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient
                id="colorUsuarios"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#ef4444"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="#ef4444"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(0,0,0,0.05)"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(0,0,0,0.5)", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(0,0,0,0.5)", fontSize: 12 }}
              dx={-10}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
              formatter={(value) => [`${value} usuarios`, "Registros"]}
            />
            <Area
              type="monotone"
              dataKey="usuarios"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#colorUsuarios)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer stats */}
      {chartData.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-4 h-4" />
              <span>Tendencia de registros</span>
            </div>
            <div className="text-right">
              <span className="text-gray-500 dark:text-gray-400">
                Promedio:{" "}
              </span>
              <span className="font-semibold text-gray-800 dark:text-white/90">
                {Math.round(totalGrowth / chartData.length)} por período
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
