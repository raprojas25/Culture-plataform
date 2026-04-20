import { Calendar, CheckCircle } from "lucide-react";
import { motion } from 'framer-motion'
import { Heading } from "@/shared/components/ui/Heading";
import { Paragraph } from "@/shared/components/ui/Paragraph";

export const Benefit = () => {

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


  // Beneficios
const benefits = [
  {
    id: 1,
    text: "Mayor visibilidad para tus eventos",
    icon: <CheckCircle size={20} />,
  },
  {
    id: 2,
    text: "Conexión directa con la comunidad",
    icon: <CheckCircle size={20} />,
  },
  {
    id: 3,
    text: "Herramientas gratuitas de gestión",
    icon: <CheckCircle size={20} />,
  },
  {
    id: 4,
    text: "Acceso a proveedores confiables",
    icon: <CheckCircle size={20} />,
  },
  {
    id: 5,
    text: "Promoción en redes sociales",
    icon: <CheckCircle size={20} />,
  },
  {
    id: 6,
    text: "Estadísticas y análisis de asistencia",
    icon: <CheckCircle size={20} />,
  },
];


  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="mb-20"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={fadeInUp}>
          <Heading level="h2" align="center">
            Beneficios para la Comunidad
          </Heading>
          <Paragraph size='lg' className="mb-8">
            CulturaViva transforma la manera en que experimentamos y compartimos
            nuestra herencia cultural
          </Paragraph>

          <div className="space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="flex items-center">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg mr-4">
                  {benefit.icon}
                </div>
                <Paragraph color="muted" size="base" >
                  {benefit.text}
                </Paragraph>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="relative">
          <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-8 text-white">
            <div className="text-center">
              <Calendar className="mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-4">Impacto Medible</h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">85%</div>
                  <div className="text-sm opacity-90">
                    Más asistencia a eventos
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">40%</div>
                  <div className="text-sm opacity-90">
                    Más ingresos para organizadores
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">60%</div>
                  <div className="text-sm opacity-90">
                    Reducción en costos de promoción
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-sm opacity-90">
                    Satisfacción de usuarios
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Elementos decorativos */}
          <div className="absolute -top-6 -right-3 w-24 h-24 bg-yellow-400 rounded-full opacity-20 overflow-hidden"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400 rounded-full opacity-20"></div>
        </motion.div>
      </div>
    </motion.section>
  );
};
