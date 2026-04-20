import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import CategoryForm from '../CategoryForm';
// import CategoryForm from './CategoryForm';
import { useCategories } from '@/shared/hooks/useCategories';
import './Modal.css';

const RegisterCategoryModal = ({ isOpen,
  onClose,
  onSubmit,
  initialData
}) => {
  const { createCategory, loading, error } = useCategories();
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (formData) => {
    try {
      const response = await createCategory(formData);
      
      if (response && response.success) {
        setSuccessMessage('¡Categoría creada exitosamente!');
        
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => {
          setSuccessMessage('');
          onSuccess?.(response.data);
          onClose();
        }, 2000);
      }
    } catch (err) {
      console.error('Error al crear categoría:', err);
    }
  };

  const handleClose = () => {
    setSuccessMessage('');
    onClose();
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg">
                  <Plus className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Nueva Categoría
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Agregar una nueva categoría
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mensajes de éxito/error */}
            <AnimatePresence>
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mx-6 mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <div className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={20} />
                    <div className="flex-1">
                      <p className="font-medium text-green-800 dark:text-green-300">
                        {successMessage}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mx-6 mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <div className="flex items-center">
                    <AlertCircle className="text-red-500 mr-3" size={20} />
                    <div className="flex-1">
                      <p className="font-medium text-red-800 dark:text-red-300">
                        {error}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Formulario */}
            {/* <div className="p-6"> */}
            {/*   <CategoryForm */}
            {/*     onSubmit={handleSubmit} */}
            {/*     loading={loading} */}
            {/*     onCancel={handleClose} */}
            {/*   /> */}
            {/* </div> */}
            <div className='p-6'>
              <CategoryForm
              initialData={initialData}
              // onSubmit={handleSubmit}
              onSubmit={onSubmit}
              onCancel={handleClose}
              isLoading={loading}
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <AlertCircle size={16} className="mr-2" />
                Las categorías serán visibles para todos los usuarios
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegisterCategoryModal;
