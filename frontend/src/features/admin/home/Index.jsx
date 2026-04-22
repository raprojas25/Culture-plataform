import { motion, AnimatePresence } from "framer-motion";
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
  FileText,
} from "lucide-react";
import { useState } from "react";
import StatsCards from "./components/StatsCards";
import PendingEvents from "./components/PendingEvents";
import Charts from "./components/Charts";
export const HomeAdmin = () => {
  const [notifications, setNotifications] = useState(3);

  const adminMenuItems = [
    { id: "profile", label: "Mi Perfil", icon: <Users size={18} /> },
    { id: "settings", label: "Configuración", icon: <Settings size={18} /> },
    { id: "help", label: "Ayuda", icon: <AlertCircle size={18} /> },
    { id: "logout", label: "Cerrar Sesión", icon: <LogOut size={18} /> },
  ];
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const slideIn = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  };
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* header */}
      <div className="col-span-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="text-red-600 mr-3" size={28} />
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Panel de Administración
              </h1>
              <p className="text-sm text-gray-600">
                Control total de la plataforma
              </p>
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
      <div className="col-span-12 space-y-6">
        <motion.div
          key="overview"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="space-y-6"
        >
          <StatsCards />
        </motion.div>

        {/* <MonthlySalesChart /> */}
      </div>
      <div className="col-span-12 space-y-6 xl:col-span-7">
        {/* Eventos pendientes */}
        <motion.div variants={slideIn} className="lg:col-span-2">
          <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm border border-gray-200 overflow-x-auto dark:border-gray-600">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between flex-wrap">
                <h2 className="text-xl font-bold flex items-center dark:text-gray-200">
                  <Clock className="mr-2 text-amber-600" size={20} />
                  Eventos Pendientes
                </h2>
                <button className="text-sm text-red-600 font-medium">
                  Ver todos
                </button>
              </div>
            </div>
            <PendingEvents />
          </div>
        </motion.div>

        {/* <MonthlySalesChart /> */}
      </div>

      <div className="col-span-12 xl:col-span-5">
        {/* Gráficos */}
        <motion.div
          variants={slideIn}
          className="bg-white dark:bg-white/5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold flex items-center">
              <TrendingUp className="mr-2 text-blue-600" size={20} />
              Estadísticas de la Plataforma
            </h2>
          </div>
          <Charts />
        </motion.div>
      </div>

      <div className="col-span-12">{/* <StatisticsChart /> */}</div>

      <div className="col-span-12 xl:col-span-5">
        {/* <DemographicCard /> */}
      </div>

      <div className="col-span-12 xl:col-span-7">{/* <RecentOrders /> */}</div>
    </div>
  );
};
