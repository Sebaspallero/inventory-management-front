import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useAllProducts } from '@/hooks/useDashboard';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar } from 'recharts'

const stockData = [
    { name: 'Ene', valor: 4000 },
    { name: 'Feb', valor: 3000 },
    { name: 'Mar', valor: 2000 },
    { name: 'Abr', valor: 2780 },
    { name: 'May', valor: 1890 },
    { name: 'Jun', valor: 2390 },
    { name: 'Jul', valor: 3490 },
];

const ChartStats = () => {

    const { data: allProducts } = useAllProducts();

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
                <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stockData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="valor" stroke="#3b82f6" strokeWidth={2} />
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
                            <Bar dataKey="cantidad" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}

export default ChartStats