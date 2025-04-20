import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";

import { useNavigate } from "react-router-dom";

import { Skeleton } from "@/components/ui/skeleton";

import {
    useTotalInventory,
    useSuppliersCount,
    useProductsWithLessStockThan,
    useOrdersMonthly,
} from "@/hooks/useDashboard";

import { TrendingUp, AlertCircle } from "lucide-react";

const QuickStats = () => {
    const {
        data: totalInventory,
        isLoading: isLoadingInventory,
        isError: isErrorInventory,
    } = useTotalInventory();

    const {
        data: suppliersCount,
        isLoading: isLoadingSuppliers,
        isError: isErrorSuppliers,
    } = useSuppliersCount();

    const {
        data: productsWithLessStock,
        isLoading: isLoadingStock,
        isError: isErrorStock,
    } = useProductsWithLessStockThan(5);

    const {
        data: ordersMonthly,
        isLoading: isLoadingOrders,
        isError: isErrorOrders,
    } = useOrdersMonthly();

    const navigation = useNavigate();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card onClick={() => navigation("/products")} className="cursor-pointer">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Total Productos
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isErrorInventory ? (
                        <p className="text-sm text-red-500">Error al cargar</p>
                    ) : isLoadingInventory ? (
                        <Skeleton className="h-8 w-24 mb-2" />
                    ) : (
                        <>
                            <div className="text-2xl font-bold">{totalInventory}</div>
                            <p className="text-xs text-green-500 flex items-center mt-1">
                                <TrendingUp className="h-3 w-3 mr-1" /> +2.5% desde el mes pasado
                            </p>
                        </>
                    )}
                </CardContent>
            </Card>
            <Card onClick={() => navigation("/products")} className="cursor-pointer">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Stock Bajo
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isErrorStock ? (
                        <p className="text-sm text-red-500">Error al cargar</p>
                    ) : isLoadingStock ? (
                        <Skeleton className="h-8 w-24 mb-2" />
                    ) : (
                        <>
                            <div className="text-2xl font-bold">{productsWithLessStock}</div>
                            {productsWithLessStock > 0 ? (
                                <p className="text-xs text-red-500 flex items-center mt-1">
                                    <AlertCircle className="h-3 w-3 mr-1" /> Requiere atención
                                </p>
                            ) : (
                                <p className="text-xs text-gray-500 flex items-center mt-1">
                                    Stock en orden
                                </p>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Órdenes del Mes
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isErrorOrders ? (
                        <p className="text-sm text-red-500">Error al cargar</p>
                    ) : isLoadingOrders ? (
                        <Skeleton className="h-8 w-24 mb-2" />
                    ) : (
                        <>
                            <div className="text-2xl font-bold">{ordersMonthly.count}</div>
                            <p className="text-xs text-blue-500 flex items-center mt-1">
                                <TrendingUp className="h-3 w-3 mr-1" /> +5% desde ayer
                            </p>
                        </>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Proveedores Activos
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isErrorSuppliers ? (
                        <p className="text-sm text-red-500">Error al cargar</p>
                    ) : isLoadingSuppliers ? (
                        <Skeleton className="h-8 w-24 mb-2" />
                    ) : (
                        <>
                            <div className="text-2xl font-bold">{suppliersCount}</div>
                            <p className="text-xs text-gray-500 flex items-center mt-1">
                                Sin cambios desde el mes pasado
                            </p>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default QuickStats;
