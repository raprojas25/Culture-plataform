import { useAuth } from "@/features/user/auth/hooks/useAuth";
import { useAuthStore } from "@/shared/stores/authStore";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  Calendar,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const UserDropdown = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const { signOut } = useAuth();
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  // Verificar autenticación (simulada)
  useEffect(() => {
    const user = useAuthStore.getState().user;
    const token = useAuthStore.getState().token;
    if (token) {
      // setIsLoggedIn(true)
      // setUser({
      //   name: 'Usuario Ejemplo',
      //   email: 'usuario@ejemplo.com',
      //   role: 'user',
      //   avatar: 'https://ui-avatars.com/api/?name=Usuario+Ejemplo&background=ef4444&color=fff'
      // })
      setUser({
        name: user.username,
        email: user.email,
        role: user.role_id,
        avatar: "",
      });
    }
  }, []);

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // const handleLogout = () => {
  //   // logout usando hook useAuth
  //   useAuth.logout();
  //   localStorage.removeItem('token')
  //   setIsLoggedIn(false)
  //   setUser(null)
  //   setIsUserMenuOpen(false)
  //   navigate('/')
  // }

  const handleLogout = async () => {
    try {
      signOut();
      setIsUserMenuOpen(false);
    } catch (error) {
      // Error is handled in useAuth hook
    }
  };

  const userMenuItems = [
    {
      label: "Mi Perfil",
      icon: <User size={16} />,
      action: () => navigate("/perfil"),
    },
    {
      label: "Mis Eventos",
      icon: <Calendar size={16} />,
      action: () => navigate("/mis-eventos"),
    },
    {
      label: "Guardados",
      icon: <Bookmark size={16} />,
      action: () => navigate("/guardados"),
    },
    {
      label: "Configuración",
      icon: <Settings size={16} />,
      action: () => navigate("/configuracion"),
    },
    {
      label: "Cerrar Sesión",
      icon: <LogOut size={16} />,
      action: handleLogout,
    },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <div className="w-8 h-8 p-1 rounded-full overflow-hidden border-2 border-red-500">
          <User className="w-full h-full object-cover text-red-500" />
          {/* <img  */}
          {/*   src={user?.avatar}  */}
          {/*   alt={user?.name} */}
          {/*   className="w-full h-full object-cover" */}
          {/* /> */}
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isUserMenuOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* User Dropdown Menu */}
      <AnimatePresence>
        {isUserMenuOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <p className="font-semibold text-gray-800 dark:text-white">
                {user?.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>

            <div className="p-2">
              {userMenuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.action();
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
