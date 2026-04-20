import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Edit2, 
  Trash2, 
  Eye,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  ChevronDown,
  AlertCircle,
  Tag
} from 'lucide-react';
import RegisterCategoryModal from '../categories/modals/RegisterCategoryModal';
import { useCategories } from '@/shared/hooks/useCategories';
// import ConfirmModal from '../../components/modals/ConfirmModal';
// import './AdminComponents.css';

const CategoriesManagerDos = () => {
  const { categories, fetchCategories, deleteCategory, loading } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedRows, setSelectedRows] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [actionMenu, setActionMenu] = useState(null);
  const [bulkAction, setBulkAction] = useState('');

  // Cargar categorías al montar
  useEffect(() => {
    fetchCategories();
  }, []);
  // Filtrar y ordenar categorías
  const filteredCategories = useMemo(() => {
    let result = [...categories];
    console.log('categories:', categories);
    // Filtrar por búsqueda
    if (searchTerm) {
      result = result.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    // Filtrar por estado
    if (selectedStatus !== 'all') {
      result = result.filter(category => 
        selectedStatus === 'active' ? category.isActive : !category.isActive
      );
    }

    // Ordenar
    result.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'events':
          aValue = a.eventCount || 0;
          bValue = b.eventCount || 0;
          break;
        case 'created':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return result;
  }, [categories, searchTerm, selectedStatus, sortBy, sortOrder]);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(filteredCategories.map(cat => cat.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id)
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (categoryToDelete) {
      await deleteCategory(categoryToDelete.id);
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    }
  };

  const handleBulkAction = async () => {
    if (bulkAction === 'delete' && selectedRows.length > 0) {
      const confirm = window.confirm(`¿Eliminar ${selectedRows.length} categorías?`);
      if (confirm) {
        // Aquí implementarías la eliminación masiva
        console.log('Eliminar:', selectedRows);
      }
    }
    setBulkAction('');
  };

  const handleRefresh = () => {
    fetchCategories();
  };

  const handleExport = () => {
    // Lógica para exportar datos
    const dataStr = JSON.stringify(filteredCategories, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'categorias.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const StatusBadge = ({ isActive }) => (
    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center w-fit ${
      isActive
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    }`}>
      {isActive ? (
        <>
          <CheckCircle size={12} className="mr-1" />
          Activa
        </>
      ) : (
        <>
          <XCircle size={12} className="mr-1" />
          Inactiva
        </>
      )}
    </span>
  );

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Gestión de Categorías</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Administra las categorías de eventos de la plataforma
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefresh}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            title="Refrescar"
          >
            <RefreshCw size={20} />
          </button>
          <button
            onClick={handleExport}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            title="Exportar"
          >
            <Download size={20} />
          </button>
        </div>

        <button
            onClick={() => setShowCreateModal(true)}
            className="flex justify-center items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600"
          >
            <Plus size={20} />
            <span>Nueva Categoría</span>
          </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-gray-100 dark:bg-gray-700/50 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar categorías por nombre o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap space-x-3 space-y-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="flex-1 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Solo activas</option>
              <option value="inactive">Solo inactivas</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="name">Ordenar por nombre</option>
              <option value="events">Ordenar por eventos</option>
              <option value="created">Ordenar por fecha</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ChevronDown className={`transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedRows.length > 0 && (
        <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="text-blue-600 dark:text-blue-400" size={20} />
            <span className="text-blue-800 dark:text-blue-300">
              {selectedRows.length} categorías seleccionadas
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            >
              <option value="">Acciones en masa</option>
              <option value="activate">Activar</option>
              <option value="deactivate">Desactivar</option>
              <option value="delete">Eliminar</option>
            </select>
            <button
              onClick={handleBulkAction}
              disabled={!bulkAction}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}

      {/* Tabla */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Cargando categorías...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No se encontraron categorías
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Crea tu primera categoría'}
            </p>
          </div>
        ) : (
          <motion.table
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                <th className="py-4 px-6 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === filteredCategories.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Categoría
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Descripción
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Eventos
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Estado
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Creada
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <motion.tr
                  key={category.id}
                  variants={rowVariants}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(category.id)}
                      onChange={() => handleSelectRow(category.id)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {category.name}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Tag size={12} className="mr-1" />
                          ID: {category.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="max-w-xs">
                      <p className="text-gray-700 dark:text-gray-300 truncate">
                        {category.description || 'Sin descripción'}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {category.eventCount || 0}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">eventos</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge isActive={category.isActive} />
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(category.createdAt).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => window.open(`/categorias/${category.slug}`, '_blank')}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
                        title="Ver en sitio"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => {
                          // Aquí iría la lógica para editar
                          console.log('Editar:', category.id);
                        }}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg"
                        title="Editar"
                      >
                        <Edit2 size={18} />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setActionMenu(actionMenu === category.id ? null : category.id)}
                          className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                          <MoreVertical size={18} />
                        </button>

                        <AnimatePresence>
                          {actionMenu === category.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10"
                            >
                              <button
                                onClick={() => {
                                  // Activar/desactivar
                                  console.log('Toggle active:', category.id);
                                  setActionMenu(null);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                              >
                                {category.isActive ? 'Desactivar' : 'Activar'}
                              </button>
                              <button
                                onClick={() => {
                                  // Duplicar
                                  console.log('Duplicar:', category.id);
                                  setActionMenu(null);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                              >
                                Duplicar
                              </button>
                              <div className="border-t border-gray-200 dark:border-gray-700">
                                <button
                                  onClick={() => handleDelete(category)}
                                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        )}
      </div>

      {/* Paginación */}
      {filteredCategories.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Mostrando {filteredCategories.length} de {categories.length} categorías
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
              Anterior
            </button>
            <span className="px-3 py-1 bg-red-600 text-white rounded">1</span>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* Modal de creación */}
      <RegisterCategoryModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {
          setShowCreateModal(false);
          fetchCategories();
        }}
      />

      {/* Modal de confirmación de eliminación */}
{/*
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setCategoryToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Eliminar categoría"
        message={`¿Estás seguro de que quieres eliminar la categoría "${categoryToDelete?.name}"? Esta acción no se puede deshacer y se eliminarán todos los eventos asociados.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
*/}
    </>
  );
};

export default CategoriesManagerDos;
