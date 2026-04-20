import React from 'react';
import { Calendar, Users, Tag, TrendingUp } from 'lucide-react';
// import { StatsCards } from '../../components/features/StatsCards';
import { useAuthStore } from '../../stores/authStore';

export const Dashboard = () => {
  const { user } = useAuthStore();

  const stats = [
    {
      title: 'Eventos Activos',
      value: '24',
      change: '+12%',
      icon: Calendar,
      color: 'blue',
    },
    {
      title: 'Usuarios Registrados',
      value: '156',
      change: '+8%',
      icon: Users,
      color: 'green',
    },
    {
      title: 'Categorías',
      value: '12',
      change: '+2',
      icon: Tag,
      color: 'purple',
    },
    {
      title: 'Ingresos Mensuales',
      value: 'S/ 4,820',
      change: '+23%',
      icon: TrendingUp,
      color: 'orange',
    },
  ];

  return (
    <div className="space-y-6 px-4 py-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Hola, {user?.username} 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Bienvenido al panel de control de Cultura Platform
        </p>
      </div>

      {/* <StatsCards stats={stats} /> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Actividad Reciente
          </h2>
          <div className="space-y-4">
            {[
              { user: 'Ana García', action: 'creó un nuevo evento', time: 'Hace 5 min' },
              { user: 'Carlos López', action: 'actualizó su perfil', time: 'Hace 15 min' },
              { user: 'María Torres', action: 'comentó en un evento', time: 'Hace 30 min' },
              { user: 'Pedro Sánchez', action: 'registró un nuevo usuario', time: 'Hace 1 hora' },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <div>
                  <p className="text-gray-900 dark:text-white">
                    <span className="font-semibold">{activity.user}</span>{' '}
                    {activity.action}
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Estadísticas Rápidas
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Eventos este mes
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                12
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Nuevos usuarios
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                8
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Eventos destacados
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                3
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Tasa de conversión
              </span>
              <span className="font-semibold text-green-600">24.5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

