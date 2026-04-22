import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useEvents } from "@/shared/hooks/useEvents";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import { DataTable } from "@/shared/components/ui/Table";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast, Toaster } from "react-hot-toast";

export const Events = () => {
  const { events, filters, isLoading, fetchEvents, deleteExistingEvent } =
    useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const columns = [
    {
      header: "Título",
      accessorKey: "title",
      cell: ({ row }) => (
        <div className="flex items-center">
          <img
            src={row.original.main_image}
            alt={row.original.title}
            className="w-10 h-10 rounded-md object-cover mr-3"
          />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {row.original.title}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {row.original.category_name}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Fecha",
      accessorKey: "start_datetime",
      cell: ({ row }) => (
        <div>
          <p className="text-gray-900 dark:text-white">
            {format(new Date(row.original.start_datetime), "PP", {
              locale: es,
            })}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {format(new Date(row.original.start_datetime), "p", { locale: es })}
          </p>
        </div>
      ),
    },
    {
      header: "Estado",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        const getStatusStyle = () => {
          switch (status) {
            case "published":
              return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
            case "draft":
              return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
            case "cancelled":
              return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
            default:
              return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
          }
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle()}`}
          >
            {status === "published"
              ? "Publicado"
              : status === "draft"
                ? "Borrador"
                : status === "cancelled"
                  ? "Cancelado"
                  : "Completado"}
          </span>
        );
      },
    },
    {
      header: "Precio",
      accessorKey: "price_type",
      cell: ({ row }) => {
        const { price_type, price_amount } = row.original;
        if (price_type === "free") return "Gratis";
        if (price_type === "paid") return `S/ ${price_amount?.toFixed(2)}`;
        return "Donación";
      },
    },
    {
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Link to={`/events/${row.original.id}`}>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <Link to={`/events/edit/${row.original.id}`}>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedEvent(row.original);
              setDeleteModalOpen(true);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = async () => {
    if (selectedEvent) {
      try {
        await deleteExistingEvent(selectedEvent.id);
        setDeleteModalOpen(false);
        setSelectedEvent(null);
      } catch (error) {
        // Error handled in hook
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filters.page, filters.limit]);

  console.log(events);
  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gestión de Eventos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Administra todos los eventos de la plataforma
          </p>
        </div>
        <Link to="/events/create">
          <Button variant="primary" leftIcon={Plus}>
            Crear Evento
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Todos los Eventos
            </h2>
          </div>
        </div>
        <DataTable data={events} columns={columns} isLoading={isLoading} />
      </div>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirmar Eliminación"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            ¿Estás seguro de que deseas eliminar el evento{" "}
            <strong>{selectedEvent?.title}</strong>? Esta acción no se puede
            deshacer.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
