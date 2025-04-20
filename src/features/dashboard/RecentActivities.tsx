import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'

const RecentActivities = () => {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Actividad Reciente</CardTitle>
      <CardDescription>Últimas actualizaciones del sistema</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex justify-between items-center border-b pb-2 last:border-0">
            <div>
              <p className="font-medium">
                {item % 2 === 0 ? 'Nueva Orden Creada' : 'Actualización de Inventario'}
              </p>
              <p className="text-sm text-gray-500">
                {item % 2 === 0 ? 'Orden #2587 para Proveedor XYZ' : 'Se agregaron 50 unidades al Producto ABC'}
              </p>
            </div>
            <div className="text-sm text-gray-500">Hace {item} horas</div>
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full">
        Ver todas las actividades <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </CardFooter>
  </Card>
  )
}

export default RecentActivities