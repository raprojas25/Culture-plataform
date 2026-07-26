// External
import { Routes, Route } from "react-router-dom";

// Layouts
import { Layout } from "@/shared/components/layout/Layout";
import { LayoutDashboard } from "@/features/admin/components/LayoutDashboard";

// User pages
import Home from "@/features/user/home/Home";
import { Login } from "@/features/user/auth/pages/Login";
import { Register } from "@/features/user/auth/pages/Register";
import { Profile } from "@/features/user/auth/pages/Profile/Profile";
import PublishEvent from "@/features/user/events/pages/PublishEvent/PublishEvent";
import NotFount from "@/features/user/othersPages/NotFount";
import { Extras } from "@/features/user/othersPages/Extras";

// Admin pages
import CategoryManagerDos from "@/features/admin/categories/CategoriesManagerDos";
import CategoryManager from "@/features/admin/categories/CategoryManager";
import { Users } from "@/features/admin/users/Users";
import { CreateEvent } from "@/features/user/events/CreateEvent";
import EventForm from "@/features/user/events/pages/PublishEvent/PublicarEvento";
import Categories from "@/features/user/events/pages/Categories/Categories";
import EventDetail from "@/features/user/events/pages/EventDetail";
import EventDetails from "@/features/user/events/pages/DetallesEvento";
import { Events } from "@/features/admin/events/Events";
import CalendarPage from "@/features/user/events/pages/CalendarPage/CalendarPage";
import Directory from "@/features/user/directory/Directory";
import Gallery from "@/features/user/gallery/pages/Gallery";
import About from "@/features/user/about/About";
import Contact from "@/features/user/contact/Contact";
import Admin from "@/features/admin/home/Admin";
import { HomeAdmin } from "@/features/admin/home/Index";
import { Roles } from "@/features/admin/roles/Roles";
import { Districts } from "@/features/admin/district/Districts";
import EventDetailsColca from "@/features/user/events/pages/DetailColca";

export const Rutas = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        {/* auth */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="perfil" element={<Profile />} />

        {/* events */}
        {/* <Route path="eventos" element={<EventForm />} /> */}
        <Route path="publicar-evento" element={<CreateEvent />} />
        <Route path="publicar" element={<PublishEvent />} />
        <Route path="categorias" element={<Categories />} />
        <Route path="evento/:id" element={<EventDetail />} />
        <Route path="categorias/:categorySlug" element={<Categories />} />

        <Route path="calendario" element={<CalendarPage />} />
        <Route path="directorio" element={<Directory />} />
        <Route path="galeria" element={<Gallery />} />
        <Route path="about" element={<About />} />
        <Route path="contacto" element={<Contact />} />
      </Route>

      <Route path="/dashboard" element={<LayoutDashboard />}>
        <Route index element={<Admin />} />
        <Route path="statsDos" element={<CategoryManagerDos />} />
        {/* <Route path="stats" element={<DashboardDos />} /> */}
        <Route path="stats" element={<HomeAdmin />} />
        <Route path="eventos" element={<Events />} />

        <Route path="usuarios" element={<Users />} />
        <Route path="roles" element={<Roles />} />
        <Route path="categorias" element={<CategoryManager />} />
        <Route path="distritos" element={<Districts />} />
        <Route path="directorio" element={<EventDetailsColca />} />
      </Route>
      {/* 404 */}
      <Route path="*" element={<NotFount />} />
      <Route path="extras" element={<Extras />} />
    </Routes>
  );
};
