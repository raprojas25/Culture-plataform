import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import RegisterCategoryModal from '../../components/modals/RegisterCategoryModal';

const AdminPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleCategoryCreated = (newCategory) => {
    // Actualizar la lista de categorías
    setCategories(prev => [...prev, newCategory]);
    // Aquí podrías también mostrar una notificación
    alert(`Categoría "${newCategory.name}" creada exitosamente`);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detectar preferencia del sistema para modo oscuro
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Administrar Categorías</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Plus size={20} />
          <span>Nueva Categoría</span>
        </button>
      </div>

      {/* Tabla de categorías existentes */}
      <div className="bg-white rounded-lg shadow">
        {/* ... tabla existente ... */}
      </div>

      {/* Modal */}
      <RegisterCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleCategoryCreated}
      />


        <div className={`min-h-screen w-full transition-all duration-500 -z-50 ${isDarkMode ? 'dark' : ''}`}>
      {/* Fondo principal con degradados */}
      <div className="fixed inset-0 overflow-hidden -z-50">
        
          {/*Degradado principal */}
        <div className={`absolute inset-0 transition-all duration-700 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-800' 
            : 'bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white'
        }`}></div>
        
        {/* Degradado de acento */}
        <div className={`absolute top-0 right-0 w-1/3 h-1/3 blur-3xl transition-all duration-1000 ${
          isDarkMode 
            ? 'bg-gradient-to-tr from-purple-600/20 to-transparent' 
            : 'bg-gradient-to-tr from-blue-400/20 to-transparent'
        }`}></div>
        
        {/* Segundo degradado de acento */}
        <div className={`absolute bottom-0 left-0 w-1/2 h-1/2 blur-3xl transition-all duration-1000 ${
          isDarkMode 
            ? 'bg-gradient-to-tr from-cyan-500/15 to-transparent' 
            : 'bg-gradient-to-tr from-indigo-300/20 to-transparent'
        }`}></div>
        
        {/* Patrón de puntos sutiles */}
        <div className={`absolute inset-0 opacity-30 ${
          isDarkMode ? 'opacity-10' : 'opacity-30'
        }`} style={{
          backgroundImage: `radial-gradient(${
            isDarkMode ? '#ffffff' : '#0000ff'
          } 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Efectos de partículas/brillo */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64">
          <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-1000 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10' 
              : 'bg-gradient-to-r from-blue-300/20 to-cyan-300/20'
          }`}></div>
        </div>
        
        {/* Líneas de gradiente sutiles */}
        <div className={`absolute top-0 left-0 w-full h-1 transition-all duration-1000 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-transparent via-purple-500/30 to-transparent' 
            : 'bg-gradient-to-r from-transparent via-blue-500/30 to-transparent'
        }`}></div>       
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
          Fondo con Degradados Profesional
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Un diseño moderno con degradados sutiles y soporte completo para modo oscuro.
          Perfecto para landing pages y aplicaciones web.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[1, 2, 3].map((item) => (
          <div 
            key={item}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30 dark:border-gray-700/30"
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 mb-6"></div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">
              Característica {item}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Este componente incluye degradados dinámicos que se adaptan automáticamente al modo oscuro.
            </p>
          </div>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">
          Degradados que se adaptan
        </h2>
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Los colores y opacidades cambian automáticamente según el modo de visualización.
          Prueba a alternar entre modo oscuro y claro usando el botón en la esquina inferior derecha.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
            Botón Primario
          </button>
          <button className="px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white rounded-lg font-medium border border-gray-300 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 transition-colors">
            Botón Secundario
          </button>
        </div>
      </div>
      
      <footer className="mt-16 pt-8 border-t border-gray-300/30 dark:border-gray-700/30 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          Componente creado con React y Tailwind CSS
        </p>
      </footer>
    </div>
      </div>
      
      {/* Botón para alternar modo oscuro/claro (opcional) */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-20 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 text-white hover:bg-gray-700' 
            : 'bg-white text-gray-800 hover:bg-gray-100'
        }`}
        aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </div>


    </div>
  );
};

export default AdminPanel;

