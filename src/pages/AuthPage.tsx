import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import Login from '@/features/auth/Login';
import Register from '@/features/auth/Register';

const AuthScreens = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4">
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">InvSys 2025</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Sistema de Gestión de Inventario</p>
        </div>

        <Card className="border-0 shadow-lg space-y-4">
          <CardHeader>
            <CardTitle className="text-2xl text-center mb-1">Bienvenido</CardTitle>
            <CardDescription className="text-center">
              Accede a tu cuenta para administrar el inventario
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue="login" className="w-full space-y-4">
            <CardHeader className="pt-0 pb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <Login />
              <Register />
            </CardContent>
          </Tabs>
        </Card>

        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 InvSys. Todos los derechos reservados.</p>
          <div className="mt-2">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 mx-2">Ayuda</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 mx-2">Privacidad</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 mx-2">Términos</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreens;
