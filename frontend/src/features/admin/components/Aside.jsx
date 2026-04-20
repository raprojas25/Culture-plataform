import {
  ChevronDown,
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
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Componente de barra lateral (Aside) con navegación del dashboard
 * Animado con Framer Motion, responsivo para móvil y desktop
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Estado de apertura del sidebar (controlado desde padre)
 * @param {(open: boolean) => void} props.setIsOpen - Función para cerrar/abrir el sidebar
 * @returns {JSX.Element}
 */
const Aside = ({ isOpen, setIsOpen }) => {
  const [isLeaguesOpen, setIsLeaguesOpen] = useState(false);
  const location = useLocation();

  /**
   * Verifica si la ruta actual coincide con el path dado
   *
   * @param {string} path - Ruta a verificar
   * @returns {boolean}
   */
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  /**
   * Cierra el sidebar al navegar (solo en móvil)
   */
  const handleNavigate = () => {
    setIsOpen(false);
  };

  // Elementos de navegación principal
  const navItems = [
    { path: "/dashboard", icon: Home, label: "Home" },
    { path: "/dashboard/stats", icon: TrendingUp, label: "Estadísticas" },
    { path: "/dashboard/eventos", icon: CircleDot, label: "Eventos" },
    { path: "/dashboard/ajustes", icon: Settings, label: "Ajustes" },
  ];

  // Elementos de gestión
  const manager = [
    { path: "/dashboard/usuarios", label: "Usuarios" },
    { path: "/dashboard/roles", label: "Roles" },
    { path: "/dashboard/categorias", label: "Categorías" },
    { path: "/dashboard/distritos", label: "Distritos" },
    { path: "/dashboard/directorio", label: "Directorio" },
  ];

  // Otros enlaces
  const otherLinks = [
    { path: "/terms", icon: ScrollText, label: "Términos y Condiciones" },
    { path: "/privacy", icon: Shield, label: "Políticas de Privacidad" },
    { path: "/responsible-gaming", icon: Info, label: "Juego Responsable" },
    { path: "/bonuses", icon: Gift, label: "Bonos y Ofertas" },
  ];

  // Variantes de animación para el sidebar
  const sidebarVariants = {
    // Estado cerrado (móvil)
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
    // Estado abierto (móvil)
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      },
    },
  };

  // Variantes para elementos internos del menú
  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05 + 0.1,
        duration: 0.2,
        ease: "easeOut",
      },
    }),
  };

  return (
    <>
      {/* Sidebar - Desktop: siempre visible, Móvil: animado con overlay */}
      <motion.aside
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={`
          fixed left-0 z-40 h-[calc(100vh-4rem)]
          md:top-16 md:z-auto md:h-[calc(100vh-4rem)] md:relative md:translate-x-0
          w-64 flex-shrink-0
          bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          shadow-lg md:shadow-none
          overflow-y-auto
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header del sidebar */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <LayoutDashboard className="h-7 w-7 text-blue-400 dark:text-indigo-400" />
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent">
                    Dashboard
                  </span>
                </div>
              </Link>

              {/* Botón de cerrar solo en móvil */}
              <button
                onClick={() => setIsOpen(false)}
                className="md:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Cerrar sidebar"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Contenido de navegación */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4">
            {/* Menú principal */}
            <motion.div
              className="space-y-1"
              initial="closed"
              animate={isOpen ? "open" : "closed"}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  custom={index}
                  variants={menuItemVariants}
                >
                  <Link
                    to={item.path}
                    onClick={handleNavigate}
                    className={`
                      flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200
                      ${
                        isActivePath(item.path)
                          ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Separador */}
            <div className="border-t border-gray-200 dark:border-gray-700" />

            {/* Sección Gestionar (colapsable) */}
            <motion.div
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              variants={menuItemVariants}
              custom={navItems.length}
            >
              <button
                onClick={() => setIsLeaguesOpen(!isLeaguesOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-expanded={isLeaguesOpen}
              >
                <div className="flex items-center space-x-3">
                  <File className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm font-medium">Gestionar</span>
                </div>
                <motion.div
                  animate={{ rotate: isLeaguesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </motion.div>
              </button>

              {/* Submenú de gestión */}
              <AnimatePresence>
                {isLeaguesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 space-y-1 pl-4">
                      {manager.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={handleNavigate}
                          className={`
                            flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200
                            ${
                              isActivePath(item.path)
                                ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }
                          `}
                        >
                          <span className="text-sm">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Separador */}
            <div className="border-t border-gray-200 dark:border-gray-700" />

            {/* Sección Otros */}
            <motion.div
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              variants={menuItemVariants}
              custom={navItems.length + 1}
            >
              <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Otros
              </h3>
              <div className="space-y-1">
                {otherLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleNavigate}
                    className={`
                      flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200
                      ${
                        isActivePath(link.path)
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }
                    `}
                  >
                    <link.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </nav>
        </div>
      </motion.aside>
    </>
  );
};

export default Aside;
