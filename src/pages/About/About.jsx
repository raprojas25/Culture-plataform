import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  Users,
  Target,
  Award,
  Shield,
  TrendingUp,
  Star,
  Globe,
  Calendar,
  MapPin,
  Quote,
  ChevronRight,
  Facebook,
  Instagram,
  Youtube,
  Newspaper,
  ExternalLink,
  CheckCircle
} from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const About = () => {
  const [activeValue, setActiveValue] = useState(0)

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  // Datos del equipo
  const teamMembers = [
    {
      id: 1,
      name: 'María Rodríguez',
      role: 'Fundadora & Directora',
      bio: 'Más de 10 años trabajando en gestión cultural y turismo comunitario.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      social: { twitter: '#', linkedin: '#' }
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      role: 'Desarrollador Principal',
      bio: 'Especialista en tecnología para proyectos sociales y culturales.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      social: { github: '#', linkedin: '#' }
    },
    {
      id: 3,
      name: 'Ana López',
      role: 'Coordinadora de Eventos',
      bio: 'Organizadora de festivales tradicionales por más de 8 años.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      social: { instagram: '#', facebook: '#' }
    },
    {
      id: 4,
      name: 'José Quispe',
      role: 'Relaciones Comunitarias',
      bio: 'Conecta con líderes locales y promueve tradiciones ancestrales.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      social: { whatsapp: '#', facebook: '#' }
    }
  ]

  // Valores
  const values = [
    {
      id: 1,
      title: 'Identidad Cultural',
      description: 'Preservamos y celebramos las tradiciones únicas de cada comunidad.',
      icon: <Heart className="text-red-500" size={32} />
    },
    {
      id: 2,
      title: 'Inclusión',
      description: 'Todos tienen un lugar en nuestras celebraciones, sin importar origen o condición.',
      icon: <Users className="text-blue-500" size={32} />
    },
    {
      id: 3,
      title: 'Transparencia',
      description: 'Operamos con honestidad y claridad en cada interacción.',
      icon: <Shield className="text-green-500" size={32} />
    },
    {
      id: 4,
      title: 'Sostenibilidad',
      description: 'Promovemos prácticas que respeten el medio ambiente y la economía local.',
      icon: <Globe className="text-emerald-500" size={32} />
    },
    {
      id: 5,
      title: 'Innovación',
      description: 'Usamos tecnología para mantener vivas las tradiciones.',
      icon: <TrendingUp className="text-purple-500" size={32} />
    },
    {
      id: 6,
      title: 'Calidad',
      description: 'Garantizamos la mejor experiencia para organizadores y asistentes.',
      icon: <Award className="text-yellow-500" size={32} />
    }
  ]

  // Testimonios
  const testimonials = [
    {
      id: 1,
      name: 'Juan Pérez',
      role: 'Organizador de Fiestas Patronales',
      quote: 'Gracias a CulturaViva logramos triplicar la asistencia a nuestra fiesta tradicional. La plataforma nos conectó con personas de toda la región.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w-200',
      rating: 3
    },
    {
      id: 2,
      name: 'Rosa Mendoza',
      role: 'Directora de Turismo Municipal',
      quote: 'Esta plataforma ha revolucionado cómo promovemos nuestro patrimonio cultural. Ahora los eventos llegan a más personas de manera organizada.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      rating: 4
    },
    {
      id: 3,
      name: 'Miguel Torres',
      role: 'Fotógrafo de Eventos',
      quote: 'Como proveedor de servicios, me ha permitido mostrar mi trabajo a toda la comunidad. He conseguido más contratos que nunca.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      rating: 5
    },
    {
      id: 4,
      name: 'Lucía Fernández',
      role: 'Visitante Frecuente',
      quote: 'Soy de la ciudad y gracias a CulturaViva descubrí las maravillosas tradiciones de los pueblos cercanos. Ahora no me pierdo ningún evento.',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200',
      rating: 5
    }
  ]

  // Beneficios
  const benefits = [
    { id: 1, text: 'Mayor visibilidad para tus eventos', icon: <CheckCircle size={20} /> },
    { id: 2, text: 'Conexión directa con la comunidad', icon: <CheckCircle size={20} /> },
    { id: 3, text: 'Herramientas gratuitas de gestión', icon: <CheckCircle size={20} /> },
    { id: 4, text: 'Acceso a proveedores confiables', icon: <CheckCircle size={20} /> },
    { id: 5, text: 'Promoción en redes sociales', icon: <CheckCircle size={20} /> },
    { id: 6, text: 'Estadísticas y análisis de asistencia', icon: <CheckCircle size={20} /> }
  ]

  // Patrocinadores
  const sponsors = [
    { id: 1, name: 'Municipalidad Provincial', logo: '🏛️', url: '#' },
    { id: 2, name: 'Ministerio de Cultura', logo: '🎭', url: '#' },
    { id: 3, name: 'Turismo Regional', logo: '🏞️', url: '#' },
    { id: 4, name: 'Cámara de Comercio', logo: '🏢', url: '#' },
    { id: 5, name: 'Universidad Local', logo: '🎓', url: '#' },
    { id: 6, name: 'Asociación de Artesanos', logo: '🛠️', url: '#' }
  ]

  // Enlaces a recursos
  const resources = [
    { id: 1, title: 'Reportaje en "El Comercio"', url: '#', icon: <Newspaper size={18} /> },
    { id: 2, title: 'Entrevista en Radio Nacional', url: '#', icon: <ExternalLink size={18} /> },
    { id: 3, title: 'Artículo en Blog de Turismo', url: '#', icon: <ExternalLink size={18} /> },
    { id: 4, title: 'Presentación en Congreso Cultural', url: '#', icon: <ExternalLink size={18} /> }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white py-20"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Nuestra Historia
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Conectando tradiciones, uniendo comunidades
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-16">
        {/* 1. Descripción del Proyecto */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full mb-6"
              >
                <Target className="mr-2" size={20} />
                <span className="font-semibold">Nuestra Misión</span>
              </motion.div>
              <h2 className="text-4xl font-bold mb-6">
                Revitalizando la Cultura Local
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                CulturaViva es una plataforma digital diseñada para preservar, promover y compartir 
                las actividades culturales, fiestas tradicionales y eventos comunitarios de nuestra provincia.
              </p>
              <p className="text-gray-600 mb-8">
                Nacimos de la necesidad de dar visibilidad a las ricas tradiciones que muchas veces 
                pasan desapercibidas. Creamos un puente digital entre organizadores, proveedores y 
                asistentes, asegurando que cada celebración llegue a quien realmente la valore.
              </p>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600">500+</div>
                  <div className="text-gray-500">Eventos Publicados</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600">10K+</div>
                  <div className="text-gray-500">Usuarios Activos</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600">25+</div>
                  <div className="text-gray-500">Comunidades</div>
                </div>
              </div>
            </div>
            <motion.div
              variants={fadeInUp}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-64 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800" 
                      alt="Fiesta tradicional" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-48 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800" 
                      alt="Danza tradicional" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800" 
                      alt="Comida típica" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800" 
                      alt="Artesanía local" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 2. Historia */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nuestra Historia</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un viaje de pasión, tradición y tecnología
            </p>
          </div>
          
          <div className="relative">
            {/* Línea de tiempo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-500 to-orange-500 hidden lg:block"></div>
            
            <div className="space-y-12">
              {[
                {
                  year: '2018',
                  title: 'La Inspiración',
                  description: 'Durante una fiesta patronal, notamos cómo eventos increíbles pasaban desapercibidos fuera de la comunidad local.'
                },
                {
                  year: '2020',
                  title: 'El Inicio',
                  description: 'Creamos un grupo de WhatsApp para compartir eventos, que rápidamente creció a 500 miembros en un mes.'
                },
                {
                  year: '2021',
                  title: 'Primera Plataforma',
                  description: 'Desarrollamos nuestra primera versión web con calendario básico y lista de eventos.'
                },
                {
                  year: '2022',
                  title: 'Expansión',
                  description: 'Incorporamos directorio de servicios y comenzamos a trabajar con municipalidades.'
                },
                {
                  year: '2023',
                  title: 'Plataforma Actual',
                  description: 'Lanzamos la versión completa con todas las funcionalidades que ves hoy.'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Punto en la línea */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-white z-10 hidden lg:block"></div>
                  
                  {/* Contenido */}
                  <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Año */}
                  <div className="lg:w-2/12 text-center my-4 lg:my-0">
                    <div className="lg:hidden inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-full font-bold">
                      {item.year}
                    </div>
                  </div>
                  
                  {/* Espacio vacío para alinear */}
                  <div className="lg:w-5/12 hidden lg:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 3. Equipo */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nuestro Equipo</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Apasionados por la cultura y comprometidos con nuestra comunidad
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-sm opacity-90">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    {Object.entries(member.social).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        {platform === 'twitter' && '𝕏'}
                        {platform === 'linkedin' && 'in'}
                        {platform === 'github' && 'Git'}
                        {platform === 'instagram' && <Instagram size={20} />}
                        {platform === 'facebook' && <Facebook size={20} />}
                        {platform === 'whatsapp' && 'WA'}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 4. Valores */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nuestros Valores</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Los principios que guían cada una de nuestras acciones
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                variants={fadeInUp}
                onClick={() => setActiveValue(index)}
                className={`bg-white rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  activeValue === index 
                    ? 'ring-2 ring-red-500 shadow-xl transform scale-[1.02]' 
                    : 'shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="flex items-start mb-4">
                  <div className="p-3 rounded-xl bg-gray-50 mr-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                </div>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 5. Beneficios */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl font-bold mb-6">Beneficios para la Comunidad</h2>
              <p className="text-gray-600 text-lg mb-8">
                CulturaViva transforma la manera en que experimentamos y compartimos nuestra herencia cultural
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit.id} className="flex items-center">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg mr-4">
                      {benefit.icon}
                    </div>
                    <span className="text-gray-700">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <Calendar className="mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold mb-4">Impacto Medible</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">85%</div>
                      <div className="text-sm opacity-90">Más asistencia a eventos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">40%</div>
                      <div className="text-sm opacity-90">Más ingresos para organizadores</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">60%</div>
                      <div className="text-sm opacity-90">Reducción en costos de promoción</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">95%</div>
                      <div className="text-sm opacity-90">Satisfacción de usuarios</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400 rounded-full opacity-20"></div>
            </motion.div>
          </div>
        </motion.section>

        {/* 6. Testimonios */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Lo que dicen de nosotros</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Historias reales de personas que han transformado sus eventos con CulturaViva
            </p>
          </div>
          
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Quote className="text-gray-300 mb-2" size={24} />
                    <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  </div>
                  
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.section>

        {/* 7. Patrocinadores */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Aliados Estratégicos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Instituciones que comparten nuestra visión y apoyan nuestra misión
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {sponsors.map((sponsor) => (
              <motion.div
                key={sponsor.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.1 }}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center h-40 hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{sponsor.logo}</div>
                <h4 className="text-center font-semibold text-gray-800">{sponsor.name}</h4>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 8. Llamada a la Acción */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-6">
              Únete a la Revolución Cultural
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Ya sea que quieras compartir tu evento, encontrar proveedores o descubrir tradiciones, 
              tenemos un lugar para ti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-red-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 flex items-center justify-center gap-2">
                Publica tu Primer Evento
                <ChevronRight />
              </button>
              <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-red-600">
                Contáctanos
              </button>
            </div>
          </div>
        </motion.section>

        {/* 9. Enlaces y Recursos */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">En los Medios</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Artículos y recursos que destacan nuestro trabajo
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource) => (
              <motion.a
                key={resource.id}
                href={resource.url}
                target='_blank'
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-lg mr-4">
                      {resource.icon}
                    </div>
                    <span className="font-medium group-hover:text-red-600">
                      {resource.title}
                    </span>
                  </div>
                  <ExternalLink size={18} className="text-gray-400" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* 10. Imágenes Finales */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nuestra Cultura en Imágenes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Capturamos la esencia de las tradiciones que nos hacen únicos
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <div className="h-96 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800" 
                  alt="Festival cultural"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div>
              <div className="h-44 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800" 
                  alt="Gastronomía"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div>
              <div className="h-44 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800" 
                  alt="Artesanía"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div>
              <div className="h-44 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800" 
                  alt="Danza"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div>
              <div className="h-44 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800" 
                  alt="Celebración"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Redes Sociales */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pt-8 border-t"
        >
          <h3 className="text-2xl font-bold mb-6">Síguenos en redes sociales</h3>
          <div className="flex justify-center space-x-6">
            <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-pink-100 hover:text-pink-600 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors">
              <Youtube size={24} />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
