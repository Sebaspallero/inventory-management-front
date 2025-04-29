import { Button } from "@/components/ui/button"
import { ChevronDown, Search } from "lucide-react"
import { formatFullName } from "@/utils/formatFullName"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"


const Topbar = () => {

  const user = {
    name: localStorage.getItem("userName") || "John",
    lastName: localStorage.getItem("userLastName") || "Doe",
    email: localStorage.getItem("email") || "johndoe@mail.com",
    role: localStorage.getItem("role") || "Usuario"
  }

  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("userName")
    localStorage.removeItem("userLastName")
    localStorage.removeItem("email")
    localStorage.removeItem("role")
    navigate("/")
  }

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 md:pl-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`/api/placeholder/32/32`} alt={user.name} />
                <AvatarFallback>
                  {formatFullName(user.name, user.lastName).split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start md:flex">
                <span className="text-sm font-medium">{formatFullName(user.name, user.lastName)}</span>
                <span className="text-xs text-muted-foreground">{user.role == "[ROLE_ADMIN]" ? "Admin" : "Empleado"}</span>
              </div>
              <ChevronDown className="hidden h-4 w-4 md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{formatFullName(user.name, user.lastName)}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={logOut}>
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Topbar