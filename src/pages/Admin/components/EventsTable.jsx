import { useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  XCircle,
  Star,
  Eye,
  Edit,
  MoreVertical,
  Calendar,
  MapPin,
  User,
  Clock
} from 'lucide-react'

const EventsTable = ({ isFullView = false }) => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Fiesta Patronal San Juan',
      organizer: 'Comité de Fiestas',
      date: '24 Jun 2024',
      location: 'Plaza Principal',
      category: 'Fiesta Patronal',
      status: 'approved',
      featured: true,
      views: 1245,
      revenue: 500
    },
    {
      id: 2,
      name: 'Festival Gastronómico',
      organizer: 'Municipalidad',
      date: '15 Jul 2024',
      location: 'Parque Central',
      category: 'Gastronomía',
      status: 'approved',
      featured: false,
      views: 856,
      revenue: 0
    },
    {
      id: 3,
      name: 'Concierto de Música Andina',
      organizer: 'Grupo Musical',
      date: '30 Jun 2024',
      location: 'Anfiteatro',
      category: 'Concierto',
      status: 'pending',
      featured: false,
      views: 0,
      revenue: 0
    },
    {
      id: 4,
      name: 'Feria Artesanal',
      organizer: 'Artesanos Locales',
      date: '20 Jul 2024',
      location: 'Mercado Municipal',
      category: 'Feria',
      status: 'approved',
      featured: true,
      views: 987,
      revenue: 300
    },
    {
      id: 5,
      name: 'Competencia Deportiva',
      organizer: 'Club Deportivo',
      date: '12 Ago 2024',
      location: 'Estadio',
      category: 'Deportes',
      status: 'rejected',
      featured: false,
      views: 0,
      revenue: 0
    }
  ])

  const columns = [
    {
      header: 'Evento',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
            <Calendar size={20} className="text-gray-600" />
          </div>
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-gray-500 flex items-center">
              <User size={12} className="mr-1" />
              {row.original.organizer}
            </p>
          </div>
        </div>
      )
    },
    {
      header: 'Fecha',
      accessorKey: 'date'
    },
    {
      header: 'Ubicación',
      accessorKey: 'location',
      cell: ({ row }) => (
        <div className="flex items-center">
          <MapPin size={14} className="mr-1 text-gray-500" />
          {row.original.location}
        </div>
      )
    },
    {
      header: 'Categoría',
      accessorKey: 'category',
      cell: ({ row }) => (
        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
          {row.original.category}
        </span>
      )
    },
    {
      header: 'Estado',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status
        const colors = {
          approved: 'bg-green-100 text-green-800',
          pending: 'bg-yellow-100 text-yellow-800',
          rejected: 'bg-red-100 text-red-800'
        }
        const icons = {
          approved: <CheckCircle size={14} />,
          pending: <Clock size={14} />,
          rejected: <XCircle size={14} />
        }
        const labels = {
          approved: 'Aprobado',
          pending: 'Pendiente',
          rejected: 'Rechazado'
        }
        
        return (
          <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
            {icons[status]}
            <span className="ml-1">{labels[status]}</span>
          </div>
        )
      }
    },
    {
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          {isFullView && (
            <button className="p-1 hover:bg-gray-100 rounded">
              <Eye size={18} className="text-gray-600" />
            </button>
          )}
          <button className="p-1 hover:bg-gray-100 rounded">
            <Edit size={18} className="text-blue-600" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <MoreVertical size={18} className="text-gray-600" />
          </button>
        </div>
      )
    }
  ]

  const table = useReactTable({
    data: events,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const handleApprove = (id) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, status: 'approved' } : event
    ))
  }

  const handleReject = (id) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, status: 'rejected' } : event
    ))
  }

  const handleFeature = (id) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, featured: !event.featured } : event
    ))
  }

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-gray-200">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="py-4 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Acciones por lote */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Seleccionados: <span className="font-medium">0</span> de {events.length} eventos
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => handleApprove(events[0].id)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
            >
              <CheckCircle size={18} className="mr-2" />
              Aprobar
            </button>
            <button
              onClick={() => handleReject(events[0].id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
            >
              <XCircle size={18} className="mr-2" />
              Rechazar
            </button>
            <button
              onClick={() => handleFeature(events[0].id)}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center"
            >
              <Star size={18} className="mr-2" />
              Destacar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsTable
