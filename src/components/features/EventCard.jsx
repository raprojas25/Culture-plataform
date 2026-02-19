import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { Badge } from '../../components/ui/Badge';

export const EventCard = ({
  event,
  onLike,
  isLiked = false,
}) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <Badge variant="success">Publicado</Badge>;
      case 'draft':
        return <Badge variant="warning">Borrador</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Cancelado</Badge>;
      case 'completed':
        return <Badge variant="info">Completado</Badge>;
      default:
        return null;
    }
  };

  const getPriceText = () => {
    switch (event.price_type) {
      case 'free':
        return 'Gratis';
      case 'paid':
        return `S/ ${event.price_amount?.toFixed(2)}`;
      case 'donation':
        return 'Donación';
      default:
        return '';
    }
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.main_image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          {getStatusBadge(event.status)}
        </div>
        <div className="absolute top-3 right-3">
          {event.featured_level > 0 && (
            <Badge variant="warning">Destacado</Badge>
          )}
        </div>
        {onLike && (
          <button
            onClick={() => onLike(event.id)}
            className="absolute bottom-3 right-3 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full hover:bg-white dark:hover:bg-gray-900"
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            />
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
            {event.category_name}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {event.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              {format(new Date(event.start_datetime), "PP 'a las' p", {
                locale: es,
              })}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.district_name || event.address}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>{getPriceText()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              <Heart className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {event.likes_count || 0}
              </span>
            </div>
          </div>

          <Link
            to={`/events/${event.id}`}
            className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
          >
            Ver detalles →
          </Link>
        </div>
      </div>
    </div>
  );
};

