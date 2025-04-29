import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useEffect, useState } from "react";
import { useSaveOrder } from "@/hooks/useOrders";
import { useFilteredProductsBySupplier } from "@/hooks/useProducts";
import { useSuppliers } from "@/hooks/useSuppliers";

import { IOrderRequest } from "@/types/IOrder";
import { IProductResponse } from "@/types/IProduct";
import { ISupplierResponse } from "@/types/ISupplier";
import { Package, Plus, ShoppingCartIcon, Trash2 } from "lucide-react";
import { Separator } from "@radix-ui/react-select";
import { Badge } from "@/components/ui/badge";


const orderSchema = z.object({
    supplierId: z.coerce.number(),
    items: z.array(
        z.object({
            productId: z.coerce.number(),
            quantity: z.number().min(1, "La cantidad debe ser mayor a 0"),
        })
    ).min(1, "Debe agregar al menos un producto"),
});

type OrderFormValues = z.infer<typeof orderSchema>;

type Props = {
    onSuccess: () => void;
};

const OrderForm = ({ onSuccess }: Props) => {

    const form = useForm<OrderFormValues>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            supplierId: 0,
            items: [],
        },
    });

    const saveOrder = useSaveOrder();

    const supplierId = form.watch("supplierId");

    const { data: suppliers = [] } = useSuppliers();
    const { data: products = [] } = useFilteredProductsBySupplier(supplierId > 0 ? supplierId : null);


    const [selectedProductId, setSelectedProductId] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);

    // Limpiar los productos y la selección de productos cuando cambie el supplierId
    useEffect(() => {
        form.setValue("items", []);
        setSelectedProductId("");
        setQuantity(1);
    }, [supplierId]);  // Al cambiar supplierId, limpiamos los productos

    const handleAddProduct = () => {
        if (selectedProductId && quantity > 0) {
            const existingItem = form.getValues("items").find(
                (item) => item.productId === Number(selectedProductId)
            );
            if (existingItem) {
                alert("Este producto ya fue agregado.");
                return;
            }
            form.setValue("items", [
                ...form.getValues("items"),
                {
                    productId: Number(selectedProductId),
                    quantity: quantity,
                },
            ]);
            setSelectedProductId("");
            setQuantity(1);
        }
    };

    const handleRemoveProduct = (productId: number) => {
        form.setValue(
            "items",
            form.getValues("items").filter((item) => item.productId !== productId)
        );
    };

    const onSubmit = (data: OrderFormValues) => {
        const payload: IOrderRequest = {
            supplierId: data.supplierId,
            items: data.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
        };

        saveOrder.mutate(payload, {
            onSuccess: () => {
                form.reset();
                alert("Orden creada exitosamente");
                onSuccess();
            },
            onError: (error) => {
                console.error("Error al crear la orden:", error);
            },
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-2">
                <FormField
                    control={form.control}
                    name="supplierId"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel htmlFor="supplierId" className="text-sm font-medium">
                                Proveedor
                            </FormLabel>
                            <Select
                                onValueChange={(value) => field.onChange(Number(value))}
                                value={field.value ? String(field.value) : ""}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Seleccione un proveedor" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {suppliers.map((supplier: ISupplierResponse) => (
                                        <SelectItem key={supplier.id} value={String(supplier.id)}>
                                            {supplier.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {supplierId !== 0 && (
                    <div className="grid grid-cols-12 gap-3">
                        {/* Producto selection */}
                        <div className="col-span-7 w-lg">
                            <FormLabel className="text-sm font-medium mb-2">Producto</FormLabel>
                            <Select
                                value={selectedProductId}
                                onValueChange={setSelectedProductId}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccione un producto" />
                                </SelectTrigger>
                                <SelectContent>
                                    {products?.map((product: IProductResponse) => (
                                        <SelectItem key={product.id} value={String(product.id)}>
                                            {product.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Cantidad input */}
                        <div className="col-span-2">
                            <FormLabel className="text-sm font-medium mb-2">Cantidad</FormLabel>
                            <Input
                                type="number"
                                min={1}
                                placeholder="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                            />
                        </div>

                        {/* Add button */}
                        <div className="col-span-3 flex items-end">
                            <Button type="button" onClick={handleAddProduct} className="w-full">
                                <Plus className="h-4 w-4 mr-1" />
                                Agregar
                            </Button>
                        </div>
                    </div>
                )}

                {form.watch("items").length > 0 && (
                    <div className="space-y-3 mt-4">
                        <FormLabel>Productos Agregados</FormLabel>
                        <div className="border-t max-h-[180px] overflow-y-auto space-y-2 pr-1">
                            {form.watch("items").map((item, index) => {
                                const product = products?.find(p => p.id === item.productId);
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-muted/40 rounded-md"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Package className="h-4 w-4 text-muted-foreground" />
                                            <span>{product ? product.name : "Producto desconocido"}</span>
                                            <Badge variant="secondary" className="ml-1">
                                                {item.quantity}
                                            </Badge>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleRemoveProduct(item.productId)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Eliminar</span>
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="pt-4 border-t flex justify-between">
                    <Button variant={"outline"} type="button" onClick={() => onSuccess()}>
                        Cerrar
                    </Button>
                    <Button type="submit" className="flex flex-row items-center gap-2">
                        <ShoppingCartIcon className="h-4 w-4" />
                        Crear Orden
                    </Button>
                </div>
            </form>
        </Form>

    );
};

export default OrderForm;
