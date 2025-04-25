import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from "@/components/ui/dialog";

import { Button } from '@/components/ui/button';
import { useDeleteSupplier } from '@/hooks/useSuppliers';

type Props = {
    trigger: React.ReactNode;
    supplierId: number;
};


const DeleteSupplierDialog = ({ trigger, supplierId }: Props) => {

    const [open, setOpen] = useState(false);

    const deleteSupplier = useDeleteSupplier();

    const handleDelete = () => {
        deleteSupplier.mutate(supplierId, {
            onSuccess: () => {
                setOpen(false);
                alert("Proveedor eliminado con éxito");
            },
            onError: (error) => {
                alert("Error al eliminar el proveedor: " + error.message);
            }
        });
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">Eliminar Proveedor con ID {supplierId}</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Esta seguro que desea eliminar este proveedor? Esta acción no se puede deshacer.
                    </DialogDescription>
                </DialogHeader>
                <Button variant="destructive" onClick={handleDelete} className='text-white'>
                    Eliminar Proveedor
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteSupplierDialog