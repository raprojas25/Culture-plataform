import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Mail,
  Calendar,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { MoreDropdown } from "@/shared/components/ui/MoreDropdown";

/**
 * @typedef {Object} User
 * @property {string} id - ID único del usuario
 * @property {string} username - Nombre de usuario
 * @property {string} email - Correo electrónico
 * @property {string} role_name - Nombre del rol
 * @property {boolean} is_active - Estado activo/inactivo
 * @property {string} created_at - Fecha de creación
 * @property {string} [last_login] - Último inicio de sesión
 */

/**
 * @typedef {Object} UsersTableProps
 * @property {User[]} data - Lista de usuarios
 * @property {boolean} [loading] - Estado de carga
 * @property {(id: string) => void} [onEdit] - Callback al editar usuario
 * @property {(id: string) => void} [onDelete] - Callback al eliminar usuario
 * @property {(id: string) => void} [onToggleStatus] - Callback al cambiar estado
 */

/**
 * Componente de tabla de usuarios con paginación, ordenamiento y filtrado
 *
 * @param {UsersTableProps} props
 * @returns {JSX.Element}
 */
export const UsersTable = ({
  data = [],
  loading = false,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // Definición de columnas
  const columns = useMemo(
    () => [
      {
        accessorKey: "username",
        header: ({ column }) => (
          <SortableHeader column={column} label="Nombre" />
        ),
        cell: ({ getValue }) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
              {(getValue() || "U")[0]?.toUpperCase()}
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[200px]">
              {getValue() || "Sin nombre"}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <SortableHeader column={column} label="Email" />
        ),
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[250px]">
              {getValue() || "Sin email"}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "role_name",
        header: ({ column }) => (
          <SortableHeader column={column} label="Rol" />
        ),
        cell: ({ getValue }) => {
          const role = getValue() || "Sin rol";
          const variantMap = {
            admin: "outline",
            moderator: "info",
            organizer: "primary",
            user: "secondary",
          };
          return (
            <Badge variant={variantMap[role] || "secondary"} size="sm">
              {role}
            </Badge>
          );
        },
      },
      {
        accessorKey: "is_active",
        header: "Estado",
        cell: ({ getValue }) => (
          <Badge
            variant={getValue() ? "success" : "danger"}
            size="sm"
          >
            {getValue() ? "Activo" : "Inactivo"}
          </Badge>
        ),
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => (
          <SortableHeader column={column} label="Registrado" />
        ),
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(getValue()).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        ),
      },
      {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
          <MoreDropdown
            is_active={row.original.is_active}
            onEdit={() => onEdit?.(row.original.id)}
            onDelete={() => onDelete?.(row.original.id)}
            onToggleStatus={() => onToggleStatus?.(row.original.id)}
          />
        ),
        enableSorting: false,
      },
    ],
    [onEdit, onDelete, onToggleStatus]
  );

  // Crear instancia de la tabla
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      globalFilter,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const username = row.getValue("username")?.toLowerCase() || "";
      const email = row.getValue("email")?.toLowerCase() || "";
      const role = row.getValue("role_name")?.toLowerCase() || "";
      const searchValue = filterValue?.toLowerCase() || "";

      return (
        username.includes(searchValue) ||
        email.includes(searchValue) ||
        role.includes(searchValue)
      );
    },
  });

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
        <div className="p-6 space-y-4 animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded flex-1" />
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded flex-1" />
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded flex-1" />
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded flex-1" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-12">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No hay usuarios
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            No se encontraron usuarios con los filtros actuales
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
      {/* Search */}
      {/**/}
      {/* <div className="p-4 border-b border-gray-200 dark:border-gray-700"> */}
      {/*   <input */}
      {/*     type="text" */}
      {/*     placeholder="Buscar por nombre, email o rol..." */}
      {/*     value={globalFilter ?? ""} */}
      {/*     onChange={(e) => setGlobalFilter(e.target.value)} */}
      {/*     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent focus-within:outline-none" */}
      {/*   /> */}
      {/* </div> */}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Mostrando{" "}
          <span className="font-medium">
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
          </span>{" "}
          a{" "}
          <span className="font-medium">
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}
          </span>{" "}
          de{" "}
          <span className="font-medium">
            {table.getFilteredRowModel().rows.length}
          </span>{" "}
          usuarios
        </div>

        <div className="flex items-center gap-2">
          {/* First page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1"
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>

          {/* Previous page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
              const currentPage = table.getState().pagination.pageIndex;
              const totalPages = table.getPageCount();
              let pageIndex;

              if (totalPages <= 5) {
                pageIndex = i;
              } else if (currentPage < 3) {
                pageIndex = i;
              } else if (currentPage > totalPages - 4) {
                pageIndex = totalPages - 5 + i;
              } else {
                pageIndex = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageIndex}
                  onClick={() => table.setPageIndex(pageIndex)}
                  className={`min-w-[32px] h-8 px-2 text-sm font-medium rounded-md transition-colors ${
                    pageIndex === currentPage
                      ? "bg-red-500 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {pageIndex + 1}
                </button>
              );
            })}
          </div>

          {/* Next page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Last page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1"
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Page size selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Mostrar:
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
              setPagination((prev) => ({ ...prev, pageSize: Number(e.target.value) }));
            }}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm focus:ring-2 focus:ring-red-500"
          >
            {[5, 10, 20, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

/**
 * Componente de encabezado ordenable
 */
function SortableHeader({ column, label }) {
  const sortState = column.getIsSorted();

  return (
    <button
      onClick={column.getToggleSortingHandler()}
      className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
    >
      {label}
      <span className="ml-1">
        {sortState === "asc" ? (
          <ArrowUp className="w-4 h-4" />
        ) : sortState === "desc" ? (
          <ArrowDown className="w-4 h-4" />
        ) : (
          <ArrowUpDown className="w-4 h-4 opacity-50" />
        )}
      </span>
    </button>
  );
}
