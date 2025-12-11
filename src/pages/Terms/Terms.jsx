import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  Lock,
  Eye,
  UserCheck,
  Globe,
  Heart,
  Scale,
  BookOpen,
  Send,
  Clock,
  Filter,
  AlertCircle,
  Mail,
  Phone,
  ChevronRight
} from 'lucide-react'

const Terms = () => {
  const [activeSection, setActiveSection] = useState('general')
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const sections = [
    { id: 'general', title: 'General', icon: <BookOpen size={20} /> },
    { id: 'allowed', title: 'Permitido', icon: <CheckCircle size={20} /> },
    { id: 'prohibited', title: 'Prohibido', icon: <XCircle size={20} /> },
    { id: 'rights', title: 'Derechos', icon: <Scale size={20} /> },
    { id: 'privacy', title: 'Privacidad', icon: <Lock size={20} /> },
    { id: 'contact', title: 'Contacto', icon: <Send size={20} /> }
  ]

  const allowedContent = [
    'Eventos culturales y tradiciones locales',
    'Fiestas patronales y celebraciones comunitarias',
    'Actividades educativas y escolares',
    'Eventos deportivos y recreativos',
    'Ferias, mercados y exposiciones artesanales',
    'Conciertos y presentaciones artísticas',
    'Matrimonios y celebraciones familiares',
    'Eventos gastronómicos y muestras culinarias',
    'Procesiones y actividades religiosas tradicionales',
    'Talleres y actividades de capacitación'
  ]

  const prohibitedContent = [
    { 
      title: 'Contenido Político',
      description: 'Propaganda, campañas políticas o contenido partidario'
    },
    { 
      title: 'Ventas Directas',
      description: 'Multinivel, pirámides, venta de productos no relacionados'
    },
    { 
      title: 'Contenido Adulto',
      description: 'Material explícito, contenido sexual o inapropiado'
    },
    { 
      title: 'Estafas y Fraudes',
      description: 'Engaños, ofertas falsas o actividades ilegales'
    },
    { 
      title: 'Discriminación',
      description: 'Contenido racista, sexista, homofóbico o discriminatorio'
    },
    { 
      title: 'Violencia',
      description: 'Apología a la violencia o contenido violento'
    },
    { 
      title: 'Spam',
      description: 'Publicidad masiva no solicitada o repetitiva'
    },
    { 
      title: 'Derechos de Autor',
      description: 'Contenido protegido sin autorización'
    }
  ]

  const userResponsibilities = [
    'Proporcionar información veraz y actualizada',
    'Respetar los derechos de otros usuarios',
    'Mantener la confidencialidad de su cuenta',
    'Reportar contenido inapropiado',
    'Respetar las leyes locales y nacionales',
    'No suplantar identidades'
  ]

  const platformRights = [
    'Rechazar o eliminar cualquier evento sin previo aviso',
    'Moderar contenido que incumpla las normas',
    'Suspender cuentas que violen los términos',
    'Modificar estos términos en cualquier momento',
    'Utilizar contenido para mejorar la plataforma (anonimizado)',
    'Cooperar con autoridades en caso de requerimiento legal'
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mb-6">
            <Scale className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Términos y Condiciones</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Normas de uso y publicación en la Plataforma de Actividades Culturales CulturaViva
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
            <Clock size={16} className="mr-2" />
            <span>Última actualización: {new Date().toLocaleDateString('es-ES', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Navegación lateral */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 sticky top-24">
              <div className="p-6 border-b border-gray-200">
                <h2 className="font-bold text-lg flex items-center">
                  <BookOpen className="mr-2" size={20} />
                  Contenido
                </h2>
              </div>
              <nav className="p-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center p-3 rounded-lg mb-1 transition-colors ${
                      activeSection === section.id
                        ? 'bg-red-50 text-red-600 border-l-4 border-red-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {section.icon}
                    <span className="ml-3 font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Aviso importante */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4"
            >
              <div className="flex items-start">
                <AlertTriangle className="text-amber-600 mt-0.5 mr-3" size={20} />
                <div>
                  <h4 className="font-bold text-amber-800">Importante</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Al publicar un evento, aceptas automáticamente estos términos y condiciones.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contenido principal */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
              {/* Sección General */}
              {activeSection === 'general' && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-6 flex items-center">
                      <Shield className="mr-3 text-red-600" size={32} />
                      Términos Generales
                    </h2>
                    <p className="text-gray-700 text-lg mb-6">
                      Bienvenido a CulturaViva. Estos términos y condiciones establecen las reglas para usar 
                      nuestra plataforma y publicar eventos culturales.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">1. Aceptación de Términos</h3>
                      <p className="text-gray-600 mb-4">
                        Al acceder y utilizar esta plataforma, aceptas cumplir con estos términos y condiciones. 
                        Si no estás de acuerdo con alguna parte, por favor no utilices nuestros servicios.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">2. Definiciones</h3>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                          <span><strong>Plataforma:</strong> Sitio web y aplicaciones de CulturaViva</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                          <span><strong>Usuario:</strong> Cualquier persona que acceda a la plataforma</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt=2 mr-3"></div>
                          <span><strong>Organizador:</strong> Usuario que publica eventos</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                          <span><strong>Evento:</strong> Actividad cultural publicada en la plataforma</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">3. Proceso de Revisión</h3>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center mb-4">
                          <Filter className="text-blue-600 mr-3" size={24} />
                          <h4 className="font-bold text-lg">Cómo revisamos los eventos</h4>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                              1
                            </div>
                            <div>
                              <p className="font-medium">Recepción del evento</p>
                              <p className="text-sm text-gray-600">Recibimos tu solicitud de publicación</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                              2
                            </div>
                            <div>
                              <p className="font-medium">Revisión manual</p>
                              <p className="text-sm text-gray-600">Nuestro equipo verifica que cumpla con las normas</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                              3
                            </div>
                            <div>
                              <p className="font-medium">Aprobación o rechazo</p>
                              <p className="text-sm text-gray-600">Te notificamos el resultado en 24-48 horas</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">4. Responsabilidades del Usuario</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {userResponsibilities.map((responsibility, index) => (
                          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <UserCheck size={18} className="text-green-600 mr-3" />
                            <span>{responsibility}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sección Contenido Permitido */}
              {activeSection === 'allowed' && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-6 flex items-center">
                      <CheckCircle className="mr-3 text-green-600" size={32} />
                      Contenido Permitido
                    </h2>
                    <p className="text-gray-700 text-lg mb-6">
                      Promovemos eventos que enriquezcan nuestra cultura y fortalezcan la comunidad.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {allowedContent.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-green-50 border border-green-200 rounded-xl p-6"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                            <CheckCircle className="text-green-600" size={20} />
                          </div>
                          <h3 className="font-bold text-green-800">{item}</h3>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Heart className="mr-2 text-red-600" size={24} />
                      Promovemos la Cultura Local
                    </h3>
                    <p className="text-gray-700">
                      Damos prioridad a eventos que:
                    </p>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span>Preserven tradiciones ancestrales</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span>Involucren a la comunidad local</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span>Fomenten la economía local</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span>Sean inclusivos y accesibles</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Sección Contenido Prohibido */}
              {activeSection === 'prohibited' && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-6 flex items-center">
                      <XCircle className="mr-3 text-red-600" size={32} />
                      Contenido Prohibido
                    </h2>
                    <p className="text-gray-700 text-lg mb-6">
                      Para mantener una comunidad segura, estos contenidos son estrictamente prohibidos.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {prohibitedContent.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-red-50 border border-red-200 rounded-xl p-6"
                      >
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                            <XCircle className="text-red-600" size={24} />
                          </div>
                          <div>
                            <h3 className="font-bold text-red-800 text-lg mb-2">{item.title}</h3>
                            <p className="text-red-700">{item.description}</p>
                            {index === 0 && (
                              <p className="text-sm text-red-600 mt-2">
                                <strong>Incluye:</strong> Campañas electorales, propaganda partidaria, discursos políticos
                              </p>
                            )}
                            {index === 1 && (
                              <p className="text-sm text-red-600 mt-2">
                                <strong>Ejemplos:</strong> Venta de productos piramidales, MLM, mercadeo en red
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
                    <div className="flex items-center mb-4">
                      <AlertCircle className="text-red-600 mr-3" size={24} />
                      <h3 className="font-bold text-red-800 text-lg">Consecuencias</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        <span>Evento rechazado inmediatamente</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        <span>Advertencia al organizador</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        <span>Suspensión temporal de la cuenta</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        <span>Bloqueo permanente en casos graves</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sección Derechos */}
              {activeSection === 'rights' && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-6 flex items-center">
                      <Scale className="mr-3 text-purple-600" size={32} />
                      Derechos y Obligaciones
                    </h2>
                    <p className="text-gray-700 text-lg mb-6">
                      Conoce los derechos y responsabilidades de ambas partes.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Derechos de la Plataforma</h3>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {platformRights.map((right, index) => (
                          <div key={index} className="flex items-start p-4 bg-purple-50 rounded-lg">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                              <span className="font-bold text-purple-600">{index + 1}</span>
                            </div>
                            <span className="text-purple-800">{right}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">Derechos del Usuario</h3>
                      <div className="bg-blue-50 rounded-xl p-6">
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                              <Eye className="text-blue-600" size={20} />
                            </div>
                            <div>
                              <h4 className="font-bold text-blue-800">Transparencia</h4>
                              <p className="text-blue-700">
                                Puedes ver por qué tu evento fue rechazado y apelar la decisión
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                              <FileText className="text-blue-600" size={20} />
                            </div>
                            <div>
                              <h4 className="font-bold text-blue-800">Propiedad</h4>
                              <p className="text-blue-700">
                                Conservas los derechos sobre el contenido que publicas
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                              <Lock className="text-blue-600" size={20} />
                            </div>
                            <div>
                              <h4 className="font-bold text-blue-800">Privacidad</h4>
                              <p className="text-blue-700">
                                Tu información personal está protegida según nuestra política
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">Monetización y Eventos Destacados</h3>
                      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
                        <h4 className="font-bold text-yellow-800 mb-4">Eventos Destacados</h4>
                        <div className="space-y-4">
                          <p className="text-yellow-700">
                            Los eventos destacados son una opción paga que ofrece mayor visibilidad.
                          </p>
                          <ul className="space-y-2 text-yellow-700">
                            <li className="flex items-center">
                              <ChevronRight size={16} className="mr-2" />
                              <span>Aparecen en la página principal</span>
                            </li>
                            <li className="flex items-center">
                              <ChevronRight size={16} className="mr-2" />
                              <span>Prioridad en búsquedas</span>
                            </li>
                            <li className="flex items-center">
                              <ChevronRight size={16} className="mr-2" />
                              <span>Destacados en el calendario</span>
                            </li>
                            <li className="flex items-center">
                              <ChevronRight size={16} className="mr-2" />
                              <span>Promoción en redes sociales</span>
                            </li>
                          </ul>
                          <p className="text-sm text-yellow-600 mt-4">
                            Los precios y condiciones específicas se detallan en el momento de la contratación.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sección Privacidad */}
              {activeSection === 'privacy' && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-6 flex items-center">
                      <Lock className="mr-3 text-indigo-600" size={32} />
                      Privacidad y Cookies
                    </h2>
                    <p className="text-gray-700 text-lg mb-6">
                      Tu privacidad es importante para nosotros. Conoce cómo protegemos tus datos.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Política de Privacidad</h3>
                      <div className="bg-indigo-50 rounded-xl p-6">
                        <h4 className="font-bold text-indigo-800 mb-4">Datos que Recopilamos</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 bg-white rounded-lg">
                            <h5 className="font-bold mb-2 text-indigo-700">Información Personal</h5>
                            <ul className="space-y-1 text-sm text-indigo-600">
                              <li>Nombre y apellidos</li>
                              <li>Correo electrónico</li>
                              <li>Teléfono (opcional)</li>
                              <li>Ubicación (opcional)</li>
                            </ul>
                          </div>
                          <div className="p-4 bg-white rounded-lg">
                            <h5 className="font-bold mb-2 text-indigo-700">Datos de Uso</h5>
                            <ul className="space-y-1 text-sm text-indigo-600">
                              <li>Eventos que visitas</li>
                              <li>Interacciones en la plataforma</li>
                              <li>Preferencias de búsqueda</li>
                              <li>Dispositivo y navegador</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">Uso de Cookies</h3>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <p className="text-gray-700 mb-4">
                          Utilizamos cookies para mejorar tu experiencia en la plataforma:
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                            <span>Cookies esenciales (funcionamiento del sitio)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                            <span>Cookies de rendimiento (analíticas)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                            <span>Cookies de funcionalidad (preferencias)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                            <span>Cookies de publicidad (solo con consentimiento)</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-4">
                          Puedes gestionar tus preferencias de cookies en cualquier momento desde la configuración.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">Tus Derechos de Privacidad</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-bold text-green-800 mb-2">Acceso y Corrección</h4>
                          <p className="text-green-700 text-sm">
                            Puedes acceder y corregir tus datos personales en cualquier momento
                          </p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-bold text-green-800 mb-2">Eliminación</h4>
                          <p className="text-green-700 text-sm">
                            Tienes derecho a solicitar la eliminación de tus datos
                          </p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-bold text-green-800 mb-2">Portabilidad</h4>
                          <p className="text-green-700 text-sm">
                            Puedes solicitar una copia de tus datos en formato estándar
                          </p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-bold text-green-800 mb-2">Oposición</h4>
                          <p className="text-green-700 text-sm">
                            Puedes oponerte al procesamiento de tus datos
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <Link
                        to="/privacidad"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Ver política de privacidad completa
                        <ChevronRight size={20} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Sección Contacto */}
              {activeSection === 'contact' && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-6 flex items-center">
                      <Send className="mr-3 text-teal-600" size={32} />
                      Contacto y Apelaciones
                    </h2>
                    <p className="text-gray-700 text-lg mb-6">
                      ¿Tienes preguntas o necesitas apelar una decisión? Estamos aquí para ayudarte.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Apelar una Decisión</h3>
                      <div className="bg-teal-50 rounded-xl p-6">
                        <p className="text-teal-700 mb-4">
                          Si tu evento fue rechazado y consideras que cumple con nuestras políticas, 
                          puedes apelar la decisión.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <div className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                              1
                            </div>
                            <div>
                              <p className="font-medium">Revisa el motivo de rechazo</p>
                              <p className="text-sm text-teal-600">
                                Encuentra el motivo en la notificación que recibiste
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                              2
                            </div>
                            <div>
                              <p className="font-medium">Prepara tu apelación</p>
                              <p className="text-sm text-teal-600">
                                Explica por qué consideras que tu evento cumple las normas
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                              3
                            </div>
                            <div>
                              <p className="font-medium">Envía tu apelación</p>
                              <p className="text-sm text-teal-600">
                                Utiliza el formulario de contacto o el correo electrónico
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">Canales de Contacto</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 bg-white border border-gray-200 rounded-xl">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                              <Mail className="text-red-600" size={24} />
                            </div>
                            <div>
                              <h4 className="font-bold">Correo Electrónico</h4>
                              <p className="text-sm text-gray-600">Para consultas generales</p>
                            </div>
                          </div>
                          <a
                            href="mailto:terminos@culturaviva.com"
                            className="text-red-600 font-medium hover:text-red-700"
                          >
                            terminos@culturaviva.com
                          </a>
                        </div>

                        <div className="p-6 bg-white border border-gray-200 rounded-xl">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                              <Phone className="text-blue-600" size={24} />
                            </div>
                            <div>
                              <h4 className="font-bold">WhatsApp</h4>
                              <p className="text-sm text-gray-600">Para consultas rápidas</p>
                            </div>
                          </div>
                          <a
                            href="https://wa.me/51987654321"
                            className="text-blue-600 font-medium hover:text-blue-700"
                          >
                            +51 987 654 321
                          </a>
                        </div>

                        <div className="p-6 bg-white border border-gray-200 rounded-xl md:col-span-2">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                              <FileText className="text-green-600" size={24} />
                            </div>
                            <div>
                              <h4 className="font-bold">Formulario de Contacto</h4>
                              <p className="text-sm text-gray-600">Para apelaciones específicas</p>
                            </div>
                          </div>
                          <Link
                            to="/contacto"
                            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                          >
                            Ir al formulario de contacto
                            <ChevronRight size={20} className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4">Tiempos de Respuesta</h3>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span>Consultas generales</span>
                            <span className="font-bold text-green-600">24-48 horas</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Apelaciones de eventos</span>
                            <span className="font-bold text-yellow-600">3-5 días hábiles</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Solicitudes de eliminación de datos</span>
                            <span className="font-bold text-red-600">10 días hábiles</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Aceptación de términos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-8"
            >
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 mr-4 w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <div>
                  <label htmlFor="acceptTerms" className="block font-bold text-gray-900 mb-2">
                    Confirmo que he leído y acepto los Términos y Condiciones
                  </label>
                  <p className="text-gray-600 text-sm">
                    Al marcar esta casilla, aceptas cumplir con todas las normas establecidas en este documento. 
                    Esta aceptación es necesaria para publicar eventos en la plataforma.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Al continuar, también aceptas nuestra{' '}
                  <Link to="/privacidad" className="text-red-600 hover:text-red-700">
                    Política de Privacidad
                  </Link>
                </p>
                <button
                  disabled={!acceptedTerms}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    acceptedTerms
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Aceptar y Continuar
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Información de jurisdicción */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center text-gray-500">
            <Globe size={16} className="mr-2" />
            <span className="text-sm">
              Jurisdicción: {new Date().toLocaleDateString('es-ES', { year: 'numeric' })} - Plataforma de Actividades Culturales CulturaViva
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Terms
