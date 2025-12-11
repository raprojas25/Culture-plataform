import { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { motion } from 'framer-motion'
import {
  Filter,
  MapPin,
  Calendar as CalendarIcon,
  List,
  Grid,
  Share2,
  Facebook
} from 'lucide-react'

const localizer = momentLocalizer(moment)

const CalendarPage = () => {
  const [view, setView] = useState('month')
  const [date, setDate] = useState(new Date())
  const [filters, setFilters] = useState({
    type: '',
    district: '',
    dateRange: ''
  })

  const events = [
    {
      id: 1,
      title: 'Fiesta Patronal',
      start: new Date(2024, 5, 24),
      end: new Date(2024, 5, 26),
      type: 'Fiesta Patronal',
      district: 'Centro',
      description: 'Fiesta tradicional con danzas y comida',
      location: 'Plaza Principal',
      contact: '987654321'
    },
    // ... más eventos
  ]

  const eventTypes = [
    'Fiesta Patronal',
    'Matrimonio',
    'Feria',
    'Concierto',
    'Deporte',
    'Gastronomía'
  ]

  const districts = [
    'Centro',
    'Norte',
    'Sur',
    'Este',
    'Oeste',
    'Rural'
  ]

  const handleSelectEvent = (event) => {
    // Mostrar detalles del evento
    console.log(event)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Calendario de Eventos</h1>
        <p className="text-gray-600">Explora todos los eventos culturales de la provincia</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="text-red-600" />
              <h2 className="text-xl font-bold">Filtros</h2>
            </div>

            <div className="space-y-6">
              {/* Tipo de Evento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Evento
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Todos los tipos</option>
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Distrito */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distrito / Barrio
                </label>
                <select
                  value={filters.district}
                  onChange={(e) => setFilters({...filters, district: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Todos los distritos</option>
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              {/* Rango de Fechas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rango de Fechas
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Todo el tiempo</option>
                  <option value="week">Esta semana</option>
                  <option value="month">Este mes</option>
                  <option value="nextMonth">Próximo mes</option>
                </select>
              </div>

              {/* Botones de Vista */}
              <div className="pt-4 border-t">
                <div className="flex gap-2">
                  <button
                    onClick={() => setView('month')}
                    className={`flex-1 py-2 rounded-lg ${view === 'month' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
                  >
                    <CalendarIcon size={20} className="mx-auto" />
                  </button>
                  <button
                    onClick={() => setView('week')}
                    className={`flex-1 py-2 rounded-lg ${view === 'week' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
                  >
                    <Grid size={20} className="mx-auto" />
                  </button>
                  <button
                    onClick={() => setView('agenda')}
                    className={`flex-1 py-2 rounded-lg ${view === 'agenda' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
                  >
                    <List size={20} className="mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Calendario */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              view={view}
              onView={setView}
              date={date}
              onNavigate={setDate}
              onSelectEvent={handleSelectEvent}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: '#ef4444',
                  borderRadius: '4px',
                  border: 'none'
                }
              })}
            />
          </div>

          {/* Detalles del Evento Seleccionado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Detalles del Evento</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-red-600 mb-2">Fiesta Patronal de San Juan</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <CalendarIcon size={18} className="mr-2" />
                    <span>24-26 Junio 2024</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-2" />
                    <span>Plaza Principal, Centro</span>
                  </div>
                  <p className="text-gray-700">
                    Celebración tradicional con danzas, música y comida típica en honor a San Juan Bautista.
                  </p>
                  <div className="pt-4">
                    <h4 className="font-bold mb-2">Contacto del Organizador:</h4>
                    <p className="text-gray-600">Juan Pérez - 987654321</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="mb-6">
                  <h4 className="font-bold mb-2">Galería de Fotos:</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                    <Facebook size={20} />
                    Compartir
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2">
                    <Share2 size={20} />
                    Más opciones
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default CalendarPage
