import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/HeaderDropDown.jsx";
import Footer from "./components/Footer/Footer";
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
import Admin from "./pages/Admin/Admin";
import EventDetails from "./pages/EventDetail/EventDetail";
import AdminPanel from "./pages/Admin/AdminPanel";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CategoriesManager from "./pages/Admin/categories/CategoryManager";
import NotFount from "./pages/NotFount.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import SidebarNav from "./pages/Admin/components/SidebarNav.jsx";
import CategoryManager from "./pages/Admin/categories/CategoryManager";
// import AdminLayout from "./pages/Admin/AdminLayout.jsx";
// import EventDetail from "./pages/EventDetail/EventDetail";
// import EventForm from "./pages/PublishEvent/PublicarEvento.jsx";
import GradientBackground from "./components/ui/GradientBackground.jsx";
import EventDetailsColca from "./pages/EventDetail/DetailColca.jsx";
//import './App.css'
import EventDetail from "./pages/EventDetail/EventDetailHtml.jsx";
import UserManager from "./pages/Admin/users/UserManager.jsx";
import { Roles } from "./pages/Admin/Roles.jsx";
function App() {
  return (
    <Router>
      <GradientBackground>
        <div className="min-h-screen flex flex-col ">
          <Header />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
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
              <Route path="/evento/:id" element={<EventDetails />} />
              <Route path="/categorias" element={<Categories />} />
              <Route path="/colca" element={<EventDetailsColca />} />
              <Route path="/html" element={<EventDetail />} />
              <Route path="/user" element={<UserManager />} />
              <Route path="/roles" element={<Roles />} />
              <Route
                path="/categorias/:categorySlug"
                element={<Categories />}
              />
              <Route path="/cat" element={<CategoriesManager />} />
              <Route path="/panel" element={<AdminPanel />} />
              <Route path="/dash" element={<AdminDashboard />} />
              {/* <Route path="/layout" element={<AdminLayout />}/> */}
              <Route path="/Dashboard/*" element={<Dashboard />}>
                <Route path="category" element={<CategoryManager />} />
                <Route path="" element={<Admin />} />
              </Route>
              <Route path="*" element={<NotFount />} />
              <Route path="sidebar" element={<SidebarNav />} />
            </Routes>
          </main>

          <Footer />
          <Toaster position="top-right" />
        </div>
      </GradientBackground>
    </Router>
  );
}

export default App;
