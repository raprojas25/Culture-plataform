export const Images = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="mb-20"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Nuestra Cultura en Imágenes</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Capturamos la esencia de las tradiciones que nos hacen únicos
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="col-span-2 row-span-2">
          <div className="h-96 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800"
              alt="Festival cultural"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        <div>
          <div className="h-44 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"
              alt="Gastronomía"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        <div>
          <div className="h-44 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800"
              alt="Artesanía"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        <div>
          <div className="h-44 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800"
              alt="Danza"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        <div>
          <div className="h-44 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800"
              alt="Celebración"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};
