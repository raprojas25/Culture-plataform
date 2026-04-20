export const mockEvents = [
  {
    id: 1,
    name: 'Fiesta Patronal San Juan',
    organizer: 'Comité de Fiestas',
    date: '2024-06-24',
    location: 'Plaza Principal',
    category: 'Fiesta Patronal',
    status: 'approved',
    featured: true,
    views: 1245,
    revenue: 500,
    tickets: 300,
    organizerContact: '987654321',
    description: 'Celebración tradicional en honor a San Juan Bautista',
    images: 5,
    createdAt: '2024-01-10'
  },
  // ... más eventos
]

export const mockUsers = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@email.com',
    role: 'organizer',
    eventsCount: 5,
    status: 'active',
    joined: '2023-10-15',
    lastLogin: '2024-01-14'
  },
  // ... más usuarios
]

export const mockStats = {
  totalEvents: 156,
  totalUsers: 1234,
  pendingEvents: 7,
  approvedEvents: 148,
  rejectedEvents: 5,
  featuredEvents: 15,
  totalRevenue: 2850,
  monthlyGrowth: 18,
  approvalRate: 85
}

export const mockCategories = [
  { name: 'Fiestas Patronales', count: 32, growth: 12 },
  { name: 'Conciertos', count: 28, growth: 8 },
  { name: 'Deportes', count: 24, growth: 15 },
  { name: 'Ferias', count: 19, growth: 5 },
  { name: 'Gastronomía', count: 17, growth: 20 },
  { name: 'Matrimonios', count: 12, growth: 3 },
  { name: 'Actividades Escolares', count: 9, growth: 25 },
  { name: 'Otros', count: 15, growth: 10 }
]
