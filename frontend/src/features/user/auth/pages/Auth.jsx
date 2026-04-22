import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Facebook,
  Apple,
  ArrowRight,
  ChevronLeft,
  Key,
  UserPlus,
  LogIn,
  Instagram,
} from "lucide-react";
import { Label } from "@/shared/components/ui/Label";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Benefit } from "./components/Benefit";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const password = watch("password");

  // Countdown para reenvío de código
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  //login and register
  const handleAuthSubmit = async (data) => {
    setIsLoading(true);

    try {
      // =========================
      // LOGIN
      // =========================
      if (isLogin) {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.loginEmail,
            password: data.loginPassword,
          }),
        });

        const result = await response.json();

        setIsLogin(true);

        if (!response.ok) {
          throw new Error(result.error || "Credenciales incorrectas");
        }

        // Guardar sesión
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        console.log(result.token);
        console.log(result.user);
        toast.success("Sesión iniciada correctamente");
        navigate("/");
        return;
      }

      // =========================
      // REGISTRO
      // =========================
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al registrar");
      }

      toast.success("Cuenta creada correctamente. Ahora inicia sesión.");
      setIsLogin(true); // volver al login
      reset();
    } catch (error) {
      toast.error(error.message || "Error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast(`Iniciando sesión con ${provider}...`);
    // Implementar lógica de OAuth aquí
  };
  const handleForgotPassword = async (data) => {
    setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const slideIn = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-200 hover:text-red-600 mb-8"
        >
          <ChevronLeft size={20} />
          <span>Volver al inicio</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Columna izquierda: Formulario */}
          <motion.div
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
            {!isForgotPassword && (
              <div className="flex bg-gray-100 dark:bg-gray-900/50 rounded-xl p-1 mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    isLogin
                      ? "bg-white shadow-sm text-red-600"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    !isLogin
                      ? "bg-white shadow-sm text-red-600"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
                  }`}
                >
                  Registrarse
                </button>
              </div>
            )}

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
                        placeholder="tu@email.com"
                        error={errors.resetEmail}
                        {...register("resetEmail", {
                          required: "El email es requerido",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Email inválido",
                          },
                        })}
                      />
                    </div>
                    {errors.resetEmail && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.resetEmail.message}
                      </p>
                    )}
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={!isLoading ? <Key size={20} /> : ""}
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-4"></div>
                        Enviando...
                      </>
                    ) : (
                      <>Enviar enlace de recuperación</>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    leftIcon={<ChevronLeft size={20} />}
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
                  onSubmit={handleSubmit(handleAuthSubmit)}
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
                        error={errors.loginEmail}
                        {...register("loginEmail", {
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
                        error={errors.loginPassword}
                        {...register("loginPassword", {
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
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
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
              ) : (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit(handleAuthSubmit)}
                  className="space-y-6"
                >
                  {/* Nombre completo */}
                  <div className="space-y-2">
                    <Label>Nombre Completo *</Label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <Input
                        variant="primary"
                        size="lg"
                        {...register("fullName", {
                          required: "El nombre es requerido",
                          minLength: {
                            value: 10,
                            message: "Mínimo 10 caracteres",
                          },
                        })}
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label>Correo Electrónico *</Label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <Input
                        size="lg"
                        type="email"
                        {...register("email", {
                          required: "El email es requerido",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Email inválido",
                          },
                        })}
                        placeholder="tu@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-2">
                    <Label>Teléfono (WhatsApp)</Label>

                    <div className="relative">
                      <Phone
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <Input
                        size="lg"
                        type="tel"
                        {...register("phone")}
                        placeholder="987 654 321"
                      />
                    </div>
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
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: "La contraseña es requerida",
                          minLength: {
                            value: 8,
                            message: "Mínimo 8 caracteres",
                          },
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                            message:
                              "Debe incluir mayúsculas, minúsculas y números",
                          },
                        })}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
                      </p>
                    )}

                    {/* Indicadores de seguridad */}
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-xs">
                        <div
                          className={`w-1/3 h-1 rounded-full mr-2 ${password?.length >= 8 ? "bg-green-500" : "bg-gray-200"}`}
                        ></div>
                        <span
                          className={
                            password?.length >= 8
                              ? "text-green-600"
                              : "text-gray-500"
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
                            /\d/.test(password)
                              ? "text-green-600"
                              : "text-gray-500"
                          }
                        >
                          Al menos un número
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Confirmar Contraseña */}
                  <div className="space-y-2">
                    <Label>Confirmar Contraseña *</Label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <Input
                        variant="password"
                        size="lg"
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword", {
                          required: "Confirma tu contraseña",
                          validate: (value) =>
                            value === password ||
                            "Las contraseñas no coinciden",
                        })}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

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
                      <Link
                        to="/terminos"
                        className="text-red-500 hover:underline"
                      >
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
                    <p className="mt-1 text-sm text-red-600">
                      {errors.terms.message}
                    </p>
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
                    leftIcon={isLoading ? "" : <UserPlus size={20} />}
                    rightIcon={isLoading ? "" : <ArrowRight size={20} />}
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Creando cuenta...
                      </>
                    ) : (
                      <>Crear Cuenta</>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Separador */}
            {!isForgotPassword && (
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
            )}

            {/* Login con redes sociales */}
            {!isForgotPassword && (
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
            )}

            {/* Enlace para cambiar entre login/registro */}
            {!isForgotPassword && (
              <div className="flex justify-center items-center">
                <Label variant="secondary">
                  {isLogin
                    ? "¿No tienes una cuenta?"
                    : "¿Ya tienes una cuenta?"}
                </Label>
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-red-600 font-medium hover:text-red-700"
                >
                  {isLogin ? "Regístrate" : "Inicia sesión"}
                </button>
              </div>
            )}
          </motion.div>

          {/* Columna derecha: Beneficios e información */}
          <Benefit />
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

export default Auth;
