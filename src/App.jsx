import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import PublishEvent from "./pages/PublishEvent/PublishEvent";
//import Categories from './pages/Categories/Categories'
import Directory from "./pages/Directory/Directory";
import About from "./pages/About/About";
//import Admin from './pages/Admin/Admin'
//import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
//import Terms from './pages/Terms/Terms'
//import Gallery from './pages/Gallery/Gallery'
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

            {/*
            <Route path="/calendario" element={<CalendarPage />} />
            <Route path="/publicar-evento" element={<PublishEvent />} />
            <Route path="/categorias" element={<Categories />} />
            <Route path="/directorio" element={<Directory />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/terminos" element={<Terms />} />
            <Route path="/galeria" element={<Gallery />} />
*/}
          </Routes>
        </main>

        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
