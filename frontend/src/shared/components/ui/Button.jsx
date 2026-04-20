// import React from "react";
// import { Loader2 } from "lucide-react";
// import { motion } from "framer-motion";
//
// export const Button = ({
//   children,
//   variant = "primary",
//   size = "md",
//   isLoading = false,
//   leftIcon: LeftIcon,
//   rightIcon: RightIcon,
//   className = "",
//   disabled,
//   ...props
// }) => {
//   const baseClasses =
//     "inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md gap-2";
//
//   const variants = {
//     primary:
//       "text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 focus:ring-red-500",
//     secondary:
//       "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:ring-gray-500",
//     danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
//     outline:
//       "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 focus:ring-gray-500",
//   };
//
//   const sizeConfig = {
//     sm: {
//       icon: "w-4 h-4",
//       button: "px-3 py-2 text-sm font-normal",
//     },
//     md: {
//       icon: "w-5 h-5",
//       button: "px-4 py-2 text-base font-medium",
//     },
//     lg: {
//       icon: "w-6 h-6",
//       button: "px-4 py-3 text-base font-bold",
//     },
//   };
//
//   const { icon, button } = sizeConfig[size] || sizeConfig.md;
//
//   return (
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       className={`${baseClasses} ${variants[variant]} ${button} ${className}`}
//       disabled={disabled || isLoading}
//       {...props}
//     >
//       {isLoading && <Loader2 className={`animate-spin ${icon}`} />}
//       {!isLoading && LeftIcon && (
//         <LeftIcon className={`${icon}`} />
//       )}
//       {children}
//       {!isLoading && RightIcon && (
//         <RightIcon className={`${icon}`} />
//       )}
//     </motion.button>
//   );
// };

import React from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

/**
 * @typedef {
 *   | 'primary'
 *   | 'secondary'
 *   | 'danger'
 *   | 'outline'
 *   | 'ghost'
 *   | 'success'
 *   | 'warning'
 *   | 'link'
 * } ButtonVariant
 */

/**
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 */

/**
 * @typedef {Omit<React.ComponentPropsWithoutRef<'button'>, 'children'>} ButtonHTMLProps
 */

/**
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children - Contenido del button
 * @property {ButtonVariant} [variant='primary'] - Variante visual
 * @property {ButtonSize} [size='md'] - Tamaño del button
 * @property {boolean} [isLoading=false] - Muestra un spinner de carga y deshabilita el botón
 * @property {React.ElementType} [leftIcon] - Icono a la izquierda (componente Lucide o similar)
 * @property {React.ElementType} [rightIcon] - Icono a la derecha
 * @property {string} [className=''] - Clases CSS adicionales
 * @property {boolean} [disabled=false] - Deshabilita el botón
 * @property {boolean} [withAnimation=true] - Habilita animaciones de hover/tap
 * @property {'button' | 'submit' | 'reset'} [type='button'] - Tipo de botón
 */

/**
 * Componente Button reutilizable con variantes, tamaños, iconos y estado de carga.
 *
 * @example
 * ```jsx
 * <Button variant="primary" onClick={() => console.log('click')}>
 *   Click me
 * </Button>
 *
 * <Button variant="success" isLoading leftIcon={CheckIcon}>
 *   Guardar
 * </Button>
 * ```
 *
 * @param {ButtonProps & ButtonHTMLProps} props
 * @param {React.Ref<HTMLButtonElement>} ref
 * @returns {JSX.Element}
 */
export const Button = React.forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      className = "",
      disabled = false,
      withAnimation = true,
      type = "button",
      ...props
    },
    ref,
  ) => {
    // Clases base sin duplicados
    const baseClasses =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed gap-2";

    // Mapeo de variantes a estilos
    const variants = {
      primary:
        "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md hover:from-red-600 hover:to-orange-600 focus:ring-red-400 dark:shadow-gray-200/5",
      secondary:
        "bg-gray-100 text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 focus:ring-gray-400",
      danger:
        "bg-red-600 text-white shadow-md hover:bg-red-700 focus:ring-red-500 dark:shadow-red-900/20",
      outline:
        "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-gray-400",
      ghost:
        "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-gray-400",
      success:
        "bg-green-600 text-white shadow-md hover:bg-green-700 focus:ring-green-500 dark:shadow-green-900/20",
      warning:
        "bg-yellow-500 text-white shadow-md hover:bg-yellow-600 focus:ring-yellow-400 dark:shadow-yellow-900/20",
      link: "text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400 focus:ring-indigo-400 p-0 h-auto",
    };

    // Tamaños (para link no aplicamos padding ni fuente)
    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
    };

    // Tamaños para iconos
    const iconSizes = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-5 h-6",
    };

    const isLink = variant === "link";
    const finalButtonClasses = isLink
      ? variants.link
      : `${baseClasses} ${variants[variant]} ${sizeClasses[size]}`;

    // Props de animación (solo si está habilitado y no está deshabilitado/cargando)
    const animationProps =
      withAnimation && !disabled && !isLoading
        ? {
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            transition: { type: "spring", stiffness: 400, damping: 17 },
          }
        : {};

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`${finalButtonClasses} ${className}`}
        aria-disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...animationProps}
        {...props}
      >
        {isLoading && (
          <Loader2
            className={`animate-spin ${iconSizes[size]}`}
            aria-hidden="true"
          />
        )}
        {!isLoading && LeftIcon && (
          <LeftIcon className={iconSizes[size]} aria-hidden="true" />
        )}
        {children}
        {!isLoading && RightIcon && (
          <RightIcon className={iconSizes[size]} aria-hidden="true" />
        )}
      </motion.button>
    );
  },
);
Button.displayName = "Button";
