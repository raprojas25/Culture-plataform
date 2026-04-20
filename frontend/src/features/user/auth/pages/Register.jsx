import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Apple,
  ArrowRight,
  Facebook,
  Instagram,
  Lock,
  Mail,
  Phone,
  User,
  UserPlus,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/Button";
import { Label } from "@/shared/components/ui/Label";
import { FormField } from "@/shared/components/forms/FormField";
import { ErrorMessage } from "@/shared/components/forms/ErrorMessage";

export const Register = () => {
  const { signUp, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {

    const formatData = {
      role_id: 3,
      username: data.username,
      email: data.email,
      password: data.password
     };

    try {
      await signUp(formatData);
      // await signUp(data.username, data.email, data.password);
      reset();
    } catch (error) {
      toast.error(error.message || "Error inesperado");
    } finally {
      // setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.success(`Iniciando sesión con ${provider}...`);
    // Implementar lógica de OAuth aquí
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 dark:bg-gray-800"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mb-6">
              <UserPlus className="text-white" size={28} />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-gray-400">
              Únete a la comunidad
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Crea tu cuenta en solo unos pasos
            </p>
          </div>
          <motion.form
            key="register"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Nombre completo */}
            <FormField
              label="Nombre Completo *"
              name="username"
              icon={User}
              variant="secondary"
              size="lg"
              type="text"
              placeholder="Tu nombre completo"
              error={errors.username}
              errorMessage={errors.username?.message}
              isLoading={isLoading}
              {...register("username", {
                required: "El nombre es requerido",
                minLength: {
                  value: 10,
                  message: "Mínimo 10 caracteres",
                },
              })}
            />

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
              errorMessage={errors.email?.message}
              isLoading={isLoading}
              {...register("email", {
                required: "El email es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
            />

            {/* Teléfono */}
            {/* <FormField */}
            {/*   label="Telefono" */}
            {/*   name="telefono" */}
            {/*   icon={Phone} */}
            {/*   variant="secondary" */}
            {/*   size="lg" */}
            {/*   type="tel" */}
            {/*   placeholder="987 654 321" */}
            {/*   error={errors.telefono} */}
            {/*   errorMessage={errors.telefono?.message} */}
            {/*   isLoading={isLoading} */}
            {/*   {...register("telefono")} */}
            {/* /> */}

            {/* Contraseña */}
            <div>
              <FormField
                label="Contraseña *"
                name="password"
                icon={Lock}
                variant="password"
                size="lg"
                type="password"
                placeholder="••••••••"
                error={errors.password}
                errorMessage={errors.password?.message}
                isLoading={isLoading}
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "Mínimo 6 caracteres",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: "Debe incluir mayúsculas, minúsculas y números",
                  },
                })}
              />

              {/* Indicadores de seguridad */}
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-xs">
                  <div
                    className={`w-1/3 h-1 rounded-full mr-2 ${password?.length >= 8 ? "bg-green-500" : "bg-gray-200"}`}
                  ></div>
                  <span
                    className={
                      password?.length >= 8 ? "text-green-600" : "text-gray-500"
                    }
                  >
                    Al menos 8 caracteres
                  </span>
                </div>
                <div className="flex items-center text-xs">
                  <div
                    className={`w-1/3 h-1 rounded-full mr-2 ${/[A-Z]/.test(password) && /[a-z]/.test(password) ? "bg-green-500" : "bg-gray-200"}`}
                  ></div>
                  <span
                    className={
                      /[A-Z]/.test(password) && /[a-z]/.test(password)
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  >
                    Mayúsculas y minúsculas
                  </span>
                </div>
                <div className="flex items-center text-xs">
                  <div
                    className={`w-1/3 h-1 rounded-full mr-2 ${/\d/.test(password) ? "bg-green-500" : "bg-gray-200"}`}
                  ></div>
                  <span
                    className={
                      /\d/.test(password) ? "text-green-600" : "text-gray-500"
                    }
                  >
                    Al menos un número
                  </span>
                </div>
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <FormField
              label="Confirmar Contraseña *"
              name="confirmPassword"
              icon={Lock}
              variant="password"
              size="lg"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
              isLoading={isLoading}
              {...register("confirmPassword", {
                required: "Confirma tu contraseña",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
            />

            {/* Términos y condiciones */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                {...register("terms", {
                  required: "Debes aceptar los términos",
                })}
                className="mt-1 mr-3 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <Label variant="secondary" htmlFor="terms">
                Acepto los{" "}
                <Link to="/terminos" className="text-red-500 hover:underline">
                  Términos y Condiciones
                </Link>{" "}
                y la
                <Link
                  to="/privacidad"
                  className="text-red-500 hover:underline ml-1"
                >
                  Política de Privacidad
                </Link>
              </Label>
            </div>
            {errors.terms && (
              <ErrorMessage message={errors.terms?.message}/>
            )}

            {/* Newsletter */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="newsletter"
                {...register("newsletter")}
                className="mt-1 mr-3 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <Label htmlFor="newsletter" variant="secondary">
                Quiero recibir información sobre eventos y novedades de la
                plataforma
              </Label>
            </div>

            {/* Botón de registro */}
            <Button
              variant="primary"
              size="lg"
              leftIcon={UserPlus}
              rightIcon={ArrowRight}
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  Creando cuenta...
                </>
              ) : (
                <>Crear Cuenta</>
              )}
            </Button>
          </motion.form>

          {/* Separador */}
          <div className="my-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-500"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 dark:bg-gray-500 dark:text-gray-200">
                  O continúa con
                </span>
              </div>
            </div>
          </div>

          {/* Login con redes sociales */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <button
              onClick={() => handleSocialLogin("facebook")}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
            >
              <Facebook size={20} />
            </button>
            <button
              onClick={() => handleSocialLogin("google")}
              className="p-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center"
            >
              <Instagram size={20} />
            </button>
            <button
              onClick={() => handleSocialLogin("apple")}
              className="p-3 bg-gray-900 text-white rounded-lg hover:bg-black flex items-center justify-center"
            >
              <Apple size={20} />
            </button>
          </div>

          {/* Enlace para cambiar entre login/registro */}
          <div className="flex justify-center items-center mt-8">
            <Label variant="secondary">¿Ya tienes una cuenta?</Label>
            <Link
              to="/login"
              className="ml-2 text-red-600 font-medium hover:text-red-700"
            >
              Inicia sesión
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
