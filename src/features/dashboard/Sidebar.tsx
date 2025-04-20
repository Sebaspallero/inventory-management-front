import { Button } from '@/components/ui/button'
import { Grid, Package, ShoppingCart, TrendingUp, Truck, UserCheck, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

    const role = localStorage.getItem("role");

    return (
        <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
            <div className="p-4">
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">InvSys 2025</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Sistema de Inventario</p>
            </div>
            <div className="mt-6">
                <div className="px-4 mb-4">
                    <div className="flex items-center space-x-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                        <UserCheck size={20} />
                        <span className="font-medium capitalize">{role == "[ROLE_ADMIN]" ? "Admin" : "Empleado"}</span>
                    </div>
                </div>
                <nav className="mt-2">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => `w-full justify-start p-2 mb-1 flex items-center rounded-md ${isActive ? "bg-accent" : "hover:bg-accent hover:text-accent-foreground"}`}
                    >
                        <TrendingUp className="mr-2 h-4 w-4" />
                        <span className="font-medium text-sm">Dashboard</span>
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={({ isActive }) => `w-full justify-start p-2 mb-1 flex items-center rounded-md ${isActive ? "bg-accent" : "hover:bg-accent hover:text-accent-foreground"}`}
                    >
                        <Package className="mr-2 h-4 w-4" />
                        <span className="font-medium text-sm">Productos</span>
                    </NavLink>
                    <NavLink
                        to="/suppliers"
                        className={({ isActive }) => `w-full justify-start p-2 mb-1 flex items-center rounded-md ${isActive ? "bg-accent" : "hover:bg-accent hover:text-accent-foreground"}`}
                    >
                        <Truck className="mr-2 h-4 w-4" />
                        <span className="font-medium text-sm">Proveedores</span>
                    </NavLink>
                    <Button variant="ghost" className="w-full justify-start p-3 mb-1">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Órdenes
                    </Button>
                    <Button variant="ghost" className="w-full justify-start p-3 mb-1">
                        <Grid className="mr-2 h-4 w-4" />
                        Categorías
                    </Button>
                    {role === '[ROLE_ADMIN]' && (
                        <Button variant="ghost" className="w-full justify-start p-3 mb-1">
                            <Users className="mr-2 h-4 w-4" />
                            Empleados
                        </Button>
                    )}
                </nav>
            </div>
        </div>
    )
}

export default Sidebar