import { motion, AnimatePresence } from "framer-motion";
import {
  Facebook,
  Instagram,
  Youtube,
  Newspaper,
  ExternalLink,
} from "lucide-react";
import { Description } from "./components/Description";
import { History } from "./components/History";
import { Hero } from "./components/Hero";
import { Equipo } from "./components/Equipo";
import { Valores } from "./components/Valores";
import { Benefit } from "./components/Benefit";
import { Testimonios } from "./components/Testimonios";
import { Aliados } from "./components/Aliados";
import { Heading } from "@/shared/components/ui/Heading";
import { CallAction } from "./components/CallAction";

const About = () => {
  // Enlaces a recursos
  const resources = [
    {
      id: 1,
      title: 'Reportaje en "El Comercio"',
      url: "#",
      icon: <Newspaper size={18} />,
    },
    {
      id: 2,
      title: "Entrevista en Radio Nacional",
      url: "#",
      icon: <ExternalLink size={18} />,
    },
    {
      id: 3,
      title: "Artículo en Blog de Turismo",
      url: "#",
      icon: <ExternalLink size={18} />,
    },
    {
      id: 4,
      title: "Presentación en Congreso Cultural",
      url: "#",
      icon: <ExternalLink size={18} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:bg-slate-900">
      {/* Hero Section */}
      <Hero />

      <div className="container mx-auto px-4 py-16 dark:bg-slate-900">
        {/* 1. Descripción del Proyecto */}
        <Description />
        {/* 2. Historia */}
        <History />
        {/* 3. Equipo */}
        <Equipo />
        {/* 4. Valores */}
        <Valores />
        {/* 5. Beneficios */}
        <Benefit />
        {/* 6. Testimonios */}
        <Testimonios />
        {/* 7. Patrocinadores */}
        <Aliados />
        {/* 8. Llamada a la Acción */}
        <CallAction />
        {/* 9. Enlaces y Recursos */}

        {/* 10. Imágenes Finales */}

        {/* Redes Sociales */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pt-8 border-t dark:border-slate-600"
        >
          <Heading level="h3" align="center" className="mb-6">
            Síguenos en redes sociales
          </Heading>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-100 rounded-full hover:bg-pink-100 hover:text-pink-600 transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
            >
              <Youtube size={24} />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
