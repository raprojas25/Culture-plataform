import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  DollarSign,
  Heart,
  Share2,
  Users,
  Clock,
  ArrowLeft,
  Edit,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEvents } from "../../hooks/useEvents";
import { useAuthStore } from "../../stores/authStore";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Navigation } from "swiper/modules";

export const EventDetails = () => {
  const { id } = useParams();
  const { fetchEventById } = useEvents();
  const { user } = useAuthStore();
  const [event, setEvent] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadEvent();
    }
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const data = await fetchEventById(Number(id));
      setEvent(data);
    } catch (error) {
      console.error("Error loading event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Implement like functionality
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: event?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Enlace copiado al portapapeles");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Evento no encontrado
        </h2>
        <Link to="/events">
          <Button
            variant="primary"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Volver a eventos
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <Link
              to="/"
              className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
            >
              Inicio
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <Link
                to="/events"
                className="ml-1 text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
              >
                Eventos
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">
                {event.title}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="aspect-w-16 aspect-h-7">
          <img
            src={
              event.main_image ||
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200"
            }
            alt={event.title}
            className="w-full h-96 object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="success" className="mb-2">
                {event.category_name}
              </Badge>
              <h1 className="text-4xl font-bold text-white mb-2">
                {event.title}
              </h1>
              <div className="flex items-center space-x-4 text-white/90">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>
                    {format(
                      new Date(event.start_datetime),
                      "EEEE d 'de' MMMM, yyyy",
                      {
                        locale: es,
                      },
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{event.district_name}</span>
                </div>
              </div>
            </div>
            {user?.id === event.organizer_id && (
              <Link to={`/events/edit/${event.id}`}>
                <Button
                  variant="primary"
                  leftIcon={<Edit className="w-4 h-4" />}
                >
                  Editar Evento
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Descripción
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {event.description}
              </p>
            </div>
          </div>

          {/* Gallery */}
          {event.images && event.images.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Galería
              </h2>
              <Swiper
                modules={[Pagination, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="rounded-lg"
              >
                {event.images.map((image) => (
                  <SwiperSlide key={image.id}>
                    <img
                      src={image.image_url}
                      alt={image.alt_text}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Event Info Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Información del Evento
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(event.start_datetime), "PPP", {
                      locale: es,
                    })}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {format(new Date(event.start_datetime), "p", {
                      locale: es,
                    })}{" "}
                    -{" "}
                    {format(new Date(event.end_datetime), "p", { locale: es })}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {event.district_name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {event.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {event.price_type === "free"
                      ? "Gratis"
                      : event.price_type === "paid"
                        ? `S/ ${event.price_amount?.toFixed(2)}`
                        : "Donación"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {event.price_type === "free"
                      ? "Entrada libre"
                      : "Compra tu entrada"}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Organizado por
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {event.organizer_username}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Likes</span>
                <div className="flex items-center">
                  <Heart
                    className={`w-5 h-5 mr-2 cursor-pointer ${
                      isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                    }`}
                    onClick={handleLike}
                  />
                  <span className="font-semibold">
                    {event.likes_count || 0}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Vistas</span>
                <span className="font-semibold">{event.views || 0}</span>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => {
                      // Implement ticket purchase
                    }}
                  >
                    {event.price_type === "free"
                      ? "Registrarse Gratis"
                      : "Comprar Entrada"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    leftIcon={<Share2 className="w-4 h-4" />}
                    onClick={handleShare}
                  >
                    Compartir Evento
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Map (if coordinates available) */}
          {event.latitude && event.longitude && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Ubicación
              </h3>
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg">
                {/* Implement map component here */}
                <div className="w-full h-full flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-primary-600" />
                </div>
              </div>
              <a
                href={`https://maps.google.com/?q=${event.latitude},${event.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline"
              >
                Ver en Google Maps
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
