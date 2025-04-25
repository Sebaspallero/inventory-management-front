import { 
    Users,
    Plus,
    Edit,
    Trash2,
    Search,
    Filter,
    Mail,
    Phone,
    Calendar,
    Building,
    UserCheck,
    UserX,
    Download,
    FileSpreadsheet
  } from 'lucide-react';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Label } from '@/components/ui/label';
  import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle 
  } from '@/components/ui/dialog';
  import { Badge } from '@/components/ui/badge';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
  
  // Sample data for display
  const sampleEmployees = [
    { 
      id: 1, 
      name: 'Carlos Rodríguez', 
      email: 'carlos.rodriguez@empresa.com',
      position: 'Gerente de Ventas', 
      department: 'Ventas',
      status: 'Activo',
      joinDate: '10/05/2020',
      phone: '555-1234'
    },
    { 
      id: 2, 
      name: 'Laura Martínez', 
      email: 'laura.martinez@empresa.com',
      position: 'Desarrollador Senior', 
      department: 'Tecnología',
      status: 'Activo',
      joinDate: '22/01/2021',
      phone: '555-5678'
    },
    { 
      id: 3, 
      name: 'Miguel Sánchez', 
      email: 'miguel.sanchez@empresa.com',
      position: 'Contador', 
      department: 'Finanzas',
      status: 'Activo',
      joinDate: '15/03/2019',
      phone: '555-9012'
    },
    { 
      id: 4, 
      name: 'Ana García', 
      email: 'ana.garcia@empresa.com',
      position: 'Diseñadora UX/UI', 
      department: 'Tecnología',
      status: 'Permiso',
      joinDate: '07/08/2022',
      phone: '555-3456'
    },
    { 
      id: 5, 
      name: 'Pedro López', 
      email: 'pedro.lopez@empresa.com',
      position: 'Asistente de Ventas', 
      department: 'Ventas',
      status: 'Inactivo',
      joinDate: '03/12/2018',
      phone: '555-7890'
    }
  ];
  
  // Department stats
  const departmentStats = [
    { name: 'Ventas', count: 8, color: 'bg-blue-500' },
    { name: 'Tecnología', count: 12, color: 'bg-green-500' },
    { name: 'Finanzas', count: 5, color: 'bg-purple-500' },
    { name: 'Marketing', count: 6, color: 'bg-yellow-500' },
    { name: 'Recursos Humanos', count: 3, color: 'bg-pink-500' }
  ];
  
  const EmployeesPage = () => {
    return (
      <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <Users className="mr-2" />
            Gestión de Empleados
          </h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Empleado
            </Button>
          </div>
        </div>
  
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Empleados</p>
                <p className="text-2xl font-bold">34</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full dark:bg-blue-900">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Activos</p>
                <p className="text-2xl font-bold">28</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full dark:bg-green-900">
                <UserCheck className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Inactivos</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full dark:bg-red-900">
                <UserX className="h-6 w-6 text-red-600 dark:text-red-300" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nuevos (30 días)</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full dark:bg-yellow-900">
                <Calendar className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
              </div>
            </CardContent>
          </Card>
        </div>
  
        {/* Tabs */}
        <Tabs defaultValue="todos" className="mb-6">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="departamentos">Departamentos</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="todos">
            {/* Search and Filter Bar */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1">
                    <div className="flex items-center border rounded-md px-3 py-2 bg-white dark:bg-gray-800">
                      <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input 
                        type="text" 
                        placeholder="Buscar empleados..." 
                        className="border-0 focus:ring-0 p-0 pl-2 bg-transparent"
                      />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="ventas">Ventas</SelectItem>
                      <SelectItem value="tecnologia">Tecnología</SelectItem>
                      <SelectItem value="finanzas">Finanzas</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="rrhh">Recursos Humanos</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="permiso">Permiso</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
  
            {/* Employees Table */}
            <Card>
              <CardHeader>
                <CardTitle>Empleados</CardTitle>
                <CardDescription>
                  Gestiona la información de todos los empleados de la empresa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 text-sm">ID</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 text-sm">Nombre</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 text-sm hidden md:table-cell">Email</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 text-sm hidden md:table-cell">Puesto</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 text-sm">Departamento</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 text-sm">Estado</th>
                        <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400 text-sm">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleEmployees.map((employee) => (
                        <tr 
                          key={employee.id} 
                          className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <td className="px-4 py-3 font-medium">{employee.id}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`/api/placeholder/32/32`} alt={employee.name} />
                                <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{employee.name}</div>
                                <div className="text-xs text-gray-500 md:hidden">{employee.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">{employee.email}</td>
                          <td className="px-4 py-3 hidden md:table-cell">{employee.position}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-100">
                              {employee.department}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge 
                              className={`${
                                employee.status === 'Activo' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                  : employee.status === 'Permiso'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }`}
                            >
                              {employee.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
  
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Mostrando <span className="font-medium">1</span> a <span className="font-medium">5</span> de <span className="font-medium">34</span> empleados
                  </p>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>Anterior</Button>
                    <Button variant="outline" size="sm" className="bg-gray-200 dark:bg-gray-700">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <Button variant="outline" size="sm">Siguiente</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="departamentos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departmentStats.map((dept) => (
                <Card key={dept.name}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${dept.color}`}></div>
                      {dept.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold">{dept.count}</p>
                        <p className="text-sm text-gray-500">Empleados</p>
                      </div>
                      <Button variant="outline" size="sm">Ver detalles</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="estadisticas">
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de Empleados</CardTitle>
                <CardDescription>
                  Visualización de estadísticas generales de la plantilla
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-center p-8">
                  <p className="text-lg text-gray-500">Aquí irían gráficos y estadísticas.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
  
        {/* Add Employee Dialog Template */}
        <Dialog>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Empleado</DialogTitle>
              <DialogDescription>
                Ingrese los datos del nuevo miembro del equipo
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input id="name" placeholder="Nombre y apellidos" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@empresa.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" placeholder="555-1234" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="department">Departamento</Label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ventas">Ventas</SelectItem>
                      <SelectItem value="tecnologia">Tecnología</SelectItem>
                      <SelectItem value="finanzas">Finanzas</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="rrhh">Recursos Humanos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Puesto</Label>
                  <Input id="position" placeholder="Título del puesto" />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="join-date">Fecha de Incorporación</Label>
                <Input id="join-date" type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar Empleado</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  
        {/* Employee Details Dialog Template */}
        <Dialog>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalles del Empleado</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center md:border-r md:pr-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={`/api/placeholder/96/96`} alt="Laura Martínez" />
                  <AvatarFallback>LM</AvatarFallback>
                </Avatar>
                <h3 className="mt-4 text-lg font-semibold">Laura Martínez</h3>
                <p className="text-gray-500">Desarrollador Senior</p>
                <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Activo
                </Badge>
                <div className="mt-4 flex flex-col gap-2 w-full">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">laura.martinez@empresa.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">555-5678</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Incorporación: 22/01/2021</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Departamento: Tecnología</span>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <Tabs defaultValue="info">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="info">Información</TabsTrigger>
                    <TabsTrigger value="documents">Documentos</TabsTrigger>
                    <TabsTrigger value="history">Historial</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="space-y-4 pt-4">
                    <h4 className="font-medium">Información Personal</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Dirección</p>
                        <p>Calle Principal 123, Ciudad</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
                        <p>12/06/1988</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Identificación</p>
                        <p>48765432A</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Contacto de Emergencia</p>
                        <p>Juan Martínez - 555-7777</p>
                      </div>
                    </div>
                    
                    <h4 className="font-medium pt-2">Información Laboral</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Supervisor</p>
                        <p>Carlos Rodríguez</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tipo de Contrato</p>
                        <p>Indefinido</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Salario Anual</p>
                        <p>€42,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Último Ascenso</p>
                        <p>15/03/2023</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="documents" className="pt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <div className="flex items-center gap-3">
                          <FileSpreadsheet className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium">Contrato_Laura_Martinez.pdf</p>
                            <p className="text-xs text-gray-500">Subido el 22/01/2021</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <div className="flex items-center gap-3">
                          <FileSpreadsheet className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium">CV_Laura_Martinez.pdf</p>
                            <p className="text-xs text-gray-500">Subido el 15/12/2020</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <div className="flex items-center gap-3">
                          <FileSpreadsheet className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium">Evaluacion_Desempeno_2023.pdf</p>
                            <p className="text-xs text-gray-500">Subido el 10/12/2023</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history" className="pt-4">
                    <div className="relative border-l-2 border-gray-200 dark:border-gray-700 pl-5 ml-3 space-y-6">
                      <div className="relative">
                        <div className="absolute -left-7 top-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                        <p className="font-medium">Ascenso a Desarrollador Senior</p>
                        <p className="text-sm text-gray-500">15/03/2023</p>
                        <p className="mt-1">Promoción por excelente desempeño en el proyecto Atlas.</p>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -left-7 top-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                        <p className="font-medium">Cambio de Equipo</p>
                        <p className="text-sm text-gray-500">05/09/2022</p>
                        <p className="mt-1">Trasladada al equipo de desarrollo frontend.</p>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -left-7 top-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                        <p className="font-medium">Incorporación a la empresa</p>
                        <p className="text-sm text-gray-500">22/01/2021</p>
                        <p className="mt-1">Contratada como Desarrollador Junior.</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cerrar</Button>
              <Button>Editar Información</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  
  export default EmployeesPage;