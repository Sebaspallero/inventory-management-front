"use client"

import { useState } from "react"
import { Plus, ShoppingCart, Package, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Sample data - in a real app this would come from your API
const proveedores = [
  { id: 1, nombre: "La Europea Muebles" },
  { id: 2, nombre: "Muebles Modernos" },
  { id: 3, nombre: "Distribuidora del Norte" },
]

const productos = [
  { id: 1, nombre: "Mesa de comedor Roble", proveedor: 1 },
  { id: 2, nombre: "Silla Ergonómica", proveedor: 1 },
  { id: 3, nombre: "Sofá de 3 plazas", proveedor: 2 },
  { id: 4, nombre: "Estantería modular", proveedor: 3 },
]

interface ProductoAgregado {
  id: number
  nombre: string
  cantidad: number
}

export default function OrderModal() {
  const [open, setOpen] = useState(true)
  const [proveedor, setProveedor] = useState("1")
  const [producto, setProducto] = useState("")
  const [cantidad, setCantidad] = useState("1")
  const [productosAgregados, setProductosAgregados] = useState<ProductoAgregado[]>([
    { id: 1, nombre: "Mesa de comedor Roble", cantidad: 1 },
  ])

  const productosFiltrados = productos.filter((p) => p.proveedor === Number.parseInt(proveedor))

  const handleAgregarProducto = () => {
    if (!producto || Number.parseInt(cantidad) < 1) return

    const productoSeleccionado = productos.find((p) => p.id === Number.parseInt(producto))
    if (!productoSeleccionado) return

    setProductosAgregados([
      ...productosAgregados,
      {
        id: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        cantidad: Number.parseInt(cantidad),
      },
    ])

    // Reset product selection but keep quantity
    setProducto("")
  }

  const handleEliminarProducto = (id: number) => {
    setProductosAgregados(productosAgregados.filter((p) => p.id !== id))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Agregar una Nueva Orden
          </DialogTitle>
          <DialogDescription>Complete el formulario para agregar una nueva orden al sistema.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Proveedor selection */}
          <div className="space-y-2">
            <label htmlFor="proveedor" className="text-sm font-medium">
              Proveedor
            </label>
            <Select value={proveedor} onValueChange={setProveedor}>
              <SelectTrigger id="proveedor" className="w-full">
                <SelectValue placeholder="Seleccione un proveedor" />
              </SelectTrigger>
              <SelectContent>
                {proveedores.map((p) => (
                  <SelectItem key={p.id} value={p.id.toString()}>
                    {p.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Product and quantity with add button */}
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-7 space-y-2">
              <label htmlFor="producto" className="text-sm font-medium">
                Producto
              </label>
              <Select value={producto} onValueChange={setProducto}>
                <SelectTrigger id="producto">
                  <SelectValue placeholder="Seleccione un producto" />
                </SelectTrigger>
                <SelectContent>
                  {productosFiltrados.map((p) => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 space-y-2">
              <label htmlFor="cantidad" className="text-sm font-medium">
                Cantidad
              </label>
              <Input
                id="cantidad"
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </div>

            <div className="col-span-3 flex items-end">
              <Button onClick={handleAgregarProducto} className="w-full" disabled={!producto}>
                <Plus className="h-4 w-4 mr-1" />
                Agregar
              </Button>
            </div>
          </div>

          {/* Added products list */}
          {productosAgregados.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center">
                <h3 className="text-sm font-medium">Productos Agregados</h3>
                <Badge variant="outline" className="ml-2">
                  {productosAgregados.length}
                </Badge>
              </div>
              <div className="border-t max-h-[180px] overflow-y-auto space-y-2 pr-1">
                {productosAgregados.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 bg-muted/40 rounded-md">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span>{p.nombre}</span>
                      <Badge variant="secondary" className="ml-1">
                        {p.cantidad}
                      </Badge>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => handleEliminarProducto(p.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button disabled={productosAgregados.length === 0} className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Crear Orden
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
