import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
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
  Shield,
  Key,
  Home,
  Calendar,
  MapPin,
  UserPlus,
  LogIn,
  Heart,
  Instagram
} from 'lucide-react'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [isVerificationSent, setIsVerificationSent] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm()
  const password = watch('password')

  // Countdown para reenvío de código
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleAuthSubmit = async (data) => {
    setIsLoading(true)
    
    try {
      // Simulación de proceso de autenticación
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (isLogin) {
        toast.success(
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" />
            <div>
              <p className="font-semibold">¡Bienvenido de nuevo!</p>
              <p className="text-sm">Sesión iniciada correctamente</p>
            </div>
          </div>,
          { duration: 3000 }
        )
        navigate('/')
      } else {
        toast.success(
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" />
            <div>
              <p className="font-semibold">¡Cuenta creada!</p>
              <p className="text-sm">Te hemos enviado un correo de verificación</p>
            </div>
          </div>,
          { duration: 4000 }
        )
        setIsVerificationSent(true)
        setCountdown(30) // 30 segundos para reenviar
      }
      
      reset()
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2">
          <AlertCircle className="text-red-500" />
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm">{isLogin ? 'Credenciales incorrectas' : 'Error al crear la cuenta'}</p>
          </div>
        </div>
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (data) => {
    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-500" />
          <div>
            <p className="font-semibold">¡Correo enviado!</p>
            <p className="text-sm">Revisa tu bandeja de entrada</p>
          </div>
        </div>,
        { duration: 4000 }
      )
      
      setIsForgotPassword(false)
      setCountdown(60)
    } catch (error) {
      toast.error('Error al enviar el correo de recuperación')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider) => {
    toast(`Iniciando sesión con ${provider}...`)
    // Implementar lógica de OAuth aquí
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const slideIn = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
  }

  const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-red-600 mb-8">
          <ChevronLeft size={20} />
          <span>Volver al inicio</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Columna izquierda: Formulario */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="bg-white rounded-2xl shadow-xl p-8 lg:p-12"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mb-6">
                {isLogin ? (
                  <LogIn className="text-white" size={28} />
                ) : (
                  <UserPlus className="text-white" size={28} />
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isForgotPassword ? 'Recuperar Contraseña' : 
                 isLogin ? 'Bienvenido de nuevo' : 'Únete a la comunidad'}
              </h1>
              <p className="text-gray-600">
                {isForgotPassword ? 'Te enviaremos un enlace para restablecer tu contraseña' :
                 isLogin ? 'Ingresa tus credenciales para continuar' : 'Crea tu cuenta en solo unos pasos'}
              </p>
            </div>

            {/* Tabs Login/Registro */}
            {!isForgotPassword && (
              <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    isLogin ? 'bg-white shadow-sm text-red-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    !isLogin ? 'bg-white shadow-sm text-red-600' : 'text-gray-600 hover:text-gray-900'
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Correo Electrónico *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        {...register('resetEmail', {
                          required: 'El email es requerido',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email inválido'
                          }
                        })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    </div>
                    {errors.resetEmail && (
                      <p className="mt-1 text-sm text-red-600">{errors.resetEmail.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Key size={20} />
                        Enviar enlace de recuperación
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={20} />
                    Volver al inicio de sesión
                  </button>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Correo Electrónico *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        {...register('loginEmail', {
                          required: 'El email es requerido',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email inválido'
                          }
                        })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    </div>
                    {errors.loginEmail && (
                      <p className="mt-1 text-sm text-red-600">{errors.loginEmail.message}</p>
                    )}
                  </div>

                  {/* Contraseña */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contraseña *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('loginPassword', {
                          required: 'La contraseña es requerida',
                          minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                        })}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                      <p className="mt-1 text-sm text-red-600">{errors.loginPassword.message}</p>
                    )}
                  </div>

                  {/* Recordar y olvidé contraseña */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        {...register('rememberMe')}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Recordarme</span>
                    </label>
                    
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>

                  {/* Botón de inicio */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Iniciando sesión...
                      </>
                    ) : (
                      <>
                        Iniciar Sesión
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        {...register('fullName', {
                          required: 'El nombre es requerido',
                          minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                        })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Correo Electrónico *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        {...register('email', {
                          required: 'El email es requerido',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email inválido'
                          }
                        })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono (WhatsApp)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        {...register('phone')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="987 654 321"
                      />
                    </div>
                  </div>

                  {/* Ubicación */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Distrito / Localidad
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        {...register('location')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Ej: Centro, San Juan, etc."
                      />
                    </div>
                  </div>

                  {/* Contraseña */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contraseña *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                          required: 'La contraseña es requerida',
                          minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                            message: 'Debe incluir mayúsculas, minúsculas y números'
                          }
                        })}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                    
                    {/* Indicadores de seguridad */}
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-xs">
                        <div className={`w-1/3 h-1 rounded-full mr-2 ${password?.length >= 8 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        <span className={password?.length >= 8 ? 'text-green-600' : 'text-gray-500'}>
                          Al menos 8 caracteres
                        </span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className={`w-1/3 h-1 rounded-full mr-2 ${/[A-Z]/.test(password) && /[a-z]/.test(password) ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        <span className={/[A-Z]/.test(password) && /[a-z]/.test(password) ? 'text-green-600' : 'text-gray-500'}>
                          Mayúsculas y minúsculas
                        </span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className={`w-1/3 h-1 rounded-full mr-2 ${/\d/.test(password) ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        <span className={/\d/.test(password) ? 'text-green-600' : 'text-gray-500'}>
                          Al menos un número
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Confirmar Contraseña */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar Contraseña *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirmPassword', {
                          required: 'Confirma tu contraseña',
                          validate: value => value === password || 'Las contraseñas no coinciden'
                        })}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  {/* Términos y condiciones */}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      {...register('terms', { required: 'Debes aceptar los términos' })}
                      className="mt-1 mr-3 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      Acepto los <Link to="/terminos" className="text-red-600 hover:underline">Términos y Condiciones</Link> y la 
                      <Link to="/privacidad" className="text-red-600 hover:underline ml-1">Política de Privacidad</Link>
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
                  )}

                  {/* Newsletter */}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="newsletter"
                      {...register('newsletter')}
                      className="mt-1 mr-3 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-600">
                      Quiero recibir información sobre eventos y novedades de la plataforma
                    </label>
                  </div>

                  {/* Botón de registro */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-lg hover:from-red-700 hover:to-orange-600 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Creando cuenta...
                      </>
                    ) : (
                      <>
                        <UserPlus size={20} />
                        Crear Cuenta
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Separador */}
            {!isForgotPassword && (
              <div className="my-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">O continúa con</span>
                  </div>
                </div>
              </div>
            )}

            {/* Login con redes sociales */}
            {!isForgotPassword && (
              <div className="grid grid-cols-3 gap-3 mb-8">
                <button
                  onClick={() => handleSocialLogin('facebook')}
                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                >
                  <Facebook size={20} />
                </button>
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="p-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                >
                  <Instagram size={20} />
                </button>
                <button
                  onClick={() => handleSocialLogin('apple')}
                  className="p-3 bg-gray-900 text-white rounded-lg hover:bg-black flex items-center justify-center"
                >
                  <Apple size={20} />
                </button>
              </div>
            )}

            {/* Enlace para cambiar entre login/registro */}
            {!isForgotPassword && (
              <div className="text-center">
                <p className="text-gray-600">
                  {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-red-600 font-medium hover:text-red-700"
                  >
                    {isLogin ? 'Regístrate' : 'Inicia sesión'}
                  </button>
                </p>
              </div>
            )}
          </motion.div>

          {/* Columna derecha: Beneficios e información */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="lg:block hidden"
          >
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 rounded-2xl p-8 text-white h-full">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold mb-4">
                    Únete a nuestra comunidad cultural
                  </h2>
                  <p className="text-white/90 text-lg">
                    Descubre todos los beneficios de ser parte de CulturaViva
                  </p>
                </div>

                {/* Beneficios */}
                <div className="space-y-6 mb-10">
                  {[
                    {
                      icon: <Calendar className="text-yellow-300" size={24} />,
                      title: 'Eventos personalizados',
                      description: 'Recibe recomendaciones basadas en tus intereses'
                    },
                    {
                      icon: <Heart className="text-pink-300" size={24} />,
                      title: 'Guarda tus favoritos',
                      description: 'Marca eventos y servicios que te gusten'
                    },
                    {
                      icon: <User className="text-blue-300" size={24} />,
                      title: 'Perfil personal',
                      description: 'Crea tu perfil y comparte tus intereses culturales'
                    },
                    {
                      icon: <Shield className="text-green-300" size={24} />,
                      title: 'Publica eventos',
                      description: 'Comparte tus propios eventos con la comunidad'
                    }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      variants={slideIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start"
                    >
                      <div className="p-3 bg-white/10 rounded-xl mr-4">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                        <p className="text-white/80">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Estadísticas */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
                  <h3 className="font-bold text-xl mb-4">Nuestra comunidad crece</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">5K+</div>
                      <div className="text-sm text-white/80">Usuarios</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-sm text-white/80">Eventos</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">25+</div>
                      <div className="text-sm text-white/80">Comunidades</div>
                    </div>
                  </div>
                </div>

                {/* Testimonio */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <User size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold">María González</h4>
                      <p className="text-sm text-white/80">Organizadora de eventos</p>
                    </div>
                  </div>
                  <p className="italic text-white/90">
                    "Gracias a CulturaViva he podido dar a conocer mis eventos tradicionales a toda la provincia. La comunidad es maravillosa."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
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
                  <h3 className="text-2xl font-bold mb-2">¡Verifica tu correo!</h3>
                  <p className="text-gray-600">
                    Te hemos enviado un enlace de verificación a tu correo electrónico.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <AlertCircle className="text-blue-600 mr-3" size={20} />
                    <p className="text-sm text-blue-800">
                      Revisa tu bandeja de entrada y carpeta de spam. Haz clic en el enlace para activar tu cuenta.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setIsVerificationSent(false)
                      setIsLogin(true)
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
                        {countdown > 0 ? `Reenviar en ${countdown}s` : 'Reenviar ahora'}
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
  )
}

export default Auth
