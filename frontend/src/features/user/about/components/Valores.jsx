import { Heading } from '@/shared/components/ui/Heading';
import { Paragraph } from '@/shared/components/ui/Paragraph';
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  Users,
  Award,
  Shield,
  TrendingUp,
  Globe,
} from 'lucide-react'
import { useEffect, useState } from 'react';

export const Valores = () => {

  const [activeValue, setActiveValue] = useState(0)

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  // Valores
const values = [
  {
    id: 1,
    title: "Identidad Cultural",
    description:
      "Preservamos y celebramos las tradiciones únicas de cada comunidad.",
    icon: <Heart className="text-red-500" size={32} />,
  },
  {
    id: 2,
    title: "Inclusión",
    description:
      "Todos tienen un lugar en nuestras celebraciones, sin importar origen o condición.",
    icon: <Users className="text-blue-500" size={32} />,
  },
  {
    id: 3,
    title: "Transparencia",
    description: "Operamos con honestidad y claridad en cada interacción.",
    icon: <Shield className="text-green-500" size={32} />,
  },
  {
    id: 4,
    title: "Sostenibilidad",
    description:
      "Promovemos prácticas que respeten el medio ambiente y la economía local.",
    icon: <Globe className="text-emerald-500" size={32} />,
  },
  {
    id: 5,
    title: "Innovación",
    description: "Usamos tecnología para mantener vivas las tradiciones.",
    icon: <TrendingUp className="text-purple-500" size={32} />,
  },
  {
    id: 6,
    title: "Calidad",
    description:
      "Garantizamos la mejor experiencia para organizadores y asistentes.",
    icon: <Award className="text-yellow-500" size={32} />,
  },
];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="mb-20"
    >
      <div className="text-center mb-12">
        <Heading level='h2' align='center'>Nuestros Valores</Heading>
        <Paragraph className="max-w-2xl mx-auto">
          Los principios que guían cada una de nuestras acciones
        </Paragraph>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((value, index) => (
          <motion.div
            key={value.id}
            variants={fadeInUp}
            onClick={() => setActiveValue(index)}
            className={`bg-white dark:bg-slate-800 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
              activeValue === index
                ? "ring-2 ring-red-500 shadow-xl transform scale-[1.02]"
                : "shadow-lg hover:shadow-xl"
            }`}
          >
            <div className="flex items-start mb-4">
              <div className="p-3 rounded-xl bg-gray-100 dark:bg-slate-700 mr-4">{value.icon}</div>
              <Heading level='h3'>{value.title}</Heading>
            </div>
            <Paragraph>{value.description}</Paragraph>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
