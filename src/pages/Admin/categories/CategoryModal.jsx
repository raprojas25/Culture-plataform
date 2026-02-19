import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import CategoryForm from './CategoryForm';

const CategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading
}) => {
  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      className="relative z-50"
    >
      {/* Fondo */}
      <div className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      
      {/* Contenedor del modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto pb-4">
        <DialogPanel className="w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-900 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {initialData ? 'Editar Categoría' : 'Nueva Categoría'}
            </DialogTitle>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Contenido */}
          <div className="p-6">
            <CategoryForm
              initialData={initialData}
              onSubmit={onSubmit}
              onCancel={onClose}
              isLoading={isLoading}
            />

          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CategoryModal;
