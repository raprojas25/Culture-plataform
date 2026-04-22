import {
  Book,
  CircleEllipsis,
  DatabaseIcon,
  Menu,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { delay, motion } from "framer-motion";

const SidebarNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarLinks = [
    { name: "Dashboard", path: "/", icon: DatabaseIcon },
    { name: "Overview", path: "/overview", icon: Book },
    { name: "Chat", path: "/chat", icon: CircleEllipsis },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, type: "spring" },
    },
  };

  const slideIn = {
    hidden: { x: 0, opacity: 1 },
    visible: { x: -100, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
        <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={30} />
        </button>
        <Link to="/">Dashboard</Link>
        <button type="button">
          <MoreHorizontal />
        </button>
      </div>
      <div className="h-[550px]">
        {sidebarOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sidebarOpen ? fadeInUp : slideIn}
            className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300"
          >
            {sidebarLinks.map((item, index) => (
              <a
                href={item.path}
                key={index}
                className={`flex items-center py-3 px-4 gap-3 
                            ${
                              index === 0
                                ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                : "hover:bg-gray-100/90 border-white text-gray-700"
                            }`}
              >
                {<item.icon />}
                <p className="md:block hidden text-center">{item.name}</p>
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default SidebarNav;
