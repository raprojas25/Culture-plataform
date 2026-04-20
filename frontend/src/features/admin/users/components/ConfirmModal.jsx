import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

/**
 * @typedef {Object} ConfirmModalProps
 * @property {boolean} isOpen - Si el modal está abierto
 * @property {() => void} onClose - Callback al cerrar
 * @property {() => Promise<void>} onConfirm - Callback al confirmar
 * @property {string} title - Título del modal
 * @property {string} message - Mensaje de confirmación
 * @property {'danger' | 'warning'} [variant='danger'] - Variante de color
 * @property {string} [confirmText='Confirmar'] - Texto del botón de confirmar
 * @property {boolean} [loading] - Estado de carga
 */

/**
 * Modal de confirmación reutilizable con animaciones
 *
 * @param {ConfirmModalProps} props
 * @returns {JSX.Element}
 */
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  variant = "danger",
  confirmText = "Confirmar",
  loading = false,
}) => {
  const handleConfirm = async () => {
    await onConfirm();
  };

  const variantStyles = {
    danger: {
      icon: "text-red-600 dark:text-red-400",
      bg: "bg-red-100 dark:bg-red-900/30",
      button: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    },
    warning: {
      icon: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      button: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
    },
  };

  const colors = variantStyles[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            /* className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 px-4" */

            className="fixed left-1 top-1/2 w-full max-w-md z-50 px-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Icono y contenido */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icono circular */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center`}
                  >
                    <AlertTriangle className={`w-6 h-6 ${colors.icon}`} />
                  </div>

                  {/* Texto */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {message}
                    </p>
                  </div>

                  {/* Botón cerrar */}
                  <button
                    onClick={onClose}
                    className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    disabled={loading}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  onClick={handleConfirm}
                  disabled={loading}
                  className={colors.button}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Procesando...</span>
                    </>
                  ) : (
                    confirmText
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
