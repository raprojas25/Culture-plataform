import React, { useCallback, useEffect, useState } from "react";
import {
  MapPin,
  Plus,
  Edit,
  Trash2,
  Filter,
  Building2,
  Globe,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { districtService } from "@/shared/services/districtService";
import { DataTable } from "@/shared/components/ui/Table";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import toast, { Toaster } from "react-hot-toast";
import { Badge } from "@/shared/components/ui/Badge";
import Select from "@/shared/components/ui/Select";
import { NewModal } from "@/shared/components/ui/NewModal";
import { FormField } from "@/shared/components/forms/FormField";
import Search from "@/shared/components/forms/BuscarInput";

const districtSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  province: z.string().min(3, "La provincia debe tener al menos 3 caracteres"),
  region: z.string().min(3, "La regions debe tener al menos 3 caracteres"),
});

export const Districts = () => {
  const [selected, setSelected] = useState();
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDistrict, setEditingDistrict] = useState(null);
  // const [filters, setFilters] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [regions, setRegions] = useState([]);

  const data = [
    {
      id: 2,
      name: "Achoma",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 3,
      name: "Cabanaconde",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 4,
      name: "Callalli",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 5,
      name: "Caylloma",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 1,
      name: "Chivay",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "1",
    },
    {
      id: 6,
      name: "Coporaque",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 7,
      name: "Huambo",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 8,
      name: "Huanca",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 9,
      name: "Ichupampa",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 10,
      name: "Lari",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 11,
      name: "Lluta",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 12,
      name: "Maca",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 13,
      name: "Madrigal",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 14,
      name: "Majes",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 15,
      name: "San Antonio de Chuca",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 21,
      name: "Sechura",
      province: "Payta",
      region: "Piura",
      events_count: "0",
    },
    {
      id: 16,
      name: "Sibayo",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 17,
      name: "Tapay",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 18,
      name: "Tisco",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 19,
      name: "Tuti",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
    {
      id: 20,
      name: "Yanque",
      province: "Caylloma",
      region: "Arequipa",
      events_count: "0",
    },
  ];
  //nuevo metodo para Filtrar
  const [filters, setFilters] = useState({
    province: "all",
    region: "all",
    search: "",
  });

  // Filtrar distritos
  const filteredData = data.filter((district) => {
    const matchesSearch = district.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    const matchesProvince =
      filters.province === "all" || district.province === filters.province;

    const matchesRegion =
      filters.region === "all" || district.region === filters.region;

    return matchesSearch && matchesProvince && matchesRegion;
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(districtSchema),
  });

  const loadDistricts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await districtService.getAll(filters);
      setDistricts(data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Error cargando distritos");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadProvincesAndRegions = async () => {
    try {
      const [provinceList, regionList] = await Promise.all([
        districtService.getProvinces(),
        districtService.getRegions(),
      ]);
      setProvinces(provinceList);
      setRegions(regionList);
    } catch (error) {
      console.error("Error loading provinces and regions:", error);
    }
  };

  useEffect(() => {
    loadDistricts();
    loadProvincesAndRegions();
  }, []);

  const handleCreate = async (data) => {
    try {
      if (editingDistrict) {
        await districtService.update(editingDistrict.id, data);
        toast.success("Distrito actualizado exitosamente");
      } else {
        await districtService.create(data);
        toast.success("Distrito creado exitosamente");
      }
      setIsModalOpen(false);
      setEditingDistrict(null);
      reset();
      loadDistricts();
    } catch (error) {
      toast.error(error.response?.data?.error || "Error guardando distrito");
    }
  };

  const handleEdit = (district) => {
    setEditingDistrict(district);
    reset({
      name: district.name,
      province: district.province || "",
      region: district.region || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este distrito?")) return;

    try {
      await districtService.delete(id);
      toast.success("Distrito eliminado exitosamente");
      loadDistricts();
    } catch (error) {
      toast.error(error.response?.data?.error || "Error eliminando distrito");
    }
  };

  const columns = [
    {
      header: "Nombre",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center">
          <MapPin className="w-4 h-4 text-gray-500 mr-2" />
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      header: "Provincia",
      accessorKey: "province",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Building2 className="w-4 h-4 text-gray-500 mr-2" />
          <span>{row.original.province || "No especificada"}</span>
        </div>
      ),
    },
    {
      header: "Región",
      accessorKey: "region",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Globe className="w-4 h-4 text-gray-500 mr-2" />
          <span>{row.original.region || "No especificada"}</span>
        </div>
      ),
    },
    {
      header: "Eventos",
      accessorKey: "events_count",
      cell: ({ row }) => (
        // <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        //   {row.original.events_count || 0}
        // </span>
        <Badge variant="info" size="sm">
          {row.original.events_count || 0}
        </Badge>
      ),
    },
    {
      header: "Acciones",
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
            <Trash2 className="w-4 h-4 text-red-400 dark:text-red-800" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap">
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
            leftIcon={Plus}
            onClick={() => {
              setEditingDistrict(null);
              reset({ name: "", province: "", region: "" });
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
              <Select
                options={[
                  { value: "all", label: "Todos" },
                  { value: "Payta", label: "Payta" },
                  { value: "Caylloma", label: "Caylloma" },
                ]}
                value={filters.province || ""}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, province: value }))
                }
                placeholder="Filtrar por provincias"
                searchPlaceholder="buscar"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Región
              </label>
              <Select
                options={[
                  { value: "all", label: "Todos" },
                  { value: "Piura", label: "Piura" },
                  { value: "Arequipa", label: "Arequipa" },
                ]}
                value={filters.region || ""}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, region: value }))
                }
                placeholder="Filtrar por region"
                searchPlaceholder="buscar"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Buscar
              </label>
              {/* <Input */}
              {/*   placeholder="Buscar distrito..." */}
              {/*   value={filters.search || ""} */}
              {/*   onChange={(e) => */}
              {/*     setFilters((prev) => ({ */}
              {/*       ...prev, */}
              {/*       search: e.target.value, */}
              {/*     })) */}
              {/*   } */}
              {/* /> */}
              <Search
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }))
                }
                onSearch={(val) => console.log("Buscando:", val)}
                // onClear={() => console.log("Limpiado")}
                onClear={() => setFilters.search == ""}
                placeholder="Buscar productos..."
                size="md"
              />
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <DataTable
            data={filteredData}
            columns={columns}
            isLoading={loading}
          />
        </div>

        {/* Modal de creación/edición */}
        <NewModal
          showIcon
          title={editingDistrict ? "Editar Distrito" : "Nuevo Distrito"}
          size="sm"
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingDistrict(null);
            reset();
          }}
        >
          <form onSubmit={handleSubmit(handleCreate)} className="space-y-4">
            <FormField
              label="Distrito *"
              name="distrito"
              variant="primary"
              size="md"
              type="text"
              placeholder="Ej: Mirafloes"
              error={errors.name}
              isLoading={loading}
              {...register("name", {
                required: "El nombre es requerido",
                minLength: {
                  value: 2,
                  message: "Mínimo 2 caracteres",
                },
              })}
            />

            {/* province */}
            <FormField
              label="Provincia *"
              name="provincia"
              variant="primary"
              size="md"
              type="text"
              placeholder="Ej: Lima"
              error={errors.province}
              isLoading={loading}
              {...register("province", {
                required: "La provincia es requerido",
                minLength: {
                  value: 3,
                  message: "Mínimo 3 caracteres",
                },
              })}
            />
            {/* region */}
            <FormField
              label="Región *"
              name="region"
              variant="primary"
              size="md"
              type="text"
              placeholder="Ej: Lima Metropolitana"
              error={errors.region}
              isLoading={loading}
              {...register("region", {
                required: "La region es requerido",
                minLength: {
                  value: 3,
                  message: "Mínimo 3 caracteres",
                },
              })}
            />
            {/* <Input */}
            {/*   label="Provincia" */}
            {/*   {...register('province')} */}
            {/*   error={errors.province?.message} */}
            {/*   placeholder="Ej: Lima" */}
            {/* /> */}
            {/* <Input */}
            {/*   label="Región" */}
            {/*   {...register('region')} */}
            {/*   error={errors.region?.message} */}
            {/*   placeholder="Ej: Lima Metropolitana" */}
            {/* /> */}
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
                {editingDistrict ? "Actualizar" : "Crear"}
              </Button>
            </div>
          </form>
        </NewModal>
      </div>
    </>
  );
};
