import { ChevronLeft, Key, Mail } from "lucide-react";
import { Label } from "../../components/ui/Label";
import { Button } from "../../components/ui/Button";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

const ForgotForm = ( isLoading ) => {
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


  return (
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
          <input
            type="email"
            {...register("resetEmail", {
              required: "El email es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="tu@email.com"
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

  )
}

export default ForgotForm
