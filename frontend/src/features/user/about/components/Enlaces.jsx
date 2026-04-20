export const Enlaces = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="mb-20"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">En los Medios</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Artículos y recursos que destacan nuestro trabajo
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <motion.a
            key={resource.id}
            href={resource.url}
            target="_blank"
            variants={fadeInUp}
            whileHover={{ x: 5 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-gray-100 rounded-lg mr-4">
                  {resource.icon}
                </div>
                <span className="font-medium group-hover:text-red-600">
                  {resource.title}
                </span>
              </div>
              <ExternalLink size={18} className="text-gray-400" />
            </div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
};
