import React from 'react';
import { Filter, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const EventFilters = ({
  filters,
  onFilterChange,
  categories,
  districts,
}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: filters,
  });

  const onSubmit = (data) => {
    onFilterChange(data);
  };

  const handleReset = () => {
    reset({
      search: '',
      category_id: undefined,
      district_id: undefined,
      price_type: '',
      start_date: '',
      end_date: '',
    });
    onFilterChange({
      page: 1,
      limit: filters.limit,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filtros
          </h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          leftIcon={<X className="w-4 h-4" />}
        >
          Limpiar
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Buscar
            </label>
            <Input
              {...register('search')}
              placeholder="Buscar eventos..."
              className="w-full"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Categoría
            </label>
            <select
              {...register('category_id')}
              className="input"
            >
              <option value="">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Distrito
            </label>
            <select
              {...register('district_id')}
              className="input"
            >
              <option value="">Todos los distritos</option>
              {districts.map((dist) => (
                <option key={dist.id} value={dist.id}>
                  {dist.name}, {dist.city}
                </option>
              ))}
            </select>
          </div>

          {/* Price Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tipo de Precio
            </label>
            <select
              {...register('price_type')}
              className="input"
            >
              <option value="">Todos</option>
              <option value="free">Gratis</option>
              <option value="paid">Pago</option>
              <option value="donation">Donación</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fecha Desde
            </label>
            <Input
              type="date"
              {...register('start_date')}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fecha Hasta
            </label>
            <Input
              type="date"
              {...register('end_date')}
              className="w-full"
            />
          </div>

          {/* Featured Only */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('featured_level')}
              id="featured"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label
              htmlFor="featured"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Solo eventos destacados
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" variant="primary">
            Aplicar Filtros
          </Button>
        </div>
      </form>
    </div>
  );
};

