import { Link, Outlet } from "react-router-dom";
import Aside from ".";
import { useEffect, useState } from "react";
import { Menu, MoreHorizontal } from "lucide-react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-w-full w-screen relative">
      <nav className=" ">
        <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
          <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={30} />
          </button>
          <Link to="/">Dashboard</Link>
          <button type="button">
            <MoreHorizontal />
          </button>
        </div>
      </nav>
      <div className="flex">
        <Aside sidebarOpen={sidebarOpen} />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
