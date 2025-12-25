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
// import EventDetail from "./pages/EventDetail/EventDetail";
// import EventForm from "./pages/PublishEvent/PublicarEvento.jsx";

//import './App.css'

function App() {
  return (
    <Router>
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
            <Route path="/categorias/:categorySlug" element={<Categories />} />
          </Routes>
        </main>

        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
