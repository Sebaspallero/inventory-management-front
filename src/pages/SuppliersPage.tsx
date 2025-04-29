import { useExportSuppliers, useFilteredSuppliers } from '@/hooks/useSuppliers';
import { useEffect, useState } from 'react';

import {
  Truck,
  Plus,
  Edit,
  Trash2,
  Search,
  FileDown,
  Mail,
  Phone,
} from 'lucide-react';

import PaginationController from '@/features/pagination/PaginationController';
import DeleteSupplierDialog from '@/features/suppliers/DeleteSupplierDialog';
import UpdateSupplierDialog from '@/features/suppliers/UpdateSupplierDialog';
import AddSupplierDialog from '@/features/suppliers/AddSupplierDialog';
import { Button } from '@/components/ui/button';

const Suppliers = () => {

  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: suppliersData } = useFilteredSuppliers(page, 10, debouncedSearch);

  const { mutate: exportExcel, isPending } = useExportSuppliers();

  return (
    <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Truck className="mr-2" />
          Gestión de Proveedores
        </h1>
        <AddSupplierDialog
          trigger={
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Proveedor
            </Button>
          }
        />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <div className="flex items-center border rounded-md px-3 py-2 bg-white dark:bg-gray-800">
                <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  name="search"
                  placeholder="Buscar proveedores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0 focus:outline-none p-0 pl-2 bg-transparent w-full"
                />
              </div>
            </div>
            <button onClick={() => exportExcel()} disabled={isPending} className="border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md flex items-center">
              <FileDown className="mr-2 h-4 w-4" />
              Exportar
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">Listado de Proveedores</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando {suppliersData?.content.length} proveedores
          </p>
        </div>
        <div className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Nombre</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Teléfono</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {suppliersData?.content.map(supplier => (
                  <tr key={supplier.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 text-sm font-medium">{supplier.name}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <a href={`mailto:${supplier.contactEmail}`} className="text-blue-600 hover:underline">
                          {supplier.contactEmail}
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        {supplier.phoneNumber}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="flex justify-end gap-2">
                        <UpdateSupplierDialog
                          trigger={
                            <button className="text-gray-500 hover:text-blue-600">
                              <Edit className="h-4 w-4" />
                            </button>
                          }
                          supplierToUpdate={supplier}
                        />
                        <DeleteSupplierDialog
                          trigger={
                            <button className="text-gray-500 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          }
                          supplierId={supplier.id}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-4 border-t flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {suppliersData?.totalElements} proveedores encontrados
          </div>
          <PaginationController page={page} setPage={setPage} data={suppliersData} />
        </div>
      </div>
    </div>
  );
};

export default Suppliers;