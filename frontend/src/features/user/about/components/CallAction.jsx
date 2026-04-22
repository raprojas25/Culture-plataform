import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export const CallAction = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="mb-20"
    >
      <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl p-12 text-white text-center mx-auto">
        <h2 className="text-4xl font-bold mb-6">
          Únete a la Revolución Cultural
        </h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Ya sea que quieras compartir tu evento, encontrar proveedores o
          descubrir tradiciones, tenemos un lugar para ti.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-red-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 flex items-center justify-center gap-2">
            Publica tu Primer Evento
            <ChevronRight />
          </button>
          <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-red-600">
            Contáctanos
          </button>
        </div>
      </div>
    </motion.section>
  );
};
