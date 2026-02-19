import React, { useEffect, useState } from "react";
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Users,
  Key,
  Squirrel,
  BadgeX,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { roleService } from "../../services/roleService";
import { useRoles } from "../../hooks/useRoles";

import { Button } from "../../components/ui/Button";
import { DataTable } from "../../components/ui/Table";
import { Modal } from "../../components/ui/Modal";
import { Badge } from "../../components/ui/Badge";
import toast from "react-hot-toast";

const roleSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().optional(),
});

export const Roles = () => {
  const { roles, loading, fetchRoles } = useRoles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const name = watch("name");

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const loadPermissions = async () => {
    try {
      const data = await roleService.getAvailablePermissions();
      setPermissions(data);
    } catch (error) {
      console.error("Error loading permissions:", error);
    }
  };

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

  const handleDelete = async (id, name) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar el rol " ${name}"?`))
      return;

    try {
      await roleService.delete(id);
      toast.success("Rol eliminado exitosamente");
      loadRoles();
    } catch (error) {
      toast.error(error.response?.data?.error || "Error eliminando rol");
    }
  };

  const togglePermission = (permissionCode) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionCode)
        ? prev.filter((p) => p !== permissionCode)
        : [...prev, permissionCode],
    );
  };

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
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
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
            reset({ name: "", description: "" });
            setSelectedPermissions([]);
            setIsModalOpen(true);
          }}
        >
          Nuevo Rol
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles
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
                <p variant="success">Sistema</p>
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
        title={editingRole ? "Editar Rol" : "Nuevo Rol"}
        size="lg"
      >
        <form onSubmit={handleSubmit(handleCreate)} className="space-y-6">
          <input
            label="Nombre del Rol"
            {...register("name")}
            error={errors.name?.message}
            placeholder="Ej: moderador, editor, etc."
            disabled={editingRole?.name === "admin"}
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
            <Button type="submit" variant="primary">
              {editingRole ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </form>
      </Modal>
      {/* puebad */}

      <>
        <style>{`
                @keyframes shine {
                    0% {
                        background-position: 0% 50%;
                    }
            
                    50% {
                        background-position: 100% 50%;
                    }
            
                    100% {
                        background-position: 0% 50%;
                    }
                }
            
                .button-bg {
                                        background: conic-gradient(from 0deg, #00F5FF, #FF00C7, #FFD700, #00FF85, #8A2BE2, #00F5FF);
                    background-size: 300% 300%;
                    animation: shine 4s ease-out infinite;
{/* background: conic-gradient(from 0deg, #00F5FF, #000000, #00F5FF, #000000, #00F5FF); */}

                }
            `}</style>
        <div className="button-bg rounded-full pb-0.5 hover:scale-105 transition duration-300 active:scale-100">
          <button className="px-8 text-sm py-2.5 dark:text-white rounded-full font-medium bg-white text-purple-500 dark:bg-gray-800 w-full">
            Click Me he
          </button>
        </div>
      </>

      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
        <button
          type="button"
          className="flex items-center justify-between text-gray-800/80 text-sm h-10 w-36 pl-4 bg-white border active:scale-95 transition border-gray-500/30"
        >
          Download
          <div className="bg-gray-500/20 h-full flex items-center justify-center px-3">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 13.125v3.5c0 .464-.176.91-.488 1.237a1.63 1.63 0 0 1-1.179.513H4.167c-.442 0-.866-.184-1.179-.513a1.8 1.8 0 0 1-.488-1.237v-3.5M5.833 8.75 10 13.125m0 0 4.167-4.375M10 13.125v-10.5"
                stroke="#1F2937"
                strokeOpacity=".8"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
        <button
          type="button"
          className="flex items-center justify-between text-gray-800/80 rounded text-sm h-10 w-36 pr-7 bg-white border border-gray-500/30 active:scale-95 transition"
        >
          <div className="h-full flex items-center justify-center px-3">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 13.125v3.5c0 .464-.176.91-.488 1.237a1.63 1.63 0 0 1-1.179.513H4.167c-.442 0-.866-.184-1.179-.513a1.8 1.8 0 0 1-.488-1.237v-3.5M5.833 8.75 10 13.125m0 0 4.167-4.375M10 13.125v-10.5"
                stroke="#1F2937"
                strokeOpacity=".8"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          Download
        </button>
        <button
          type="button"
          className="flex items-center justify-between text-sm h-10 w-36 rounded-full pr-7 bg-white border border-indigo-600 text-indigo-600 active:scale-95 transition"
        >
          <div className="bg-indigo-600 ml-1 rounded-full h-7 w-7 flex items-center justify-center">
            <svg
              width="13"
              height="15"
              viewBox="0 0 13 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 1v12m6-4-5.5 5L1 9"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          Download
        </button>
        <button
          type="button"
          className="bg-white border border-gray-500/30 text-gray-800/80 w-max px-4 py-2 rounded active:scale-95 transition"
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.375 13.125v3.5a1.75 1.75 0 0 1-1.75 1.75H4.375a1.75 1.75 0 0 1-1.75-1.75v-3.5m3.5-4.375 4.375 4.375m0 0 4.375-4.375M10.5 13.125v-10.5"
              stroke="#1F2937"
              strokeOpacity=".8"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className="flex items-center justify-between relative overflow-hidden text-gray-800/80 rounded active:scale-95 transition text-sm h-10 w-36 pr-7 bg-white border border-gray-500/30"
        >
          <div className="bg-gray-500/30 h-6 w-1 -ml-px rounded-r-sm absolute"></div>
          <div className="bg-gray-500/30 h-6 w-1 -mr-px right-0 rounded-l-sm absolute"></div>
          <div className="h-full flex items-center justify-center px-3">
            <svg
              width="23"
              height="19"
              viewBox="0 0 23 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m7.438 13.985 3.77 3.77 3.769-3.77m-3.774-4.712v8.482"
                stroke="#1F2937"
                strokeOpacity=".8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.576 15.012a4.712 4.712 0 0 0-2.714-8.567h-1.188a7.54 7.54 0 1 0-12.949 6.87"
                stroke="#1F2937"
                strokeOpacity=".8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          Download
        </button>
      </div>

      <div className="max-w-5xl mx-2 md:mx-auto p-px rounded-2xl bg-gradient-to-r from-purple-600/20 to-blue-500/30">
        <div className="flex flex-col items-center justify-center text-center py-12 md:py-16 rounded-[15px] bg-gradient-to-r from-[#F3EAFF] to-[#E1EFFF]">
          <div className="flex items-center justify-center bg-white px-3 py-1.5 shadow gap-1 rounded-full text-xs">
            <Squirrel size={20} className="text-purple-500 stroke-2" />
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent font-medium">
              Trusted by Experts
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-medium mt-2 leading-[1.2]">
            Unlock Your Potential with <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Expert Guidance
            </span>
            & Proven Results!
          </h2>
          <p className="text-slate-500 mt-2 max-w-lg max-md:text-sm">
            Achieve your goals faster with personalized strategies, hands-on
            support, and results that speak for themselves.
          </p>
          <button
            type="button"
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm px-5 py-2.5 rounded-xl font-medium mt-4 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Get Started Today
          </button>

          <Badge leftIcon={<BadgeX size={14} />} variant="muted" size="md" className="mt-4">
            badge whit icon
          </Badge>
        </div>
      </div>
    </div>
  );
};
