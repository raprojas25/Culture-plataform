import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Search,
  Bell,
  User,
  Menu,
  Filter,
  Settings,
  LogOut,
  AlertCircle,
  Users,
  ChevronDown,
  X,
} from "lucide-react";
import { ThemeToggle } from "../../components/ui/ThemeToggle";
import { useAuthStore } from "../../stores/authStore";
import { Button } from "../../components/ui/Button";
// import { UserAvatar } from '@/components/features/UserAvatar';
import { useAside } from "./hooks/useAside";

export const Header = ({ isOpen, onToggle }) => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const { handleClick, isMenuOpen,} = useAside();

  const adminMenuItems = [
    { id: "profile", label: "Mi Perfil", icon: <Users size={18} /> },
    { id: "settings", label: "Configuración", icon: <Settings size={18} /> },
    { id: "help", label: "Ayuda", icon: <AlertCircle size={18} /> },
    { id: "logout", label: "Cerrar Sesión", icon: <LogOut size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-4 py-2">
      <div className="flex justify-between items-center space-x-4">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700 dark:text-gray-300"
          onClick={() => (onToggle(!isOpen))}
          aria-label="Menú"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:block">
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">
            Dashboard
          </h1>
          <p>Bienvenido Alex!</p>
        </div>

        {/* center */}
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus: ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 "
            >
              <Filter />
            </button>
          </div>
        </div>
        {/* right */}
        <div className="flex items-center space-x-4">
          {/* ThemeToggle */}
          <ThemeToggle />

          {/* settings */}
          <button className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Settings className="w-5 h-5 " />
          </button>
          {/* Notificaciones */}
          <button className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Bell size={22} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          {/* Admin Menu */}
          <div className="relative group">
            <button className="flex items-center space-x-3 p-1 rounded-lg  text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <div className="w-7 h-7 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
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
    </header>
  );
};
