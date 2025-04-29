import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useAllProducts } from '@/hooks/useDashboard';
import { useOrdersPerMonth } from '@/hooks/useOrders';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar } from 'recharts'

const ChartStats = () => {

    const { data: allProducts } = useAllProducts();
    const { data: monthlyOrders} = useOrdersPerMonth()

    const categoryDistribution = allProducts?.map(({ stock, categoryName }: { stock: number; categoryName: string }) => {
        return { category: categoryName, cantidad: stock };
    })

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
                <CardHeader>
                    <CardTitle>Nivel de Inventario</CardTitle>
                    <CardDescription>Análisis mensual del stock</CardDescription>
                </CardHeader>
                <CardContent className="h-80 to-blue-300">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyOrders}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`${value}`, 'Cantidad']} />
                            <Legend />
                            <Line type="monotone" dataKey="value" name='Cantidad' stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Distribución por Categoría</CardTitle>
                    <CardDescription>Productos por categoría</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryDistribution}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="cantidad" name={"Cantidad"} fill="#8B5CF6" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}

export default ChartStats