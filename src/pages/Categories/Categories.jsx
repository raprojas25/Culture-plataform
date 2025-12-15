import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Star, 
  ChevronRight, 
  Search, 
  Filter, 
  Grid3x3,
  List,
  ArrowLeft,
  TrendingUp,
  Clock,
  Tag
} from 'lucide-react';
import { mockEvents } from '../../data/events';
import EventCard from '../../components/EventCard/EventCard';
import './Categories.css';

const Categories = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [events, setEvents] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date', 'popularity', 'name'

  // Categorías completas con íconos y descripciones
  const categories = [
    {
      id: 1,
      slug: 'fiestas-patronales',
      name: 'Fiestas Patronales',
      icon: '🎉',
      description: 'Celebraciones religiosas y tradicionales en honor a santos patronos',
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      count: 24
    },
    {
      id: 2,
      slug: 'matrimonios',
      name: 'Matrimonios',
      icon: '💍',
      description: 'Bodas y celebraciones matrimoniales tradicionales',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      count: 18
    },
    {
      id: 3,
      slug: 'ferias',
      name: 'Ferias',
      icon: '🎪',
      description: 'Ferias comerciales, artesanales y agrícolas',
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      count: 32
    },
    {
      id: 4,
      slug: 'actividades-escolares',
      name: 'Actividades Escolares',
      icon: '🎓',
      description: 'Eventos educativos, festivales y competencias escolares',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      count: 15
    },
    {
      id: 5,
      slug: 'rituales-tradicion',
      name: 'Rituales / Tradición',
      icon: '🕯️',
      description: 'Ceremonias ancestrales y tradiciones culturales',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      count: 12
    },
    {
      id: 6,
      slug: 'conciertos',
      name: 'Conciertos',
      icon: '🎵',
      description: 'Presentaciones musicales y shows en vivo',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      count: 28
    },
    {
      id: 7,
      slug: 'deportes',
      name: 'Deportes',
      icon: '⚽',
      description: 'Eventos deportivos, torneos y competencias',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      count: 21
    },
    {
      id: 8,
      slug: 'procesiones',
      name: 'Procesiones',
      icon: '⛪',
      description: 'Procesiones religiosas y manifestaciones de fe',
      color: 'from-gray-500 to-slate-600',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-600',
      count: 16
    },
    {
      id: 9,
      slug: 'gastronomia',
      name: 'Gastronomía',
      icon: '🍲',
      description: 'Festivales gastronómicos y eventos culinarios',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      count: 19
    },
    {
      id: 10,
      slug: 'danzas',
      name: 'Danzas',
      icon: '💃',
      description: 'Festivales de danza y presentaciones folklóricas',
      color: 'from-rose-500 to-pink-500',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600',
      count: 14
    }
  ];

  // Cargar categoría seleccionada desde parámetro de ruta
  useEffect(() => {
    if (categorySlug) {
      const category = categories.find(cat => cat.slug === categorySlug);
      if (category) {
        setSelectedCategory(category);
        // Filtrar eventos por categoría
        const filteredEvents = mockEvents.filter(event => 
          event.category?.toLowerCase().includes(category.name.toLowerCase())
        );
        setEvents(filteredEvents);
      }
    } else {
      setSelectedCategory(null);
    }
  }, [categorySlug]);

  // Ordenar eventos
  const sortedEvents = [...events].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.date) - new Date(b.date);
      case 'popularity':
        return (b.attending || 0) - (a.attending || 0);
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Filtrar por búsqueda
  const filteredEvents = sortedEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Vista de todas las categorías
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Explora por Categoría
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Descubre eventos culturales organizados por tipo de actividad
              </p>
            </motion.div>
          </div>
        </div>

        {/* Categorías Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => navigate(`/categorias/${category.slug}`)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
              >
                <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-4xl mb-3 block">{category.icon}</span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {category.name}
                      </h3>
                    </div>
                    <span className={`px-3 py-1 ${category.bgColor} ${category.textColor} rounded-full text-sm font-medium`}>
                      {category.count} eventos
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {category.description}
                  </p>
                  <div className="flex items-center text-red-600 font-medium">
                    <span>Ver eventos</span>
                    <ChevronRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Estadísticas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              Distribución de Eventos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {categories.slice(0, 5).map(category => (
                <div key={category.id} className="text-center">
                  <div className={`text-3xl mb-2 ${category.textColor}`}>
                    {category.icon}
                  </div>
                  <div className="text-2xl font-bold">{category.count}</div>
                  <div className="text-sm text-gray-600">{category.name}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Vista de categoría específica
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header de categoría */}
      <div className={`bg-gradient-to-r ${selectedCategory.color} text-white`}>
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/categorias')}
            className="flex items-center text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver a categorías
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-5xl mr-4">{selectedCategory.icon}</span>
                <div>
                  <h1 className="text-4xl font-bold">{selectedCategory.name}</h1>
                  <p className="text-xl opacity-90 mt-2">{selectedCategory.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mt-6">
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                  <Tag size={18} className="mr-2" />
                  <span className="font-medium">{filteredEvents.length} eventos encontrados</span>
                </div>
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                  <TrendingUp size={18} className="mr-2" />
                  <span className="font-medium">{selectedCategory.count} eventos totales</span>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full">
                <div className="text-3xl font-bold">{selectedCategory.count}</div>
                <div className="ml-3 text-left">
                  <div className="text-sm opacity-80">Eventos</div>
                  <div className="text-sm font-medium">en esta categoría</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controles de búsqueda y filtros */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Barra de búsqueda */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={`Buscar en ${selectedCategory.name}...`}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Controles de vista y orden */}
            <div className="flex items-center space-x-4">
              {/* Botones de vista */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                >
                  <Grid3x3 size={20} className={viewMode === 'grid' ? 'text-red-600' : 'text-gray-500'} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                >
                  <List size={20} className={viewMode === 'list' ? 'text-red-600' : 'text-gray-500'} />
                </button>
              </div>

              {/* Dropdown de orden */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-100 border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="date">Ordenar por fecha</option>
                  <option value="popularity">Ordenar por popularidad</option>
                  <option value="name">Ordenar por nombre</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        {filteredEvents.length > 0 ? (
          <>
            {/* Vista Grid */}
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <Link key={event.id} to={`/evento/${event.id}`}>
                    <EventCard event={event} />
                  </Link>
                ))}
              </div>
            ) : (
              /* Vista Lista */
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 5 }}
                    onClick={() => navigate(`/evento/${event.id}`)}
                    className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      {/* Imagen */}
                      <div className="md:w-48 md:h-32">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Información */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                          {event.featured && (
                            <Star className="text-yellow-500 fill-yellow-500" size={20} />
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {event.description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center text-gray-500">
                            <Calendar size={16} className="mr-2" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <MapPin size={16} className="mr-2" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Users size={16} className="mr-2" />
                            <span>{event.attending || 0} asistentes</span>
                          </div>
                        </div>
                      </div>

                      {/* Precio */}
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          event.price === 'Gratuito' ? 'text-green-600' : 'text-gray-900'
                        }`}>
                          {event.price}
                        </div>
                        <div className="text-sm text-gray-500">Entrada</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Estadísticas de la categoría */}
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">
                Estadísticas de {selectedCategory.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-red-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {Math.round(filteredEvents.length / selectedCategory.count * 100)}%
                  </div>
                  <div className="text-gray-700">Eventos activos este mes</div>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {filteredEvents.reduce((sum, event) => sum + (event.attending || 0), 0)}
                  </div>
                  <div className="text-gray-700">Total de asistentes</div>
                </div>
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {filteredEvents.filter(e => e.featured).length}
                  </div>
                  <div className="text-gray-700">Eventos destacados</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Sin resultados */
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No se encontraron eventos
            </h3>
            <p className="text-gray-600 mb-8">
              No hay eventos en {selectedCategory.name} que coincidan con tu búsqueda
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}

        {/* Categorías relacionadas */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6">Categorías relacionadas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories
              .filter(cat => cat.id !== selectedCategory.id)
              .slice(0, 4)
              .map(category => (
                <Link
                  key={category.id}
                  to={`/categorias/${category.slug}`}
                  className={`${category.bgColor} p-4 rounded-xl hover:shadow-md transition-shadow`}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="font-medium">{category.name}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {category.count} eventos
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
