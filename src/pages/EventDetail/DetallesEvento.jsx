import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Star, 
  ChevronLeft,
  Share2,
  Heart,
  Navigation,
  Phone,
  Mail,
  Globe,
  Camera,
  Sun,
  Moon,
  Mountain,
  Thermometer,
  Wind,
  Cloud,
  Compass,
  ArrowUpRight,
  ExternalLink,
  CalendarDays,
  Map,
  Ticket,
  UserCircle,
  Info,
  AlertCircle
} from 'lucide-react';
// import { eventService } from '../services/api';
import { Tab } from '@headlessui/react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Datos simulados del Valle del Colca para enriquecer la experiencia
  const colcaData = {
    altitude: "3,400 - 4,910 msnm",
    climate: "Seco y soleado de día, frío de noche",
    bestTime: "Abril a Noviembre",
    condorViewing: "6:00 AM - 10:00 AM",
    hotSprings: [
      { name: "La Calera", temp: "38°C", distance: "3.5 km" },
      { name: "Chacapi", temp: "35°C", distance: "5 km" }
    ],
    viewpoints: [
      { name: "Cruz del Cóndor", altitude: "3,287 msnm" },
      { name: "Mirador de Tapay", altitude: "3,500 msnm" },
      { name: "Antahuilque", altitude: "4,100 msnm" }
    ],
    traditionalDishes: [
      "Chuño colqueño",
      "Cuy chactado",
      "Rocoto relleno",
      "Adobo arequipeño"
    ]
  };

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Fetch evento

  const data = {
              id: id || "1",
              title: "Festival del Cóndor en el Cañón del Colca",
              description: "Celebración ancestral que rinde homenaje al majestuoso cóndor andino, símbolo del Valle del Colca. Evento que combina tradiciones milenarias con expresiones culturales contemporáneas.",
              short_description: "Vive la magia del Colca en su máximo esplendor",
              category_name: "Festival Cultural",
              category_id: 1,
              start_datetime: "2025-06-24 06:00:00",
              end_datetime: "2025-06-26 22:00:00",
              address: "Cruz del Cóndor, Valle del Colca, Caylloma",
              district_id: 3,
              district_name: "Caylloma",
              latitude: -15.6394,
              longitude: -71.6392,
              price_type: "free",
              price: 0,
              featured_level: 3,
              capacity: 500,
              available_seats: 320,
              status: "published",
              main_image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
              organizer_name: "Comunidad Campesina del Colca",
              organizer_email: "colca@cultura.pe",
              images: [
                { url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", is_main: true },
                { url: "https://images.unsplash.com/photo-1598894597313-b7e5d7e9b3f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
                { url: "https://images.unsplash.com/photo-1585504231056-20df6a9b5e8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }
              ],
              details: [
                { section: "schedule", title: "06:00 AM", content: "Ceremonia ancestral de saludo al sol", order: 1 },
                { section: "schedule", title: "08:00 AM", content: "Avistamiento de cóndores en Cruz del Cóndor", order: 2 },
                { section: "schedule", title: "10:00 AM", content: "Feria artesanal de productos típicos", order: 3 },
                { section: "schedule", title: "02:00 PM", content: "Demonstración de tejidos andinos", order: 4 },
                { section: "schedule", title: "04:00 PM", content: "Danzas tradicionales: Wititi y Carnaval", order: 5 },
                { section: "recommendations", content: "Llevar ropa abrigadora, protector solar y cámara fotográfica", order: 1 },
                { section: "recommendations", content: "Aclimatarse 1-2 días antes por la altura", order: 2 },
                { section: "recommendations", content: "Respetar las tradiciones y espacios sagrados", order: 3 },
                { section: "important_info", content: "Altitud máxima: 4,910 msnm. Se recomienda chequeo médico previo", order: 1 },
                { section: "important_info", content: "Prohibido alimentar a los cóndores", order: 2 }
              ],
              contact: {
                name: "Comité de Turismo del Colca",
                phone: "+51 987 654 321",
                email: "turismo@colcavalley.pe",
                website: "www.colcavalley.pe"
              }
            };
setEvent(data);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.short_description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  const handleRegister = () => {
    // Lógica de registro
    console.log('Registrarse para el evento:', event.id);
  };

  const tabs = [
    { name: 'Programa', icon: CalendarDays },
    { name: 'Ubicación', icon: Map },
    { name: 'Información', icon: Info },
    { name: 'Galería', icon: Camera },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header con navegación */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-amber-100 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Volver</span>
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full ${isFavorite ? 'bg-red-50 dark:bg-red-900/30 text-red-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-500'}`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-amber-600 dark:hover:text-amber-400"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-amber-600 dark:hover:text-amber-400"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
        
        {/*
        <img
          src={event.images?.[0]?.url || event.main_image}
          alt={event.title}
          className="w-full h-[70vh] object-cover"
        />
        */}
        <div className="absolute bottom-0 left-0 right-0 z-20 text-white p-8">
          <div className="container mx-auto">
            <div className="inline-flex items-center space-x-2 bg-amber-500/90 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Mountain className="w-4 h-4" />
              <span className="text-sm font-semibold">VALLE DEL COLCA</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {event.title}
            </h1>
            
            <p className="text-xl opacity-90 max-w-3xl">
              {event.short_description}
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 -mt-20 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Card de información */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-amber-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <Info className="w-5 h-5 mr-2 text-amber-500" />
                Información del Evento
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fecha</p>
                    <p className="font-semibold">{formatDate(event.start_datetime)}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Horario</p>
                    <p className="font-semibold">{formatTime(event.start_datetime)} - {formatTime(event.end_datetime)}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ubicación</p>
                    <p className="font-semibold">{event.address}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{event.district_name}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <DollarSign className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Precio</p>
                    <p className="font-semibold">
                      {event.price_type === 'free' ? 'Gratuito' : 
                       event.price_type === 'paid' ? `S/ ${event.price}` : 
                       'Donación'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Disponibilidad</p>
                    <p className="font-semibold">
                      {event.available_seats} / {event.capacity} cupos
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(event.available_seats / event.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {event.featured_level > 0 && (
                  <div className="flex items-start space-x-3">
                    <Star className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Destacado</p>
                      <div className="flex">
                        {[...Array(event.featured_level)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-500 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleRegister}
                className="w-full mt-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Ticket className="w-5 h-5" />
                <span>Reservar mi cupo</span>
              </button>

              {/* Datos del Colca */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                  <Mountain className="w-5 h-5 mr-2 text-amber-500" />
                  Datos del Valle del Colca
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Altitud</span>
                    <span className="font-semibold">{colcaData.altitude}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Clima</span>
                    <span className="font-semibold">{colcaData.climate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Mejor época</span>
                    <span className="font-semibold">{colcaData.bestTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de contacto */}
            {event.contact && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-amber-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                  <UserCircle className="w-5 h-5 mr-2 text-amber-500" />
                  Contacto
                </h3>

                <div className="space-y-4">
                  {event.contact.name && (
                    <div className="flex items-center space-x-3">
                      <UserCircle className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">{event.contact.name}</span>
                    </div>
                  )}

                  {event.contact.phone && (
                    <a
                      href={`tel:${event.contact.phone}`}
                      className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400"
                    >
                      <Phone className="w-5 h-5" />
                      <span>{event.contact.phone}</span>
                    </a>
                  )}

                  {event.contact.email && (
                    <a
                      href={`mailto:${event.contact.email}`}
                      className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400"
                    >
                      <Mail className="w-5 h-5" />
                      <span>{event.contact.email}</span>
                    </a>
                  )}

                  {event.contact.website && (
                    <a
                      href={event.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400"
                    >
                      <Globe className="w-5 h-5" />
                      <span>Sitio web</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {event.latitude && event.longitude && (
                  <a
                    href={`https://www.google.com/maps?q=${event.latitude},${event.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center space-x-2 px-4 py-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <Navigation className="w-5 h-5" />
                    <span>Abrir en Google Maps</span>
                  </a>
                )}
              </div>
            )}

            {/* Vista de clima */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Cloud className="w-5 h-5 mr-2" />
                Clima en el Colca
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-5 h-5" />
                    <span>Temperatura</span>
                  </div>
                  <span className="text-2xl font-bold">18°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wind className="w-5 h-5" />
                    <span>Viento</span>
                  </div>
                  <span className="font-bold">15 km/h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Compass className="w-5 h-5" />
                    <span>Altitud</span>
                  </div>
                  <span className="font-bold">3,287 msnm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <Tab.Group>
              <Tab.List className="flex space-x-2 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg border border-amber-100 dark:border-gray-700">
                {tabs.map(({ name, icon: Icon }) => (
                  <Tab
                    key={name}
                    className={({ selected }) =>
                      `flex-1 py-4 px-6 rounded-xl text-center font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                        selected
                          ? 'bg-amber-500 text-white shadow-md'
                          : 'text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span>{name}</span>
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels className="mt-6">
                {/* Panel: Programa */}
                <Tab.Panel>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-amber-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                      Programación del Festival
                    </h2>
                    
                    <div className="space-y-6">
                      {event.details
                        ?.filter(d => d.section === 'schedule')
                        .sort((a, b) => a.order - b.order)
                        .map((detail, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-4 p-4 rounded-xl border-l-4 border-amber-500 bg-amber-50/50 dark:bg-gray-700/50"
                          >
                            <div className="flex-shrink-0 w-16 text-center">
                              <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                                {detail.title.split(' ')[0]}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {detail.title.split(' ').slice(1).join(' ')}
                              </div>
                            </div>
                            <div className="flex-grow">
                              <h3 className="font-semibold text-gray-800 dark:text-white">
                                {detail.content}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Duración aproximada: 2 horas
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </Tab.Panel>

                {/* Panel: Ubicación */}
                <Tab.Panel>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-amber-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                      Ubicación y Accesos
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-bold text-gray-800 dark:text-white mb-3">
                            Cómo llegar
                          </h3>
                          <ul className="space-y-3">
                            <li className="flex items-start space-x-2">
                              <span className="text-amber-500 font-bold">1.</span>
                              <span>Desde Arequipa: 4 horas en bus</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-amber-500 font-bold">2.</span>
                              <span>Transporte turístico disponible desde Chivay</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-amber-500 font-bold">3.</span>
                              <span>Colectivos desde Cabanaconde cada hora</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-bold text-gray-800 dark:text-white mb-3">
                            Miradores del Valle
                          </h3>
                          <ul className="space-y-3">
                            {colcaData.viewpoints.map((viewpoint, index) => (
                              <li key={index} className="flex justify-between items-center">
                                <span>{viewpoint.name}</span>
                                <span className="text-sm text-gray-500">{viewpoint.altitude}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Mapa placeholder */}
                      <div className="mt-6">
                        <div className="h-64 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center">
                          <div className="text-center">
                            <Map className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">
                              Mapa interactivo del Valle del Colca
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>

                {/* Panel: Información */}
                <Tab.Panel>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-amber-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                      Información Importante
                    </h2>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="font-bold text-gray-800 dark:text-white mb-4">
                          Recomendaciones
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {event.details
                            ?.filter(d => d.section === 'recommendations')
                            .map((detail, index) => (
                              <div
                                key={index}
                                className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl"
                              >
                                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-sm">✓</span>
                                </div>
                                <span>{detail.content}</span>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-800 dark:text-white mb-4">
                          Gastronomía Típica
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {colcaData.traditionalDishes.map((dish, index) => (
                            <div
                              key={index}
                              className="text-center p-3 bg-amber-50 dark:bg-gray-700 rounded-lg hover:bg-amber-100 dark:hover:bg-gray-600 transition-colors"
                            >
                              <span className="text-sm font-medium">{dish}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-800 dark:text-white mb-4">
                          Balnearios Termales
                        </h3>
                        <div className="space-y-3">
                          {colcaData.hotSprings.map((spring, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                            >
                              <div>
                                <span className="font-medium">{spring.name}</span>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Temperatura: {spring.temp}
                                </p>
                              </div>
                              <span className="text-sm text-gray-500">{spring.distance}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>

                {/* Panel: Galería */}
                <Tab.Panel>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-amber-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                      Galería del Colca
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {event.images?.map((img, index) => (
                        <div
                          key={index}
                          className="relative overflow-hidden rounded-xl group cursor-pointer"
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <img
                            src={img.url}
                            alt={`Imagen ${index + 1}`}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Camera className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Galería principal */}
                    {event.images?.length > 0 && (
                      <div className="mt-8">
                        <div className="relative h-96 rounded-2xl overflow-hidden">
                          <img
                            src={event.images[currentImageIndex]?.url}
                            alt="Vista principal"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {event.images.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            {/* Descripción detallada */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-amber-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Sobre el Evento
              </h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border-l-4 border-amber-500">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-3">
                    🏔️ Tradición y Naturaleza
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    El Valle del Colca, uno de los cañones más profundos del mundo, es hogar de 
                    comunidades que mantienen vivas sus tradiciones ancestrales. Este festival es 
                    una oportunidad única para conectar con la cultura viva del Perú.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-amber-100 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <Mountain className="w-8 h-8 text-amber-500" />
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                  Valle del Colca
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Patrimonio Cultural y Natural del Perú
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <button className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400">
                Términos
              </button>
              <button className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400">
                Privacidad
              </button>
              <button className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-semibold transition-colors">
                <ArrowUpRight className="w-4 h-4 inline mr-2" />
                Más eventos
              </button>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>© 2024 Culture Platform. Todos los derechos reservados.</p>
            <p className="mt-2">El Valle del Colca, Arequipa - Perú</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EventDetails;
