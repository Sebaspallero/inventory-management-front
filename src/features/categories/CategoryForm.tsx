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
import { ICategoryResponse } from "@/types/ICategory";
import { useSaveCategory, useUpdateCategory } from "@/hooks/useCategories";

const supplierSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
});

type CategoriesFormValues = z.infer<typeof supplierSchema>;

type Props = {
    onSuccess: () => void;
    categoryToUpdate?: ICategoryResponse;
};

const CategoryForm = ({ onSuccess, categoryToUpdate }: Props) => {

    const saveCategory = useSaveCategory();
    const updateCategory = useUpdateCategory();

    const form = useForm<CategoriesFormValues>({
        resolver: zodResolver(supplierSchema),
        defaultValues: {
            name: categoryToUpdate?.name || "",
        },
    });

    const onSubmitProduct = (data: CategoriesFormValues) => {
        if(categoryToUpdate) {
            updateCategory.mutate({ id: categoryToUpdate.id, category: data }, {
                onSuccess: () => {
                    form.reset();
                    alert("Categoria actualizada exitosamente");
                    onSuccess();
                },
                onError: (error) => {
                    console.error("Error al actualizar la Categoria:", error);
                },
            })
        }else{
            saveCategory.mutate(data, {
                onSuccess: () => {
                    form.reset();
                    alert("Categoria guardada exitosamente");
                    onSuccess();
                },
                onError: (error) => {
                    console.error("Error al guardar la categoria:", error);
                },
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitProduct)} className='grid gap-4'>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Electrodomesticos" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />               
                <div className="p-4 border-t flex justify-end gap-2">
                    <Button type="button" variant="outline">
                        Cancelar
                    </Button>
                    <Button type="submit">
                        Guardar
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default CategoryForm