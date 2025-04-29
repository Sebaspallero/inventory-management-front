import {
  Users,
  Edit,
  Trash2,
  Search,
  FileDown
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PaginationController from '@/features/pagination/PaginationController';
import DasboardCards from '@/features/users/DashboardCards';
import { useExportUsers, useFilteredUsers } from '@/hooks/useUsers';
import { useEffect, useState } from 'react';
import { formatFullName } from '@/utils/formatFullName';
import DeleteUserDialog from '@/features/users/DeleteUserDialog';
import UpdateUserDialog from '@/features/users/UpdateUserDialog';


const EmployeesPage = () => {

  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: usersData } = useFilteredUsers(page, 10, debouncedSearch);
  
  const { mutate: exportExcel, isPending } = useExportUsers();

  return (
    <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Users className="mr-2" />
          Gestión de Usuarios
        </h1>
      </div>

      <DasboardCards />


      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <div className="flex items-center border rounded-md px-3 py-2 bg-white dark:bg-gray-800">
                <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  name="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar usuarios..."

                  className="border-0 focus:outline-none p-0 pl-2 bg-transparent w-full"
                />
              </div>
            </div>
            <button onClick={()=> exportExcel()} disabled={isPending} className="border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md flex items-center">
              <FileDown className="mr-2 h-4 w-4" />
              Exportar
            </button>
          </div>
        </div>
      </div>


      <Card>
        <CardHeader>
          <CardTitle>Usuarios</CardTitle>
          <CardDescription>
            Gestiona la información de todos los usuarios de la empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Nombre</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Permisos</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Estado</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {usersData?.content.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-3 text-sm font-medium">{user.id}</td>
                    <td className="px-4 py-3 text-sm ">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/api/placeholder/32/32`} alt={user.name} />
                          <AvatarFallback>{formatFullName(user.name, user.lastName).split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div>{formatFullName(user.name, user.lastName)}</div>
                          <div className="text-xs text-gray-500 md:hidden">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm hidden md:table-cell">{user.email}</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                        {user.role === 'ADMIN' ? 'Admin' : 'Empleado'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={`${user.enabled === true
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}
                      >
                        {user.enabled === true ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <UpdateUserDialog
                          trigger={
                            <button className="text-gray-500 hover:text-blue-600">
                              <Edit className="h-4 w-4" />
                            </button>
                          }
                          userToUpdate={user}
                        />
                        <DeleteUserDialog 
                          trigger={
                            <button className="text-gray-500 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          }
                          userId={user.id}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <div className="p-4 border-t flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {usersData?.totalElements} usuarios encontrados
          </div>
          <PaginationController page={page} setPage={setPage} data={usersData} />
        </div>
      </Card>
    </div>
  );
};

export default EmployeesPage;