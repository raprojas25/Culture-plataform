import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Calendar, 
  PlusCircle, 
  Layers, 
  Users, 
  Info, 
  Phone,
  Menu,
  X,
  MapPin
} from 'lucide-react'
// import ThemeToggle from './ThemeToggle'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Inicio', icon: <Home size={18} /> },
    { path: '/calendario', label: 'Calendario', icon: <Calendar size={18} /> },
    { path: '/publicar-evento', label: 'Publicar Evento', icon: <PlusCircle size={18} /> },
    { path: '/categorias', label: 'Categorías', icon: <Layers size={18} /> },
    { path: '/directorio', label: 'Directorio', icon: <Users size={18} /> },
    { path: '/about', label: 'Nosotros', icon: <Info size={18} /> },
    { path: '/contacto', label: 'Contacto', icon: <Phone size={18} /> },
  ]

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white shadow-lg w-full"
    >
      <div className="container w-full mx-auto px-4 py-4">
        <div className="flex justify-around items-center ">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 mr-auto">
            <MapPin className="text-red-600" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">CulturaViva</h1>
              <p className="text-xs text-gray-600">Eventos en [Provincia]</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {/* {item.icon} */}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* themetoggle */}
          {/* <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button className="md:hidden text-gray-700 dark:text-gray-300">
            <Menu size={24} />
          </button>
        </div>
        */}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <div className="bg-white border rounded-lg shadow-lg py-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-3 ${
                      location.pathname === item.path
                        ? 'bg-red-50 text-red-600'
                        : 'text-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header
