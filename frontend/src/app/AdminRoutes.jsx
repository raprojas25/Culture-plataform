// External
import { Route, Routes } from "react-router-dom";

// Layouts
import { LayoutDashboard } from "@/features/admin/components/LayoutDashboard";

// Admin pages
import Admin from "@/features/admin/pages/Admin/Admin";
import { HomeAdmin } from "@/features/admin/home/Index";
import { Events } from "@/features/admin/pages/Events";
import { Users } from "@/features/admin/users/Users";
import { Roles } from "@/features/admin/roles/Roles";
import { Districts } from "@/features/admin/pages/Districts";

// Shared
import CategoryManager from "@/features/admin/categories/CategoryManager";
import EventDetailsColca from "@/features/events/pages/DetailColca";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<LayoutDashboard />}>
        <Route index element={<Admin />} />
        <Route path="stats" element={<HomeAdmin />} />
        <Route path="eventos" element={<Events />} />
        <Route path="usuarios" element={<Users />} />
        <Route path="roles" element={<Roles />} />
        <Route path="categorias" element={<CategoryManager />} />
        <Route path="distritos" element={<Districts />} />
        <Route path="directorio" element={<EventDetailsColca />} />
      </Route>
    </Routes>
  );
};
