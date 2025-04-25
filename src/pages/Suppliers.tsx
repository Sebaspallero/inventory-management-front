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
  MapPin,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import PaginationController from '@/features/pagination/PaginationController';
import DeleteSupplierDialog from '@/features/suppliers/DeleteSupplierDialog';
import UpdateSupplierDialog from '@/features/suppliers/UpdateSupplierDialog';
import AddSupplierDialog from '@/features/suppliers/AddSupplierDialog';

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
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Proveedor
            </button>
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

      {/* Add Supplier Modal (just the visual structure) */}
      <div className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold">Agregar Nuevo Proveedor</h2>
            <p className="text-sm text-gray-500">
              Complete el formulario para agregar un nuevo proveedor al sistema.
            </p>
          </div>
          <div className="p-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Nombre</label>
                <input type="text" className="col-span-3 border rounded-md px-3 py-2" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Contacto</label>
                <input type="text" className="col-span-3 border rounded-md px-3 py-2" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Email</label>
                <input type="email" className="col-span-3 border rounded-md px-3 py-2" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Teléfono</label>
                <input type="tel" className="col-span-3 border rounded-md px-3 py-2" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Dirección</label>
                <textarea className="col-span-3 border rounded-md px-3 py-2" rows={2}></textarea>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Estado</label>
                <div className="col-span-3 flex items-center space-x-3">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="status" defaultChecked />
                    <span>Activo</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="status" />
                    <span>Inactivo</span>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Notas</label>
                <textarea className="col-span-3 border rounded-md px-3 py-2" rows={3}></textarea>
              </div>
            </div>
          </div>
          <div className="p-4 border-t flex justify-end gap-2">
            <button className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md">
              Cancelar
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Guardar
            </button>
          </div>
        </div>
      </div>

      {/* Supplier Details Modal (just the visual structure) */}
      <div className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold">Detalles del Proveedor</h2>
            <button className="text-gray-500 hover:text-gray-700">
              <XCircle className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Información General</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Nombre de la Empresa</p>
                    <p className="font-medium">TechWorld Inc.</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Persona de Contacto</p>
                    <p className="font-medium">Maria Rodriguez</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <a href="mailto:maria@techworld.com" className="text-blue-600 hover:underline">
                        maria@techworld.com
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Teléfono</p>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <p>555-123-4567</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dirección</p>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                      <p>Av. Tecnología 789, Ciudad Tech</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estado</p>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>Activo</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Total de Productos Suministrados</p>
                    <p className="font-medium">15 productos</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Última Orden</p>
                    <p className="font-medium">21 de marzo, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Próxima Entrega Programada</p>
                    <p className="font-medium">25 de abril, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Categorías Principales</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Electrónicos</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Computación</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Accesorios</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-4">Notas</h3>
                <p className="text-sm">
                  Proveedor principal de equipos electrónicos. Ofrece buenos precios y calidad en laptops y accesorios.
                  Tiempo de entrega promedio: 5-7 días hábiles.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t flex justify-end gap-2">
            <button className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md">
              Ver Historial de Pedidos
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Editar Proveedor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;