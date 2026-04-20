import { motion, AnimatePresence } from 'framer-motion'
export const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white py-20"
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Nuestra Historia
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Conectando tradiciones, uniendo comunidades
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};
