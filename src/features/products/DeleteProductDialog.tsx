import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from "@/components/ui/dialog";
import { useDeleteProduct } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Trash2 } from 'lucide-react';

type Props = {
    trigger: React.ReactNode;
    productId: number;
};


const DeleteProductDialog = ({ trigger, productId }: Props) => {

    const [open, setOpen] = useState(false);

    const {mutate: deleteProduct, isPending} = useDeleteProduct();

    const handleDelete = () => {
        deleteProduct(productId, {
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
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        Eliminar Producto con ID {productId}
                    </DialogTitle>
                    <DialogDescription className="py-4 text-base">
                        ¿Está seguro que desea eliminar este producto? Esta acción no se puede deshacer y todos los
                        datos asociados serán eliminados permanentemente.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-row gap-2 sm:justify-end">
                    <Button variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isPending} className="w-full sm:w-auto gap-2">
                        {isPending ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Eliminando...
                            </>
                        ) : (
                            <>
                                <Trash2 className="h-4 w-4" />
                                Eliminar Producto
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteProductDialog