import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCategories } from '@/hooks/useCategories';
import { useSuppliers } from '@/hooks/useSuppliers';
import { useSaveProduct, useUpdateProduct } from '@/hooks/useProducts';
import { IProductResponse } from '@/types/IProduct';
import { DialogFooter } from '@/components/ui/dialog';

const productSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string().min(1, "La descripción es requerida"),
    price: z.coerce.number().min(1, "El precio debe ser mayor a 1"),
    stock: z.coerce.number().min(1, "El stock debe ser mayor a 1"),
    categoryId: z.coerce.number().min(1, "Seleccione una categoría"),
    supplierId: z.coerce.number().min(1, "Seleccione un proveedor"),
});

type ProductFormValues = z.infer<typeof productSchema>;

type Props = {
    onSuccess: () => void;
    productToUpdate?: IProductResponse;
};

const ProductForm = ({ onSuccess, productToUpdate }: Props) => {

    const { data: categories } = useCategories();
    const { data: suppliers } = useSuppliers();
    const saveProduct = useSaveProduct();
    const updateProduct = useUpdateProduct();

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: productToUpdate?.name || "",
            description: productToUpdate?.description || "",
            price: productToUpdate?.price || 1,
            stock: productToUpdate?.stock || 1,
            categoryId: productToUpdate?.categoryId || 0,
            supplierId: productToUpdate?.supplierId || 0,
        },
    });

    const onSubmitProduct = (data: ProductFormValues) => {
        if (productToUpdate) {
            updateProduct.mutate({ id: productToUpdate.id, product: data }, {
                onSuccess: () => {
                    form.reset();
                    alert("Producto actualizado exitosamente");
                    onSuccess();
                },
                onError: (error) => {
                    console.error("Error al actualizar el producto:", error);
                },
            })
        } else {
            saveProduct.mutate(data, {
                onSuccess: () => {
                    form.reset();
                    alert("Producto guardado exitosamente");
                    onSuccess();
                },
                onError: (error) => {
                    console.error("Error al guardar el producto:", error);
                },
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitProduct)} className="space-y-4 py-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Laptop HP" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Input placeholder="Potente laptop de oficina con 32GB de memoria..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Categoría</FormLabel>
                                <Select
                                    onValueChange={(value) => field.onChange(Number(value))}
                                    value={field.value ? String(field.value) : ""}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar una categoría" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories?.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="supplierId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Proveedor</FormLabel>
                                <Select
                                    onValueChange={(value) => field.onChange(Number(value))}
                                    value={field.value ? String(field.value) : ""}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar un proveedor" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {suppliers?.map((supplier) => (
                                            <SelectItem key={supplier.id} value={supplier.id.toString()}>
                                                {supplier.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Precio</FormLabel>
                                <FormControl>
                                    <Input type="number" min={1} step="0.01" placeholder="$32.000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input type="number" min={1} placeholder="50" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <DialogFooter className="pt-4">
                    <Button type="button" variant="outline" onClick={onSuccess}>
                        Cancelar
                    </Button>
                    <Button type="submit">
                        Guardar
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

export default ProductForm