/*
import { useState, useCallback } from 'react';
import { categoriesApi, createCategory } from '../api/categoriesApi';

export const useCategories = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  // Crear categoría
  const createNewCategory = useCallback(async (categoryData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await createCategory(categoryData);
      setCategories(prev => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.message || 'Error al crear la categoría';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener todas las categorías
/*
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await categoriesApi.getAll();
      setCategories(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.message || 'Error al cargar categorías';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);
*/
/*
  // correccion de chat gtp
  const fetchCategories = useCallback(async () => {
  setLoading(true);
  setError(null);

  try {
    const response = await categoriesApi.getAll();

    // 🔑 Asegura que sea un array
    const categoriesArray = Array.isArray(response.data)
      ? response.data
      : response.data.data;

    setCategories(categoriesArray);

    return { success: true, data: categoriesArray };
  } catch (err) {
    const errorMessage = err.message || 'Error al cargar categorías';
    setError(errorMessage);
    return { success: false, error: errorMessage };
  } finally {
    setLoading(false);
  }
}, []);

  // Actualizar categoría
  const updateCategory = useCallback(async (id, updatedData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await categoriesApi.update(id, updatedData);
      setCategories(prev =>
        prev.map(cat => (cat.id === id ? response.data : cat))
      );
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.message || 'Error al actualizar categoría';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar categoría
  const deleteCategory = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await categoriesApi.delete(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || 'Error al eliminar categoría';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    categories,
    loading,
    error,
    createCategory: createNewCategory,
    fetchCategories,
    updateCategory,
    deleteCategory,
    setCategories
  };
};

*/
import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import categoryApi from '../api/categoriesApi';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todas las categorías
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoryApi.getAll();
      setCategories(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar categorías');
      toast.error('Error al cargar categorías');
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear categoría
  const createCategory = useCallback(async (categoryData) => {
    setLoading(true);
    try {
      const newCategory = await categoryApi.create(categoryData);
      setCategories(prev => [...prev, newCategory]);
      toast.success('Categoría creada exitosamente');
      return { success: true, data: newCategory };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al crear categoría';
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar categoría
  const updateCategory = useCallback(async (id, categoryData) => {
    setLoading(true);
    try {
      const updatedCategory = await categoryApi.update(id, categoryData);
      setCategories(prev => 
        prev.map(cat => cat.id === id ? updatedCategory : cat)
      );
      toast.success('Categoría actualizada exitosamente');
      return { success: true, data: updatedCategory };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al actualizar categoría';
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar categoría
  const deleteCategory = useCallback(async (id) => {
    setLoading(true);
    try {
      await categoryApi.delete(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
      toast.success('Categoría eliminada exitosamente');
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al eliminar categoría';
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Cambiar estado
  const toggleCategoryStatus = useCallback(async (id, currentStatus) => {
    try {
      const updatedCategory = await categoryApi.toggleStatus(id, !currentStatus);
      setCategories(prev =>
        prev.map(cat => cat.id === id ? updatedCategory : cat)
      );
      toast.success(`Categoría ${!currentStatus ? 'activada' : 'desactivada'}`);
      return { success: true };
    } catch (err) {
      toast.error('Error al cambiar estado');
      return { success: false };
    }
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryStatus
  };
};
