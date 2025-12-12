import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  User,
  Calendar,
  MapPin,
  AlertCircle
} from 'lucide-react'

const PendingEvents = () => {
  const [pendingEvents, setPendingEvents] = useState([
    {
      id: 1,
      name: 'Boda Tradicional',
      organizer: 'Familia Rodríguez',
      date: '30 Jul 2024',
      location: 'Iglesia San Pedro',
      submitted: '2024-01-15',
      category: 'Matrimonio',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Torneo de Fútbol',
      organizer: 'Club Deportivo',
      date: '18 Jul 2024',
      location: 'Estadio Municipal',
      submitted: '2024-01-14',
      category: 'Deportes',
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Exposición de Arte',
      organizer: 'Galería Local',
      date: '25 Jul 2024',
      location: 'Centro Cultural',
      submitted: '2024-01-13',
      category: 'Arte',
      priority: 'low'
    },
    {
      id: 4,
      name: 'Fiesta Infantil',
      organizer: 'Padres de Familia',
      date: '20 Jul 2024',
      location: 'Parque Infantil',
      submitted: '2024-01-12',
      category: 'Infantil',
      priority: 'medium'
    }
  ])

  const handleApprove = (id) => {
    setPendingEvents(pendingEvents.filter(event => event.id !== id))
  }

  const handleReject = (id) => {
    setPendingEvents(pendingEvents.filter(event => event.id !== id))
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    }
    return colors[priority]
  }

  const getPriorityIcon = (priority) => {
    const icons = {
      high: <AlertCircle size={14} />,
      medium: <Clock size={14} />,
      low: <Clock size={14} />
    }
    return icons[priority]
  }

  return (
    <div className="p-6">
      {pendingEvents.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
          <p className="text-gray-600">No hay eventos pendientes</p>
          <p className="text-sm text-gray-500">¡Todo está al día!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <div className="flex-1">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-4">
                    <Calendar className="text-gray-600" size={20} />
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <h3 className="font-bold mr-3">{event.name}</h3>
                      <span className={`flex items-center px-2 py-1 rounded-full text-xs ${getPriorityColor(event.priority)}`}>
                        {getPriorityIcon(event.priority)}
                        <span className="ml-1">
                          {event.priority === 'high' ? 'Alta' : event.priority === 'medium' ? 'Media' : 'Baja'}
                        </span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User size={14} className="mr-1" />
                        {event.organizer}
                      </div>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">
                          {event.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Enviado el {event.submitted}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleApprove(event.id)}
                  className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                  title="Aprobar"
                >
                  <CheckCircle size={20} />
                </button>
                <button
                  onClick={() => handleReject(event.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  title="Rechazar"
                >
                  <XCircle size={20} />
                </button>
                <button
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                  title="Ver detalles"
                >
                  <Eye size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Estadísticas de aprobación */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">7</p>
            <p className="text-sm text-gray-600">Pendientes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">48</p>
            <p className="text-sm text-gray-600">Aprobados este mes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">3</p>
            <p className="text-sm text-gray-600">Rechazados este mes</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PendingEvents
