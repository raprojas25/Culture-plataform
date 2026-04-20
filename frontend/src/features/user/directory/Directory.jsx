import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  Phone,
  MessageCircle,
  Star,
  MapPin,
  DollarSign,
  Music,
  Camera,
  Utensils,
  Truck
} from 'lucide-react'

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = [
    { id: 'bands', name: 'Bandas', icon: <Music />, color: 'bg-purple-100 text-purple-600' },
    { id: 'djs', name: 'DJs', icon: <Music />, color: 'bg-blue-100 text-blue-600' },
    { id: 'sound', name: 'Sonido', icon: <Music />, color: 'bg-green-100 text-green-600' },
    { id: 'chairs', name: 'Sillas/Toldos', icon: <Truck />, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'food', name: 'Comida', icon: <Utensils />, color: 'bg-red-100 text-red-600' },
    { id: 'artisans', name: 'Artesanos', icon: <Utensils />, color: 'bg-orange-100 text-orange-600' },
    { id: 'photographers', name: 'Fotógrafos', icon: <Camera />, color: 'bg-pink-100 text-pink-600' },
    { id: 'producers', name: 'Productores', icon: <Truck />, color: 'bg-indigo-100 text-indigo-600' }
  ]

  const services = [
    {
      id: 1,
      name: 'Banda Los Andinos',
      category: 'bands',
      description: 'Música tradicional andina para todas tus fiestas',
      phone: '987654321',
      location: 'Centro',
      price: 'S/ 800',
      rating: 4.8,
      reviews: 24,
      featured: true
    },
    // ... más servicios
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Directorio Local</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Encuentra los mejores servicios para tu evento. Desde bandas hasta decoración.
        </p>
      </div>

      {/* Barra de Búsqueda */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar servicios (ej: banda, fotógrafo, comida...)"
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categorías */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Categorías</h2>
          <button className="text-gray-600 hover:text-red-600 flex items-center gap-2">
            <Filter size={20} />
            Filtros
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex flex-col items-center p-4 rounded-xl border-2 ${
                selectedCategory === category.id
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-red-300'
              }`}
            >
              <div className={`p-3 rounded-full ${category.color} mb-2`}>
                {category.icon}
              </div>
              <span className="text-sm font-medium">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lista de Servicios */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
          >
            {/* Encabezado */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{service.name}</h3>
                    {service.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        Destacado
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{service.location}</span>
                  </div>
                </div>
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <Star size={16} className="text-yellow-500 mr-1" />
                  <span className="font-bold">{service.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({service.reviews})</span>
                </div>
              </div>

              {/* Descripción */}
              <p className="text-gray-600 mb-6">{service.description}</p>

              {/* Precio y Contacto */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-green-600">
                    <DollarSign size={20} />
                    <span className="font-bold text-lg ml-1">{service.price}</span>
                    <span className="text-gray-500 text-sm ml-1">/evento</span>
                  </div>
                  <div className="text-gray-500 text-sm">
                    <Phone size={16} className="inline mr-1" />
                    {service.phone}
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2">
                    <MessageCircle size={18} />
                    Contactar
                  </button>
                  <button className="flex-1 border border-red-600 text-red-600 py-2 px-4 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2">
                    <Phone size={18} />
                    Llamar
                  </button>
                </div>
              </div>
            </div>

            {/* Opiniones */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Última opinión:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={`${
                        star <= Math.floor(service.rating)
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-2">
                "Excelente servicio, muy profesionales"
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sección para Proveedores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-8 text-white"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Eres un proveedor de servicios?</h2>
          <p className="text-xl mb-8 opacity-90">
            Aumenta tu visibilidad y consigue más clientes
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100">
              Añadir mi Servicio
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-red-600">
              Ver Planes
            </button>
          </div>
          <p className="mt-6 text-sm opacity-80">
            Desde S/ 50 al mes • Destacado en búsquedas • Perfil verificado
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Directory
