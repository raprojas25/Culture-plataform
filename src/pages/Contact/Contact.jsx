import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
  User,
  Home,
  Facebook,
  Instagram,
  MessageSquare,
  ChevronRight,
  ExternalLink,
  AlertCircle,
  LinkIcon
} from 'lucide-react'

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState('form') // 'form' o 'direct'

  const contactMethods = [
    {
      id: 1,
      title: 'WhatsApp Business',
      description: 'Respuesta en minutos',
      value: '+51 987 654 321',
      icon: <MessageCircle className="text-green-500" size={24} />,
      action: 'https://wa.me/51987654321',
      color: 'bg-green-50 border-green-200',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 2,
      title: 'Correo Electrónico',
      description: 'Respuesta en 24 horas',
      value: 'info@culturaviva.com',
      icon: <Mail className="text-red-500" size={24} />,
      action: 'mailto:info@culturaviva.com',
      color: 'bg-red-50 border-red-200',
      buttonColor: 'bg-red-600 hover:bg-red-700'
    },
    {
      id: 3,
      title: 'Facebook',
      description: 'Mensajes directos',
      value: '@CulturaVivaOficial',
      icon: <Facebook className="text-blue-500" size={24} />,
      action: 'https://facebook.com/CulturaVivaOficial',
      color: 'bg-blue-50 border-blue-200',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 4,
      title: 'Instagram',
      description: 'Historias y mensajes',
      value: '@culturaviva_ok',
      icon: <Instagram className="text-pink-500" size={24} />,
      action: 'https://instagram.com/culturaviva_ok',
      color: 'bg-pink-50 border-pink-200',
      buttonColor: 'bg-pink-600 hover:bg-pink-700'
    }
  ]

  const businessHours = [
    { day: 'Lunes a Viernes', hours: '9:00 AM - 6:00 PM' },
    { day: 'Sábados', hours: '9:00 AM - 1:00 PM' },
    { day: 'Domingos', hours: 'Cerrado (solo eventos)' }
  ]

  const contactReasons = [
    'Consulta sobre eventos',
    'Problemas técnicos',
    'Publicidad y patrocinios',
    'Prensa y medios',
    'Colaboraciones',
    'Sugerencias',
    'Reportar contenido inapropiado'
  ]

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    // Simulación de envío
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-500" />
          <div>
            <p className="font-semibold">¡Mensaje enviado!</p>
            <p className="text-sm">Te responderemos en 24 horas</p>
          </div>
        </div>,
        { duration: 5000 }
      )
      
      setIsSubmitted(true)
      reset()
      
      // Resetear el estado después de 5 segundos
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2">
          <AlertCircle className="text-red-500" />
          <div>
            <p className="font-semibold">Error al enviar</p>
            <p className="text-sm">Intenta nuevamente</p>
          </div>
        </div>
      )
    } finally {
      setIsSubmitting(false)
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contáctanos
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Columna izquierda: Formulario */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Tabs de contacto */}
            <div className="flex border-b border-gray-200 mb-8">
              <button
                onClick={() => setActiveTab('form')}
                className={`flex-1 py-3 font-medium text-center ${
                  activeTab === 'form'
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageSquare className="inline-block mr-2" size={20} />
                Formulario
              </button>
              <button
                onClick={() => setActiveTab('direct')}
                className={`flex-1 py-3 font-medium text-center ${
                  activeTab === 'direct'
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Send className="inline-block mr-2" size={20} />
                Contacto Directo
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'form' ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  variants={fadeInUp}
                >
                  {/* Mensaje de éxito */}
                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl"
                      >
                        <div className="flex items-center">
                          <CheckCircle className="text-green-500 mr-3" />
                          <div>
                            <h3 className="font-bold text-green-800">¡Gracias por contactarnos!</h3>
                            <p className="text-green-600 text-sm">
                              Hemos recibido tu mensaje y te responderemos en un plazo de 24 horas hábiles.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Nombre */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          {...register('name', { 
                            required: 'El nombre es requerido',
                            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                          })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Tu nombre"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Correo Electrónico *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="email"
                          {...register('email', { 
                            required: 'El email es requerido',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Email inválido'
                            }
                          })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="tu@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          {...register('phone')}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="987 654 321"
                        />
                      </div>
                    </div>

                    {/* Asunto */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Asunto *
                      </label>
                      <select
                        {...register('subject', { required: 'Selecciona un asunto' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Selecciona un asunto...</option>
                        {contactReasons.map((reason) => (
                          <option key={reason} value={reason}>{reason}</option>
                        ))}
                        <option value="otro">Otro</option>
                      </select>
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                      )}
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mensaje *
                      </label>
                      <textarea
                        {...register('message', { 
                          required: 'El mensaje es requerido',
                          minLength: { value: 20, message: 'Mínimo 20 caracteres' }
                        })}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                        placeholder="Escribe tu mensaje aquí..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Checkbox de términos */}
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms"
                        {...register('terms', { required: 'Debes aceptar los términos' })}
                        className="mt-1 mr-3 rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        Acepto que mis datos sean procesados de acuerdo con la 
                        <a href="/privacidad" className="text-red-600 hover:underline ml-1">
                          política de privacidad
                        </a>
                      </label>
                    </div>

                    {/* Botón de envío */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Enviar Mensaje
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-sm text-gray-500">
                      * Campos obligatorios
                    </p>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="direct"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  <p className="text-gray-600">
                    Contáctanos directamente a través de cualquiera de estos canales:
                  </p>

                  {contactMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      variants={fadeInUp}
                      whileHover={{ x: 5 }}
                      className={`p-6 rounded-xl border-2 ${method.color} transition-all`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div className="p-3 rounded-lg bg-white mr-4">
                            {method.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-1">{method.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                            <p className="font-medium">{method.value}</p>
                          </div>
                        </div>
                        <a
                          href={method.action}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-4 py-2 ${method.buttonColor} text-white rounded-lg hover:shadow-md transition-shadow`}
                        >
                          Contactar
                        </a>
                      </div>
                    </motion.div>
                  ))}

                  <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-center">
                      <Clock className="text-amber-600 mr-3" />
                      <div>
                        <h3 className="font-bold text-amber-800">Horario de Atención</h3>
                        <p className="text-amber-700 text-sm">
                          Te responderemos dentro de nuestro horario de atención
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Columna derecha: Información */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Información de contacto rápida */}
            <motion.div variants={fadeInUp}>
              <div className="bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-white/20 rounded-full mr-4">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold">Teléfonos</h3>
                      <p className="opacity-90">+51 (01) 234-5678</p>
                      <p className="opacity-90">+51 987 654 321 (WhatsApp)</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="p-3 bg-white/20 rounded-full mr-4">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold">Correos Electrónicos</h3>
                      <p className="opacity-90">info@culturaviva.com</p>
                      <p className="opacity-90">soporte@culturaviva.com</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="p-3 bg-white/20 rounded-full mr-4">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold">Oficina Principal</h3>
                      <p className="opacity-90">Calle Principal 123, Plaza de Armas</p>
                      <p className="opacity-90">[Provincia], [Región]</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <button className="w-full bg-white text-red-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2">
                    <ExternalLink size={20} />
                    Ver en Google Maps
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Horarios de atención */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Clock className="mr-3 text-red-600" />
                Horarios de Atención
              </h2>
              
              <div className="space-y-4">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <span className="font-medium">{schedule.day}</span>
                    <span className="text-gray-600">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-bold">Nota:</span> Para emergencias relacionadas con eventos en curso, 
                  puedes contactarnos por WhatsApp en cualquier momento.
                </p>
              </div>
            </motion.div>

            {/* Preguntas frecuentes */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">¿Necesitas ayuda rápida?</h2>
              
              <div className="space-y-4">
                {[
                  {
                    question: '¿Cómo publico un evento?',
                    answer: 'Ve a "Publicar Evento" y sigue los pasos del formulario.'
                  },
                  {
                    question: '¿Cuánto tiempo tarda en aprobarse un evento?',
                    answer: 'Entre 24 y 48 horas hábiles.'
                  },
                  {
                    question: '¿Puedo editar un evento ya publicado?',
                    answer: 'Sí, contacta a soporte con el código del evento.'
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{faq.question}</span>
                      <ChevronRight className="text-gray-400" size={20} />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <a
                href="/faq"
                className="inline-flex items-center mt-6 text-red-600 hover:text-red-700 font-medium"
              >
                Ver todas las preguntas frecuentes
                <ChevronRight className="ml-1" size={20} />
              </a>
            </motion.div>

            {/* Departamento de área */}
            <motion.div variants={fadeInUp} className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Departamentos Especializados</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { dept: 'Soporte Técnico', email: 'soporte@culturaviva.com' },
                  { dept: 'Eventos', email: 'eventos@culturaviva.com' },
                  { dept: 'Publicidad', email: 'publicidad@culturaviva.com' },
                  { dept: 'Prensa', email: 'prensa@culturaviva.com' }
                ].map((department, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <h3 className="font-bold text-sm mb-1">{department.dept}</h3>
                    <p className="text-xs text-gray-600 truncate">{department.email}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Sección de mapa (placeholder) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold flex items-center">
                <MapPin className="mr-3 text-red-600" />
                Ubicación de Nuestra Oficina
              </h2>
            </div>
            
            <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 relative">
              {/* Mapa placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative">
                    <MapPin className="text-red-600 mx-auto mb-4" size={48} />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-red-100 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <p className="text-gray-700 font-medium">Calle Principal 123, Plaza de Armas</p>
                  <p className="text-gray-600">[Provincia], [Región]</p>
                  <p className="text-sm text-gray-500 mt-2">
                    (Integrar con Google Maps o Leaflet)
                  </p>
                </div>
              </div>
              
              {/* Marcadores de ubicación */}
              <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white rounded-lg shadow-lg p-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">Oficina Principal</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/3 right-1/3 transform translate-x-1/2 -translate-y-1/2">
                <div className="bg-white rounded-lg shadow-lg p-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">Punto de Información</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sección final de redes sociales */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center "
        >
          <h2 className="text-3xl font-bold mb-6">Síguenos en Redes Sociales</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Mantente actualizado con las últimas noticias, eventos y actualizaciones de la plataforma.
          </p>
          
          <div className="flex justify-around space-x-4 space-y-4 flex-wrap">
            {[
              { icon: <Facebook size={24} />, label: 'Facebook', color: 'hover:bg-blue-100 hover:text-blue-600' },
              { icon: <Instagram size={24} />, label: 'Instagram', color: 'hover:bg-pink-100 hover:text-pink-600' },
              { icon: <MessageSquare size={24} />, label: 'WhatsApp', color: 'hover:bg-green-100 hover:text-green-600' },
              { icon: <Mail size={24} />, label: 'Newsletter', color: 'hover:bg-red-100 hover:text-red-600' }
            ].map((social, index) => (
              <motion.a
                key={index}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className={`flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200 ${social.color} transition-all`}
              >
                <div className="mb-3">{social.icon}</div>
                <span className="font-medium">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Aviso de privacidad */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 max-w-3xl mx-auto">
            Al contactarnos, aceptas nuestra <a href="/privacidad" className="text-red-600 hover:underline">Política de Privacidad</a>. 
            Nos comprometemos a proteger tus datos personales y a no compartirlos con terceros sin tu consentimiento.
            Todos los mensajes son respondidos por nuestro equipo en un plazo máximo de 48 horas hábiles.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
