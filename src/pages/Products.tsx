import {
    Package,
    Plus,
    Edit,
    Trash2,
    Search,
    FileDown,
    AlertCircle
} from 'lucide-react';

import { usePaginatedProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { useState } from 'react';

const Products = () => {

    const [page, setPage] = useState(0);
    const size = 10;

    const [category, setCategory] = useState<number | null>(null);

    const { data: products } = usePaginatedProducts(page, size, category);
    const { data: categories } = useCategories();

    return (
        <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
            {/* Header with title and add button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center">
                    <Package className="mr-2" />
                    Gestión de Productos
                </h1>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Producto
                </button>
            </div>

            {/* Filters and search */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
                <div className="p-6">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1">
                            <div className="flex items-center border rounded-md px-3 py-2 bg-white dark:bg-gray-800">
                                <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar productos..."
                                    className="border-0 focus:outline-none p-0 pl-2 bg-transparent w-full"
                                />
                            </div>
                        </div>
                        <div className="w-48">
                            <select
                                value={category ?? ""}
                                onChange={(e) => setCategory(e.target.value === "" ? null : parseInt(e.target.value))}
                                className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-800">
                                <option value="">Todas las categorías</option>
                                {categories?.map((category, index) => (
                                    <option key={index} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-48">
                            <select className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-800">
                                <option value="">Todos los niveles</option>
                                <option value="low">Stock bajo (&lt; 10)</option>
                                <option value="medium">Stock medio (10-50)</option>
                                <option value="high">Stock alto (&gt; 50)</option>
                            </select>
                        </div>
                        <button className="border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md flex items-center">
                            <FileDown className="mr-2 h-4 w-4" />
                            Exportar
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-bold">Listado de Productos</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Mostrando {products?.content.length} productos
                    </p>
                </div>
                <div className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Nombre</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Categoría</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Stock</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Precio</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Proveedor</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {products?.content.map(product => (
                                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-4 py-3 text-sm font-medium">{product.id}</td>
                                        <td className="px-4 py-3 text-sm">{product.name}</td>
                                        <td className="px-4 py-3 text-sm">{product.categoryName}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <div className="flex items-center">
                                                <span className={`mr-2 ${product.stock < 5 ? 'text-red-500' :
                                                    product.stock < 10 ? 'text-yellow-500' :
                                                        'text-green-500'
                                                    }`}>
                                                    {product.stock}
                                                </span>
                                                {product.stock < 5 && (
                                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm">${product.price.toLocaleString('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                        <td className="px-4 py-3 text-sm">{product.supplierName}</td>
                                        <td className="px-4 py-3 text-sm text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="text-gray-500 hover:text-blue-600">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button className="text-gray-500 hover:text-red-600">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
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
                        {products?.totalElements} productos encontrados
                    </div>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 0}
                            onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                            className={page === 0 ? "px-3 py-1 border rounded text-sm text-gray-400 bg-gray-50" : "cursor-pointer px-3 py-1 border rounded text-sm bg-white"}>
                            Anterior
                        </button>
                        <span className="px-3 py-1 border rounded text-sm bg-blue-50 text-blue-600">
                            {page + 1}
                        </span>
                        <button
                            disabled={products && page >= products.totalPages - 1}
                            onClick={() => setPage(prev => prev + 1)}
                            className={products && page >= products.totalPages - 1 ? "px-3 py-1 border rounded text-sm text-gray-400 bg-gray-50" : "cursor-pointer px-3 py-1 border rounded text-sm bg-white"}>
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Product Modal (just the visual structure) */}
            {/*   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold">Agregar Nuevo Producto</h2>
              <p className="text-sm text-gray-500">
                Complete el formulario para agregar un nuevo producto al inventario.
              </p>
            </div>
            <div className="p-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium">Nombre</label>
                  <input type="text" className="col-span-3 border rounded-md px-3 py-2" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium">SKU</label>
                  <input type="text" className="col-span-3 border rounded-md px-3 py-2" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium">Categoría</label>
                  <select className="col-span-3 border rounded-md px-3 py-2">
                    <option value="">Seleccionar categoría</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium">Stock</label>
                  <input type="number" className="col-span-3 border rounded-md px-3 py-2" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium">Precio</label>
                  <input type="number" step="0.01" className="col-span-3 border rounded-md px-3 py-2" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium">Proveedor</label>
                  <input type="text" className="col-span-3 border rounded-md px-3 py-2" />
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
        </div> */}
        </div>
    );
};

export default Products;