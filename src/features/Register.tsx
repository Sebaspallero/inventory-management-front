import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';


const registerSchema = z.object({
    firstName: z.string().min(1, 'El nombre es requerido'),
    lastName: z.string().min(1, 'El apellido es requerido'),
    email: z.string().email('Correo electrónico inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    role: z.string().min(1, 'Seleccione un rol'),
    terms: z.boolean().refine(val => val === true, {
        message: 'Debes aceptar los términos y condiciones'
    })
});

type FormData = z.infer<typeof registerSchema>;

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register: registerSignup,
        handleSubmit: handleSubmitSignup,
        formState: { errors: errorsSignup, isSubmitting: isSubmittingSignup }
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: 'employee',
            terms: false
        }
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onRegisterSubmit = async (data: FormData) => {
        try {
            // Aquí irá la lógica para registrar al usuario
            console.log('Register data:', data);

            // Simular una petición de registro
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Si hay un error de registro, establecemos el mensaje de error
            // setErrorMessage('El correo ya está registrado');

            // Si no hay errores, redirigir al login o al dashboard
            // window.location.href = '/dashboard';
        } catch (error: any) {
            setErrorMessage('Error al registrarse: ' + error.message);
        }
    };

    return (
        <TabsContent value="register" className="mt-0 space-y-4">
            <form onSubmit={handleSubmitSignup(onRegisterSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input
                            id="firstName"
                            placeholder="Juan"
                            {...registerSignup("firstName")}
                        />
                        {errorsSignup.firstName && (
                            <p className="text-red-500 text-sm">{errorsSignup.firstName.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                            id="lastName"
                            placeholder="Pérez"
                            {...registerSignup("lastName")}
                        />
                        {errorsSignup.lastName && (
                            <p className="text-red-500 text-sm">{errorsSignup.lastName.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email-register">Correo Electrónico</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="email-register"
                            placeholder="nombre@empresa.com"
                            className="pl-10"
                            {...registerSignup("email")}
                        />
                    </div>
                    {errorsSignup.email && (
                        <p className="text-red-500 text-sm">{errorsSignup.email.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password-register">Contraseña</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="password-register"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10"
                            {...registerSignup("password")}
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-1 top-1 h-8 w-8"
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                            )}
                        </Button>
                    </div>
                    {errorsSignup.password && (
                        <p className="text-red-500 text-sm">{errorsSignup.password.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="role">Rol de Usuario</Label>
                    <Select defaultValue="employee" {...registerSignup("role")}>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar rol" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="employee">Empleado</SelectItem>
                            <SelectItem value="admin">Administrador</SelectItem>
                        </SelectContent>
                    </Select>
                    {errorsSignup.role && (
                        <p className="text-red-500 text-sm">{errorsSignup.role.message}</p>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" {...registerSignup("terms")} />
                    <Label htmlFor="terms" className="text-sm">
                        Acepto los <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">términos y condiciones</a>
                    </Label>
                </div>
                {errorsSignup.terms && (
                    <p className="text-red-500 text-sm">{errorsSignup.terms.message}</p>
                )}

                {errorMessage && (
                    <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                )}

                <Button type="submit" className="w-full" disabled={isSubmittingSignup}>
                    {isSubmittingSignup ? "Registrando..." : "Crear Cuenta"}
                    {!isSubmittingSignup && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
            </form>
        </TabsContent>
    )
}

export default Register