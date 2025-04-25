import {
    Package,
    Plus,
    Edit,
    Trash2,
    Search,
    FileDown,
    AlertCircle,
} from 'lucide-react';

import { useExportProducts, useFilteredProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { useEffect, useState } from 'react';
import AddProductDialog from '@/features/products/AddProductDialog';
import DeleteProductDialog from '@/features/products/DeleteProductDialog';
import UpdateProductDialog from '@/features/products/UpdateProductDialog';
import PaginationController from '@/features/pagination/PaginationController';

const Products = () => {

    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [category, setCategory] = useState<number | null>(null);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const { data: products } = useFilteredProducts(page, 10, category, debouncedSearch);
    const { data: categories } = useCategories();
    const { mutate: exportExcel, isPending } = useExportProducts();

    return (
        <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center">
                    <Package className="mr-2" />
                    Gestión de Productos
                </h1>
                <AddProductDialog
                    trigger={
                        <div className="cursor-default bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                            <Plus className="mr-2 h-4 w-4" />
                            Nuevo Producto
                        </div>
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
                                    placeholder="Buscar productos..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="border-0 focus:outline-none p-0 pl-2 bg-transparent w-full"
                                />
                            </div>
                        </div>
                        <div className="w-48">
                            <select
                                value={category ?? ""}
                                name='category'
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
                        <button onClick={() => exportExcel()} disabled={isPending} className="border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md flex items-center">
                            <FileDown className="mr-2 h-4 w-4" />
                            Exportar
                        </button>
                    </div>
                </div>
            </div>
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
                                {products?.content.length === 0 && (
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td colSpan={7} className="px-4 py-3 text-sm text-center text-gray-500 dark:text-gray-400">
                                            No se encontraron productos
                                        </td>
                                    </tr>
                                )}
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
                                        <td className="px-4 py-3 text-sm">${product.price.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        <td className="px-4 py-3 text-sm">{product.supplierName}</td>
                                        <td className="px-4 py-3 text-sm text-right">
                                            <div className="flex justify-end gap-2">
                                                <UpdateProductDialog
                                                    trigger={
                                                        <button className="text-gray-500 hover:text-blue-600">
                                                            <Edit className="h-4 w-4" />
                                                        </button>
                                                    }
                                                    productToUpdate={product}
                                                />

                                                <DeleteProductDialog
                                                    trigger={
                                                        <button className="text-gray-500 hover:text-red-600">
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    }
                                                    productId={product.id}
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
                        {products?.totalElements} productos encontrados
                    </div>
                    <PaginationController page={page} setPage={setPage} data={products}/>
                </div>
            </div>
        </div>
    );
};

export default Products;