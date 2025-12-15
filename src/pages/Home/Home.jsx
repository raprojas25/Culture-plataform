import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronRight, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import EventCard from "../../components/EventCard/EventCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const Home = () => {
  const [featuredEvents] = useState([
    {
      id: 1,
      title: "Fiesta Patronal de San Juan",
      date: "24 Junio 2024",
      location: "Plaza Principal",
      category: "Fiestas Patronales",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
      featured: true,
    },
    {
      id: 2,
      title: "Festival Gastronómico Regional",
      date: "15 Julio 2024",
      location: "Parque Central",
      category: "Gastronomía",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w-800",
      featured: true,
    },
    {
      id: 3,
      title: "Concierto de Música Andina",
      date: "30 Junio 2024",
      location: "Anfiteatro Municipal",
      category: "Conciertos",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w-800",
      featured: true,
    },
  ]);

  const [upcomingEvents] = useState([
    {
      id: 4,
      title: "Matrimonio Tradicional",
      date: "10 Julio 2024",
      location: "Iglesia Principal",
      category: "Matrimonios",
    },
    {
      id: 5,
      title: "Feria Artesanal",
      date: "20 Julio 2024",
      location: "Mercado Municipal",
      category: "Ferias",
    },
    {
      id: 6,
      title: "Festival de Danzas",
      date: "5 Agosto 2024",
      location: "Coliseo",
      category: "Danzas",
    },
    {
      id: 7,
      title: "Competencia Deportiva",
      date: "12 Agosto 2024",
      location: "Estadio",
      category: "Deportes",
    },
  ]);

  const categories = [
    { id: 1, name: "Fiestas patronales", icon: "🎉", count: 12 },
    { id: 2, name: "Matrimonios", icon: "💍", count: 8 },
    { id: 3, name: "Ferias", icon: "🎪", count: 15 },
    { id: 4, name: "Actividades escolares", icon: "🎓", count: 10 },
    { id: 5, name: "Conciertos / bailes", icon: "🎵", count: 20 },
    { id: 6, name: "Deportes", icon: "⚽", count: 18 },
    { id: 7, name: "Gastronomía", icon: "🍲", count: 14 },
    { id: 8, name: "Danzas", icon: "💃", count: 9 },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-orange-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Eventos y Fiestas en [Provincia]
          </motion.h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Descubre y comparte los eventos culturales, fiestas patronales y
            actividades más importantes de tu localidad.
          </p>

          <div className="flex flex-col md:flex-row justify-center content-center gap-4">
  <Link to="/publicar-evento">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white text-red-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 flex items-center justify-center gap-2"
    >
      Publica tu Evento
      <ChevronRight />
    </motion.button>
  </Link>
  
  <Link to="/calendario">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-red-600 flex items-center justify-center gap-2"
    >
      Ver Calendario
      <Calendar />
    </motion.button>
  </Link>
</div> 
        </div>
      </section>

      {/* Eventos Destacados */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Eventos Destacados</h2>
            <button className="text-red-600 font-medium flex items-center gap-1">
              Ver todos <ChevronRight size={20} />
            </button>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {featuredEvents.map((event) => (
              <SwiperSlide key={event.id}>
                <EventCard event={event} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Próximos Eventos */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Próximos Eventos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.category}</p>
                  </div>
                  <Star className="text-yellow-500" size={20} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eventos por Categoría */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Eventos por Categoría</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-4 text-center cursor-pointer hover:shadow-lg"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-sm">{category.name}</h3>
                <p className="text-xs text-gray-500">
                  {category.count} eventos
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa de Eventos */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Eventos en el Mapa</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-red-600 mx-auto mb-4" />
                <p className="text-gray-600">Mapa interactivo de eventos</p>
                <p className="text-sm text-gray-500">
                  (Integrar con react-leaflet)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
