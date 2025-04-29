import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import CategoryForm from './CategoryForm';

import { ICategoryResponse } from '@/types/ICategory';

type Props = {
    trigger: React.ReactNode;
    categoryToUpdate: ICategoryResponse;
};

const UpdateSupplierDialog = ({ trigger, categoryToUpdate }: Props) => {

    const [open, setOpen] = useState(false);
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">Actualizar Categoria</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Complete el formulario para actualizar la categoria seleccionada.
                    </DialogDescription>
                </DialogHeader>
                <CategoryForm onSuccess={() => setOpen(false)} categoryToUpdate={categoryToUpdate} />
            </DialogContent>
        </Dialog>
    )
}

export default UpdateSupplierDialog