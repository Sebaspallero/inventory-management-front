import { Card, CardContent } from '@/components/ui/card'
import { useUsersStats } from '@/hooks/useUsers'
import { Users, UserCog, UserPen, Calendar } from 'lucide-react'

const DasboardCards = () => {

    const { data: stats } = useUsersStats()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
                <CardContent className="p-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Usuarios</p>
                        <p className="text-2xl font-bold">{stats?.totalUsers}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full dark:bg-blue-900">
                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Empleados</p>
                        <p className="text-2xl font-bold">{stats?.totalEmployees}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full dark:bg-green-900">
                        <UserPen className="h-6 w-6 text-green-600 dark:text-green-300" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Administradores</p>
                        <p className="text-2xl font-bold">{stats?.totalAdmins}</p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-full dark:bg-red-900">
                        <UserCog className="h-6 w-6 text-red-600 dark:text-red-300" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nuevos (30 días)</p>
                        <p className="text-2xl font-bold">{stats?.totalUsersInLast30Days}</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full dark:bg-yellow-900">
                        <Calendar className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default DasboardCards