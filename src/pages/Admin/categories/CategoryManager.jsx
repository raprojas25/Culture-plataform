import React, { useEffect, useState } from "react";
import {
  Plus,
  Filter,
  Search,
  RefreshCw,
  BarChart3,
  Check,
  X
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useCategories } from "../../../hooks/useCategories";
import CategoryTable from "./CategoryTable";
import CategoryModal from "./CategoryModal";
import CategoryBadge from "./CategoryBadge";
import RegisterCategoryModal from "../../../components/modals/RegisterCategoryModal";
import { Button } from "../../../components/ui/Button";

const CategoryManager = () => {
  const {
    categories,
    loading,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryStatus,
  } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);

  // Cargar categorías al montar
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Filtrar categorías
  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterActive === "all" ||
      (filterActive === "active" && category.is_active) ||
      (filterActive === "inactive" && !category.is_active);

    return matchesSearch && matchesFilter;
  });

  // Manejar abrir modal para crear
  const handleCreate = () => {
    setSelectedCategory(null);
    // setIsModalOpen(true);
    setShowCreateModal(true);
  };

  // Manejar abrir modal para editar
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  // Manejar envío del formulario
  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory.id, data);
      } else {
        await createCategory(data);
      }
      setIsModalOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error submitting category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejar eliminación
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
      const result = await deleteCategory(id);
      if (!result.success) {
        toast.error(result.error);
      }
    }
  };

  // Manejar cambio de estado
  const handleToggleStatus = async (id, currentStatus) => {
    await toggleCategoryStatus(id, currentStatus);
  };

  // Estadísticas
  const stats = {
    total: categories.length,
    active: categories.filter((c) => c.is_active).length,
    inactive: categories.filter((c) => !c.is_active).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 p-4 md:p-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Gestión de Categorías
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Administra y organiza todas las categorías de la plataforma
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={handleCreate}
            leftIcon={<Plus size={25} />}
          >
            Nueva Categoría
          </Button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm dark:shadow-gray-600 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-400 dark:bg-blue-600/50 rounded-full">
                <BarChart3 size={20} className="text-blue-100" />
              </div>

              <div className="flex flex-col justify-center items-end">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stats.total}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-green-400 dark:bg-green-600/50 rounded-full">
                <Check size={20} className="text-green-100" />
              </div>

              <div className="flex flex-col justify-center items-end">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.active}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Activas
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-red-400 dark:bg-red-600/50 rounded-full">
                <X size={20} className="text-red-100" />
              </div>

              <div className="flex flex-col justify-center items-end">
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {stats.inactive}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Inactivas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="mb-6 space-y-4">
        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 
                text-gray-400 dark:text-gray-500 w-5 h-5"
              />
              <input
                type="text"
                placeholder="Buscar categorías..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 
                  rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                  focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none hover:bg-gray-100"
              >
                <option value="all">Todos</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
            </div>

            <button
              onClick={fetchCategories}
              disabled={loading}
              className="p-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Categorías destacadas */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              Categorías destacadas:
            </span>
            <div className="flex gap-2">
              {categories.slice(0, 5).map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsModalOpen(true);
                  }}
                >
                  <CategoryBadge category={category} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tabla */}
      <CategoryTable
        categories={filteredCategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        isLoading={loading}
      />

      {/* Modal */}
      {/* <CategoryModal */}
      {/*   isOpen={isModalOpen} */}
      {/*   onClose={() => { */}
      {/*     setIsModalOpen(false); */}
      {/*     setSelectedCategory(null); */}
      {/*   }} */}
      {/*   onSubmit={handleSubmit} */}
      {/*   initialData={selectedCategory} */}
      {/*   isLoading={isSubmitting} */}
      {/* /> */}
      {/* Modal de creación */}
      <RegisterCategoryModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setSelectedCategory(null);
        }}
        onSuccess={() => {
          setShowCreateModal(false);
          fetchCategories();
        }}
        onSubmit={handleSubmit}
        initialData={selectedCategory}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default CategoryManager;
