import { DataTable } from "@/shared/components/ui/Table";

export const DataTable = ({ data, loading }) => {
  const columns = [
    {
      header: "Rol",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Shield className="w-4 h-4 text-gray-500 mr-2" />
          <div>
            <span className="font-medium">{row.original.name}</span>
            {row.original.name === "admin" && (
              <Badge variant="success" className="ml-2">
                Sistema
              </Badge>
            )}
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
            onClick={() => handleDelete(row.original.id, row.original.name)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <DataTable data={data} columns={columns} isLoading={loading} />
    </div>
  );
};
