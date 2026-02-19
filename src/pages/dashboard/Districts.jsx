import React, { useEffect, useState } from 'react';
import { MapPin, Plus, Edit, Trash2, Filter, Building2, Globe } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { districtService } from '../../services/districtService';
import { DataTable } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

const districtSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  province: z.string().optional(),
  region: z.string().optional(),
});

export const Districts = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDistrict, setEditingDistrict] = useState(null);
  const [filters, setFilters] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [regions, setRegions] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(districtSchema),
  });

  const loadDistricts = async () => {
    try {
      setLoading(true);
      const data = await districtService.getAll(filters);
      setDistricts(data);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error cargando distritos');
    } finally {
      setLoading(false);
    }
  };

  const loadProvincesAndRegions = async () => {
    try {
      const [provinceList, regionList] = await Promise.all([
        districtService.getProvinces(),
        districtService.getRegions(),
      ]);
      setProvinces(provinceList);
      setRegions(regionList);
    } catch (error) {
      console.error('Error loading provinces and regions:', error);
    }
  };

  useEffect(() => {
    loadDistricts();
    loadProvincesAndRegions();
  }, [filters]);

  const handleCreate = async (data) => {
    try {
      if (editingDistrict) {
        await districtService.update(editingDistrict.id, data);
        toast.success('Distrito actualizado exitosamente');
      } else {
        await districtService.create(data);
        toast.success('Distrito creado exitosamente');
      }
      setIsModalOpen(false);
      setEditingDistrict(null);
      reset();
      loadDistricts();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error guardando distrito');
    }
  };

  const handleEdit = (district) => {
    setEditingDistrict(district);
    reset({
      name: district.name,
      province: district.province || '',
      region: district.region || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este distrito?')) return;

    try {
      await districtService.delete(id);
      toast.success('Distrito eliminado exitosamente');
      loadDistricts();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error eliminando distrito');
    }
  };

  const columns = [
    {
      header: 'Nombre',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="flex items-center">
          <MapPin className="w-4 h-4 text-gray-500 mr-2" />
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      header: 'Provincia',
      accessorKey: 'province',
      cell: ({ row }) => (
        <div className="flex items-center">
          <Building2 className="w-4 h-4 text-gray-500 mr-2" />
          <span>{row.original.province || 'No especificada'}</span>
        </div>
      ),
    },
    {
      header: 'Región',
      accessorKey: 'region',
      cell: ({ row }) => (
        <div className="flex items-center">
          <Globe className="w-4 h-4 text-gray-500 mr-2" />
          <span>{row.original.region || 'No especificada'}</span>
        </div>
      ),
    },
    {
      header: 'Eventos',
      accessorKey: 'events_count',
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {row.original.events_count || 0}
        </span>
      ),
    },
    {
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(row.original)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(row.original.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gestión de Distritos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Administra los distritos disponibles para los eventos
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => {
            setEditingDistrict(null);
            reset({ name: '', province: '', region: '' });
            setIsModalOpen(true);
          }}
        >
          Nuevo Distrito
        </Button>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filtros
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Provincia
            </label>
            <select
              className="input"
              value={filters.province || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  province: e.target.value || undefined,
                }))
              }
            >
              <option value="">Todas las provincias</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Región
            </label>
            <select
              className="input"
              value={filters.region || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  region: e.target.value || undefined,
                }))
              }
            >
              <option value="">Todas las regiones</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Buscar
            </label>
            <Input
              placeholder="Buscar distrito..."
              value={filters.search || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  search: e.target.value || undefined,
                }))
              }
            />
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <DataTable data={districts} columns={columns} isLoading={loading} />
      </div>

      {/* Modal de creación/edición */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingDistrict(null);
          reset();
        }}
        title={editingDistrict ? 'Editar Distrito' : 'Nuevo Distrito'}
        size="md"
      >
        <form onSubmit={handleSubmit(handleCreate)} className="space-y-4">
          <Input
            label="Nombre del Distrito"
            {...register('name')}
            error={errors.name?.message}
            placeholder="Ej: Miraflores"
          />
          <Input
            label="Provincia"
            {...register('province')}
            error={errors.province?.message}
            placeholder="Ej: Lima"
          />
          <Input
            label="Región"
            {...register('region')}
            error={errors.region?.message}
            placeholder="Ej: Lima Metropolitana"
          />
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                setEditingDistrict(null);
                reset();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              {editingDistrict ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

