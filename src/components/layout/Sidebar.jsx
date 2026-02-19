import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Calendar,
  Users,
  Tag,
  BarChart3,
  Settings,
  PlusCircle,
} from 'lucide-react';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }
  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/dashboard/events', icon: Calendar, label: 'Eventos' },
    { to: '/dashboard/users', icon: Users, label: 'Usuarios' },
    { to: '/dashboard/roles', icon: Users, label: 'Roles' },
    { to: '/dashboard/categories', icon: Tag, label: 'Categorías' },
    { to: '/dashboard/statistics', icon: BarChart3, label: 'Estadísticas' },
    { to: '/dashboard/settings', icon: Settings, label: 'Configuración' },
  ];

  return (
    <aside className={`fixed left-0 top-16 h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-50 transition-all duration-300 ease-in-out ${isOpen ? 'w-64': 'w-0'}`}>
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Navegación
          </h3>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Acciones Rápidas
          </h3>
          <nav className="space-y-1">
            <NavLink
              to="/events/create"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30"
            >
              <PlusCircle className="w-4 h-4 mr-3" />
              Crear Evento
            </NavLink>
          </nav>
        </div>

        <div className="mt-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Estadísticas Rápidas
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Eventos Activos</span>
                <span className="font-semibold text-gray-900 dark:text-white">24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Usuarios</span>
                <span className="font-semibold text-gray-900 dark:text-white">156</span>
              </div>
            </div>
          </div>
        </div>
        <button className='p-4 bg-red-500 text-white' onClick={handleClick}>
          close
        </button>
      </div>
    </aside>
  );
};

