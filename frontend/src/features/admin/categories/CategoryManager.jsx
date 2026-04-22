import React, { useEffect, useState } from "react";
import {
  Plus,
  Filter,
  Search,
  RefreshCw,
  BarChart3,
  Check,
  X,
  Star,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useCategories } from "@/shared/hooks/useCategories";
import CategoryTable from "./CategoryTable";
// import CategoryModal from "./CategoryModal";
import CategoryBadge from "./CategoryBadge";
import RegisterCategoryModal from "./modals/RegisterCategoryModal";
import { Button } from "@/shared/components/ui/Button";
import Select from "@/shared/components/ui/Select";
import { SearchInput } from "@/shared/components/forms/Search";
import { NewModal } from "@/shared/components/ui/NewModal";
import CategoryForm from "./CategoryForm";
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
  const [editingCategory, setEditingCategory] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  //nuevo metodo para Filtrar
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
  });
  // Cargar categorías al montar
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Filtrar categorías
  const filteredCategories = categories.filter((category) => {
    // const matchesSearch =
    //   category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   category.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch =
      category.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      category.description
        ?.toLowerCase()
        .includes(filters.search.toLowerCase());
    // const matchesFilter =
    //   filterActive === "all" ||
    //   (filterActive === "active" && category.is_active) ||
    //   (filterActive === "inactive" && !category.is_active);
    const matchesFilter =
      filters.status === "all" ||
      (filters.status === "active" && category.is_active) ||
      (filters.status === "inactive" && !category.is_active);
    return matchesSearch && matchesFilter;
  });

  // Manejar abrir modal para crear
  const handleCreate = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
    // setShowCreateModal(true);
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
  const statsData = [
    {
      id: 1,
      title: "Total",
      value: categories.length,
      icon: BarChart3,
      description: "+150 today",
    },
    {
      id: 2,
      title: "Active",
      value: categories.filter((c) => c.is_active).length,
      icon: Check,
      description: "+15 today",
    },
    {
      id: 3,
      title: "Inactive",
      value: categories.filter((c) => !c.is_active).length,
      icon: X,
      description: "-50 today",
    },
    {
      id: 4,
      title: "Destacados",
      value: categories.filter((c) => !c.is_active).length,
      icon: Star,
      description: "+200 este mes",
    },
  ];
  return (
    <>
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
            leftIcon={Plus}
          >
            Nueva Categoría
          </Button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {statsData.map((card) => (
            <div
              key={card.id}
              className="bg-white dark:bg-white/5 rounded-xl p-4 dark:shadow-gray-600 border border-gray-200 dark:border-gray-600 "
            >
              <div className="flex items-center justify-start space-x-4">
                <div className="p-2 bg-gray-700 dark:bg-gray-600 rounded-full">
                  {<card.icon size={20} className="text-gray-100" />}
                </div>

                <div className="flex flex-col justify-center items-start">
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {card.value.toFixed(1)}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-400">
                {card.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Controles */}
      <div className="mb-6 space-y-4">
        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            {/*             <div className="relative"> */}
            {/*               <Search */}
            {/*                 className="absolute left-3 top-1/2 transform -translate-y-1/2  */}
            {/*                 text-gray-400 dark:text-gray-500 w-5 h-5" */}
            {/*               /> */}
            {/*               <input */}
            {/*                 type="text" */}
            {/*                 placeholder="Buscar categorías..." */}
            {/*                 value={searchTerm} */}
            {/*     onChange={(e) => */}
            {/*   setFilters((prev) => ({ ...prev, search: e.target.value })) */}
            {/* } */}
            {/*                 // onChange={(e) => setSearchTerm(e.target.value)} */}
            {/*                 className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600  */}
            {/*                   rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 */}
            {/*                   focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" */}
            {/*               /> */}
            {/*             </div> */}
            <SearchInput
              size="md"
              placeholder="Buscar categorías..."
              value={filters.search}
              // onChange={(e) => setSearchTerm(e.target.value)}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400 dark:text-gray-500" />

              <Select
                options={[
                  { value: "all", label: "Todos" },
                  { value: "active", label: "Activos" },
                  { value: "inactive", label: "Inactivos" },
                ]}
                value={filters.status}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, status: value }))
                }
                placeholder="Filtrar estado"
              />
              {/* <select */}
              {/*   value={filterActive} */}
              {/*   onChange={(e) => setFilterActive(e.target.value)} */}
              {/*   className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none hover:bg-gray-100" */}
              {/* > */}
              {/*   <option value="all">Todos</option> */}
              {/*   <option value="active">Activos</option> */}
              {/*   <option value="inactive">Inactivos</option> */}
              {/* </select> */}
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
      <NewModal
        showIcon
        title={"Nueva Categoría"}
        description={"Agregar una nueva categoría"}
        footer={"Las categorías serán visibles para todos los usuarios"}
        size="md"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCategory(null);
        }}
      >
        <CategoryForm
          initialData={selectedCategory}
          onSubmit={handleSubmit}
          onCancel={() => {
            setSelectedCategory(null);
            setIsModalOpen(false);
          }}
          isLoading={isSubmitting}
        />
      </NewModal>
      {/* <RegisterCategoryModal */}
      {/*   isOpen={isModalOpen} */}
      {/*   onClose={() => { */}
      {/*     // setShowCreateModal(false); */}
      {/*     setIsModalOpen(false); */}
      {/*     setSelectedCategory(null); */}
      {/*   }} */}
      {/*   onSuccess={() => { */}
      {/*     setIsModalOpen(false); */}
      {/*     // setShowCreateModal(false); */}
      {/*     fetchCategories(); */}
      {/*   }} */}
      {/*   onSubmit={handleSubmit} */}
      {/*   initialData={selectedCategory} */}
      {/*   isLoading={isSubmitting} */}
      {/* /> */}
    </>
  );
};

export default CategoryManager;

//example

/*
      <NewModal
        icon
        title={"Nueva Categoría"}
        description={"Agregar una nueva categoría"}
        footer={"Las categorías serán visibles para todos los usuarios"}
        size="md"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCategory(null);
        }}
      >
      {children}
      </NewModal>
*/
