import {
  ChevronDown,
  ChevronUp,
  CircleDot,
  File,
  Gift,
  Home,
  Info,
  LayoutDashboard,
  ScrollText,
  Settings,
  Shield,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAside } from "./hooks/useAside";
import { motion } from "framer-motion";
const Aside = ({ isOpen }) => {
  const [sidebarOpens, setSidebarOpens] = useState();
  const [isLeaguesOpen, setIsLeaguesOpen] = useState(false);
  const location = useLocation();

  const { handleClick, isMenuOpen,} = useAside();

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Home", showAlways: true },
    {
      path: "/dashboard/stats",
      icon: TrendingUp,
      label: "Estadisticas",
      showAlways: true,
    },
    {
      path: "/dashboard/eventos",
      icon: CircleDot,
      label: "Eventos",
      showAlways: true,
    },
    {
      path: "/dashboard/Ajustes",
      icon: Settings,
      label: "Ajustes",
      showWhenAuth: true,
    },
  ];
  const manager = [
    { path: "/dashboard/usuarios", label: "Usuarios" },
    { path: "/dashboard/roles", label: "Roles" },
    { path: "/dashboard/categorias", label: "Categorias" },
    { path: "/dashboard/distritos", label: "Distritos" },
    { path: "/dashboard/directorio", label: "Directorio" },
  ];

  const otherLinks = [
    { path: "/terms", icon: ScrollText, label: "Términos y Condiciones" },
    { path: "/privacy", icon: Shield, label: "Políticas de Privacidad" },
    { path: "/responsible-gaming", icon: Info, label: "Juego Responsable" },
    { path: "/bonuses", icon: Gift, label: "Bonos y Ofertas" },
  ];

  const variants = {
    hidden: { opacity: 0, x: -64, scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      x: -64,
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  }
  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={variants}
      className={`h-screen fixed z-50 bg-white dark:bg-gray-900 min-h-screen shadow-lg flex flex-col transition-all duration-500 transform ${isOpen ? "w-64 left-0" : "w-0  -left-64"}`}
    >
      <div className={`p-4 border-b border-gray-200 dark:border-gray-700 `}>
        <Link to="/" className="flex items-center space-x-2">
          <LayoutDashboard className="h-8 w-8 text-red-600 dark:text-red-500" />
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </span>
        </Link>
      </div>
      {/* Main menu items */}
      <div className="flex-1 py-6 px-4 space-y-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActivePath(item.path)
                  ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        {/* Separator */}
        <hr className="my-4 border-gray-200 dark:border-gray-700" />

        {/* Main Leagues Section */}
        <div className="">
          <button
            onClick={() => setIsLeaguesOpen(!isLeaguesOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex items-center space-x-3">
              <File className="h-5 w-5" />
              <span>Gestionar</span>
            </div>
            {isLeaguesOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {isLeaguesOpen && (
            <div className="mt-2 space-y-1 pl-4">
              {manager.map((league) => (
                <Link
                  key={league.path}
                  to={league.path}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    isActivePath(league.path)
                      ? "bg-blue-100 dark:bg-red-900 text-red-600 dark:text-red-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="text-sm">{league.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Separator */}
        <hr className="my-4 border-gray-200 dark:border-gray-700" />

        {/* Others Section */}
        <div className="space-y-1">
          <h3 className="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Otros
          </h3>
          {otherLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                isActivePath(link.path)
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <link.icon className="h-5 w-5" />
              <span className="text-sm">{link.label}</span>
            </Link>
          ))}
        </div>

      </div>
    </motion.nav>
  );
};

export default Aside;
