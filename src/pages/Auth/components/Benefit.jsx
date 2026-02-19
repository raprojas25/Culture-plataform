import { Calendar, Heart, Shield, User } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const slideIn = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
};

export const Benefit = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ delay: 0.2 }}
      className="lg:block hidden"
    >
      <div className="sticky top-8">
        <div className="bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 rounded-2xl p-8 text-white h-full">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-4">
              Únete a nuestra comunidad cultural
            </h2>
            <p className="text-white/90 text-lg">
              Descubre todos los beneficios de ser parte de CulturaViva
            </p>
          </div>

          {/* Beneficios */}
          <div className="space-y-6 mb-10">
            {[
              {
                icon: <Calendar className="text-yellow-300" size={24} />,
                title: "Eventos personalizados",
                description: "Recibe recomendaciones basadas en tus intereses",
              },
              {
                icon: <Heart className="text-pink-300" size={24} />,
                title: "Guarda tus favoritos",
                description: "Marca eventos y servicios que te gusten",
              },
              {
                icon: <User className="text-blue-300" size={24} />,
                title: "Perfil personal",
                description:
                  "Crea tu perfil y comparte tus intereses culturales",
              },
              {
                icon: <Shield className="text-green-300" size={24} />,
                title: "Publica eventos",
                description: "Comparte tus propios eventos con la comunidad",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={slideIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 * index }}
                className="flex items-start"
              >
                <div className="p-3 bg-white/10 rounded-xl mr-4">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                  <p className="text-white/80">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Estadísticas */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
            <h3 className="font-bold text-xl mb-4">Nuestra comunidad crece</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">5K+</div>
                <div className="text-sm text-white/80">Usuarios</div>
              </div>
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-white/80">Eventos</div>
              </div>
              <div>
                <div className="text-2xl font-bold">25+</div>
                <div className="text-sm text-white/80">Comunidades</div>
              </div>
            </div>
          </div>

          {/* Testimonio */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <User size={24} />
              </div>
              <div>
                <h4 className="font-bold">María González</h4>
                <p className="text-sm text-white/80">Organizadora de eventos</p>
              </div>
            </div>
            <p className="italic text-white/90">
              "Gracias a CulturaViva he podido dar a conocer mis eventos
              tradicionales a toda la provincia. La comunidad es maravillosa."
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
