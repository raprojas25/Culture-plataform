import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules'
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
  Share2,
  Heart,
  Download,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
  DollarSign,
  AlertCircle,
  Camera,
  Eye,
  Flag,
  Printer,
  Link as LinkIcon,
  CheckCircle,
  XCircle
} from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'leaflet/dist/leaflet.css'

// Fix para iconos de Leaflet
import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

const EventDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [similarEvents, setSimilarEvents] = useState([])
  const [position] = useState([-12.0464, -77.0428]) // Lima coordinates as example

  // Datos de ejemplo para el evento
  useEffect(() => {
    // Simulación de carga de datos
    const mockEvent = {
      id: id || 1,
      title: 'Fiesta Patronal de San Juan Bautista',
      category: 'Fiesta Patronal',
      date: '24 Junio 2024',
      time: '9:00 AM - 10:00 PM',
      endDate: '26 Junio 2024',
      location: 'Plaza Principal de Miraflores',
      address: 'Av. Larco 123, Miraflores, Lima',
      description: `Celebración tradicional en honor a San Juan Bautista, patrono de nuestro pueblo. Esta festividad reúne a toda la comunidad en un ambiente de alegría y tradición.

La fiesta incluye:
• Procesión con la imagen del santo patrono
• Presentaciones de danzas tradicionales como la Danza de las Tijeras
• Concurso de bandas de música andina
• Feria gastronómica con platos típicos
• Juegos tradicionales y actividades para niños
• Quema de castillos pirotécnicos al anochecer

Esta celebración tiene más de 200 años de historia y es considerada Patrimonio Cultural Inmaterial de nuestra región. Familias enteras se reúnen cada año para mantener viva esta hermosa tradición.`,
      
      detailedInfo: `**Horarios específicos:**
- 9:00 AM: Misa de fiesta en la Iglesia Principal
- 10:00 AM: Procesión por las calles del pueblo
- 12:00 PM: Almuerzo comunitario
- 2:00 PM: Presentaciones artísticas
- 4:00 PM: Concurso de bandas
- 6:00 PM: Feria gastronómica
- 8:00 PM: Quema de castillos

**Recomendaciones:**
- Llegar temprano para conseguir buen lugar
- Usar ropa cómoda y protector solar
- Traer agua suficiente
- Respetar las tradiciones locales
- No llevar mascotas a la procesión

**Acceso:**
- Entrada gratuita
- Estacionamiento limitado
- Transporte público disponible
- Acceso para personas con discapacidad`,
      
      organizer: {
        name: 'Comité de Fiestas Patronales',
        phone: '+51 987 654 321',
        email: 'fiestasanjuan@comunidad.com',
        website: 'www.fiestasanjuan.com',
        verified: true,
        rating: 4.8,
        eventsCount: 24
      },
      
      images: [
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop'
      ],
      
      gallery: [
        { id: 1, url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800', title: 'Procesión principal' },
        { id: 2, url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800', title: 'Danzas tradicionales' },
        { id: 3, url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800', title: 'Feria gastronómica' },
        { id: 4, url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800', title: 'Bandas musicales' },
        { id: 5, url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', title: 'Decoraciones' },
        { id: 6, url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800', title: 'Actividades infantiles' }
      ],
      
      stats: {
        views: 1245,
        likes: 289,
        shares: 156,
        saved: 89,
        attending: 450
      },
      
      price: 'Gratuito',
      featured: true,
      verified: true,
      capacity: 5000,
      ageRestriction: 'Todas las edades',
      dressCode: 'Vestimenta casual o tradicional',
      parking: 'Disponible (limitado)',
      publicTransport: 'Sí, rutas 301, 402, 505',
      coordinates: [-12.0464, -77.0428],
      
      tags: ['Fiesta Patronal', 'Tradicional', 'Comunidad', 'Gratuito', 'Familiar'],
      
      contactInfo: {
        phone: '+51 987 654 321',
        email: 'info@fiestasanjuan.com',
        whatsapp: '+51 987 654 321',
        facebook: 'facebook.com/fiestasanjuan',
        instagram: '@fiestasanjuan'
      }
    }

    const mockSimilarEvents = [
      {
        id: 2,
        title: 'Festival de la Vendimia',
        category: 'Fiesta Patronal',
        date: '15 Julio 2024',
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400',
        location: 'Viñedos del Valle',
        price: 'S/ 20'
      },
      {
        id: 3,
        title: 'Carnaval Andino',
        category: 'Fiesta Tradicional',
        date: '28 Julio 2024',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
        location: 'Plaza de Armas',
        price: 'Gratuito'
      },
      {
        id: 4,
        title: 'Feria Artesanal',
        category: 'Feria',
        date: '5 Agosto 2024',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
        location: 'Mercado Central',
        price: 'Gratuito'
      }
    ]

    setEvent(mockEvent)
    setSimilarEvents(mockSimilarEvents)
  }, [id])

  const handleShare = (platform) => {
    const url = window.location.href
    const text = `¡Mira este evento cultural: ${event?.title}!`
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer')
    }
    
    setShowShareModal(false)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('¡Enlace copiado al portapapeles!')
    setShowShareModal(false)
  }

  const handleReport = (reason) => {
    console.log('Evento reportado:', reason)
    setShowReportModal(false)
    alert('Gracias por tu reporte. Revisaremos este evento.')
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const slideIn = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Cargando evento...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header con navegación */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-red-600"
            >
              <ChevronLeft size={24} />
              <span className="ml-2">Volver</span>
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Heart size={20} className={isLiked ? 'text-red-500 fill-red-500' : 'text-gray-500'} />
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Share2 size={20} className="text-gray-500" />
              </button>
              <button
                onClick={() => window.print()}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Printer size={20} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Galería y mapa */}
          <div className="lg:col-span-2">
            {/* Galería principal */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mb-8"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <Swiper
                  modules={[Navigation, Pagination, Thumbs, FreeMode]}
                  spaceBetween={10}
                  navigation
                  pagination={{ clickable: true }}
                  thumbs={{ swiper: thumbsSwiper }}
                  className="h-96"
                >
                  {event.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative h-full w-full">
                        <img
                          src={image}
                          alt={`${event.title} - Imagen ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                          {index + 1} / {event.images.length}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Galería de miniaturas */}
                <div className="p-4 border-t border-gray-200">
                  <Swiper
                    modules={[FreeMode, Navigation, Thumbs]}
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    className="h-20"
                  >
                    {event.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <button
                          onClick={() => setActiveImage(index)}
                          className={`w-full h-full rounded-lg overflow-hidden border-2 ${
                            activeImage === index ? 'border-red-500' : 'border-transparent'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Miniatura ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </motion.div>

            {/* Mapa de ubicación */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center">
                    <MapPin className="mr-3 text-red-600" size={24} />
                    Ubicación del Evento
                  </h2>
                  <a
                    href={`https://maps.google.com/?q=${event.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Ver en Google Maps
                  </a>
                </div>

                <div className="h-96 rounded-xl overflow-hidden">
                  <MapContainer
                    center={event.coordinates}
                    zoom={15}
                    className="h-full w-full"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={event.coordinates}>
                      <Popup>
                        <div className="p-2">
                          <strong>{event.title}</strong>
                          <p className="text-sm">{event.address}</p>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Dirección exacta:</h4>
                      <p className="text-gray-700">{event.address}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Cómo llegar:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          {event.publicTransport}
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Estacionamiento: {event.parking}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Galería de fotos */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Camera className="mr-3 text-red-600" size={24} />
                  Galería de Fotos
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.gallery.map((photo) => (
                    <motion.div
                      key={photo.id}
                      whileHover={{ scale: 1.02 }}
                      className="relative group cursor-pointer"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Eye className="text-white" size={24} />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{photo.title}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Ver todas las fotos ({event.gallery.length})
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Columna derecha - Información del evento */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Encabezado del evento */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-lg p-6 mb-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                        {event.category}
                      </span>
                      {event.featured && (
                        <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm font-medium flex items-center">
                          <Star size={12} className="mr-1" />
                          Destacado
                        </span>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                      {event.title}
                    </h1>
                  </div>
                </div>

                {/* Estadísticas */}
                <div className="flex items-center justify-between py-4 border-y border-gray-200 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{event.stats.views}</div>
                    <div className="text-sm text-gray-600">Vistas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{event.stats.likes}</div>
                    <div className="text-sm text-gray-600">Me gusta</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{event.stats.attending}</div>
                    <div className="text-sm text-gray-600">Asistirán</div>
                  </div>
                </div>

                {/* Información básica */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="text-gray-400 mr-3" size={20} />
                    <div>
                      <p className="font-medium">{event.date}</p>
                      {event.endDate && (
                        <p className="text-sm text-gray-600">Hasta {event.endDate}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="text-gray-400 mr-3" size={20} />
                    <div>
                      <p className="font-medium">{event.time}</p>
                      <p className="text-sm text-gray-600">Duración aproximada</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="text-gray-400 mr-3" size={20} />
                    <div>
                      <p className="font-medium">{event.location}</p>
                      <p className="text-sm text-gray-600">{event.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <DollarSign className="text-gray-400 mr-3" size={20} />
                    <div>
                      <p className="font-medium">{event.price}</p>
                      <p className="text-sm text-gray-600">Entrada</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Users className="text-gray-400 mr-3" size={20} />
                    <div>
                      <p className="font-medium">{event.capacity} personas</p>
                      <p className="text-sm text-gray-600">Capacidad máxima</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-6">
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Acciones principales */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 mb-6"
              >
                <div className="space-y-3">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                      isLiked
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Heart size={20} className={isLiked ? 'fill-white' : ''} />
                    {isLiked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  </button>

                  <button
                    onClick={() => setShowContactModal(true)}
                    className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    Contactar al organizador
                  </button>

                  <button
                    onClick={() => setShowShareModal(true)}
                    className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
                  >
                    <Share2 size={20} />
                    Compartir evento
                  </button>
                </div>
              </motion.div>

              {/* Organizador */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 mb-6"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <User className="mr-2 text-red-600" size={20} />
                  Organizador
                </h2>

                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {event.organizer.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-bold text-lg">{event.organizer.name}</h3>
                      {event.organizer.verified && (
                        <CheckCircle className="ml-2 text-green-500" size={16} />
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star size={14} className="text-yellow-500 mr-1" />
                      <span>{event.organizer.rating} • {event.organizer.eventsCount} eventos</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => window.open(`tel:${event.organizer.phone}`)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <span className="flex items-center">
                      <Phone size={16} className="mr-2 text-gray-500" />
                      Llamar
                    </span>
                    <span className="text-gray-700 font-medium">{event.organizer.phone}</span>
                  </button>

                  <button
                    onClick={() => window.open(`mailto:${event.organizer.email}`)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <span className="flex items-center">
                      <Mail size={16} className="mr-2 text-gray-500" />
                      Email
                    </span>
                    <span className="text-gray-700 font-medium text-sm truncate">
                      {event.organizer.email}
                    </span>
                  </button>

                  <button
                    onClick={() => window.open(event.organizer.website, '_blank')}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <span className="flex items-center">
                      <LinkIcon size={16} className="mr-2 text-gray-500" />
                      Sitio web
                    </span>
                    <span className="text-gray-700 font-medium text-sm truncate">
                      {event.organizer.website}
                    </span>
                  </button>
                </div>
              </motion.div>

              {/* Información adicional */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold mb-4">Información Adicional</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Restricción de edad:</span>
                    <span className="font-medium">{event.ageRestriction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Código de vestimenta:</span>
                    <span className="font-medium">{event.dressCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transporte público:</span>
                    <span className="font-medium">{event.publicTransport}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estacionamiento:</span>
                    <span className="font-medium">{event.parking}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Descripción detallada */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Acerca de este evento</h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {event.description}
              </p>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <AlertCircle className="mr-2 text-blue-600" size={24} />
                  Información importante
                </h3>
                <div className="text-gray-700 whitespace-pre-line">
                  {event.detailedInfo}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Eventos similares */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Eventos similares</h2>
              <button className="text-red-600 hover:text-red-700 font-medium">
                Ver todos
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {similarEvents.map((similarEvent) => (
                <motion.div
                  key={similarEvent.id}
                  whileHover={{ y: -5 }}
                  onClick={() => navigate(`/evento/${similarEvent.id}`)}
                  className="bg-gray-50 rounded-xl overflow-hidden cursor-pointer group"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={similarEvent.image}
                      alt={similarEvent.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-red-600">
                      {similarEvent.title}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Calendar size={14} className="mr-2" />
                        <span className="text-sm">{similarEvent.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin size={14} className="mr-2" />
                        <span className="text-sm">{similarEvent.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign size={14} className="mr-2" />
                        <span className="text-sm">{similarEvent.price}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal de compartir */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-6">Compartir evento</h3>
              
              <div className="grid grid-cols-4 gap-4 mb-6">
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-4 bg-blue-100 rounded-xl hover:bg-blue-200 flex flex-col items-center"
                >
                  <Facebook className="text-blue-600 mb-2" size={24} />
                  <span className="text-sm">Facebook</span>
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 flex flex-col items-center"
                >
                  <Twitter className="text-blue-400 mb-2" size={24} />
                  <span className="text-sm">Twitter</span>
                </button>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="p-4 bg-green-100 rounded-xl hover:bg-green-200 flex flex-col items-center"
                >
                  <MessageCircle className="text-green-600 mb-2" size={24} />
                  <span className="text-sm">WhatsApp</span>
                </button>
                <button
                  onClick={copyLink}
                  className="p-4 bg-gray-100 rounded-xl hover:bg-gray-200 flex flex-col items-center"
                >
                  <LinkIcon className="text-gray-600 mb-2" size={24} />
                  <span className="text-sm">Copiar</span>
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowReportModal(true)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
                >
                  <Flag size={16} />
                  Reportar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de contacto */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Contactar al organizador</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tu nombre
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tu mensaje
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Escribe tu consulta aquí..."
                    defaultValue={`Hola, me interesa saber más sobre el evento "${event.title}"`}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    alert('Mensaje enviado al organizador')
                    setShowContactModal(false)
                  }}
                  className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Enviar mensaje
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de reporte */}
      <AnimatePresence>
        {showReportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setShowReportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Reportar evento</h3>
              <p className="text-gray-600 mb-6">
                ¿Por qué quieres reportar este evento?
              </p>
              
              <div className="space-y-3 mb-6">
                {[
                  'Contenido inapropiado',
                  'Información falsa',
                  'Evento duplicado',
                  'Contenido ofensivo',
                  'Spam o publicidad',
                  'Otro motivo'
                ].map((reason) => (
                  <button
                    key={reason}
                    onClick={() => handleReport(reason)}
                    className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {reason}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowReportModal(false)}
                className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EventDetail
