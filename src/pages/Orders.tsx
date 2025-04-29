import OrderDetailDialog from '@/features/orders/OrderDetailDialog';
import PaginationController from '@/features/pagination/PaginationController';
import { ClipboardList, Search, FileDown, Plus, Trash2, Eye } from 'lucide-react';
import { formatDateToLocalInput } from '@/utils/formatDateToLocalInpput';
import { calculateOrderTotal } from '@/utils/calculateOrderTotal';
import { useExportOrders, useFilteredOrders } from '@/hooks/useOrders';
import { useState } from 'react';
import { useSuppliers } from '@/hooks/useSuppliers';
import DeleteOrderDialog from '@/features/orders/DeleteOrderDialog';
import AddOrderDialog from '@/features/orders/AddOrderDialog';
import { Button } from '@/components/ui/button';

export default function OrderManagement() {

    const [orderNumber, setOrderNumber] = useState("");
    const [supplierId, setSupplierId] = useState<number | undefined>(undefined);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const [page, setPage] = useState(0);
    const size = 10;

    const filters = {
        page,
        size,
        orderNumber: orderNumber || undefined,
        supplierId,
        startDate: startDate ? startDate : undefined,
        endDate: endDate ? endDate : undefined,
    };

    const { data: ordersData } = useFilteredOrders(filters);
    const { data: suppliersData } = useSuppliers();
    const { mutate: exportExcel, isPending } = useExportOrders();

    return (
        <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center">
                    <ClipboardList className="mr-2" />
                    Gestión de Órdenes
                </h1>

                <AddOrderDialog
                    trigger={
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nueva Orden
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
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                    placeholder="Buscar órdenes por número de orden..."
                                    className="border-0 focus:outline-none p-0 pl-2 bg-transparent w-full"
                                />
                            </div>
                        </div>
                        <div className="w-48">
                            <select
                                name='supplier'
                                value={supplierId}
                                onChange={(e) => setSupplierId(e.target.value ? parseInt(e.target.value) : undefined)}
                                className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-800">
                                <option value="">Todos los proveedores</option>
                                {suppliersData?.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-48">
                            <div className="relative">
                                <input
                                    type="date"
                                    name="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-800"
                                    placeholder="Fecha inicio"
                                />
                            </div>
                        </div>
                        <div className="w-48">
                            <div className="relative">
                                <input
                                    type="date"
                                    name="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-800"
                                    placeholder="Fecha fin"
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-bold">Listado de Órdenes</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Mostrando {ordersData?.content.length} órdenes
                    </p>
                </div>
                <div className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Número de Orden</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Fecha</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Proveedor</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Productos</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Total</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {ordersData?.content.length === 0 && (
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td colSpan={7} className="px-4 py-3 text-sm text-center text-gray-500 dark:text-gray-400">
                                            No se encontraron órdenes
                                        </td>
                                    </tr>
                                )}
                                {ordersData?.content.map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                                        <td className="px-4 py-3 text-sm">{order.orderNumber}</td>
                                        <td className="px-4 py-3 text-sm">{formatDateToLocalInput(new Date(order.orderDate))}</td>
                                        <td className="px-4 py-3 text-sm">{order.supplierName}</td>
                                        <td className="px-4 py-3 text-sm">{order.items.length == 1 ? `${order.items.length} Producto` : `${order.items.length} Productos`}</td>
                                        <td className="px-4 py-3 text-sm font-medium">${calculateOrderTotal(order.items).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        <td className="px-4 py-3 text-sm text-right">
                                            <div className="flex justify-end gap-2">
                                                <OrderDetailDialog 
                                                    orderDetails={order}
                                                    trigger={
                                                        <button className="text-gray-500 hover:text-blue-600">
                                                            <Eye className="h-4 w-4" />
                                                        </button>
                                                    }
                                                />
                                                <DeleteOrderDialog
                                                    trigger={
                                                        <button className="text-gray-500 hover:text-red-600">
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    }
                                                    orderId={order.id}
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
                        {ordersData?.totalElements} órdenes encontradas
                    </div>
                    <PaginationController page={page} setPage={setPage} data={ordersData} />
                </div>
            </div>
        </div>
    );
}