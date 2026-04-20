import React from "react";
import { Outlet } from "react-router-dom";

import { useAuthStore } from "@/shared/stores/authStore";
import Header from "./Header/HeaderDropDown";
import Footer from "./Footer";

export const Layout = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-slate-950">
      <Header />
      {/* <main */}
      {/*   className={`flex-1 ${isAuthenticated ? "ml-64" : ""} transition-all duration-300 z-0`} */}
      {/* > */}
      {/*   <div className="container mx-auto">{children || <Outlet />}</div> */}
      {/* </main> */}
      <main className="container mx-auto">{children || <Outlet />}</main>
      <Footer />
    </div>
  );
};
