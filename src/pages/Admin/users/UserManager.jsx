import { Toaster } from "react-hot-toast";
import { Button } from "../../../components/ui/Button";
import { PlusIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/Tables";
import UserBadge from "./UserBadge";

const UserManager = () => {
  // const handleCreate = () => {
  //   console.log("clic");
  // }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Gestión de Usuarios
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Administra y organiza todas los Usuarios de la plataforma
            </p>
          </div>

          <Button variant="primary" size="lg" leftIcon={<PlusIcon />}>
            Nuevo User
          </Button>
        </div>
      </div>

      {/* tabla */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <Table>
          <TableHeader>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Descripcion
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Creado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell isHeader={false}>Juan</TableCell>
              <TableCell isHeader={false}>Admin</TableCell>
              <TableCell isHeader={false}>no trabaja</TableCell>
              <TableCell isHeader={false}>23-45-89</TableCell>
              <TableCell isHeader={false}>acciones</TableCell>
            </TableRow>
            <TableRow>
              <TableCell isHeader={false}>Juan</TableCell>
              <TableCell isHeader={false}>Admin</TableCell>
              <TableCell >
                <UserBadge
                  variant="light"
                  color="error"
                  startIcon={<PlusIcon size={20} />}
                >
                  Badge
                </UserBadge >
              </TableCell>
              <TableCell isHeader={false}>23-45-89</TableCell>
              <TableCell isHeader={false}>acciones</TableCell>
            </TableRow>
            <TableRow>
              <TableCell isHeader={false}>Juan</TableCell>
              <TableCell isHeader={false}>Admin</TableCell>
              <TableCell isHeader={false}>no trabaja</TableCell>
              <TableCell isHeader={false}>23-45-89</TableCell>
              <TableCell isHeader={false}>acciones</TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManager;
