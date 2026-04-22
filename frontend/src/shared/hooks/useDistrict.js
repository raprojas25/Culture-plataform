import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { districtService } from "@/shared/services/districtService";

export const useDistricts = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todas las distritos
  const fetchDistricts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await districtService.getAll();
      setDistricts(data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar distritos");
      toast.error("Error al cargar distritos");
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear distrito
  const createDistrict = useCallback(async (categoryData) => {
    setLoading(true);
    try {
      const newDistrict = await districtService.create(categoryData);
      setDistricts((prev) => [...prev, newDistrict]);
      toast.success("distrito creada exitosamente");
      return { success: true, data: newDistrict };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error al crear distrito";
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar distrito
  const updateDistrict = useCallback(async (id, categoryData) => {
    setLoading(true);
    try {
      const updatedDistrict = await districtService.update(id, categoryData);
      setDistricts((prev) =>
        prev.map((cat) => (cat.id === id ? updatedDistrict : cat)),
      );
      toast.success("distrito actualizada exitosamente");
      return { success: true, data: updatedDistrict };
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Error al actualizar distrito";
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar distrito
  const deleteDistrict = useCallback(async (id) => {
    setLoading(true);
    try {
      await districtService.delete(id);
      setDistricts((prev) => prev.filter((cat) => cat.id !== id));
      toast.success("distrito eliminada exitosamente");
      return { success: true };
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Error al eliminar distrito";
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Cambiar estado
  const toggleDistrictStatus = useCallback(async (id, currentStatus) => {
    try {
      const updatedDistrict = await districtService.toggleStatus(
        id,
        !currentStatus,
      );
      setDistricts((prev) =>
        prev.map((cat) => (cat.id === id ? updatedDistrict : cat)),
      );
      toast.success(`distrito ${!currentStatus ? "activada" : "desactivada"}`);
      return { success: true };
    } catch (err) {
      toast.error("Error al cambiar estado");
      return { success: false };
    }
  }, []);

  return {
    districts,
    loading,
    error,
    fetchDistricts,
    createDistrict,
    updateDistrict,
    deleteDistrict,
    toggleDistrictStatus,
  };
};
