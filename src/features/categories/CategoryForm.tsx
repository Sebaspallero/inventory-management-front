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
import { toast } from "sonner"

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
                    toast.success("Categoria actualizada exitosamente");
                    onSuccess();
                },
                onError: (error) => {
                    const message = error?.message || 'Error al actualizar la categoria';
                    toast.error(message);
                },
            })
        }else{
            saveCategory.mutate(data, {
                onSuccess: () => {
                    form.reset();
                    toast.success("Categoria guardada exitosamente");
                    onSuccess();
                },
                onError: (error) => {
                    const message = error?.message || 'Error al guardar la categoria';
                    toast.error(message);
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