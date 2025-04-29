import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogFooter } from '@/components/ui/dialog'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { AlertTriangle, Trash2 } from 'lucide-react'
import { useDeeleteUser } from '@/hooks/useUsers'

interface Props {
    trigger: React.ReactNode;
    userId: number;
}

const DeleteUserDialog = ({trigger, userId} : Props) => {


     const [open, setOpen] = useState(false);
    
        const { mutate: deleteUser, isPending } = useDeeleteUser();
    
        const handleDelete = () => {
            deleteUser(userId, {
                onSuccess: () => {
                    setOpen(false);
                    alert("Usuario eliminado con éxito");
                },
                onError: (error) => {
                    alert("Error al eliminar el usuario: " + error.message);
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
                        Eliminar Usuario con ID {userId}
                    </DialogTitle>
                    <DialogDescription className="py-4 text-base">
                        ¿Está seguro que desea eliminar este usuario? Esta acción no se puede deshacer y todos los
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
                                Eliminar usuario
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteUserDialog