import React from "react";

export const Input = React.forwardRef(
  (
    {
      placeholder = "...",
      variant = "primary",
      size = "md",
      isLoading = false,
      className = "",
      error = false, // nueva prop: true si hay error
      disabled,
      textarea = false,
      ...props
    },
    ref,
  ) => {
    // Clases base comunes
    const baseClasses =
      "w-full border focus:outline-none focus:ring-2 focus:ring-opacity-25 transition-colors duration-300 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-opacity-25";

    // Clases condicionales según el estado de error
    const stateClasses = error
      ? "border-red-500  dark:border-red-700 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-700 dark:focus:border-red-700"
      : "border-gray-300 dark:border-gray-500 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-700 dark:focus:border-primary-700";

    // Variantes para padding izquierdo/derecho (según el icono)
    const variants = {
      primary: "pl-4 pr-4",
      secondary: "pl-10 pr-4",
      password: "pl-10 pr-12", // más espacio a la derecha para el botón de mostrar/ocultar
    };

    // Tamaños
    const sizes = {
      sm: "py-2 text-sm font-light rounded-md",
      md: "py-2 text-base font-normal rounded-lg",
      lg: "py-3 text-base font-normal rounded-lg",
    };
    const textareaClasses =
      "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none";
    const baseClassesold =
      "w-full border border-gray-300 focus:ring-1 focus:ring-red-500 focus:border-transparent focus:outline-none focus:shadow-md focus:shadow-red-700/30 dark:bg-gray-700 dark:text-gray-300 transition-colors duration-300 ";
    const deepseek =
      "w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-25 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 transition-colors duration-300 dark:focus:ring-blue-700 dark:focus:border-blue-700 dark:focus:ring-opacity-25";

    return (
      <>
        {textarea ? (
          <textarea
            ref={ref}
            rows={3}
            className={`${baseClasses} ${stateClasses}  ${variants[variant]} ${sizes[size]} ${className}`}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            aria-invalid={error} // mejora de accesibilidad
            {...props}
          />
        ) : (
          <input
            ref={ref}
            placeholder={placeholder}
            className={`${baseClasses} ${stateClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || isLoading}
            aria-invalid={error} // mejora de accesibilidad
            {...props}
          />
        )}
      </>
    );
  },
);
