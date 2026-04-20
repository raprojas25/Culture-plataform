import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Header } from "./Header";
import Aside from "./Aside";

/**
 * Layout principal del Dashboard con sidebar responsivo
 * Maneja el estado del sidebar y lo pasa al Aside y Header
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Contenido hijo opcional
 * @returns {JSX.Element}
 */
export const LayoutDashboard = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-slate-950">
      {/* Header fijo en la parte superior */}
      <Header isOpen={sidebarOpen} onToggle={setSidebarOpen} />

      {/* Contenedor principal del layout */}
      <div className="">
        {/* Sidebar - Se comporta diferente en móvil y desktop */}
        <Aside isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Overlay para móvil cuando el sidebar está abierto */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Contenido principal */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out">
          <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};
