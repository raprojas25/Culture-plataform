import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Heart,
  Download,
  Share2,
  Calendar,
  MapPin,
  Camera,
  ChevronDown,
  Grid,
  List,
  Star,
  Clock,
  Eye,
  X,
  Maximize2
} from 'lucide-react'

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('todas')
  const [selectedImage, setSelectedImage] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState([])

  // Categorías inspiradas en la cultura andina
  const categories = [
    { id: 'todas', name: 'Todas', color: 'bg-gray-100 text-gray-700', count: 48 },
    { id: 'antiguas', name: 'Fotos Antiguas', color: 'bg-amber-50 text-amber-700', count: 12 },
    { id: 'mejor-mes', name: 'Mejor Foto del Mes', color: 'bg-yellow-50 text-yellow-700', count: 6 },
    { id: 'patronales', name: 'Patronales', color: 'bg-red-50 text-red-700', count: 15 },
    { id: 'ferias', name: 'Ferias', color: 'bg-green-50 text-green-700', count: 10 },
    { id: 'bodas', name: 'Bodas', color: 'bg-pink-50 text-pink-700', count: 8 },
    { id: 'desfiles', name: 'Desfiles', color: 'bg-blue-50 text-blue-700', count: 7 },
    { id: 'paisajes', name: 'Paisajes', color: 'bg-indigo-50 text-indigo-700', count: 14 }
  ]

  // Paleta de colores inspirada en la cultura andina
  const andeanColors = [
    '#dc2626', // Rojo andino
    '#ea580c', // Naranja terracota
    '#ca8a04', // Oro
    '#16a34a', // Verde de la Pacha Mama
    '#0891b2', // Azul del cielo
    '#7c3aed', // Púrpura de los textiles
    '#db2777', // Rosa de las flores
    '#92400e'  // Marrón tierra
  ]

  // Datos de ejemplo para las imágenes
  const [images, setImages] = useState([
    {
      id: 1,
      title: 'Procesión en los Andes',
      description: 'Tradicional procesión en las alturas de la sierra',
      category: 'patronales',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop',
      date: '15 Jun 2023',
      location: 'Comunidad Andina',
      photographer: 'Juan Pérez',
      likes: 245,
      views: 1200,
      featured: true,
      color: '#dc2626'
    },
    {
      id: 2,
      title: 'Matrimonio Tradicional',
      description: 'Boda con trajes típicos de la región',
      category: 'bodas',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop',
      date: '22 Jul 2023',
      location: 'Iglesia Colonial',
      photographer: 'María López',
      likes: 189,
      views: 950,
      featured: false,
      color: '#db2777'
    },
    {
      id: 3,
      title: 'Mercado Andino',
      description: 'Feria artesanal con productos locales',
      category: 'ferias',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
      date: '30 Ago 2023',
      location: 'Plaza Principal',
      photographer: 'Carlos Ruiz',
      likes: 312,
      views: 1800,
      featured: true,
      color: '#16a34a'
    },
    {
      id: 4,
      title: 'Cordillera al Amanecer',
      description: 'Paisaje montañoso con los primeros rayos de sol',
      category: 'paisajes',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop',
      date: '5 Sep 2023',
      location: 'Cordillera Blanca',
      photographer: 'Ana Torres',
      likes: 423,
      views: 2100,
      featured: true,
      color: '#0891b2'
    },
    {
      id: 5,
      title: 'Desfile de Danzas',
      description: 'Presentación de danzas tradicionales',
      category: 'desfiles',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop',
      date: '12 Oct 2023',
      location: 'Anfiteatro Municipal',
      photographer: 'Luis Gómez',
      likes: 278,
      views: 1350,
      featured: false,
      color: '#7c3aed'
    },
    {
      id: 6,
      title: 'Fiesta de los 80s',
      description: 'Fotografía histórica de celebración comunal',
      category: 'antiguas',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop',
      date: '1985',
      location: 'Centro del Pueblo',
      photographer: 'Archivo Histórico',
      likes: 156,
      views: 850,
      featured: false,
      color: '#92400e'
    },
    {
      id: 7,
      title: 'Ganadora Septiembre',
      description: 'Foto del mes: Ritual de la cosecha',
      category: 'mejor-mes',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop',
      date: 'Sep 2023',
      location: 'Campos de Cultivo',
      photographer: 'Roberto Quispe',
      likes: 512,
      views: 2800,
      featured: true,
      color: '#ca8a04'
    },
    {
      id: 8,
      title: 'Celebración de Carnaval',
      description: 'Fiesta tradicional con agua y talco',
      category: 'patronales',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop',
      date: '20 Feb 2023',
      location: 'Calles del Pueblo',
      photographer: 'Sofía Mendoza',
      likes: 198,
      views: 1100,
      featured: false,
      color: '#ea580c'
    },
    {
      id: 9,
      title: 'Boda en el Campo',
      description: 'Celebración matrimonial en entorno rural',
      category: 'bodas',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&auto=format&fit=crop',
      date: '18 Nov 2023',
      location: 'Caserío Rural',
      photographer: 'Diego Castro',
      likes: 234,
      views: 1250,
      featured: false,
      color: '#db2777'
    },
    {
      id: 10,
      title: 'Feria Ganadera',
      description: 'Exposición de ganado y productos agrícolas',
      category: 'ferias',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop',
      date: '8 Jul 2023',
      location: 'Campos de Exposición',
      photographer: 'Pedro Vargas',
      likes: 267,
      views: 1400,
      featured: true,
      color: '#16a34a'
    },
    {
      id: 11,
      title: 'Lago Escondido',
      description: 'Paisaje lacustre en las alturas',
      category: 'paisajes',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop',
      date: '3 Oct 2023',
      location: 'Laguna Andina',
      photographer: 'Elena Rojas',
      likes: 389,
      views: 1950,
      featured: false,
      color: '#0891b2'
    },
    {
      id: 12,
      title: 'Foto Histórica 1950',
      description: 'Primera escuela del pueblo',
      category: 'antiguas',
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop',
      date: '1950',
      location: 'Escuela Primaria',
      photographer: 'Archivo Municipal',
      likes: 89,
      views: 600,
      featured: false,
      color: '#92400e'
    }
  ])

  // Filtrar imágenes basado en categoría y búsqueda
  const filteredImages = images.filter(img => {
    const matchesCategory = activeCategory === 'todas' || img.category === activeCategory
    const matchesSearch = searchQuery === '' || 
      img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 text-white py-16 md:py-20"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Galería Cultural
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Capturando la esencia de nuestras tradiciones
            </p>
            
            {/* Barra de búsqueda */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar fotos por título, descripción o lugar..."
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <X size={20} className="text-white" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-12">
        {/* Controles de la galería */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Colección de Fotos
              </h2>
              <p className="text-gray-600">
                {filteredImages.length} {filteredImages.length === 1 ? 'foto' : 'fotos'} encontradas
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Botones de vista */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid size={20} className={viewMode === 'grid' ? 'text-red-600' : 'text-gray-500'} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List size={20} className={viewMode === 'list' ? 'text-red-600' : 'text-gray-500'} />
                </button>
              </div>

              {/* Ordenar */}
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option>Ordenar por: Más recientes</option>
                  <option>Más populares</option>
                  <option>Mejor valoradas</option>
                  <option>Más antiguas</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
              </div>
            </div>
          </div>

          {/* Filtros por categoría */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Filter size={20} className="text-gray-600 mr-2" />
              <h3 className="font-medium text-gray-700">Filtrar por categoría:</h3>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                    activeCategory === category.id
                      ? `${category.color.split(' ')[0]} border-2 ${category.color.split(' ')[1].replace('text-', 'border-')}`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    activeCategory === category.id
                      ? 'bg-white/30'
                      : 'bg-gray-200'
                  }`}>
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Galería de imágenes */}
        <AnimatePresence mode="wait">
          {filteredImages.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <Camera className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                No se encontraron fotos
              </h3>
              <p className="text-gray-600">
                Intenta con otros términos de búsqueda o selecciona otra categoría
              </p>
            </motion.div>
          ) : viewMode === 'grid' ? (
            <motion.div
              key="grid-view"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  variants={fadeInUp}
                  layout
                  className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Imagen */}
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Overlay con acciones */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => toggleFavorite(image.id)}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
                          >
                            <Heart 
                              size={20} 
                              className={favorites.includes(image.id) ? 'text-red-500 fill-red-500' : 'text-white'} 
                            />
                          </button>
                          <button
                            onClick={() => setSelectedImage(image)}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
                          >
                            <Maximize2 size={20} className="text-white" />
                          </button>
                          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30">
                            <Download size={20} className="text-white" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {image.featured && (
                        <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center">
                          <Star size={12} className="mr-1" />
                          Destacada
                        </span>
                      )}
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full">
                        {categories.find(c => c.id === image.category)?.name}
                      </span>
                    </div>

                    {/* Vista rápida */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-3 py-1 bg-black/60 text-white text-xs rounded-full backdrop-blur-sm">
                        Vista rápida
                      </button>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors">
                        {image.title}
                      </h3>
                      <button
                        onClick={() => toggleFavorite(image.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Heart 
                          size={20} 
                          className={favorites.includes(image.id) ? 'text-red-500 fill-red-500' : ''} 
                        />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {image.description}
                    </p>

                    {/* Metadatos */}
                    <div className="space-y-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2" />
                        <span>{image.date}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-2" />
                        <span>{image.location}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center">
                          <Camera size={14} className="mr-2" />
                          <span className="text-xs">{image.photographer}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Heart size={12} className="mr-1 text-red-500" />
                            <span className="text-xs">{image.likes}</span>
                          </div>
                          <div className="flex items-center">
                            <Eye size={12} className="mr-1 text-gray-500" />
                            <span className="text-xs">{image.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list-view"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  variants={fadeInUp}
                  className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Imagen en vista lista */}
                    <div className="md:w-64 relative h-48 md:h-auto">
                      <img
                        src={image.image}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-white/90 text-xs font-medium rounded">
                          {categories.find(c => c.id === image.category)?.name}
                        </span>
                      </div>
                    </div>

                    {/* Contenido en vista lista */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 mb-2">
                            {image.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {image.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-3 mt-2 md:mt-0">
                          <button
                            onClick={() => toggleFavorite(image.id)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                          >
                            <Heart 
                              size={18} 
                              className={favorites.includes(image.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'} 
                            />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Share2 size={18} className="text-gray-400" />
                          </button>
                          <button
                            onClick={() => setSelectedImage(image)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                          >
                            <Maximize2 size={18} className="text-gray-400" />
                          </button>
                        </div>
                      </div>

                      {/* Metadatos en fila */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-2 flex-shrink-0" />
                          <span className="truncate">{image.date}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-2 flex-shrink-0" />
                          <span className="truncate">{image.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Camera size={14} className="mr-2 flex-shrink-0" />
                          <span className="truncate">{image.photographer}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Heart size={12} className="mr-1 text-red-500" />
                            <span>{image.likes}</span>
                          </div>
                          <div className="flex items-center ml-4">
                            <Eye size={12} className="mr-1" />
                            <span>{image.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal de vista previa */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header del modal */}
                <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/60 to-transparent z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {selectedImage.title}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {selectedImage.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
                    >
                      <X size={24} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Imagen en modal */}
                <div className="h-[70vh] overflow-hidden bg-gray-900">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Footer del modal */}
                <div className="p-6 bg-white border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Detalles</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-2" />
                          <span>{selectedImage.date}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-2" />
                          <span>{selectedImage.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Camera size={14} className="mr-2" />
                          <span>{selectedImage.photographer}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Categoría</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                          {categories.find(c => c.id === selectedImage.category)?.name}
                        </span>
                        {selectedImage.featured && (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center">
                            <Star size={12} className="mr-1" />
                            Destacada
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Acciones</h4>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => toggleFavorite(selectedImage.id)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                        >
                          <Heart 
                            size={18} 
                            className={`mr-2 ${favorites.includes(selectedImage.id) ? 'text-red-500 fill-red-500' : ''}`} 
                          />
                          {favorites.includes(selectedImage.id) ? 'Quitar favorito' : 'Agregar a favoritos'}
                        </button>
                        <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center">
                          <Download size={18} className="mr-2" />
                          Descargar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Favoritos flotante */}
        {favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
              <div className="flex items-center mb-2">
                <Heart className="text-red-500 fill-red-500 mr-2" size={20} />
                <span className="font-medium">{favorites.length} favoritos</span>
              </div>
              <button className="text-sm text-red-600 hover:text-red-700">
                Ver colección →
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Gallery
