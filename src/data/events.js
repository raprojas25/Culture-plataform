export const events = [
  {
    id: 1,
    title: 'Fiesta Patronal de San Juan',
    date: '24 Junio 2024',
    time: 'Todo el día',
    location: 'Plaza Principal',
    district: 'Centro',
    category: 'Fiestas Patronales',
    description: 'Celebración tradicional en honor a San Juan Bautista con danzas, música y comida típica.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
    organizer: 'Comité de Fiestas',
    contact: '987654321',
    featured: true,
    approved: true,
    photos: []
  },
  {
    id: 2,
    title: 'Festival Gastronómico',
    date: '15 Julio 2024',
    time: '10:00 - 20:00',
    location: 'Parque Central',
    district: 'Norte',
    category: 'Gastronomía',
    description: 'Degustación de platos típicos de la región.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
    organizer: 'Municipalidad',
    contact: '987654322',
    featured: true,
    approved: true,
    photos: []
  },
  // ... más eventos
]

export const pendingEvents = [
  {
    id: 101,
    title: 'Boda Tradicional',
    date: '30 Julio 2024',
    location: 'Iglesia San Pedro',
    category: 'Matrimonios',
    organizer: 'Familia Rodríguez',
    contact: '987654333',
    submitted: '2024-01-15',
    status: 'pending'
  }
]

export const categories = [
  { id: 1, name: 'Fiestas Patronales', count: 12, icon: '🎉' },
  { id: 2, name: 'Matrimonios', count: 8, icon: '💍' },
  { id: 3, name: 'Ferias', count: 15, icon: '🎪' },
  { id: 4, name: 'Actividades Escolares', count: 10, icon: '🎓' },
  { id: 5, name: 'Conciertos / Bailes', count: 20, icon: '🎵' },
  { id: 6, name: 'Deportes', count: 18, icon: '⚽' },
  { id: 7, name: 'Procesiones', count: 7, icon: '⛪' },
  { id: 8, name: 'Gastronomía', count: 14, icon: '🍲' },
  { id: 9, name: 'Danzas', count: 9, icon: '💃' },
  { id: 10, name: 'Rituales / Tradición', count: 5, icon: '🕯️' }
]
