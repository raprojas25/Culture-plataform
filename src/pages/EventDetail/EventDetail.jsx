import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
  Share2,
  Heart,
  Facebook,
  Twitter,
  MessageCircle,
  ChevronLeft,
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
  XCircle,
} from "lucide-react";
import { mockEvents } from "../../data/events";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "leaflet/dist/leaflet.css";
import "./EventDetail.css";

// Fix para iconos de Leaflet
import L from "leaflet";
import toast, { Toaster } from "react-hot-toast";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [similarEvents, setSimilarEvents] = useState([]);

  // Cargar evento por ID
  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);

        // Simular un delay de red
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Buscar el evento en los datos mock
        const eventId = parseInt(id);
        const foundEvent = mockEvents.find((e) => e.id === eventId);

        if (!foundEvent) {
          throw new Error(`Evento con ID ${id} no encontrado`);
        }

        // Enriquecer los datos del evento
        const enrichedEvent = {
          ...foundEvent,
          // Añadir datos adicionales si no existen
          images: foundEvent.images || [
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&auto=format&fit=crop",
          ],
          gallery: foundEvent.gallery || [
            {
              id: 1,
              url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
              title: "Imagen del evento",
            },
            {
              id: 2,
              url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
              title: "Más fotos",
            },
          ],
          stats: foundEvent.stats || {
            views: 1245,
            likes: 289,
            shares: 156,
            saved: 89,
            attending: 450,
          },
          organizer: foundEvent.organizer || {
            name: "Organizador del Evento",
            phone: "+51 987 654 321",
            email: "organizador@evento.com",
            website: "www.ejemplo.com",
            verified: true,
            rating: 4.5,
            eventsCount: 10,
          },
          tags: foundEvent.tags || ["Evento", "Cultural", "Comunidad"],
          detailedInfo:
            foundEvent.detailedInfo || "Información detallada del evento...",
        };

        setEvent(enrichedEvent);

        // Cargar eventos similares (misma categoría)
        const similar = mockEvents
          .filter((e) => e.id !== eventId && e.category === foundEvent.category)
          .slice(0, 3);
        setSimilarEvents(similar);
      } catch (err) {
        console.error("Error cargando evento:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadEvent();
    }
  }, [id]);

  const handleShare = (platform) => {
    if (!event) return;

    const url = window.location.href;
    const text = `¡Mira este evento cultural: ${event.title}!`;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
    }

    setShowShareModal(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" />
            <div>
              <p className="text-sm">Enlace copiado al portapapeles!</p>
            </div>
          </div>,
          { duration: 3000 }
    )

    // alert("¡Enlace copiado al portapapeles!");
    setShowShareModal(false);
  };

  const handleReport = (reason) => {
    console.log("Evento reportado:", reason);
    setShowReportModal(false);
    
    toast.success(
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" />
            <div>
              <p className="text-sm">Gracias por tu reporte. Revisaremos este evento.</p>
            </div>
          </div>,
          { duration: 3000 }
    )

    // alert("Gracias por tu reporte. Revisaremos este evento.");
  };

  // Estados de carga y error
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando evento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Evento no encontrado</h2>
          <p className="text-gray-600 mb-6">
            El evento que buscas no existe o ha sido eliminado.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Explorar eventos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-16">
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
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <Swiper
            modules={[Navigation, Pagination, Thumbs]}
            spaceBetween={10}
            navigation
            pagination={{ clickable: true }}
            className="h-96"
          >
            {event.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${event.title} - Imagen ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Información del evento */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
              <div className="flex items-center mb-4">
                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                  {event.category}
                </span>
                {event.featured && (
                  <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm font-medium">
                    Destacado
                  </span>
                )}
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="text-gray-400 mr-3" size={20} />
                  <div>
                    <p className="font-medium">{event.date}</p>
                    <p className="text-sm text-gray-600">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="text-gray-400 mr-3" size={20} />
                  <div>
                    <p className="font-medium">{event.location}</p>
                    <p className="text-sm text-gray-600">{event.address}</p>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700">{event.description}</p>
              </div>
            </div>

         {/* Panel lateral con acciones */}
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Acciones</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                  >
                    Contactar organizador
                  </button>
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Compartir evento
                  </button>
                </div>
              </div>
            </div>

        {/* Información del organizador */}
            <div className="sticky top-24">
              {event.organizer && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Organizador</h2>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {event.organizer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold">{event.organizer.name}</h3>
                      {event.organizer.verified && (
                        <span className="text-xs text-green-600">✓ Verificado</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>


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
                    className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-gray-200"
                  >
                    {reason}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowReportModal(false)}
                className="w-full py-2 border border-gray-300 rounded-lg bg-red-600 text-white hover:bg-gray-50"
              >
                Cancelar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default EventDetail;
