
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { IUserResponse } from '@/types/IUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdateUser } from '@/hooks/useUsers';

type Props = {
    onSuccess: () => void;
    userToUpdate: IUserResponse;
}

const updateUserSchema = z.object({
    name: z.string().min(1, 'Nombre es requerido'),
    lastName: z.string().min(1, 'Apellido es requerido'),
    email: z.string().email('Correo electrónico inválido'),
    role: z.string().min(1, 'Seleccione un rol'),
    enabled: z.boolean({
        required_error: 'El campo "Estado" es obligatorio',
        invalid_type_error: 'El campo "Estado" debe ser verdadero o falso'
    })
});

type FormData = z.infer<typeof updateUserSchema>;


const UpdateUserForm = ({ onSuccess, userToUpdate }: Props) => {

    const form = useForm<FormData>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: userToUpdate.name,
            lastName: userToUpdate.lastName,
            email: userToUpdate.email,
            role: userToUpdate.role,
            enabled: userToUpdate.enabled,
        }
    });

    const {mutate: updateUser} = useUpdateUser();

    const handleSubmit = async (data: FormData) => {
        try {
            updateUser({ id: userToUpdate.id, user: data }, {
                onSuccess: () => {
                    form.reset();
                    alert("Usuario actualizado exitosamente");
                    onSuccess();
                },
                onError: (error) => {
                    console.error("Error al actualizar el usuario:", error);
                },
            })
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 py-2">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellido</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="john.doe@mail.com" type="email" {...field} />
                            </FormControl>
                            <FormDescription className='text-xs'>Este correo será usado para comunicarse con asuntos relacionados con la cuenta.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="enabled"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado</FormLabel>
                                <Select
                                    value={field.value ? "true" : "false"}
                                    onValueChange={(value) => field.onChange(value === "true")}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue>
                                                {field.value ? "Activo" : "Inactivo"}
                                            </SelectValue>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="true">Activo</SelectItem>
                                        <SelectItem value="false">Inactivo</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription className='text-xs'>Usuarios inactivos no podran iniciar sesion.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rol</FormLabel>
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar rol">
                                                {field.value === "ADMIN"
                                                    ? "Administrador"
                                                    : field.value === "EMPLOYEE"
                                                        ? "Empleado"
                                                        : ""}
                                            </SelectValue>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="ADMIN">Administrador</SelectItem>
                                        <SelectItem value="EMPLOYEE">Empleado</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription className='text-xs'>El rol determina los permisos del usuario.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <DialogFooter className="pt-4">
                    <Button type="button" variant="outline" onClick={() => onSuccess()}>
                        Cancelar
                    </Button>
                    <Button type="submit">
                        Guardar
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

export default UpdateUserForm