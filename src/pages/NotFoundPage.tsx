import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Package2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b border-gray-200 py-4 px-6">
          <div className="flex-col items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              InvSys 2025
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Sistema de Inventario</p>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="max-w-2xl w-full p-8 shadow-lg">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="text-[150px] font-bold text-gray-100">404</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package2 className="h-24 w-24 text-blue-600 opacity-80" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Página no encontrada</h1>
              <p className="text-gray-600 mb-8 max-w-md">
                Lo sentimos, no pudimos encontrar la página que estás buscando. Es posible que haya sido movida o
                eliminada.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <Button asChild className="bg-blue-600 hover:bg-blue-500 flex-1">
                  <Link to="/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al Dashboard
                  </Link>
                </Button>
              </div>
              <div className="mt-8 border-t border-gray-200 pt-6 w-full">
                <h2 className="text-sm font-medium text-gray-600 mb-3">Enlaces rápidos</h2>
                <div className="flex-row gap-4 flex-wrap flex justify-center">
                  <Link to="/products" className="text-[#0EA5E9] hover:underline text-sm">
                    Productos
                  </Link>
                  <Link to="/suppliers" className="text-[#0EA5E9] hover:underline text-sm">
                    Proveedores
                  </Link>
                  <Link to="/orders" className="text-[#0EA5E9] hover:underline text-sm">
                    Órdenes
                  </Link>
                  <Link to="/categories" className="text-[#0EA5E9] hover:underline text-sm">
                    Categorías
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </main>
        <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-500">
          InvSys 2025 © {new Date().getFullYear()} - Sistema de Inventario
        </footer>
      </div>
    </section>
  )
}

export default NotFound