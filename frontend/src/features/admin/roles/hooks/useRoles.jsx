import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { roleService } from "@/shared/services/roleService";

export const useRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissions, setPermissions] = useState([]);

  // Obtener todas las roles
  const fetchRoles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await roleService.getAll();
      setRoles(data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar roles");
      toast.error("Error al cargar roles");
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear role
  const createRole = useCallback(async (roleData) => {
    setLoading(true);
    try {
      const newRole = await roleService.create(roleData);
      setRoles((prev) => [...prev, newRole]);
      toast.success("role creada exitosamente");
      return { success: true, data: newRole };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error al crear rol";
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar role
  const updateRole = useCallback(async (id, roleData) => {
    setLoading(true);
    try {
      const updatedRole = await roleService.update(id, roleData);
      setRoles((prev) =>
        prev.map((cat) => (cat.id === id ? updatedRole : cat)),
      );
      toast.success("role actualizada exitosamente");
      return { success: true, data: updatedRole };
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Error al actualizar role";
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar role
  const deleteRole = useCallback(async (id) => {
    setLoading(true);
    try {
      await roleService.delete(id);
      setRoles((prev) => prev.filter((cat) => cat.id !== id));
      toast.success("rol eliminado exitosamente");
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error al eliminar rol";
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // cargar permisoa
  const loadPermissions = useCallback(async () => {
    try {
      const data = await roleService.getAvailablePermissions();
      setPermissions(data);
    } catch (error) {
      console.error("Error loading permissions:", error);
    }
  }, []);

  return {
    roles,
    loading,
    error,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
    loadPermissions,
    permissions,
  };
};
