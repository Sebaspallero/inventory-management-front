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
import { toast } from "sonner"

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
        if (supplierToUpdate) {
            updateSupplier.mutate({ id: supplierToUpdate.id, supplier: data }, {
                onSuccess: () => {
                    form.reset();
                    toast.success("Proveedor actualizado exitosamente");
                    onSuccess();
                },
                onError: (error) => {
                    const message = error?.message || 'Error al actualizar el proveedor';
                    toast.error(message);
                },
            })
        } else {
            saveSupplier.mutate(data, {
                onSuccess: () => {
                    form.reset();
                    toast.success("Proveedor guardado exitosamente");
                    onSuccess();
                },
                onError: (error) => {
                    const message = error?.message || 'Error al guardar el proveedor';
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
                    <Button type="button" variant="outline" onClick={() => onSuccess()}>
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

export default SupplierForm