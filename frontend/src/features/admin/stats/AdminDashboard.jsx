import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Users, 
  Tag, 
  DollarSign,
  Activity,
  Eye,
  Share2,
  Clock,
  MapPin,
  Edit2,
  Trash2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    totalUsers: 0,
    categories: 0,
    revenue: 0,
    views: 0
  });

  // Datos de ejemplo para gráficos
  const eventsData = [
    { name: 'Ene', eventos: 45, categorías: 8 },
    { name: 'Feb', eventos: 52, categorías: 10 },
    { name: 'Mar', eventos: 48, categorías: 9 },
    { name: 'Abr', eventos: 61, categorías: 12 },
    { name: 'May', eventos: 72, categorías: 14 },
    { name: 'Jun', eventos: 68, categorías: 13 }
  ];

  const categoryData = [
    { name: 'Fiestas', value: 35, color: '#ef4444' },
    { name: 'Conciertos', value: 25, color: '#3b82f6' },
    { name: 'Deportes', value: 20, color: '#10b981' },
    { name: 'Gastronomía', value: 15, color: '#f59e0b' },
    { name: 'Otros', value: 5, color: '#8b5cf6' }
  ];

  const recentEvents = [
    { id: 1, name: 'Fiesta Patronal', category: 'Fiestas', views: 1245, date: '2024-06-24' },
    { id: 2, name: 'Concierto Regional', category: 'Conciertos', views: 892, date: '2024-06-20' },
    { id: 3, name: 'Torneo Deportivo', category: 'Deportes', views: 756, date: '2024-06-18' },
    { id: 4, name: 'Festival Gastronómico', category: 'Gastronomía', views: 1103, date: '2024-06-15' },
    { id: 5, name: 'Feria Artesanal', category: 'Ferias', views: 634, date: '2024-06-12' }
  ];

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setStats({
        totalEvents: 142,
        activeEvents: 89,
        totalUsers: 1245,
        categories: 24,
        revenue: 2450,
        views: 24580
      });
    }, 1000);
  }, []);

  const statsCards = [
    {
      title: 'Eventos Totales',
      value: stats.totalEvents,
      change: '+12%',
      trend: 'up',
      icon: <Calendar className="text-blue-500" size={24} />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Eventos Activos',
      value: stats.activeEvents,
      change: '+8%',
      trend: 'up',
      icon: <Activity className="text-green-500" size={24} />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Usuarios',
      value: stats.totalUsers,
      change: '+5%',
      trend: 'up',
      icon: <Users className="text-purple-500" size={24} />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Categorías',
      value: stats.categories,
      change: '+3',
      trend: 'up',
      icon: <Tag className="text-orange-500" size={24} />,
      color: 'from-orange-500 to-yellow-500'
    },
    {
      title: 'Ingresos',
      value: `S/ ${stats.revenue.toLocaleString()}`,
      change: '+18%',
      trend: 'up',
      icon: <DollarSign className="text-red-500" size={24} />,
      color: 'from-red-500 to-orange-500'
    },
    {
      title: 'Visitas',
      value: stats.views.toLocaleString(),
      change: '+24%',
      trend: 'up',
      icon: <Eye className="text-indigo-500" size={24} />,
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Resumen general de la plataforma
          </p>
        </div>
        
        <div className="flex space-x-2 mt-4 lg:mt-0">
          {['day', 'week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg capitalize ${
                timeRange === range
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {range === 'day' ? 'Hoy' : 
               range === 'week' ? 'Semana' : 
               range === 'month' ? 'Mes' : 'Año'}
            </button>
          ))}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {statsCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color} bg-opacity-10`}>
                {card.icon}
              </div>
              <div className={`flex items-center text-sm font-medium ${
                card.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {card.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span className="ml-1">{card.change}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {card.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {card.title}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gráfico de eventos */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white">Eventos por mes</h3>
            <Share2 size={20} className="text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Bar dataKey="eventos" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="categorías" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de categorías */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white">Distribución por categoría</h3>
            <Tag size={20} className="text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Eventos recientes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-6">Eventos más populares</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Evento</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Categoría</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Visitas</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Fecha</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {recentEvents.map((event) => (
                <tr key={event.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900 dark:text-white">{event.name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      {event.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Eye size={16} className="mr-2 text-gray-400" />
                      <span className="font-medium">{event.views.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Clock size={14} className="mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-blue-600 hover:text-blue-700">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-green-600 hover:text-green-700">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-700">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
