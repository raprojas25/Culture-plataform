// export const Badge = ({
//   children,
//   variant = "success",
//   size = "md",
//   leftIcon: Left,
//   rightIcon: Right,
//   className = "",
// }) => {
//   const baseClasses = "inline-flex items-center rounded-full w-auto";
//
//   const variants = {
//     success:
//       "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-600",
//     danger: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-600",
//     warning:
//       "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-600",
//     info: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-600",
//     muted: "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-600",
//     red: "bg-red-600 text-white",
//   };
//
//   /** @type {Record<Size, {box: string, icon: string}>} */
//   const sizeClasses = {
//     sm: {
//       box: "px-2 py-1 text-xs font-base",
//       icon: "w-3 h-3 mr-1",
//     },
//     md: {
//       box: "px-3 py-1 text-sm font-semibold",
//       icon: "w-4 h-4 mr-1.5",
//     },
//     lg: {
//       box: "px-4 py-2 text-base font-semibold",
//       icon: "w-5 h-5 mr-2",
//     },
//   };
//
//   const { box, icon } = sizeClasses[size];
//
//   return (
//     <div className={`${baseClasses} ${variants[variant]} ${box} ${className}`}>
//       {Left && <Left className={icon} />}
//       {/* <span>{leftIcon}</span> */}
//       <span>{children}</span>
//       {/* <span>{rightIcon}</span> */}
//       {Right && <Right className={icon} />}
//     </div>
//   );
// };
import React from "react";

// Tipos con JSDoc para autocompletado

/**
 * @typedef {'success'|'danger'|'warning'|'info'|'muted'|'primary'|'default'|'outline'} BadgeVariant
 */

/**
 * @typedef {'sm'|'md'|'lg'} BadgeSize
 */

/**
 * @typedef {Object} BadgeProps
 * @property {React.ReactNode} children - Contenido del badge
 * @property {BadgeVariant} [variant='default'] - Variante visual
 * @property {BadgeSize} [size='md'] - Tamaño del badge
 * @property {React.ElementType} [leftIcon] - Icono a la izquierda (componente Lucide o similar)
 * @property {React.ElementType} [rightIcon] - Icono a la derecha
 * @property {string} [className] - Clases CSS adicionale   s
 * @property {string} [ariaLabel] - Etiqueta accesible (por defecto usa el texto)
 * @property {React.ElementType} [as='span'] - Elemento HTML raíz ('span', 'div', etc.)
 * @property {React.HTMLAttributes<HTMLElement>} [rest] - Resto de props nativas
 */

/**
 * Componente Badge reutilizable con variantes, tamaños, iconos y modo oscuro.
 *
 * @example
 * // Básico
 * <Badge variant="success">Activo</Badge>
 *
 * @example
 * // Con iconos
 * <Badge variant="info" leftIcon={InfoIcon} rightIcon={ChevronRightIcon}>
 *   Nuevo
 * </Badge>
 *
 * @example
 * // Tamaño pequeño
 * <Badge size="sm" variant="warning">Pendiente</Badge>
 *
 * @example
 * // Como div (para bloques)
 * <Badge as="div" variant="outline">Bloque</Badge>
 */

/**
 * Badge component con soporte para variantes, tamaños, iconos y dark mode.
 * 
 * @param {('default'|'success'|'warning'|'error'|'info'|'purple')} variant - Estilo de color
 * @param {('sm'|'md'|'lg')} size - Tamaño del badge
 * @param {React.ReactNode} icon - Icono opcional (se recomienda usar componentes SVG o librerías como lucide/react)
 * @param {React.ReactNode} children - Texto o contenido del badge
 * @param {string} className - Clases adicionales para sobreescribir estilos
 */

export const Badge = React.forwardRef(
  (
    {
      children,
      variant = "default",
      size = "md",
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      className = "",
      ariaLabel,
      as: Component = "span",
      ...rest
    },
    ref,
  ) => {
    // Base: inline-flex con bordes redondeados
    const baseClasses = "inline-flex items-center rounded-full w-auto";

    // Mapeo de variantes (modo oscuro incluido)
    const variants = {
      success:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      warning:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      info: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
      muted: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
      primary:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
      default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      outline:
        "border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 bg-transparent",
      red: "bg-red-600 text-white",
      purple:  'bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-300',
    };

    // Tamaños y clases asociadas
    const sizeClasses = {
      sm: {
        box: "px-2 py-1 text-xs font-medium",
        icon: "w-3 h-3",
        gap: "gap-1",
      },
      md: {
        box: "px-2.5 py-1 text-sm font-medium",
        icon: "w-3.5 h-3.5",
        gap: "gap-1.5",
      },
      lg: {
        box: "px-3 py-2 text-base font-semibold",
        icon: "w-4 h-4",
        gap: "gap-2",
      },
    };

    const { box, icon: iconSize, gap } = sizeClasses[size];
    const variantClasses = variants[variant] || variants.default;

    // Construir clases finales
    const badgeClasses = [baseClasses, variantClasses, box, gap, className]
      .filter(Boolean)
      .join(" ");

    // Etiqueta accesible por defecto usando children (si es texto)
    const defaultAriaLabel =
      ariaLabel || (typeof children === "string" ? children : undefined);

    return (
      <Component
        ref={ref}
        className={badgeClasses}
        aria-label={defaultAriaLabel}
        {...rest}
      >
        {LeftIcon && <LeftIcon className={iconSize} aria-hidden="true" />}
        {/* <span> */}
          {children}
        {/* </span> */}
        {RightIcon && <RightIcon className={iconSize} aria-hidden="true" />}
      </Component>
    );
  },
);

Badge.displayName = "Badge";
