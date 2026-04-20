import { useEffect, useState } from "react";
import { useRoles } from "./hooks/useRoles";
import { Button } from "@/shared/components/ui/Button";
import { Shield, Plus, Edit, Trash2, Users, Key } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { DataTable } from "@/shared/components/ui/Table";
import { NewModal } from "@/shared/components/ui/NewModal";
import { useForm } from "react-hook-form";
import { Input } from "@/shared/components/ui/Input";
import { toast, Toaster } from "react-hot-toast";
import { FormField } from "@/shared/components/forms/FormField";

export const Roles = () => {
  const {
    roles,
    loading,
    error,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
    loadPermissions,
    permissions,
  } = useRoles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const roless = [
    {
      id: 1,
      name: "admin",
      description: "Administrador del sistema",
      users_count: 1,
      permissions: [
        "users:read",
        "users:write",
        "events:read",
        "events:write",
        "categories:read",
        "categories:write",
        "districts:read",
        "districts:write",
        "roles:read",
        "roles:write",
      ],
    },
    {
      id: 2,
      name: "user",
      description: "Usuario regular",
      users_count: 0,
      permissions: ["events:read", "events:like"],
    },
    {
      id: 3,
      name: "moderator",
      description: "Moderador",
      users_count: 2,
      permissions: [],
    },
    {
      id: 5,
      name: "organizer",
      description: "Organizador de eventos",
      users_count: 0,
      permissions: [
        "events:read",
        "events:write",
        "categories:read",
        "districts:read",
      ],
    },
    {
      id: 9,
      name: "Mendo",
      description: "Juan Carlos Mendoza",
      users_count: 0,
      permissions: [],
    },
  ];
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const name = watch("name");

  const handleCreate = async (data) => {
    try {
      if (editingRole) {
        await roleService.update(editingRole.id, data);
        toast.success("Rol actualizado exitosamente");
      } else {
        await roleService.create(data);
        toast.success("Rol creado exitosamente");
      }
      setIsModalOpen(false);
      setEditingRole(null);
      reset();
      setSelectedPermissions([]);
      loadRoles();
    } catch (error) {
      toast.error(error.response?.data?.error || "Error guardando rol");
    }
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    reset({
      name: role.name,
      description: role.description || "",
    });
    setSelectedPermissions(role.permissions || []);
    setIsModalOpen(true);
  };

  // Manejar eliminación
  const handleDelete = async (id, name) => {
    if (
      window.confirm(`¿Estás seguro de que deseas eliminar el rol " ${name}"?`)
    ) {
      const result = await deleteRole(id);
      fetchRoles();
      if (!result.success) {
        toast.error(result.error);
      }
    }
  };

  const togglePermission = (permissionCode) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionCode)
        ? prev.filter((p) => p !== permissionCode)
        : [...prev, permissionCode],
    );
  };
  // Cargar roles al montar
  useEffect(() => {
    fetchRoles();
    loadPermissions();
  }, [fetchRoles]);

  const columns = [
    {
      header: "Rol",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Shield className="w-4 h-4 text-gray-500 mr-2" />
          <div>
            <span className="font-medium">{row.original.name}</span>
            {row.original.name === "admin" && <p>succes</p>}
          </div>
        </div>
      ),
    },
    {
      header: "Descripción",
      accessorKey: "description",
      cell: ({ row }) => (
        <span className="text-gray-600 dark:text-gray-400">
          {row.original.description || "Sin descripción"}
        </span>
      ),
    },
    {
      header: "Usuarios",
      accessorKey: "users_count",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Users className="w-4 h-4 text-gray-500 mr-2" />
          <span>{row.original.users_count || 0}</span>
        </div>
      ),
    },
    {
      header: "Permisos",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.permissions?.slice(0, 3).map((permission) => (
            <p key={permission} variant="info">
              {permission}
            </p>
          ))}
          {row.original.permissions && row.original.permissions.length > 3 && (
            <p variant="secondary">+{row.original.permissions.length - 3}</p>
          )}
        </div>
      ),
    },
    {
      header: "Acciones",
      cell: ({ row }) => {
        const isSystemRole = [
          "admin",
          "user",
          "organizer",
          "moderator",
        ].includes(row.original.name.toLowerCase());

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
    <div>
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Gestión de Roles
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Administra y organiza todas los Roles de la plataforma
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          leftIcon={Plus}
          onClick={() => {
            setEditingRole(null);
            setSelectedPermissions([]);
            setIsModalOpen(true);
          }}
        >
          Nuevo Rol
        </Button>
      </div>
      {/* cards stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {roless
          .filter((role) =>
            ["admin", "user", "organizer", "moderator"].includes(
              role.name.toLowerCase(),
            ),
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
                <Badge variant="success" size="sm">
                  Sistema
                </Badge>
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

      {/* Tabla de roles */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <DataTable data={roless} columns={columns} isLoading={loading} />
      </div>
      {/* Modal de creación/edición */}

      <NewModal
        title={editingRole ? "Editar Rol" : "Nuevo Rol"}
        footer={"Los roles serán visibles para todos los usuarios"}
        size="lg"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRole(null);
          reset();
          setSelectedPermissions([]);
        }}
      >
        <form onSubmit={handleSubmit(handleCreate)} className="space-y-6">
          {/* <Input */}
          {/*   label="Nombre del Rol" */}
          {/*   {...register("name")} */}
          {/*   error={errors.name?.message} */}
          {/*   placeholder="Ej: moderador, editor, etc." */}
          {/*   disabled={editingRole?.name === "admin"} */}
          {/* /> */}
          <FormField
            label="Nombre del Rol *"
            name="rolName"
            variant="primary"
            size="lg"
            type="text"
            placeholder="Ej: moderador, editor, etc."
            error={errors.rolName}
            isLoading={editingRole?.name === "admin"}
            {...register("rolName", {
              required: "El campo es requerido",
              minLength: {
                value: 5,
                message: "Mínimo 5 caracteres",
              },
            })}
          />
          <FormField
            label="Descripción *"
            name="description"
            variant="primary"
            size="lg"
            type="text"
            placeholder="Describe las funciones de este rol..."
            textarea={true}
            error={errors.description}
            {...register("description", {
              required: "El campo es requerido",
              minLength: {
                value: 5,
                message: "Mínimo 5 caracteres",
              },
            })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              {...register("description")}
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
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedPermissions.includes(permission.code)
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
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
                      {/* <div className="text-sm text-gray-600 dark:text-gray-400 mt-1"> */}
                      {/*   {permission.description} */}
                      {/* </div> */}
                      {/* <div className="text-xs text-gray-500 dark:text-gray-500 mt-2"> */}
                      {/*   {permission.code} */}
                      {/* </div> */}
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
            <Button type="submit" variant="primary">
              {editingRole ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </form>
      </NewModal>
    </div>
  );
};
