import React, { useState } from 'react'
import { IProductResponse } from '@/types/IProduct';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import ProductForm from './ProductForm';

type Props = {
    trigger: React.ReactNode;
    productToUpdate: IProductResponse;
};

const UpdateProductDialog = ({ trigger, productToUpdate }: Props) => {

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
                <ProductForm onSuccess={() => setOpen(false)} productToUpdate={productToUpdate} />
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProductDialog