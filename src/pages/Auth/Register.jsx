import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  CalendarDays,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { Label } from "../../components/ui/Label";
import { motion } from "framer-motion";
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const Login = () => {
  const { signIn, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const password = watch("password");
  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
    } catch (error) {
      // Error is handled in useAuth hook
      // console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <CalendarDays className="w-12 h-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            O{" "}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
            >
              crea una cuenta nueva
            </Link>
          </p>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow rounded-lg sm:px-10">
          
          <motion.form
            key="login"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Email */}
            <div className="space-y-2">
              <Label>Correo Electrónico *</Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  type="email"
                  {...register("rmail", {
                    required: "El email es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido",
                    },
                  })}
                  placeholder="tu@email.com"
                  />
              </div>
              {errors.loginEmail && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.loginEmail.message}
                </p>
              )}
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <Label>Contraseña *</Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  variant="password"
                  size="lg"
                  isLoading={isLoading}
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 6,
                      message: "Mínimo 6 caracteres",
                    },
                  })}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.loginPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.loginPassword.message}
                </p>
              )}
            </div>

            {/* Recordar y olvidé contraseña */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  id="rememberMe"
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <Label variant="secondary" htmlFor="rememberMe">
                  Recordarme
                </Label>
              </div>
              <button
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Botón de inicio */}
            <Button
              variant="primary"
              size="lg"
              leftIcon={isLoading ? "" : <ArrowRight size={20} />}
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Iniciando sesión...
                </>
              ) : (
                <>Iniciar Sesión</>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};
