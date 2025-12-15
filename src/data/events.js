export const events = [
  /*
  {
    id: 8,
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
    id: 9,
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

  */
  // ... más eventos
  
  {
    id: 1,
    title: "Fiesta Patronal de San Juan",
    date: "2024-06-24",
    time: "10:00 AM - 10:00 PM",
    location: "Plaza Principal de Miraflores",
    category: "Fiestas Patronales",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop",
    featured: true,
    price: "Gratuito",
    attending: 450,
    description: "Celebración tradicional en honor a San Juan Bautista"
  },
  {
    id: 2,
    title: "Festival Gastronómico Regional",
    date: "2024-07-15",
    time: "2:00 PM - 10:00 PM",
    location: "Parque Central",
    category: "Gastronomía",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
    featured: true,
    price: "S/ 20",
    attending: 320,
    description: "Degustación de los mejores platos regionales"
  },
  {
    id: 3,
    title: "Concierto de Música Andina",
    date: "2024-06-30",
    time: "7:00 PM - 11:00 PM",
    location: "Anfiteatro Municipal",
    category: "Conciertos",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop",
    featured: true,
    price: "S/ 30",
    attending: 280,
    description: "Los mejores grupos de música andina en vivo"
  },
  {
    id: 4,
    title: "Matrimonio Tradicional",
    date: "2024-07-10",
    time: "3:00 PM - 6:00 PM",
    location: "Iglesia Principal",
    category: "Matrimonios",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&auto=format&fit=crop",
    price: "Invitación",
    attending: 150
  },
  {
    id: 5,
    title: "Feria Artesanal",
    date: "2024-07-20",
    time: "9:00 AM - 8:00 PM",
    location: "Mercado Municipal",
    category: "Ferias",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    price: "Gratuito",
    attending: 210
  },
  {
    id: 6,
    title: "Festival de Danzas",
    date: "2024-08-05",
    time: "4:00 PM - 10:00 PM",
    location: "Coliseo",
    category: "Danzas",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop",
    price: "S/ 15",
    attending: 180
  },
  {
    id: 7,
    title: "Competencia Deportiva",
    date: "2024-08-12",
    time: "8:00 AM - 5:00 PM",
    location: "Estadio",
    category: "Deportes",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
    price: "Gratuito",
    attending: 310
  }

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

export const mockEvents = [
  {
    id: 1,
    title: "Fiesta Patronal de San Juan",
    date: "2024-06-24",
    time: "10:00 AM - 10:00 PM",
    location: "Plaza Principal de Miraflores",
    category: "Fiestas Patronales",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop",
    featured: true,
    price: "Gratuito",
    attending: 450,
    description: "Celebración tradicional en honor a San Juan Bautista"
  },
  {
    id: 2,
    title: "Boda Tradicional Andina",
    date: "2024-07-15",
    time: "2:00 PM",
    location: "Iglesia de San Pedro",
    category: "Matrimonios",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&auto=format&fit=crop",
    price: "Invitación",
    attending: 150,
    description: "Matrimonio tradicional con costumbres andinas"
  },
  {
    id: 3,
    title: "Feria Artesanal del Valle",
    date: "2024-07-20",
    time: "9:00 AM - 8:00 PM",
    location: "Mercado Municipal",
    category: "Ferias",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    price: "Gratuito",
    attending: 320,
    description: "Exposición y venta de artesanías locales"
  },
  {
    id: 4,
    title: "Festival de Danzas Folklóricas",
    date: "2024-08-05",
    time: "4:00 PM - 10:00 PM",
    location: "Coliseo Municipal",
    category: "Danzas",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop",
    price: "S/ 20",
    attending: 280,
    description: "Presentación de grupos de danza tradicional"
  },
  {
    id: 5,
    title: "Concierto de Música Criolla",
    date: "2024-06-30",
    time: "7:00 PM",
    location: "Teatro Municipal",
    category: "Conciertos",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop",
    featured: true,
    price: "S/ 50",
    attending: 400,
    description: "Noche de música criolla con artistas nacionales"
  },
  {
    id: 6,
    title: "Festival Gastronómico Regional",
    date: "2024-07-10",
    time: "11:00 AM - 9:00 PM",
    location: "Parque Central",
    category: "Gastronomía",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
    price: "S/ 15",
    attending: 550,
    description: "Degustación de platos típicos de la región"
  },
  {
    id: 7,
    title: "Torneo de Fútbol Interprovincial",
    date: "2024-08-12",
    time: "8:00 AM - 6:00 PM",
    location: "Estadio Regional",
    category: "Deportes",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
    price: "Gratuito",
    attending: 800,
    description: "Competencia deportiva entre provincias"
  },
  {
    id: 8,
    title: "Procesión del Señor de los Milagros",
    date: "2024-10-18",
    time: "6:00 PM",
    location: "Centro Histórico",
    category: "Procesiones",
    image: "https://images.unsplash.com/photo-1547827328-cae297ecf9a5?w=800&auto=format&fit=crop",
    price: "Gratuito",
    attending: 1200,
    description: "Procesión religiosa más grande de América"
  },
  {
    id: 9,
    title: "Festival Escolar de Talentos",
    date: "2024-09-15",
    time: "9:00 AM - 4:00 PM",
    location: "Colegio Nacional",
    category: "Actividades Escolares",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop",
    price: "Gratuito",
    attending: 300,
    description: "Presentación de talentos estudiantiles"
  },
  {
    id: 10,
    title: "Ceremonia del Inti Raymi",
    date: "2024-06-24",
    time: "7:00 AM",
    location: "Sacsayhuamán",
    category: "Rituales / Tradición",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop",
    featured: true,
    price: "S/ 100",
    attending: 2000,
    description: "Ceremonia ancestral en honor al Dios Sol"
  },
  {
    id: 11,
    title: "Fiesta Patronal de la Virgen del Carmen",
    date: "2024-07-16",
    time: "10:00 AM",
    location: "Plaza de Armas",
    category: "Fiestas Patronales",
    image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=800&auto=format&fit=crop",
    price: "Gratuito",
    attending: 600,
    description: "Celebración en honor a la Virgen del Carmen"
  },
  {
    id: 12,
    title: "Matrimonio Civil Comunitario",
    date: "2024-08-14",
    time: "3:00 PM",
    location: "Municipalidad",
    category: "Matrimonios",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop",
    price: "Invitación",
    attending: 180,
    description: "Ceremonia de matrimonio colectivo"
  }
];
