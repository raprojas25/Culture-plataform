import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  ArrowRight,
  ChevronLeft,
  Key,
  Lock,
  LogIn,
  Mail,
  UserPlus,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/shared/components/ui/Button";
import { Label } from "@/shared/components/ui/Label";
import { Link } from "react-router-dom";
import { FormField } from "@/shared/components/forms/FormField";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const Login = () => {
  const { signIn, isLoading } = useAuth();
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Countdown para reenvío de código
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
    } catch (error) {
      // Error is handled in useAuth hook
      // toast.error("Error al iniciar Sesion");
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleForgotPassword = async (data) => {
    // isLoading();

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-500" />
          <div>
            <p className="font-semibold">¡Correo enviado!</p>
            <p className="text-sm">Revisa tu bandeja de entrada</p>
          </div>
        </div>,
        { duration: 4000 },
      );

      setIsForgotPassword(false);
      setCountdown(60);
    } catch (error) {
      toast.error("Error al enviar el correo de recuperación");
    } finally {
      // isLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 dark:bg-gray-800"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mb-6">
              {isLogin ? (
                <LogIn className="text-white" size={28} />
              ) : (
                <UserPlus className="text-white" size={28} />
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-gray-400">
              {isForgotPassword
                ? "Recuperar Contraseña"
                : isLogin
                  ? "Bienvenido de nuevo"
                  : "Únete a la comunidad"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isForgotPassword
                ? "Te enviaremos un enlace para restablecer tu contraseña"
                : isLogin
                  ? "Ingresa tus credenciales para continuar"
                  : "Crea tu cuenta en solo unos pasos"}
            </p>
          </div>

          {/* Tabs Login/Registro */}

          {/* Formulario principal */}
          <AnimatePresence mode="wait">
            {isForgotPassword ? (
              <motion.form
                key="forgot"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSubmit(handleForgotPassword)}
                className="space-y-6"
              >
                {/* resetEmail */}
                <FormField
                  variant="secondary"
                  size="lg"
                  isLoading={isLoading}
                  type="email"
                  placeholder="tu@email.com"
                  error={errors.resetEmail}
                  label="Correo Electrónico"
                  name="email"
                  icon={Mail}
                  {...register("resetEmail", {
                    required: "El email es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido",
                    },
                  })}
                />

                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={Key}
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  Enviar enlace de recuperación
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={ChevronLeft}
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="w-full"
                >
                  Volver al inicio de sesión
                </Button>
              </motion.form>
            ) : isLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Email */}
                <FormField
                  label="Correo Electrónico *"
                  name="email"
                  icon={Mail}
                  variant="secondary"
                  size="lg"
                  type="email"
                  placeholder="tu@email.com"
                  error={errors.email}
                  // errorMessage={errors.email?.message}
                  isLoading={isLoading}
                  {...register("email", {
                    required: "El email es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido",
                    },
                  })}
                />

                {/* Contraseña */}
                <FormField
                  label="Contraseña *"
                  name="password"
                  icon={Lock}
                  variant="password"
                  size="lg"
                  type="password"
                  placeholder="••••••••"
                  error={errors.password}
                  isLoading={isLoading}
                  {...register("password", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 6,
                      message: "Mínimo 6 caracteres",
                    },
                  })}
                />

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
                  leftIcon={ArrowRight}
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  Iniciar Sesión
                </Button>
              </motion.form>
            ) : (
              <></>
            )}
          </AnimatePresence>
          {/* Enlace para cambiar entre login/registro */}
          {!isForgotPassword && (
            <div className="flex justify-center items-center mt-8">
              <Label variant="secondary">
                {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
              </Label>
              <Link
                to="/register"
                className="ml-2 text-red-600 font-medium hover:text-red-700"
              >
                {isLogin ? "Regístrate" : "Inicia sesión"}
              </Link>
            </div>
          )}
        </div>
        {/* Modal de verificación */}
        <AnimatePresence>
          {isVerificationSent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Mail className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    ¡Verifica tu correo!
                  </h3>
                  <p className="text-gray-600">
                    Te hemos enviado un enlace de verificación a tu correo
                    electrónico.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <AlertCircle className="text-blue-600 mr-3" size={20} />
                    <p className="text-sm text-blue-800">
                      Revisa tu bandeja de entrada y carpeta de spam. Haz clic
                      en el enlace para activar tu cuenta.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setIsVerificationSent(false);
                      setIsLogin(true);
                    }}
                    className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Entendido, ir a iniciar sesión
                  </button>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      ¿No recibiste el correo?
                      <button
                        disabled={countdown > 0}
                        onClick={() => setCountdown(30)}
                        className="ml-2 text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {countdown > 0
                          ? `Reenviar en ${countdown}s`
                          : "Reenviar ahora"}
                      </button>
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
