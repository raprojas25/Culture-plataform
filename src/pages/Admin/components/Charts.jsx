import { useState } from 'react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { motion } from 'framer-motion'
import { TrendingUp, BarChart3, PieChart } from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const Charts = () => {
  const [activeChart, setActiveChart] = useState('line')

  const lineData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Eventos Publicados',
        data: [12, 19, 15, 25, 22, 30, 48],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Usuarios Registrados',
        data: [100, 150, 180, 220, 250, 300, 400],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const barData = {
    labels: ['Fiestas', 'Conciertos', 'Deportes', 'Ferias', 'Gastronomía'],
    datasets: [
      {
        label: 'Eventos por Categoría',
        data: [12, 19, 8, 15, 7],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(245, 158, 11)',
          'rgb(168, 85, 247)'
        ],
        borderWidth: 1
      }
    ]
  }

  const doughnutData = {
    labels: ['Aprobados', 'Pendientes', 'Rechazados'],
    datasets: [
      {
        data: [75, 15, 10],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 1
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  const chartComponents = {
    line: <Line data={lineData} options={options} />,
    bar: <Bar data={barData} options={options} />,
    doughnut: <Doughnut data={doughnutData} options={options} />
  }

  return (
    <div className="p-6">
      {/* Selector de gráficos */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          {[
            { id: 'line', label: 'Tendencia', icon: <TrendingUp size={18} /> },
            { id: 'bar', label: 'Categorías', icon: <BarChart3 size={18} /> },
            { id: 'doughnut', label: 'Estados', icon: <PieChart size={18} /> }
          ].map((chart) => (
            <button
              key={chart.id}
              onClick={() => setActiveChart(chart.id)}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeChart === chart.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {chart.icon}
              <span className="ml-2">{chart.label}</span>
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-600">
          Período: <span className="font-medium">Últimos 7 meses</span>
        </div>
      </div>

      {/* Gráfico principal */}
      <motion.div
        key={activeChart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-80"
      >
        {chartComponents[activeChart]}
      </motion.div>

      {/* Mini estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">Tasa de Aprobación</p>
          <p className="text-2xl font-bold">85%</p>
          <p className="text-xs text-blue-600">+5% vs mes anterior</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-700">Ingresos Totales</p>
          <p className="text-2xl font-bold">S/ 2,850</p>
          <p className="text-xs text-green-600">+18% vs mes anterior</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-700">Usuarios Activos</p>
          <p className="text-2xl font-bold">1,234</p>
          <p className="text-xs text-purple-600">+8% vs mes anterior</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-sm text-orange-700">Tiempo Respuesta</p>
          <p className="text-2xl font-bold">2.4h</p>
          <p className="text-xs text-orange-600">-0.5h vs mes anterior</p>
        </div>
      </div>
    </div>
  )
}

export default Charts
