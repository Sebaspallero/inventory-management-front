import { 
    FolderOpen,
    Plus,
    Edit,
    Trash2,
    Search,
    AlertCircle
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
  
  // Mock data for sample display
  const sampleCategories = [
    { id: 1, name: 'Electrónicos', description: 'Dispositivos y accesorios electrónicos', productCount: 3 },
    { id: 2, name: 'Alimentos', description: 'Productos alimenticios y bebidas', productCount: 1 },
    { id: 3, name: 'Papelería', description: 'Artículos de oficina y escolares', productCount: 2 },
    { id: 4, name: 'Limpieza', description: 'Productos para limpieza del hogar y oficina', productCount: 1 },
    { id: 5, name: 'Herramientas', description: 'Herramientas manuales y eléctricas', productCount: 1 }
  ];
  
  const Categories = () => {
    return (
      <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <FolderOpen className="mr-2" />
            Gestión de Categorías
          </h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Categoría
          </Button>
        </div>
  
        {/* Search Section */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <div className="flex items-center border rounded-md px-3 py-2 bg-white dark:bg-gray-800">
                  <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Buscar categorías..." 
                    className="border-0 focus:ring-0 p-0 pl-2 bg-transparent"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
  
        {/* Categories Table */}
        <Card>
          <CardHeader>
            <CardTitle>Categorías</CardTitle>
            <CardDescription>
              Administra las categorías para organizar tus productos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 text-sm">ID</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 text-sm">Nombre</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 text-sm hidden md:table-cell">Descripción</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 text-sm">Productos</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400 text-sm">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleCategories.map((category) => (
                    <tr 
                      key={category.id} 
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-4 py-3 font-medium">{category.id}</td>
                      <td className="px-4 py-3">{category.name}</td>
                      <td className="px-4 py-3 hidden md:table-cell">{category.description}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          category.productCount > 0 
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {category.productCount}
                        </span>
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
          </CardContent>
        </Card>
  
        {/* Add Category Dialog Template */}
        <Dialog>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Añadir Nueva Categoría</DialogTitle>
              <DialogDescription>
                Complete los detalles para crear una nueva categoría
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  placeholder="Nombre de la categoría"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  placeholder="Descripción de la categoría"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  
        {/* Edit Category Dialog Template */}
        <Dialog>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Categoría</DialogTitle>
              <DialogDescription>
                Modifique los detalles de la categoría
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nombre</Label>
                <Input
                  id="edit-name"
                  defaultValue="Electrónicos"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Input
                  id="edit-description"
                  defaultValue="Dispositivos y accesorios electrónicos"
                />
              </div>
              <div className="flex items-center gap-2 p-3 bg-yellow-50 text-yellow-800 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">Esta categoría tiene 3 productos asociados.</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar Cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  
  export default Categories;