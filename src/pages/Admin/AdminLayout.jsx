import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Grid3x3, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  Shield,
  TrendingUp,
  FileText,
  Tag
} from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home size={20} />,
      path: '/admin',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'categories',
      label: 'Categorías',
      icon: <Grid3x3 size={20} />,
      path: '/admin/categorias',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'events',
      label: 'Eventos',
      icon: <Calendar size={20} />,
      path: '/admin/eventos',
      color: 'from-purple-500 to-pink-500',
      badge: '12'
    },
    {
      id: 'users',
      label: 'Usuarios',
      icon: <Users size={20} />,
      path: '/admin/usuarios',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      id: 'directory',
      label: 'Directorio',
      icon: <FileText size={20} />,
      path: '/admin/directorio',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'statistics',
      label: 'Estadísticas',
      icon: <BarChart3 size={20} />,
      path: '/admin/estadisticas',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: <Settings size={20} />,
      path: '/admin/configuracion',
      color: 'from-gray-500 to-slate-600'
    }
  ];

  const stats = [
    { label: 'Eventos Activos', value: '142', change: '+12%', icon: <Calendar />, color: 'text-blue-500' },
    { label: 'Categorías', value: '24', change: '+3', icon: <Grid3x3 />, color: 'text-green-500' },
    { label: 'Usuarios', value: '1,245', change: '+5%', icon: <Users />, color: 'text-purple-500' },
    { label: 'Visitas Hoy', value: '2,458', change: '+18%', icon: <TrendingUp />, color: 'text-orange-500' }
  ];

  const handleLogout = () => {
    // Lógica de logout
    console.log('Cerrando sesión...');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header móvil */}
      <header className="lg:hidden sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-300"
            >
              <Menu size={24} />
            </button>
            <Link to="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Shield className="text-white" size={20} />
              </div>
              <span className="font-bold text-gray-800 dark:text-white">Admin</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-600 dark:text-gray-300">
              <Bell size={20} />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Desktop */}
        <motion.aside
          initial={false}
          animate={{ width: isSidebarOpen ? 280 : 80 }}
          className={`hidden lg:flex flex-col h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 sticky top-0`}
        >
          {/* Logo y título */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Shield className="text-white" size={24} />
                  </div>
                  <div>
                    <h1 className="font-bold text-gray-800 dark:text-white">Admin Panel</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">CulturaViva</p>
                  </div>
                </motion.div>
              )}
              
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                {isSidebarOpen ? <ChevronRight size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Menú */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className={`${isActive ? 'text-white' : ''}`}>
                    {item.icon}
                  </div>
                  {isSidebarOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 flex items-center justify-between"
                    >
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-1 bg-white/20 text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer del sidebar */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1"
                >
                  <p className="font-medium text-gray-800 dark:text-white">Administrador</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">admin@culturaviva.com</p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.aside>

        {/* Contenido principal */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Header desktop */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Panel de administración de CulturaViva
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-red-500">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <LogOut size={18} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                    {stat.icon}
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contenido de la página */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Sidebar móvil */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50"
          >
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="absolute inset-y-0 left-0 w-72 bg-white dark:bg-gray-800"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <Shield className="text-white" size={24} />
                    </div>
                    <div>
                      <h1 className="font-bold text-gray-800 dark:text-white">Admin Panel</h1>
                      <p className="text-xs text-gray-500 dark:text-gray-400">CulturaViva</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                        isActive
                          ? `bg-gradient-to-r ${item.color} text-white`
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto px-2 py-1 bg-white/20 text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;
