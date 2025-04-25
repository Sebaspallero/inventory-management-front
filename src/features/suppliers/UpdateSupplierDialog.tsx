import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import SupplierForm from './SupplierForm';
import { ISupplierResponse } from '@/types/ISupplier';

type Props = {
    trigger: React.ReactNode;
    supplierToUpdate: ISupplierResponse;
};

const UpdateSupplierDialog = ({ trigger, supplierToUpdate }: Props) => {

    const [open, setOpen] = useState(false);
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">Actualizar Producto</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Complete el formulario para actualizar el producto seleccionado.
                    </DialogDescription>
                </DialogHeader>
                <SupplierForm onSuccess={() => setOpen(false)} supplierToUpdate={supplierToUpdate} />
            </DialogContent>
        </Dialog>
    )
}

export default UpdateSupplierDialog