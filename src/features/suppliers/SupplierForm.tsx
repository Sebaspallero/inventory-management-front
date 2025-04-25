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
import { ISupplierResponse } from '@/types/ISupplier';
import { useSaveSupplier, useUpdateSupplier } from "@/hooks/useSuppliers";

const supplierSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    contactEmail: z.string().min(1, "El email es requerido"),
    phoneNumber: z.string().min(1, "El teléfono es requerido"),
    
});

type SupplierFormValues = z.infer<typeof supplierSchema>;

type Props = {
    onSuccess: () => void;
    supplierToUpdate?: ISupplierResponse;
};

const SupplierForm = ({ onSuccess, supplierToUpdate }: Props) => {

    const saveSupplier = useSaveSupplier();
    const updateSupplier = useUpdateSupplier();

    const form = useForm<SupplierFormValues>({
        resolver: zodResolver(supplierSchema),
        defaultValues: {
            name: supplierToUpdate?.name || "",
            contactEmail: supplierToUpdate?.contactEmail || "",
            phoneNumber: supplierToUpdate?.phoneNumber || "",
           
        },
    });

    const onSubmitProduct = (data: SupplierFormValues) => {
        if(supplierToUpdate) {
            updateSupplier.mutate({ id: supplierToUpdate.id, supplier: data }, {
                onSuccess: () => {
                    form.reset();
                    alert("Proveedor actualizado exitosamente");
                    onSuccess();
                },
                onError: (error) => {
                    console.error("Error al actualizar el proveedor:", error);
                },
            })
        }else{
            saveSupplier.mutate(data, {
                onSuccess: () => {
                    form.reset();
                    alert("Proveedor guardado exitosamente");
                    onSuccess();
                },
                onError: (error) => {
                    console.error("Error al guardar el proveedor:", error);
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
                                <Input placeholder="Tech Intel" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="techintel@suppliers.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Numero de Telefono</FormLabel>
                            <FormControl>
                                <Input placeholder="011 428-766" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
               
                <div className="p-4 border-t flex justify-end gap-2">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                        Guardar
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default SupplierForm