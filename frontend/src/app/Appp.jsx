import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import { useThemeStore } from "./stores/themeStore";
import { Layout } from "../shared/components/layout/Layout";
// import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Auth Pages
// import { Login } from './pages/auth/Login';
// import { Register } from './pages/auth/Register';

// Dashboard Pages
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Events as DashboardEvents } from "./pages/dashboard/Events";
// import { Users } from './pages/dashboard/Users';
// import { Categories } from './pages/dashboard/Categories';
// import { Statistics } from './pages/dashboard/Statistics';

import UserManager from "./pages/Admin/users/UserManager.jsx";
import Admin from "./pages/Admin/Admin";

// Public Pages
// import { Home } from './pages/Home';
import { EventsList } from "./pages/events/EventsList";
// import { EventDetails } from "./pages/events/EventDetails";
import { CreateEvent } from "./pages/events/CreateEvent";
import EventDetail from "./pages/EventDetail/EventDetail.jsx";

import Home from "./pages/Home/Home";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import PublishEvent from "./pages/PublishEvent/PublishEvent";
import Categories from "./pages/Categories/Categories";
import Directory from "./pages/Directory/Directory";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Gallery from "./pages/Gallery/Gallery";
import Profile from "./pages/Profile/Profile";
import Terms from "./pages/Terms/Terms";
import Auth from "./pages/Auth/Auth";
import { Login } from "./pages/Auth/Register.jsx";

import { Roles } from "./pages/Admin/Roles.jsx";
import EventDetailsColca from "./pages/EventDetail/DetailColca.jsx";
import NotFound from "./pages/NotFount";
import { LayoutDashboard } from "./pages/dashboard/LayoutDashboard.jsx";
import { Districts } from "./pages/dashboard/Districts.jsx";
import CategoryManager from "./pages/Admin/categories/CategoryManager";

function App() {
  const { isDarkMode } = useThemeStore();
  //
  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [isDarkMode]);
  //
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="events" element={<EventsList />} />
            <Route path="events/:id" element={<EventDetail />} />
            <Route path="login" element={<Login />} />
            {/* <Route path="register" element={<Register />} /> */}
            <Route path="/publicar-evento" element={<PublishEvent />} />
            <Route path="/calendario" element={<CalendarPage />} />
            <Route path="/directorio" element={<Directory />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/terminos" element={<Terms />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/evento/:id" element={<EventDetail />} />
            <Route path="/categorias" element={<Categories />} />
            <Route path="/colca" element={<EventDetailsColca />} />
            <Route path="/categorias/:categorySlug" element={<Categories />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<LayoutDashboard />}>
            <Route index element={<Admin />} />
            <Route path="eventos" element={<DashboardEvents />} />
            <Route path="usuarios" element={<UserManager />} />
            <Route path="roles" element={<Roles />} />
            <Route path="categorias" element={<CategoryManager />} />
            <Route path="distritos" element={<Districts />} />
            <Route path="directorio" element={<EventDetailsColca />} />
          </Route>

          {/* Protected Event Creation */}
          <Route path="/events/create" element={<Layout />}>
            <Route index element={<CreateEvent />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkMode ? "#1f2937" : "#fff",
            color: isDarkMode ? "#fff" : "#374151",
            border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
          },
        }}
      />
    </>
  );
}

export default App;
