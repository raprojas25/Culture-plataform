import React, { useEffect, useState } from 'react';
import { Shield, Plus, Edit, Trash2, Users, Key } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { roleService } from '../../services/roleService';
import { DataTable } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import toast from 'react-hot-toast';

const roleSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().optional(),
});

export const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(roleSchema),
  });

  const loadRoles = async () => {
    try {
      setLoading(true);
      const data = await roleService.getAll();
      setRoles(data);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error cargando roles');
    } finally {
      setLoading(false);
    }
  };

  const loadPermissions = async () => {
    try {
      const data = await roleService.getAvailablePermissions();
      setPermissions(data);
    } catch (error) {
      console.error('Error loading permissions:', error);
    }
  };

  useEffect(() => {
    loadRoles();
    loadPermissions();
  }, []);

  const handleCreate = async (data) => {
    try {
      if (editingRole) {
        await roleService.update(editingRole.id, data);
        toast.success('Rol actualizado exitosamente');
      } else {
        await roleService.create(data);
        toast.success('Rol creado exitosamente');
      }
      setIsModalOpen(false);
      setEditingRole(null);
      reset();
      setSelectedPermissions([]);
      loadRoles();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error guardando rol');
    }
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    reset({
      name: role.name,
      description: role.description || '',
    });
    setSelectedPermissions(role.permissions || []);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar el rol "${name}"?`)) return;

    try {
      await roleService.delete(id);
      toast.success('Rol eliminado exitosamente');
      loadRoles();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error eliminando rol');
    }
  };

  const togglePermission = (permissionCode) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionCode)
        ? prev.filter((p) => p !== permissionCode)
        : [...prev, permissionCode]
    );
  };

  const columns = [
    {
      header: 'Rol',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="flex items-center">
          <Shield className="w-4 h-4 text-gray-500 mr-2" />
          <div>
            <span className="font-medium">{row.original.name}</span>
            {row.original.name === 'admin' && (
              <Badge variant="success" className="ml-2">
                Sistema
              </Badge>
            )}
          </div>
        </div>
      ),
    },
    {
      header: 'Descripción',
      accessorKey: 'description',
      cell: ({ row }) => (
        <span className="text-gray-600 dark:text-gray-400">
          {row.original.description || 'Sin descripción'}
        </span>
      ),
    },
    {
      header: 'Usuarios',
      accessorKey: 'users_count',
      cell: ({ row }) => (
        <div className="flex items-center">
          <Users className="w-4 h-4 text-gray-500 mr-2" />
          <span>{row.original.users_count || 0}</span>
        </div>
      ),
    },
    {
      header: 'Permisos',
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.permissions?.slice(0, 3).map((permission) => (
            <Badge key={permission} variant="info">
              {permission}
            </Badge>
          ))}
          {row.original.permissions && row.original.permissions.length > 3 && (
            <Badge variant="secondary">
              +{row.original.permissions.length - 3}
            </Badge>
          )}
        </div>
      ),
    },
    {
      header: 'Acciones',
      cell: ({ row }) => {
        const isSystemRole = ['admin', 'user', 'organizer', 'moderator'].includes(
          row.original.name.toLowerCase()
        );
        
        return (
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
              onClick={() => handleDelete(row.original.id, row.original.name)}
              disabled={isSystemRole}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gestión de Roles
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Administra los roles y permisos del sistema
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => {
            setEditingRole(null);
            reset({ name: '', description: '' });
            setSelectedPermissions([]);
            setIsModalOpen(true);
          }}
        >
          Nuevo Rol
        </Button>
      </div>

      {/* Información de roles del sistema */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Roles del Sistema
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles
            .filter((role) =>
              ['admin', 'user', 'organizer', 'moderator'].includes(
                role.name.toLowerCase()
              )
            )
            .map((role) => (
              <div
                key={role.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {role.name}
                  </h4>
                  <Badge variant="success">Sistema</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {role.description}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {role.users_count || 0} usuarios
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Tabla de roles */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <DataTable data={roles} columns={columns} isLoading={loading} />
      </div>

      {/* Modal de creación/edición */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRole(null);
          reset();
          setSelectedPermissions([]);
        }}
        title={editingRole ? 'Editar Rol' : 'Nuevo Rol'}
        size="lg"
      >
        <form onSubmit={handleSubmit(handleCreate)} className="space-y-6">
          <Input
            label="Nombre del Rol"
            {...register('name')}
            error={errors.name?.message}
            placeholder="Ej: moderador, editor, etc."
            disabled={editingRole?.name === 'admin'}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="input resize-none"
              placeholder="Describe las funciones de este rol..."
            />
          </div>

          {/* Permisos */}
          <div>
            <div className="flex items-center mb-4">
              <Key className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                Permisos
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {permissions.map((permission) => (
                <div
                  key={permission.code}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors \${
                    selectedPermissions.includes(permission.code)
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => togglePermission(permission.code)}
                >
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(permission.code)}
                      onChange={() => togglePermission(permission.code)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {permission.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {permission.description}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {permission.code}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                setEditingRole(null);
                reset();
                setSelectedPermissions([]);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              {editingRole ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

