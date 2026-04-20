import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { userService} from '@/shared/services/userService';

export const useUser = () => {
  const [user, setuser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todas las usuarios
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAll();
      setuser(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar usuarios');
      toast.error('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear usuario
  const createUser = useCallback(async (userData) => {
    setLoading(true);
    try {
      const newUser = await userService.create(userData);
      setuser(prev => [...prev, newUser]);
      toast.success('Usuario creado exitosamente');
      return { success: true, data: newUser };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al crear usuario';
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar usuario
  const updateUser = useCallback(async (id, userData) => {
    setLoading(true);
    try {
      const updatedUser = await userService.update(id, userData);
      setuser(prev => 
        prev.map(cat => cat.id === id ? updatedUser : cat)
      );
      toast.success('Usuario actualizado exitosamente');
      return { success: true, data: updatedUser };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al actualizar usuario';
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar usuario
  const updateUserPassword = useCallback(async (id, userData) => {
    setLoading(true);
    try {
      const updatedUser = await userService.updatePassword(id, userData);
      setuser(prev => 
        prev.map(cat => cat.id === id ? updatedUser : cat)
      );
      toast.success('Usuario actualizado exitosamente');
      return { success: true, data: updatedUser };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al actualizar usuario';
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);


  // Eliminar usuario
  const deleteUser = useCallback(async (id) => {
    setLoading(true);
    try {
      await userService.delete(id);
      setuser(prev => prev.filter(cat => cat.id !== id));
      toast.success('Usuario eliminado exitosamente');
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al eliminar usurio';
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Cambiar estado
  const deactivateUser = useCallback(async (id) => {
    setLoading(true);
    try {
      const currentUser = user.find((u) => u.id === id);
      const updatedUser = await userService.deactivate(id);
      setuser((prev) =>
        prev.map((cat) => (cat.id === id ? updatedUser : cat))
      );
      const newState = !currentUser?.is_active;
      toast.success(`Usuario ${newState ? "activado" : "desactivado"}`);
      return { success: true };
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Error al cambiar estado";
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    user,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    deactivateUser,
    updateUserPassword,
  };
};
