// import { motion, AnimatePresence } from "framer-motion";
// import { X, Plus, AlertCircle } from "lucide-react";
// import { useState } from "react";
//
// export const NewModal = ({
//   icon=false,
//   isOpen,
//   onClose,
//   title,
//   description,
//   footer,
//   children,
//   size = "md"
// }) => {
//   const sizeClasses = {
//     sm: "max-w-md",
//     md: "max-w-lg",
//     lg: "max-w-2xl",
//     xl: "max-w-4xl",
//   };
//   // const [successMessage, setSuccessMessage] = useState("");
//   const handleClose = () => {
//     // setSuccessMessage("");
//     onClose();
//   };
//
//   const modalVariants = {
//     hidden: {
//       opacity: 0,
//       scale: 0.9,
//       y: 20,
//     },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30,
//       },
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.9,
//       y: 20,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };
//
//   const overlayVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1 },
//     exit: { opacity: 0 },
//   };
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           variants={overlayVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//           className={`min-h-full fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/25 backdrop-blur-sm`}
//           onClick={handleClose}
//         >
//           <motion.div
//             variants={modalVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full  max-h-[90vh] overflow-y-auto ${sizeClasses[size]}`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Header */}
//             <div className={`flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 ${icon ? "p-6" :"px-6 py-4"}`}>
//               <div className="flex items-center space-x-3">
//                 {icon && (
//                 <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg">
//                   <Plus className="text-white" size={20} />
//                 </div>
//                 )}
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                     {title}
//                   </h2>
//                   {description &&(
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     {description}
//                   </p>
//                   )}
//                 </div>
//               </div>
//               <button
//                 onClick={handleClose}
//                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//                 aria-label="Cerrar"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//
//             {/* Children */}
//             <div className="p-6">{children}</div>
//
//             {/* Footer */}
//             {footer && (
//             <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
//               <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
//                 <AlertCircle size={16} className="mr-2" />
//                 {footer}
//               </div>
//             </div>
//             )}
//
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, AlertCircle } from "lucide-react";
import { useEffect } from "react";

export const NewModal = ({
  showIcon = false,        // renombrado y con mejor nombre
  isOpen,
  onClose,
  title,
  description,
  footer,                  // ahora puede ser ReactNode
  children,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEsc = true,
}) => {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  // Manejo de tecla Escape
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick) onClose();
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/25 backdrop-blur-sm"
          onClick={handleOverlayClick}
          role="presentation"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full flex flex-col ${sizeClasses[size]}`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header - sin scroll, siempre visible */}
            <div
              className={`
                flex items-center justify-between
                border-b border-gray-200 dark:border-gray-700
                ${showIcon ? "p-6" : "px-6 py-4"}
              `}
            >
              <div className="flex items-center space-x-3">
                {showIcon && (
                  <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg">
                    <Plus className="text-white" size={20} />
                  </div>
                )}
                <div>
                  <h2 id="modal-title" className="text-xl font-bold text-gray-900 dark:text-white">
                    {title}
                  </h2>
                  {description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {description}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Contenido con scroll independiente */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">{children}</div>

            {/* Footer flexible */}
            {footer && (
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                {typeof footer === "string" ? (
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                    {footer}
                  </div>
                ) : (
                  footer
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

//example

/*
<NewModal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  title="Crear nuevo elemento"
  description="Completa los datos para continuar"
  showIcon
  footer={
    <div className="flex justify-end space-x-2">
      <button className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
    </div>
  }
  size="lg"
>
  contenido del modal
</NewModal>
*/
