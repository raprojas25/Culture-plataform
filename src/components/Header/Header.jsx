import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
  MapPin,
  GalleryVertical,
  Sun,
  Moon,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Bell,
  Search,
  ChevronDown,
  Settings,
  Bookmark,
  ChevronUp
} from 'lucide-react'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Cambiar a false por defecto
  const [user, setUser] = useState(null)
  const [scrollY, setScrollY] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()

  // Detectar scroll para efectos
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detectar tema del sistema
  useEffect(() => {
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Verificar autenticación (simulada)
  useEffect(() => {
    // Simular verificación de sesión
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
      setUser({
        name: 'Usuario Ejemplo',
        email: 'usuario@ejemplo.com',
        role: 'user',
        avatar: 'https://ui-avatars.com/api/?name=Usuario+Ejemplo&background=ef4444&color=fff'
      })
    }
  }, [])

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    }
    setDarkMode(!darkMode)
  }

  const handleLogin = () => {
    navigate('/auth')
    setIsMenuOpen(false)
  }

  const handleRegister = () => {
    navigate('/auth')
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    setIsUserMenuOpen(false)
    navigate('/')
  }

  const navItems = [
    { path: '/', label: 'Inicio', icon: <Home size={18} /> },
    { path: '/calendario', label: 'Calendario', icon: <Calendar size={18} /> },
    { path: '/publicar-evento', label: 'Publicar', icon: <PlusCircle size={18} /> },
    { path: '/categorias', label: 'Categorías', icon: <Layers size={18} /> },
    { path: '/directorio', label: 'Directorio', icon: <Users size={18} /> },
    { path: '/galeria', label: 'Galería', icon: <GalleryVertical size={18} /> },
    { path: '/about', label: 'Nosotros', icon: <Info size={18} /> },
    { path: '/contacto', label: 'Contacto', icon: <Phone size={18} /> },
  ]

  const userMenuItems = [
    { label: 'Mi Perfil', icon: <User size={16} />, action: () => navigate('/perfil') },
    { label: 'Mis Eventos', icon: <Calendar size={16} />, action: () => navigate('/mis-eventos') },
    { label: 'Guardados', icon: <Bookmark size={16} />, action: () => navigate('/guardados') },
    { label: 'Configuración', icon: <Settings size={16} />, action: () => navigate('/configuracion') },
    { label: 'Cerrar Sesión', icon: <LogOut size={16} />, action: handleLogout }
  ]

  const headerVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  }

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-white dark:bg-gray-900 shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4 w-full">
        <div className="flex items-center justify-around h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <MapPin className="text-white" size={24} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                CulturaViva
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Tu guía cultural
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-500 dark:hover:text-red-400'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button (Mobile) */}
            <button className="hidden p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400">
              <Search size={20} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-yellow-500"
              aria-label="Cambiar tema"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            {isLoggedIn && (
              <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            )}

            {/* User Menu / Auth Buttons */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-red-500">
                    <img 
                      src={user?.avatar} 
                      alt={user?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {
                    (!isUserMenuOpen)?
                    <ChevronDown size={16} className='text-gray-500 dark:text-gray-400 transition-opacity'/>
                    :<ChevronUp size={16} className='text-gray-500 dark:text-gray-400 transition-opacity'/>
                  }
                  {/* <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" /> */}
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                        <p className="font-semibold text-gray-800 dark:text-white">{user?.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                      </div>
                      
                      <div className="p-2">
                        {userMenuItems.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              item.action()
                              setIsUserMenuOpen(false)
                            }}
                            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 font-medium flex items-center space-x-2"
                >
                  <LogIn size={18} />
                  <span>Iniciar Sesión</span>
                </button>
                <button
                  onClick={handleRegister}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 font-medium flex items-center space-x-2"
                >
                  <UserPlus size={18} />
                  <span>Registrarse</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menú"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden overflow-hidden"
            >
              <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-2 rounded-b-xl shadow-lg">
                {/* Search Bar Mobile */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Buscar eventos..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="p-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                        location.pathname === item.path
                          ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-red-50 hover:text-gray-400 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>

                {/* Auth Buttons Mobile */}
                {!isLoggedIn && (
                  <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-3">
                    <button
                      onClick={handleLogin}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <LogIn size={18} />
                      <span>Iniciar Sesión</span>
                    </button>
                    <button
                      onClick={handleRegister}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600"
                    >
                      <UserPlus size={18} />
                      <span>Crear Cuenta</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header
