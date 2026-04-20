import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/shared/components/ui/Button";
import { NewModal } from "@/shared/components/ui/NewModal";
import { SearchInput } from "@/shared/components/forms/Search";
import Select from "@/shared/components/ui/Select";
import { RefreshCw, UserPlus } from "lucide-react";
import { useUser } from "./hooks/useUser";
import { useUserStats } from "./hooks/useUserStats";
import { UserStatsCards } from "./components/UserStatsCards";
import { UserChart } from "./components/UserChart";
import { UsersTable } from "./components/UsersTable";
import { UserForm } from "./components/UserForm";
import { ConfirmModal } from "./components/ConfirmModal";
import { sampleUsers } from "./data/sampleUsers";
import toast from "react-hot-toast";

/**
 * Página de gestión de usuarios con estadísticas, gráficos y tabla interactiva
 * Incluye CRUD completo con modales de confirmación
 *
 * @returns {JSX.Element}
 */
export const Users = () => {
  // Estado principal
  const [users, setUsers] = useState(sampleUsers);
  const [filters, setFilters] = useState({
    status: "all",
    roles: "",
    search: "",
  });
  const [chartPeriod, setChartPeriod] = useState("month");

  // Estado de modales
  const [userFormModal, setUserFormModal] = useState({
    isOpen: false,
    mode: "create", // 'create' | 'edit'
    user: null,
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    userId: null,
    loading: false,
  });
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    userId: null,
    loading: false,
  });

  // Hook de usuarios (CRUD)
  const {
    user: usersFromAPI,
    loading: usersLoading,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    deactivateUser,
  } = useUser();

  // Hook de estadísticas
  const {
    metrics,
    growthData,
    loading: statsLoading,
    fetchGrowthData,
  } = useUserStats();

  // Cargar datos al montar
  useEffect(() => {
    fetchUsers().catch(() => {
      console.log("Usando datos de muestra como fallback");
    });
  }, [fetchUsers]);

  // Usar datos de API si están disponibles, si no, usar datos de muestra
  const activeUsers = useMemo(() => {
    return usersFromAPI?.users || users;
  }, [usersFromAPI, users]);

  // Filtrar usuarios según estado y búsqueda
  const filteredUsers = useCallback(() => {
    return activeUsers.filter((user) => {
      const matchesSearch =
        user.username?.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email?.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.role_name?.toLowerCase().includes(filters.search.toLowerCase());

      const matchesFilter =
        filters.status === "all" ||
        (filters.status === "active" && user.is_active) ||
        (filters.status === "inactive" && !user.is_active);

      const roleFilter = user.role_name?.toLowerCase().includes(filters.roles);

      return matchesSearch && matchesFilter && roleFilter;
    });
  }, [activeUsers, filters]);
  // ========================
  // Handlers de Usuario
  // ========================

  /**
   * Abrir modal para crear usuario
   */
  const handleCreateUser = () => {
    setUserFormModal({
      isOpen: true,
      mode: "create",
      user: null,
    });
  };

  /**
   * Abrir modal para editar usuario
   *
   * @param {string} id - ID del usuario
   */
  const handleEditUser = (id) => {
    const user = activeUsers.find((u) => u.id === id);
    if (user) {
      setUserFormModal({
        isOpen: true,
        mode: "edit",
        user,
      });
    }
  };

  /**
   * Enviar formulario de usuario (crear o editar)
   *
   * @param {Object} data - Datos del formulario
   */
  const handleSubmitUser = async (data) => {
    try {
      if (userFormModal.mode === "create") {
        const result = await createUser(data);
        if (result.success) {
          setUsers((prev) => [...prev, result.data]);
          setUserFormModal({ isOpen: false, mode: "create", user: null });
          return { success: true };
        }
        return { success: false, error: result.error };
      } else {
        const result = await updateUser(userFormModal.user.id, data);
        if (result.success) {
          setUsers((prev) =>
            prev.map((u) =>
              u.id === userFormModal.user.id ? { ...u, ...result.data } : u,
            ),
          );
          setUserFormModal({ isOpen: false, mode: "create", user: null });
          return { success: true };
        }
        return { success: false, error: result.error };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error al guardar usuario",
      };
    }
  };

  /**
   * Abrir modal de confirmación para eliminar
   *
   * @param {string} id - ID del usuario
   */
  const handleOpenDeleteModal = (id) => {
    setDeleteModal({
      isOpen: true,
      userId: id,
      loading: false,
    });
  };

  /**
   * Confirmar eliminación de usuario
   */
  const handleConfirmDelete = async () => {
    setDeleteModal((prev) => ({ ...prev, loading: true }));

    try {
      const result = await deleteUser(deleteModal.userId);
      if (result.success) {
        setUsers((prev) => prev.filter((u) => u.id !== deleteModal.userId));
        toast.success("Usuario eliminado correctamente");
      } else {
        toast.error(result.error || "Error al eliminar usuario");
      }
    } catch (error) {
      toast.error("Error al eliminar usuario");
    } finally {
      setDeleteModal({ isOpen: false, userId: null, loading: false });
    }
  };

  /**
   * Abrir modal de confirmación para cambiar estado
   *
   * @param {string} id - ID del usuario
   */
  const handleOpenStatusModal = (id) => {
    setStatusModal({
      isOpen: true,
      userId: id,
      loading: false,
    });
  };

  /**
   * Confirmar cambio de estado
   */
  const handleConfirmStatusChange = async () => {
    setStatusModal((prev) => ({ ...prev, loading: true }));

    try {
      const user = activeUsers.find((u) => u.id === statusModal.userId);
      const result = await deactivateUser(statusModal.userId);

      if (result.success) {
        const newState = !user?.is_active;
        setUsers((prev) =>
          prev.map((u) =>
            u.id === statusModal.userId ? { ...u, is_active: newState } : u,
          ),
        );
        toast.success(
          `Usuario ${newState ? "activado" : "desactivado"} correctamente`,
        );
      } else {
        toast.error(result.error || "Error al cambiar estado");
      }
    } catch (error) {
      toast.error("Error al cambiar estado del usuario");
    } finally {
      setStatusModal({ isOpen: false, userId: null, loading: false });
    }
  };

  /**
   * Cambiar período del gráfico
   *
   * @param {Object} params
   */
  const handleChartPeriodChange = ({ period }) => {
    setChartPeriod(period);
    fetchGrowthData({ period });
  };

  /**
   * Actualizar datos
   */
  const handleRefresh = () => {
    fetchUsers();
  };

  const filtered = filteredUsers();

  // Usuario que se está editando (para el formulario)
  const editingUser = userFormModal.mode === "edit" ? userFormModal.user : null;

  // Texto del modal de confirmación de estado
  const userToToggle = activeUsers.find((u) => u.id === statusModal.userId);
  const isActivating = userToToggle && !userToToggle.is_active;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestión de Usuarios
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Administra y monitorea todos los usuarios de la plataforma
          </p>
        </div>
        <Button
          variant="primary"
          onClick={handleCreateUser}
          leftIcon={UserPlus}
        >
          Nuevo Usuario
        </Button>
      </div>

      {/* Stats Cards */}
      <UserStatsCards metrics={metrics} loading={statsLoading} />

      {/* Chart */}
      <UserChart
        data={growthData}
        onPeriodChange={handleChartPeriodChange}
        loading={statsLoading}
      />

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchInput
            size="md"
            placeholder="Buscar usuarios por nombre, email o rol..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>

        <div className="flex items-center gap-3">
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

          <Select
            options={[
              { value: "", label: "Todos" },
              { value: "admin", label: "Administrador" },
              { value: "user", label: "Usuario" },
              { value: "moderator", label: "Moderador" },
              { value: "organizer", label: "Organizador" },
            ]}
            value={filters.roles}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, roles: value }))
            }
            placeholder="Filtrar por roles"
          />
        </div>
        <div className="">
          <button
            onClick={handleRefresh}
            disabled={usersLoading}
            className="p-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
            title="Actualizar datos"
          >
            <RefreshCw
              className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${
                usersLoading ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <UsersTable
        data={filtered}
        loading={usersLoading}
        onEdit={handleEditUser}
        onDelete={handleOpenDeleteModal}
        onToggleStatus={handleOpenStatusModal}
      />

      {/* Modal para crear/editar usuario */}
      <NewModal
        isOpen={userFormModal.isOpen}
        onClose={() =>
          setUserFormModal({ isOpen: false, mode: "create", user: null })
        }
        title={
          userFormModal.mode === "create" ? "Nuevo Usuario" : "Editar Usuario"
        }
        size="sm"
      >
        <UserForm
          user={editingUser}
          onSubmit={handleSubmitUser}
          onCancel={() =>
            setUserFormModal({ isOpen: false, mode: "create", user: null })
          }
          mode={userFormModal.mode}
          loading={usersLoading}
        />
      </NewModal>

      {/* Modal de confirmación para eliminar */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, userId: null, loading: false })
        }
        onConfirm={handleConfirmDelete}
        title="Eliminar Usuario"
        message="¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer y se perderán todos los datos asociados."
        variant="danger"
        confirmText="Eliminar"
        loading={deleteModal.loading}
      />

      {/* Modal de confirmación para activar/desactivar */}
      <ConfirmModal
        isOpen={statusModal.isOpen}
        onClose={() =>
          setStatusModal({ isOpen: false, userId: null, loading: false })
        }
        onConfirm={handleConfirmStatusChange}
        title={isActivating ? "Activar Usuario" : "Desactivar Usuario"}
        message={
          isActivating
            ? "¿Estás seguro de que deseas activar este usuario? Podrá acceder a la plataforma nuevamente."
            : "¿Estás seguro de que deseas desactivar este usuario? No podrá acceder a la plataforma hasta que sea activado nuevamente."
        }
        variant="warning"
        confirmText={isActivating ? "Activar" : "Desactivar"}
        loading={statusModal.loading}
      />
    </div>
  );
};
