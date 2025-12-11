import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Calendar,
  Heart,
  Settings,
  Bell,
  Shield,
  CreditCard,
  LogOut,
  Edit,
  Camera,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Eye,
  Users,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  MoreVertical,
  Share2,
  Download,
  Filter,
  Search,
  ChevronRight,
  Lock,
  Key,
  Trash2,
  Activity,
  FileText,
  MessageCircle,
  PlusCircle,
  QrCode
} from 'lucide-react'

const Profile = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState(null)
  const [userEvents, setUserEvents] = useState([])
  const [favoriteEvents, setFavoriteEvents] = useState([])
  const [notifications, setNotifications] = useState([])
  const [stats, setStats] = useState(null)

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: <Activity size={20} /> },
    { id: 'events', label: 'Mis Eventos', icon: <Calendar size={20} /> },
    { id: 'favorites', label: 'Favoritos', icon: <Heart size={20} /> },
    { id: 'notifications', label: 'Notificaciones', icon: <Bell size={20} /> },
    { id: 'settings', label: 'Configuración', icon: <Settings size={20} /> }
  ]

  // Datos de ejemplo del usuario
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+51 987 654 321',
      location: 'Miraflores, Lima',
      bio: 'Apasionada por la cultura tradicional y organizadora de eventos comunitarios. Amante de las festividades patronales y la gastronomía local.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      cover: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200',
      joinDate: 'Enero 2023',
      verified: true,
      role: 'Organizador Premium',
      social: {
        facebook: 'maria.gonzalez',
        instagram: '@maria_cultura',
        twitter: 'maria_cultural'
      }
    }

    const mockStats = {
      totalEvents: 12,
      upcomingEvents: 3,
      pastEvents: 9,
      favoriteEvents: 8,
      totalViews: 12560,
      eventLikes: 345,
      attendanceRate: 85,
      responseTime: '2.4 horas'
    }

    const mockEvents = [
      {
        id: 1,
        title: 'Fiesta Patronal San Juan',
        date: '24 Jun 2024',
        status: 'active',
        views: 1245,
        likes: 289,
        attending: 450,
        revenue: 500
      },
      {
        id: 2,
        title: 'Festival Gastronómico',
        date: '15 Jul 2024',
        status: 'pending',
        views: 856,
        likes: 156,
        attending: 0,
        revenue: 0
      },
      {
        id: 3,
        title: 'Concierto de Música Andina',
        date: '30 Jun 2024',
        status: 'active',
        views: 987,
        likes: 234,
        attending: 320,
        revenue: 300
      },
      {
        id: 4,
        title: 'Feria Artesanal',
        date: '20 Jul 2024',
        status: 'ended',
        views: 654,
        likes: 189,
        attending: 280,
        revenue: 200
      }
    ]

    const mockFavorites = [
      {
        id: 5,
        title: 'Carnaval Andino 2024',
        date: '15 Feb 2024',
        category: 'Fiesta Tradicional',
        location: 'Plaza de Armas',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400'
      },
      {
        id: 6,
        title: 'Festival del Pisco',
        date: '22 Jul 2024',
        category: 'Gastronomía',
        location: 'Viñedos del Sur',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400'
      },
      {
        id: 7,
        title: 'Exposición de Arte Textil',
        date: '5 Ago 2024',
        category: 'Arte',
        location: 'Museo de Cultura',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400'
      },
      {
        id: 8,
        title: 'Torneo de Fútbol Local',
        date: '12 Ago 2024',
        category: 'Deportes',
        location: 'Estadio Municipal',
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400'
      }
    ]

    const mockNotifications = [
      {
        id: 1,
        type: 'event',
        title: 'Evento aprobado',
        message: 'Tu evento "Fiesta Patronal San Juan" ha sido aprobado',
        time: 'Hace 2 horas',
        read: false
      },
      {
        id: 2,
        type: 'message',
        title: 'Nuevo mensaje',
        message: 'Tienes un nuevo mensaje sobre tu evento',
        time: 'Hace 5 horas',
        read: false
      },
      {
        id: 3,
        type: 'system',
        title: 'Actualización disponible',
        message: 'Nuevas funciones en la plataforma',
        time: 'Ayer',
        read: true
      },
      {
        id: 4,
        type: 'event',
        title: 'Recordatorio',
        message: 'Tu evento comienza en 3 días',
        time: 'Hace 2 días',
        read: true
      }
    ]

    setUserData(mockUser)
    setStats(mockStats)
    setUserEvents(mockEvents)
    setFavoriteEvents(mockFavorites)
    setNotifications(mockNotifications)
  }, [])

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      navigate('/')
    }
  }

  const handleSaveProfile = () => {
    // Aquí iría la lógica para guardar los cambios
    setIsEditing(false)
    alert('Perfil actualizado correctamente')
  }

  const deleteEvent = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este evento?')) {
      setUserEvents(userEvents.filter(event => event.id !== id))
    }
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const slideIn = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Cargando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header con foto de portada */}
      <div className="relative">
        <div className="h-64 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500">
          <img
            src={userData.cover}
            alt="Portada"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        {/* Botón de editar portada */}
        <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30">
          <Camera size={20} />
        </button>
      </div>

      <div className="container mx-auto px-4 -mt-16">
        {/* Sección de perfil */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white rounded-2xl shadow-xl mb-8"
        >
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              {/* Avatar */}
              <div className="relative mb-6 md:mb-0 md:mr-8">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                  <Camera size={16} />
                </button>
              </div>

              {/* Información del usuario */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <h1 className="text-3xl font-bold mr-3">{userData.name}</h1>
                      {userData.verified && (
                        <CheckCircle className="text-blue-500" size={24} />
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{userData.role}</p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar size={14} className="mr-1" />
                      <span>Miembro desde {userData.joinDate}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-4 md:mt-0">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
                    >
                      <Edit size={18} className="mr-2" />
                      {isEditing ? 'Cancelar' : 'Editar perfil'}
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Share2 size={18} />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <QrCode size={18} />
                    </button>
                  </div>
                </div>

                {/* Bio */}
                {isEditing ? (
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
                    rows={3}
                    defaultValue={userData.bio}
                  />
                ) : (
                  <p className="text-gray-700 mb-6">{userData.bio}</p>
                )}

                {/* Información de contacto */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center">
                    <Mail size={18} className="text-gray-400 mr-3" />
                    <span className={isEditing ? 'hidden' : ''}>{userData.email}</span>
                    {isEditing && (
                      <input
                        type="email"
                        className="flex-1 px-3 py-1 border border-gray-300 rounded"
                        defaultValue={userData.email}
                      />
                    )}
                  </div>
                  <div className="flex items-center">
                    <Phone size={18} className="text-gray-400 mr-3" />
                    <span className={isEditing ? 'hidden' : ''}>{userData.phone}</span>
                    {isEditing && (
                      <input
                        type="tel"
                        className="flex-1 px-3 py-1 border border-gray-300 rounded"
                        defaultValue={userData.phone}
                      />
                    )}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={18} className="text-gray-400 mr-3" />
                    <span className={isEditing ? 'hidden' : ''}>{userData.location}</span>
                    {isEditing && (
                      <input
                        type="text"
                        className="flex-1 px-3 py-1 border border-gray-300 rounded"
                        defaultValue={userData.location}
                      />
                    )}
                  </div>
                  <div className="flex items-center">
                    <Globe size={18} className="text-gray-400 mr-3" />
                    <span>@{userData.social.instagram}</span>
                  </div>
                </div>

                {/* Botón de guardar en modo edición */}
                {isEditing && (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSaveProfile}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Guardar cambios
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs de navegación */}
          <div className="border-t border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                  {tab.id === 'notifications' && notifications.filter(n => !n.read).length > 0 && (
                    <span className="ml-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contenido de las pestañas */}
        <AnimatePresence mode="wait">
          {/* Resumen */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="space-y-8"
            >
              {/* Estadísticas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Eventos Publicados', value: stats.totalEvents, icon: <Calendar className="text-blue-600" />, change: '+2' },
                  { label: 'Eventos Favoritos', value: stats.favoriteEvents, icon: <Heart className="text-red-600" />, change: '+1' },
                  { label: 'Total de Vistas', value: stats.totalViews.toLocaleString(), icon: <Eye className="text-green-600" />, change: '+12%' },
                  { label: 'Tasa de Asistencia', value: `${stats.attendanceRate}%`, icon: <TrendingUp className="text-purple-600" />, change: '+5%' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={slideIn}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        {stat.icon}
                      </div>
                      <span className="text-sm font-medium text-green-600">
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Eventos próximos */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center">
                      <Clock className="mr-3 text-blue-600" />
                      Eventos Próximos
                    </h2>
                    <button className="text-red-600 text-sm font-medium">
                      Ver todos
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {userEvents.filter(e => e.status === 'active').map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Calendar size={14} className="mr-2" />
                            {event.date}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-gray-200 rounded">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 hover:bg-gray-200 rounded">
                            <Share2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                    <PlusCircle size={18} className="mr-2" />
                    Crear Nuevo Evento
                  </button>
                </div>

                {/* Actividad reciente */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <Activity className="mr-3 text-red-600" />
                    Actividad Reciente
                  </h2>
                  
                  <div className="space-y-4">
                    {[
                      { action: 'Creaste el evento "Fiesta Patronal"', time: 'Hace 2 días' },
                      { action: 'Recibiste 45 nuevos asistentes', time: 'Hace 3 días' },
                      { action: 'Actualizaste tu información de perfil', time: 'Hace 1 semana' },
                      { action: 'Agregaste 3 eventos a favoritos', time: 'Hace 2 semanas' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <div className="flex-1">
                          <p>{activity.action}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Logros */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <Award className="mr-3 text-yellow-600" />
                  Logros y Reconocimientos
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { title: 'Organizador Activo', desc: 'Más de 10 eventos', icon: '🏆' },
                    { title: 'Comunidad', desc: '500+ asistentes', icon: '👥' },
                    { title: 'Calidad', desc: '4.8 rating promedio', icon: '⭐' },
                    { title: 'Consistencia', desc: '6 meses activo', icon: '📅' }
                  ].map((achievement, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <h3 className="font-bold">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Mis Eventos */}
          {activeTab === 'events' && (
            <motion.div
              key="events"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="bg-white rounded-xl shadow-lg">
                {/* Header con acciones */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Mis Eventos</h2>
                      <p className="text-gray-600">Gestiona todos tus eventos publicados</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          placeholder="Buscar eventos..."
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                        <Filter size={18} className="mr-2" />
                        Filtrar
                      </button>
                      <button 
                        onClick={() => navigate('/publicar-evento')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
                      >
                        <PlusCircle size={18} className="mr-2" />
                        Nuevo Evento
                      </button>
                    </div>
                  </div>

                  {/* Filtros rápidos */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {['Todos', 'Activos', 'Pendientes', 'Finalizados', 'Destacados'].map((filter) => (
                      <button
                        key={filter}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 text-sm"
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tabla de eventos */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-6">Evento</th>
                        <th className="text-left py-4 px-6">Fecha</th>
                        <th className="text-left py-4 px-6">Estado</th>
                        <th className="text-left py-4 px-6">Estadísticas</th>
                        <th className="text-left py-4 px-6">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userEvents.map((event) => (
                        <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div>
                              <h3 className="font-medium">{event.title}</h3>
                              <div className="flex items-center text-sm text-gray-600">
                                <Eye size={14} className="mr-1" />
                                {event.views} vistas
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <Calendar size={16} className="mr-2 text-gray-400" />
                              {event.date}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              event.status === 'active' ? 'bg-green-100 text-green-800' :
                              event.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {event.status === 'active' ? 'Activo' :
                               event.status === 'pending' ? 'Pendiente' : 'Finalizado'}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-4">
                              <div className="text-center">
                                <div className="font-bold">{event.likes}</div>
                                <div className="text-xs text-gray-600">Me gusta</div>
                              </div>
                              <div className="text-center">
                                <div className="font-bold">{event.attending}</div>
                                <div className="text-xs text-gray-600">Asistentes</div>
                              </div>
                              <div className="text-center">
                                <div className="font-bold">S/ {event.revenue}</div>
                                <div className="text-xs text-gray-600">Ingresos</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => navigate(`/evento/${event.id}`)}
                                className="p-2 hover:bg-gray-100 rounded"
                              >
                                <Eye size={18} />
                              </button>
                              <button className="p-2 hover:bg-gray-100 rounded">
                                <Edit size={18} />
                              </button>
                              <button className="p-2 hover:bg-gray-100 rounded">
                                <Share2 size={18} />
                              </button>
                              <button
                                onClick={() => deleteEvent(event.id)}
                                className="p-2 hover:bg-red-50 rounded text-red-600"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Resumen */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-600">
                      Mostrando {userEvents.length} de {userEvents.length} eventos
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                      <Download size={18} className="mr-2" />
                      Exportar eventos
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Favoritos */}
          {activeTab === 'favorites' && (
            <motion.div
              key="favorites"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Eventos Favoritos</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Buscar favoritos..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Ordenar por
                    </button>
                  </div>
                </div>

                {favoriteEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-xl font-bold mb-2">No tienes favoritos</h3>
                    <p className="text-gray-600 mb-6">Comienza guardando eventos que te interesen</p>
                    <button 
                      onClick={() => navigate('/')}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Explorar Eventos
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteEvents.map((event) => (
                      <motion.div
                        key={event.id}
                        whileHover={{ y: -5 }}
                        className="border border-gray-200 rounded-xl overflow-hidden group cursor-pointer"
                      >
                        <div className="h-48 overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white">
                            <Heart className="text-red-500 fill-red-500" size={20} />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-gray-600">
                              <Calendar size={14} className="mr-2" />
                              <span className="text-sm">{event.date}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <MapPin size={14} className="mr-2" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Tag size={14} className="mr-2" />
                              <span className="text-sm">{event.category}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                              Ver detalles
                            </button>
                            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Acciones masivas */}
                {favoriteEvents.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="text-gray-600">
                        {favoriteEvents.length} eventos favoritos
                      </div>
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          Descargar lista
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                          Compartir colección
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Notificaciones */}
          {activeTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Notificaciones</h2>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={markAllAsRead}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Marcar todas como leídas
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Settings size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex items-start">
                        <div className={`p-3 rounded-full mr-4 ${
                          notification.type === 'event' ? 'bg-green-100 text-green-600' :
                          notification.type === 'message' ? 'bg-blue-100 text-blue-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {notification.type === 'event' ? <Calendar size={20} /> :
                           notification.type === 'message' ? <MessageCircle size={20} /> :
                           <Bell size={20} />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{notification.title}</h3>
                            <span className="text-sm text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-gray-600 mt-1">{notification.message}</p>
                          {!notification.read && (
                            <div className="inline-flex items-center mt-2 text-sm text-blue-600">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                              Nuevo
                            </div>
                          )}
                        </div>
                        <button className="ml-4 p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Configuración de notificaciones */}
                <div className="p-6 border-t border-gray-200">
                  <h3 className="font-bold text-lg mb-4">Preferencias de notificaciones</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Notificaciones por email', checked: true },
                      { label: 'Notificaciones push', checked: true },
                      { label: 'Recordatorios de eventos', checked: true },
                      { label: 'Actualizaciones de la plataforma', checked: false },
                      { label: 'Promociones y ofertas', checked: false }
                    ].map((pref, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked={pref.checked}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="ml-3">{pref.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Configuración */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Configuración de cuenta */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-lg">
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-2xl font-bold">Configuración de la Cuenta</h2>
                    </div>

                    <div className="p-6 space-y-8">
                      {/* Seguridad */}
                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                          <Shield className="mr-3 text-red-600" />
                          Seguridad
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-medium">Cambiar contraseña</h4>
                              <p className="text-sm text-gray-600">Último cambio hace 3 meses</p>
                            </div>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                              Cambiar
                            </button>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-medium">Verificación en dos pasos</h4>
                              <p className="text-sm text-gray-600">Protege tu cuenta con 2FA</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Privacidad */}
                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                          <Lock className="mr-3 text-blue-600" />
                          Privacidad
                        </h3>
                        <div className="space-y-4">
                          {[
                            { label: 'Perfil público', desc: 'Cualquiera puede ver tu perfil', checked: true },
                            { label: 'Mostrar email', desc: 'Visible para otros usuarios', checked: false },
                            { label: 'Mostrar teléfono', desc: 'Visible para organizadores', checked: true },
                            { label: 'Mostrar ubicación', desc: 'Visible en tu perfil', checked: true }
                          ].map((setting, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{setting.label}</h4>
                                <p className="text-sm text-gray-600">{setting.desc}</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  defaultChecked={setting.checked}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Notificaciones */}
                      <div>
                        <h3 className="text-xl font-bold mb-4">Preferencias de correo</h3>
                        <div className="space-y-3">
                          {[
                            'Boletín semanal de eventos',
                            'Recordatorios de mis eventos',
                            'Novedades de la plataforma',
                            'Ofertas especiales',
                            'Eventos recomendados'
                          ].map((pref, index) => (
                            <label key={index} className="flex items-center">
                              <input
                                type="checkbox"
                                defaultChecked={index < 3}
                                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                              />
                              <span className="ml-3">{pref}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Zona de peligro */}
                      <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-xl font-bold mb-4 text-red-600">Zona de Peligro</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                            <div>
                              <h4 className="font-medium text-red-800">Eliminar cuenta</h4>
                              <p className="text-sm text-red-600">Elimina permanentemente tu cuenta y todos tus datos</p>
                            </div>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                              Eliminar
                            </button>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-medium">Exportar datos</h4>
                              <p className="text-sm text-gray-600">Descarga todos tus datos en formato JSON</p>
                            </div>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                              Exportar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Panel lateral - Configuración rápida */}
                <div className="space-y-6">
                  {/* Métodos de pago */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center">
                      <CreditCard className="mr-3 text-green-600" />
                      Métodos de Pago
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-6 bg-blue-600 rounded mr-3"></div>
                            <div>
                              <p className="font-medium">Visa •••• 4321</p>
                              <p className="text-sm text-gray-600">Principal</p>
                            </div>
                          </div>
                          <button className="text-red-600 text-sm">Eliminar</button>
                        </div>
                      </div>
                      <button className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                        <PlusCircle size={18} className="mr-2" />
                        Agregar método
                      </button>
                    </div>
                  </div>

                  {/* Cerrar sesión */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="font-bold text-lg mb-4">Sesión</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Sesión activa</p>
                          <p className="text-sm text-gray-600">Desde este dispositivo</p>
                        </div>
                        <button className="text-sm text-red-600">Cerrar</button>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center"
                      >
                        <LogOut size={18} className="mr-2" />
                        Cerrar sesión en todos los dispositivos
                      </button>
                    </div>
                  </div>

                  {/* Información de cuenta */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="font-bold text-lg mb-4">Información de la cuenta</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ID de usuario:</span>
                        <span className="font-mono">USR-{userData.id.toString().padStart(6, '0')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tipo de cuenta:</span>
                        <span className="font-medium">{userData.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Miembro desde:</span>
                        <span className="font-medium">{userData.joinDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Última actualización:</span>
                        <span className="font-medium">Hace 2 días</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Profile
