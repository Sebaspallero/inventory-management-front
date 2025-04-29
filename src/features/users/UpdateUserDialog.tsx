import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React, { useState } from 'react'
import UpdateUserForm from './UpdateUserForm';
import { IUserResponse } from '@/types/IUser';

type Props = {
    trigger: React.ReactNode;
    userToUpdate: IUserResponse;
};

const UpdateUserDialog = ({ trigger, userToUpdate }: Props) => {

    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">Actualizar Usuario</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Complete el formulario para actualizar el producto seleccionado.
                    </DialogDescription>
                </DialogHeader>
                <UpdateUserForm  onSuccess={() => setOpen(false)} userToUpdate={userToUpdate}/>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateUserDialog