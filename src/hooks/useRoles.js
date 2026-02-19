import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import roleApi from "../api/rolesApi";

export const useRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todas las categorías
  const fetchRoles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await roleApi.getAll();
      setRoles(data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar roles");
      toast.error("Error al cargar roles");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear rol
  const createRole = useCallback(async (roleData) => {
    setLoading(true);
    try {
      const newRole = await roleApi.create(roleData);
      setRoles((prev) => [...prev, newRole]);
      toast.success("Nuevo rol creada exitosamente");
      return { success: true, data: newRole };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error al crear rol";
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    roles,
    loading,
    error,
    fetchRoles,
    createRole,
  };
};
