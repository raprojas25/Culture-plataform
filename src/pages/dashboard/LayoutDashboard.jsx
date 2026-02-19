import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useAuthStore } from "../../stores/authStore";
import Aside from "./Aside";
import { useState } from "react";
// import { useAside } from "./hooks/useAside";

export const LayoutDashboard = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated } = useAuthStore();
  // const { handleClick, isMenuOpen } = useAside();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-slate-950">
      <Header isOpen={isOpen} onToggle={setIsOpen} />
      <div className="">
        <Aside isOpen={isOpen} />
        {isAuthenticated && <Sidebar />}
        <main
          className={`flex-1 ${isAuthenticated ? "ml-64" : ""} transition-all duration-300 z-0`}
        >
          <div className="container mx-auto">{children || <Outlet />}</div>
        </main>
      </div>
    </div>
  );
};
