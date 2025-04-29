import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useActivityLogs } from '@/hooks/useActivityLogs'
import { calculatehHoursSinceCreation } from '@/utils/calculateHoursSinceCreation'

const RecentActivities = () => {

  const {data: activitiesData} = useActivityLogs()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>Últimas actualizaciones del sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activitiesData?.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2 last:border-0">
              <div>
                <p className="font-medium">
                  {item.title}
                </p>
                <p className="text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
              <div className="text-sm text-gray-500">Hace {calculatehHoursSinceCreation(item.createdAt)} horas</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentActivities