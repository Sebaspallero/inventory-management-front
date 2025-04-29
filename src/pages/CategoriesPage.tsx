import { useEffect, useState } from 'react';

import {
  FolderOpen,
  Plus,
  Search,
  FileDown,
  Edit,
  Trash2,
} from 'lucide-react';

import { useExportCategories, useFilteredCategories } from '@/hooks/useCategories';
import PaginationController from '@/features/pagination/PaginationController';
import UpdateCategoryDialog from '@/features/categories/UpdateCategoryDialog';
import DeleteCategoryDialog from '@/features/categories/DeleteCategoryDialog';
import AddCategoryDialog from '@/features/categories/AddCategoryDialog';
import { Button } from '@/components/ui/button';

const Categories = () => {


  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: categoriesData } = useFilteredCategories(page, 10, debouncedSearch);
  const { mutate: exportExcel, isPending } = useExportCategories();
  

  return (
    <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FolderOpen className="mr-2" />
          Gestión de Categorías
        </h1>
        <AddCategoryDialog
          trigger={
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Categoria
            </Button>
          }
        />
      </div>
      {/* Search Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <div className="flex items-center border rounded-md px-3 py-2 bg-white dark:bg-gray-800">
                <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  name="search"
                  placeholder="Buscar Categorias..."
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

      {/* Categories Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">Listado de Categorias</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando {categoriesData?.content.length} proveedores
          </p>
        </div>
        <div className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Nombre</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {categoriesData?.content.map(category => (
                  <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 text-sm font-medium">{category.id}</td>
                    <td className="px-4 py-3 text-sm">{category.name}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="flex justify-end gap-2">
                        <UpdateCategoryDialog
                          trigger={
                            <button className="text-gray-500 hover:text-blue-600">
                              <Edit className="h-4 w-4" />
                            </button>
                          }
                          categoryToUpdate={category}
                        />
                        <DeleteCategoryDialog
                          trigger={
                            <button className="text-gray-500 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          }
                          categoryId={category.id}
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
            {categoriesData?.totalElements} proveedores encontrados
          </div>
          <PaginationController page={page} setPage={setPage} data={categoriesData} />
        </div>
      </div>

    </div>
  );
};

export default Categories;