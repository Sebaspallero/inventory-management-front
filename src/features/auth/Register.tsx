import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TabsContent } from '@/components/ui/tabs';
import { register } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserRole, ROLE_LABELS } from '@/utils/roles';
import { toast } from 'sonner';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


const registerSchema = z.object({
    name: z.string().min(1, 'Nombre es requerido'),
    lastName: z.string().min(1, 'Apellido es requerido'),
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
    const navigate = useNavigate();

    const form = useForm<FormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            terms: false
        }
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onRegisterSubmit = async (data: FormData) => {
        try {
            const { terms, ...dataWithoutTerms } = data;
            const { token, email, role, name, lastName } = await register(dataWithoutTerms);

            localStorage.setItem("accessToken", token);
            localStorage.setItem("email", email);
            localStorage.setItem("role", role);
            localStorage.setItem("userName", name);
            localStorage.setItem("userLastName", lastName);

            navigate("/dashboard");
        } catch (error: any) {
            const message = error?.response?.data?.message || error?.message || 'Error al registrar usuario';
            toast.error(message);
        }
    };

    return (
        <TabsContent value="register" className="mt-0 space-y-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onRegisterSubmit)} className="space-y-6">

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Juan" {...field} />
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
                                    <Input placeholder="Valdez" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Correo Electrónico</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="nombre@empresa.com"
                                            className="pl-10"
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="pl-10"
                                            {...field}
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
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rol de Usuario</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar rol" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={UserRole.EMPLOYEE}>{ROLE_LABELS.EMPLOYEE}</SelectItem>
                                        <SelectItem value={UserRole.ADMIN}>{ROLE_LABELS.ADMIN}</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="terms"
                                        checked={field.value}
                                        onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                                    />
                                    <FormLabel htmlFor="terms" className="text-sm">
                                        Acepto los <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">términos y condiciones</a>
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Registrando..." : "Crear Cuenta"}
                        {!form.formState.isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                </form>
            </Form>
        </TabsContent>
    );
};

export default Register;
