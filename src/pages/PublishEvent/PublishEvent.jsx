import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import {
  Calendar,
  MapPin,
  Image as ImageIcon,
  Upload,
  DollarSign,
  CheckCircle
} from 'lucide-react'

const PublishEvent = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFeatured, setIsFeatured] = useState(false)

  const eventTypes = [
    'Fiesta Patronal',
    'Matrimonio',
    'Feria',
    'Actividad Escolar',
    'Concierto/Baile',
    'Deporte',
    'Procesión',
    'Gastronomía',
    'Danza',
    'Otro'
  ]

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      // Simulación de envío
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-500" />
          <span>¡Evento enviado para revisión!</span>
        </div>,
        { duration: 5000 }
      )
      
      reset()
      setIsFeatured(false)
    } catch (error) {
      toast.error('Error al enviar el evento')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Publica tu Evento
          </h1>
          <p className="text-gray-600">
            Comparte tu evento cultural con la comunidad
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Información Básica */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="text-red-600" />
              Información del Evento
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Evento *
                </label>
                <input
                  {...register('name', { required: 'Este campo es requerido' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent focus:outline-none"
                  placeholder="Ej: Fiesta Patronal de San Juan"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Evento *
                </label>
                <select
                  {...register('type', { required: 'Selecciona un tipo' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent focus:outline-none"
                >
                  <option value="">Seleccionar...</option>
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha y Hora *
                </label>
                <input
                  type="datetime-local"
                  {...register('date', { required: 'Fecha requerida' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lugar / Dirección *
                </label>
                <input
                  {...register('location', { required: 'Lugar requerido' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent focus:outline-none"
                  placeholder="Ej: Plaza Principal"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distrito / Caserío / Barrio *
              </label>
              <input
                {...register('district', { required: 'Distrito requerido' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent focus:outline-none"
                placeholder="Ej: Centro Histórico"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción Detallada *
              </label>
              <textarea
                {...register('description', { 
                  required: 'Descripción requerida',
                  minLength: { value: 50, message: 'Mínimo 50 caracteres' }
                })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent focus:outline-none"
                placeholder="Describe tu evento en detalle..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Imágenes */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <ImageIcon className="text-red-600" />
              Imágenes del Evento
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Afiche Principal *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors cursor-pointer">
                <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600">Arrastra o haz clic para subir</p>
                <p className="text-sm text-gray-500 mt-1">Recomendado: 1200x630px</p>
                <input
                  type="file"
                  accept="image/*"
                  {...register('poster', { required: 'Afiche requerido' })}
                  className="hidden"
                  id="poster-upload"
                />
                <label
                  htmlFor="poster-upload"
                  className="inline-block mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                >
                  Seleccionar Archivo
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fotos Adicionales (Opcional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-red-400"
                  >
                    <div className="text-center">
                      <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Foto {i}</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id={`photo-${i}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Contacto del Organizador</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  {...register('organizerName', { required: 'Nombre requerido' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono / WhatsApp *
                </label>
                <input
                  {...register('phone', { 
                    required: 'Teléfono requerido',
                    pattern: {
                      value: /^[0-9]{9,}$/,
                      message: 'Número inválido'
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Ej: 987654321"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          {/* Destacado */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-center gap-3">
                <DollarSign className="text-yellow-600" />
                <div>
                  <h3 className="font-bold text-lg">¿Quieres que sea "Evento Destacado"?</h3>
                  <p className="text-yellow-700">Tu evento aparecerá en la página principal</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            {isFeatured && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-6 bg-red-50 border border-red-200 rounded-xl"
              >
                <h4 className="font-bold text-red-700 mb-2">Costo del Evento Destacado:</h4>
                <ul className="list-disc list-inside text-red-600 space-y-1">
                  <li>Aparece en la página principal por 7 días</li>
                  <li>Destacado en el calendario</li>
                  <li>Prioridad en búsquedas</li>
                  <li>Costo: S/ 50.00</li>
                </ul>
                <p className="mt-4 text-sm text-red-700">
                  Te contactaremos para coordinar el pago.
                </p>
              </motion.div>
            )}
          </div>

          {/* Términos y Envío */}
          <div className="space-y-6">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                {...register('terms', { required: 'Debes aceptar los términos' })}
                className="mt-1 mr-3"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Acepto los <Link to="/terminos" className="text-red-600 hover:underline">{ }Términos y Condiciones</Link> y autorizo la publicación de este evento.
              </label>
            </div>

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
                'Publicar Evento'
              )}
            </motion.button>

            <p className="text-center text-sm text-gray-500">
              * Tu evento será revisado antes de ser publicado. Te notificaremos cuando sea aprobado.
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default PublishEvent
