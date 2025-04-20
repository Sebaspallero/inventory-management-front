import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"


const Topbar = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 shadow-sm flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg w-64">
        <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          placeholder="Buscar..."
          className="bg-transparent border-none focus:outline-none ml-2 w-full text-sm"
        />
      </div>
      <div>
        <Button variant="default">
          Mi Perfil
        </Button>
      </div>
    </div>
  )
}

export default Topbar