import { motion } from 'framer-motion';
import { Calendar, MapPin, Star } from 'lucide-react';
import { featuredEvents, upcomingEvents, categories } from '../lib/mockData';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Eventos y Fiestas en Ayacucho
          </motion.h1>
          <div className="space-x-4">
            <Link
              to="/publish"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-full inline-block transition"
            >
              Publica tu Evento
            </Link>
            <Link
              to="/calendar"
              className="bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-full inline-block transition"
            >
              Ver Calendario
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Eventos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredEvents.map(event => (
              <motion.div
                key={event.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <p className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                    <Calendar size={16} className="mr-2" /> {event.date}
                  </p>
                  <p className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin size={16} className="mr-2" /> {event.location}
                  </p>
                  <p className="mt-3 text-gray-700 dark:text-gray-400">{event.description.substring(0, 100)}...</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Próximos Eventos</h2>
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <img src={event.image} alt="" className="w-16 h-16 rounded object-cover" />
                <div className="ml-4">
                  <h3 className="font-bold">{event.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{event.date} • {event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Eventos por Categoría</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat}
                to={`/categories/${encodeURIComponent(cat)}`}
                className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition"
              >
                <Star size={32} className="text-yellow-500 mb-2" />
                <span className="text-center">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Map */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Eventos Cercanos</h2>
          <div className="bg-gray-200 dark:bg-gray-800 h-64 rounded-xl flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400">Mapa interactivo (próximamente)</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
