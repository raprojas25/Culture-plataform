import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PlusCircle,
  Download,
  Settings,
  Bell,
  Eye,
  Star,
  TrendingUp,
  Users,
  Calendar,
  MessageSquare,
  RefreshCw,
  Shield
} from 'lucide-react'

const QuickActions = () => {
  const [actions] = useState([
    {
      id: 1,
      title: 'Crear Evento Destacado',
      description: 'Agregar evento manualmente',
      icon: <PlusCircle className="text-red-600" size={24} />,
      color: 'bg-red-50 border-red-200',
      action: () => console.log('Crear evento destacado')
    },
    {
      id: 2,
      title: 'Enviar Notificación',
      description: 'Notificar a todos los usuarios',
      icon: <Bell className="text-blue-600" size={24} />,
      color: 'bg-blue-50 border-blue-200',
      action: () => console.log('Enviar notificación')
    },
    {
      id: 3,
      title: 'Ver Reporte',
      description: 'Descargar reporte mensual',
      icon: <Download className="text-green-600" size={24} />,
      color: 'bg-green-50 border-green-200',
      action: () => console.log('Ver reporte')
    },
    {
      id: 4,
      title: 'Moderar Comentarios',
      description: 'Revisar contenido reportado',
      icon: <Shield className="text-purple-600" size={24} />,
      color: 'bg-purple-50 border-purple-200',
      action: () => console.log('Moderar comentarios')
    }
  ])

  const [systemStatus, setSystemStatus] = useState({
    platform: 'online',
    database: 'online',
    api: 'online',
    storage: 'warning'
  })

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'offline': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Acciones rápidas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold flex items-center">
            <TrendingUp className="mr-2 text-red-600" size={20} />
            Acciones Rápidas
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {actions.map((action) => (
              <motion.button
                key={action.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className={`${action.color} p-4 rounded-xl border text-left`}
              >
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-white rounded-lg mr-3">
                    {action.icon}
                  </div>
                  <h3 className="font-bold">{action.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Estado del sistema */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold flex items-center">
            <Settings className="mr-2 text-gray-600" size={20} />
            Estado del Sistema
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {Object.entries(systemStatus).map(([key, status]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    status === 'online' ? 'bg-green-500' :
                    status === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}></div>
                  <span className="capitalize">{key}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                  {status === 'online' ? 'Operativo' :
                   status === 'warning' ? 'Advertencia' : 'Inactivo'}
                </span>
              </div>
            ))}
          </div>

          {/* Uso de recursos */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-bold mb-4">Uso de Recursos</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Almacenamiento</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Memoria RAM</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CPU</span>
                  <span>32%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Última actividad */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold flex items-center">
            <Eye className="mr-2 text-gray-600" size={20} />
            Última Actividad
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { user: 'Admin', action: 'Aprobó evento "Fiesta Patronal"', time: 'Hace 5 min' },
              { user: 'Moderador', action: 'Rechazó comentario inapropiado', time: 'Hace 15 min' },
              { user: 'Sistema', action: 'Backup automático completado', time: 'Hace 1 hora' },
              { user: 'Admin', action: 'Actualizó configuración de pago', time: 'Hace 2 horas' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <Users size={14} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            Ver toda la actividad
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuickActions
