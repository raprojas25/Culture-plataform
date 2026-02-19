import React from 'react';
import { Edit2, Trash2, Eye, EyeOff, MoreVertical } from 'lucide-react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import CategoryBadge from './CategoryBadge';

const CategoryTable = ({ 
  categories, 
  onEdit, 
  onDelete, 
  onToggleStatus,
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12 overflow-x-auto">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-2xl">📁</span>
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No hay categorías
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Comienza creando tu primera categoría
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Categoría
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Descripción
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Creado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {categories.map((category) => (
            <tr 
              key={category.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <CategoryBadge category={category} />
              </td>
              <td className="px-6 py-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate text-wrap">
                  {category.description || 'Sin descripción'}
                </p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${category.is_active 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }
                `}>
                  {category.is_active ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {new Date(category.created_at).toLocaleDateString('es-ES')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Menu as="div" className="relative inline-block text-left">
                  <MenuButton className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </MenuButton>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => onEdit(category)}
                            className={`
                              flex items-center gap-2 w-full px-4 py-2 text-sm dark:text-gray-400
                              ${active 
                                ? 'bg-gray-100 dark:bg-gray-700' 
                                : ''
                              }
                            `}
                          >
                            <Edit2 className="w-4 h-4" />
                            Editar
                          </button>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => onToggleStatus(category.id, category.is_active)}
                            className={`
                              flex items-center gap-2 w-full px-4 py-2 text-sm dark:text-gray-400
                              ${active 
                                ? 'bg-gray-100 dark:bg-gray-700' 
                                : ''
                              }
                            `}
                          >
                            {category.is_active ? (
                              <>
                                <EyeOff className="w-4 h-4" />
                                Desactivar
                              </> 
                            ) : (
                              <>
                                <Eye className="w-4 h-4" />
                                Activar
                              </>
                            )}
                          </button>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => onDelete(category.id)}
                            className={`
                              flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400
                              ${active 
                                ? 'bg-red-50 dark:bg-red-900/20' 
                                : ''
                              }
                            `}
                          >
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                          </button>
                        )}
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
