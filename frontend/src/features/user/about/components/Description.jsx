import { motion } from "framer-motion";
import { Target } from "lucide-react";

import { Paragraph } from "@/shared/components/ui/Paragraph";
import { Heading } from "@/shared/components/ui/Heading";
import { Badge } from "@/shared/components/ui/Badge";
export const Description = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const stats = [
    {
      id: 1,
      data: "500+",
      text: "Eventos Publicados",
    },
    {
      id: 2,
      data: "10k",
      text: "Usuarios Activos",
    },
    {
      id: 3,
      data: "25+",
      text: "Comunidades",
    },
  ];
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="mb-20"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          {/* <motion.div */}
          {/*   variants={fadeInUp} */}
          {/*   className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full mb-6" */}
          {/* > */}
          {/*   <Target className="mr-2" size={20} /> */}
          {/*   <span className="font-semibold">Nuestra Misión</span> */}
          {/* </motion.div> */}

          <Heading level="h2" className="text-4xl font-bold mb-6">
            Revitalizando la Cultura Local
          </Heading>
          <Badge size="lg" variant="danger" leftIcon={Target} className="mb-6">
            Nuestra Misión
          </Badge>
          <Paragraph size="lg" className="text-gray-600 text-lg mb-6">
            CulturaViva es una plataforma digital diseñada para preservar,
            promover y compartir las actividades culturales, fiestas
            tradicionales y eventos comunitarios de nuestra provincia.
          </Paragraph>
          <Paragraph size="base" className="text-gray-600 mb-8">
            Nacimos de la necesidad de dar visibilidad a las ricas tradiciones
            que muchas veces pasan desapercibidas. Creamos un puente digital
            entre organizadores, proveedores y asistentes, asegurando que cada
            celebración llegue a quien realmente la valore.
          </Paragraph>

          {/* stats */}
          <div className="flex items-center space-x-8">
            {stats.map((item) => (
              <div className="text-center hover:scale-110">
                <div className="text-4xl font-bold text-red-600">
                  {item.data}
                </div>
                <div className="text-gray-500 dark:text-gray-400">{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* images */}
        <motion.div variants={fadeInUp} className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-64 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800"
                  alt="Fiesta tradicional"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-48 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800"
                  alt="Danza tradicional"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"
                  alt="Comida típica"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800"
                  alt="Artesanía local"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
