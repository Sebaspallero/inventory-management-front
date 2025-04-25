import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from "@/components/ui/dialog";
import { useDeleteProduct } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';

type Props = {
    trigger: React.ReactNode;
    productId: number;
};


const DeleteProductDialog = ({ trigger, productId }: Props) => {

    const [open, setOpen] = useState(false);

    const deleteProduct = useDeleteProduct();

    const handleDelete = () => {
        deleteProduct.mutate(productId, {
            onSuccess: () => {
                setOpen(false);
                alert("Producto eliminado con éxito");
            },
            onError: (error) => {
                alert("Error al eliminar el producto: " + error.message);
            }
        });
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">Eliminar Producto con ID {productId}</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Esta seguro que desea eliminar este producto? Esta acción no se puede deshacer.
                    </DialogDescription>
                </DialogHeader>
                <Button variant="destructive" onClick={handleDelete} className='text-white'>
                    Eliminar Producto
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteProductDialog