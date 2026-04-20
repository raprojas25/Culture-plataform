import { motion } from "framer-motion";

import { Paragraph } from "@/shared/components/ui/Paragraph";
import { Heading } from "@/shared/components/ui/Heading";
import { Badge } from "@/shared/components/ui/Badge";
import { fadeInUp } from "@/shared/utils/animations";

export const History = () => {
  const data = [
    {
      year: "2018",
      title: "La Inspiración",
      description:
        "Durante una fiesta patronal, notamos cómo eventos increíbles pasaban desapercibidos fuera de la comunidad local.",
    },
    {
      year: "2020",
      title: "El Inicio",
      description:
        "Creamos un grupo de WhatsApp para compartir eventos, que rápidamente creció a 500 miembros en un mes.",
    },
    {
      year: "2021",
      title: "Primera Plataforma",
      description:
        "Desarrollamos nuestra primera versión web con calendario básico y lista de eventos.",
    },
    {
      year: "2022",
      title: "Expansión",
      description:
        "Incorporamos directorio de servicios y comenzamos a trabajar con municipalidades.",
    },
    {
      year: "2023",
      title: "Plataforma Actual",
      description:
        "Lanzamos la versión completa con todas las funcionalidades que ves hoy.",
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
      <div className="text-center mb-12">
        <Heading level="h2" align="center">
          Nuestra Historia
        </Heading>
        <Paragraph className="max-w-2xl mx-auto">
          Un viaje de pasión, tradición y tecnología
        </Paragraph>
      </div>

      <div className="relative">
        {/* Línea de tiempo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-500 to-orange-500 hidden lg:block"></div>

        <div className="space-y-12">
          {data.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col lg:flex-row items-center ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Punto en la línea */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-white z-10 hidden lg:block"></div>

              {/* Contenido */}
              <div
                className={`lg:w-5/12 ${index % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:pl-12"}`}
              >
                <div className="bg-white dark:bg-slate-700 p-6 rounded-2xl shadow-lg border dark:border-slate-600">
                  <Badge variant="danger" size="md" className="mb-2">
                    {item.year}
                  </Badge>
                  <Heading level="h3">{item.title}</Heading>
                  <Paragraph>{item.description}</Paragraph>
                </div>
              </div>

              {/* Año */}
              <div className="lg:w-2/12 text-center my-4 lg:my-0">
                <Badge variant="red" size="lg" className="lg:hidden">
                  {item.year}
                </Badge>
              </div>

              {/* Espacio vacío para alinear */}
              <div className="lg:w-5/12 hidden lg:block"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
