import React from 'react';
import { Outlet } from 'react-router-dom';
// import { Header } from '../Header/HeaderDropDown';
import Header from '../Header/HeaderDropDown';

import Footer from '../Footer/Footer';
// import { Sidebar } from './Sidebar';
import { useAuthStore } from '../../stores/authStore';

export const Layout = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-slate-950">
      <Header />
      <div className="">
        {/* <Sidebar /> */}
        {isAuthenticated && <Sidebar />}
        <main className={`flex-1 ${isAuthenticated ? 'ml-64' : ''} transition-all duration-300 z-0`}>
          <div className="container mx-auto">
          {children || <Outlet />}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

