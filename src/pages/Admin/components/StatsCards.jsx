import { motion } from 'framer-motion'
import {
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  Star,
  Eye,
  FileText,
  AlertCircle
} from 'lucide-react'

const StatsCards = () => {
  const stats = [
    {
      title: 'Eventos este mes',
      value: '48',
      change: '+12%',
      icon: <Calendar className="text-blue-600" size={24} />,
      color: 'bg-blue-50',
      bg: 'bg-blue-200',
      trend: 'up'
    },
    {
      title: 'Usuarios Activos',
      value: '1,234',
      change: '+8%',
      icon: <Users className="text-green-600" size={24} />,
      color: 'bg-green-50',
      bg: 'bg-green-200',
      trend: 'up'
    },
    {
      title: 'Eventos Destacados',
      value: '15',
      change: '+25%',
      icon: <Star className="text-yellow-600" size={24} />,
      color: 'bg-yellow-50',
      bg: 'bg-yellow-200',
      trend: 'up'
    },
    {
      title: 'Ingresos (S/)',
      value: '2,850',
      change: '+18%',
      icon: <DollarSign className="text-purple-600" size={24} />,
      color: 'bg-purple-50',
      bg: 'bg-purple-200',
      trend: 'up'
    },
    {
      title: 'Pendientes',
      value: '7',
      change: '-3',
      icon: <AlertCircle className="text-red-600" size={24} />,
      color: 'bg-red-50',
      bg: 'bg-red-200',
      trend: 'down'
    },
    {
      title: 'Visitas',
      value: '5.2K',
      change: '+32%',
      icon: <Eye className="text-indigo-600" size={24} />,
      color: 'bg-indigo-50',
      bg: 'bg-indigo-200',
      trend: 'up'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className={`${stat.color} rounded-xl p-6 border border-gray-200`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              {stat.icon}
            </div>
            <span className={`text-sm font-medium ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default StatsCards
