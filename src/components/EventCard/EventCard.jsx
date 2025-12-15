import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Star, Users, Clock, Share2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Fiestas Patronales': 'bg-red-100 text-red-600',
      'Matrimonios': 'bg-pink-100 text-pink-600',
      'Ferias': 'bg-yellow-100 text-yellow-600',
      'Actividades escolares': 'bg-blue-100 text-blue-600',
      'Conciertos': 'bg-purple-100 text-purple-600',
      'Danzas': 'bg-indigo-100 text-indigo-600',
      'Gastronomía': 'bg-orange-100 text-orange-600',
      'Deportes': 'bg-green-100 text-green-600'
    };
    return colors[category] || 'bg-gray-100 text-gray-600';
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    // Lógica para compartir
    console.log('Compartir evento:', event.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 border border-gray-100"
    >
      {/* Imagen del evento */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={event.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop'}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges superpuestos */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>
          {event.featured && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-medium flex items-center">
              <Star size={12} className="mr-1" />
              Destacado
            </span>
          )}
        </div>

        {/* Acciones en la imagen */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleLike}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            <Heart 
              size={18} 
              className={isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'} 
            />
          </button>
          <button
            onClick={handleShare}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            <Share2 size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Contador de asistentes (si existe) */}
        {event.attending && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs">
            <Users size={12} className="inline mr-1" />
            {event.attending} asistentes
          </div>
        )}
      </div>

      {/* Contenido del card */}
      <div className="p-5">
        {/* Fecha y hora */}
        <div className="flex items-center text-gray-600 mb-3">
          <Calendar size={16} className="mr-2 flex-shrink-0" />
          <span className="text-sm font-medium">{formatDate(event.date)}</span>
          {event.time && (
            <>
              <span className="mx-2">•</span>
              <Clock size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm">{event.time}</span>
            </>
          )}
        </div>

        {/* Título del evento */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
          {event.title}
        </h3>

        {/* Ubicación */}
        <div className="flex items-start text-gray-600 mb-4">
          <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
          <span className="text-sm line-clamp-2">{event.location}</span>
        </div>

        {/* Información adicional */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          {event.price ? (
            <div className="font-bold text-gray-900">
              {event.price === 'Gratuito' ? (
                <span className="text-green-600">Gratuito</span>
              ) : (
                event.price
              )}
            </div>
          ) : (
            <div className="text-sm text-gray-500">Precio no especificado</div>
          )}
          
          <Link
            to={`/evento/${event.id}`}
            className="text-red-600 font-medium text-sm hover:text-red-700 flex items-center group"
          >
            Ver detalles
            <svg 
              className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Componente para la lista de eventos (si necesitas una versión más simple)
export const SimpleEventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-400 rounded-lg flex items-center justify-center text-white font-bold">
            {event.date ? event.date.split(' ')[0] : '??'}
          </div>
        </div>
        <div className="flex-grow">
          <h4 className="font-bold text-gray-900 mb-1">{event.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{event.category}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin size={14} className="mr-1" />
            {event.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
