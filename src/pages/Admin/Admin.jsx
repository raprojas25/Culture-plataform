import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Eye,
  Download,
  Filter,
  Search,
  MoreVertical,
  Shield,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  Clock,
  Star,
  Activity,
  PieChart,
  FileText
} from 'lucide-react'
import StatsCards from './components/StatsCards'
import EventsTable from './components/EventsTable'
import Charts from './components/Charts'
import PendingEvents from './components/PendingEvents'
import QuickActions from './components/QuickActions'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [notifications, setNotifications] = useState(3)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedEvents, setSelectedEvents] = useState([])

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: <Activity size={20} /> },
    { id: 'events', label: 'Eventos', icon: <Calendar size={20} /> },
    { id: 'users', label: 'Usuarios', icon: <Users size={20} /> },
    { id: 'reports', label: 'Reportes', icon: <FileText size={20} /> },
    { id: 'settings', label: 'Configuración', icon: <Settings size={20} /> }
  ]

  const adminMenuItems = [
    { id: 'profile', label: 'Mi Perfil', icon: <Users size={18} /> },
    { id: 'settings', label: 'Configuración', icon: <Settings size={18} /> },
    { id: 'help', label: 'Ayuda', icon: <AlertCircle size={18} /> },
    { id: 'logout', label: 'Cerrar Sesión', icon: <LogOut size={18} /> }
  ]

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  }

  const slideIn = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="text-red-600 mr-3" size={28} />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-sm text-gray-600">Control total de la plataforma</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notificaciones */}
              <button className="relative p-2 text-gray-600 hover:text-red-600">
                <Bell size={22} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Admin Menu */}
              <div className="relative group">
                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-medium">Administrador</p>
                    <p className="text-xs text-gray-500">admin@culturaviva.com</p>
                  </div>
                  <ChevronDown size={18} />
                </button>

                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 hidden group-hover:block z-50">
                  {adminMenuItems.map((item) => (
                    <button
                      key={item.id}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="border-t border-gray-200">
          <div className="px-6">
            <div className="flex space-x-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar para móviles */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-40 lg:hidden"
            >
              {/* Sidebar content */}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenido principal */}
        <main className="flex-1 p-6 overflow-x-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="space-y-6"
              >
                {/* Estadísticas rápidas */}
                <StatsCards />

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Eventos pendientes */}
                  <motion.div
                    variants={slideIn}
                    className="lg:col-span-2"
                  >
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-bold flex items-center">
                            <Clock className="mr-2 text-amber-600" size={20} />
                            Eventos Pendientes de Revisión
                          </h2>
                          <button className="text-sm text-red-600 font-medium">
                            Ver todos
                          </button>
                        </div>
                      </div>
                      <PendingEvents />
                    </div>
                  </motion.div>

                  {/* Acciones rápidas */}
                  <motion.div
                    variants={slideIn}
                  >
                    <QuickActions />
                  </motion.div>
                </div>

                {/* Gráficos */}
                <motion.div
                  variants={slideIn}
                  className="bg-white rounded-xl shadow-sm border border-gray-200"
                >
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold flex items-center">
                      <TrendingUp className="mr-2 text-blue-600" size={20} />
                      Estadísticas de la Plataforma
                    </h2>
                  </div>
                  <Charts />
                </motion.div>

                {/* Últimos eventos aprobados */}
                <motion.div
                  variants={slideIn}
                  className="bg-white rounded-xl shadow-sm border border-gray-200"
                >
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold flex items-center">
                        <CheckCircle className="mr-2 text-green-600" size={20} />
                        Eventos Recientemente Aprobados
                      </h2>
                      <button className="text-sm text-red-600 font-medium">
                        Exportar
                      </button>
                    </div>
                  </div>
                  <EventsTable />
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'events' && (
              <motion.div
                key="events"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  {/* Header con filtros */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">Gestión de Eventos</h2>
                        <p className="text-gray-600">Administra todos los eventos de la plataforma</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            placeholder="Buscar eventos..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                          <Filter size={18} className="mr-2" />
                          Filtros
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center">
                          <Download size={18} className="mr-2" />
                          Exportar
                        </button>
                      </div>
                    </div>

                    {/* Filtros rápidos */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {['Todos', 'Pendientes', 'Aprobados', 'Destacados', 'Rechazados', 'Este mes'].map((filter) => (
                        <button
                          key={filter}
                          className={`px-3 py-1 rounded-full text-sm ${
                            filter === 'Todos'
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tabla de eventos completa */}
                  <div className="overflow-x-auto">
                    <EventsTable isFullView />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Otras pestañas... */}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default Admin
