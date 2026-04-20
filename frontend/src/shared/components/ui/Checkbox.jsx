import { Check } from 'lucide-react';
import React, { forwardRef, useEffect, useId } from 'react';

const Checkbox = forwardRef(
  (
    {
      label,
      indeterminate = false,
      size = 'md',
      checked,
      defaultChecked,
      disabled = false,
      onChange,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    // Efecto para sincronizar la propiedad indeterminate del DOM
    useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.indeterminate = indeterminate;
      }
    }, [indeterminate, ref]);

    // Mapeo de tamaños para el contenedor visual y el icono
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    const iconSizes = {
      sm: 'h-2.5 w-2.5',
      md: 'h-3.5 w-3.5',
      lg: 'h-4.5 w-4.5',
    };

    return (
      <label
        htmlFor={inputId}
        className={`
          inline-flex cursor-pointer items-center gap-2
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
          ${className}
        `}
      >
        {/* Contenedor relativo para el input oculto y el checkbox visual */}
        <div className="relative flex items-center justify-center">
          {/* Input real (oculto visualmente pero accesible) */}
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={onChange}
            className="peer sr-only"
            {...props}
          />

          {/* Caja visual del checkbox */}
          <div
            className={`
              flex items-center justify-center rounded border transition-all
              ${
                checked || indeterminate
                  ? 'border-indigo-600 bg-indigo-600 dark:border-indigo-500 dark:bg-indigo-500'
                  : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800'
              }
              ${sizeClasses[size]}
              peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-2
              peer-focus-visible:ring-offset-white dark:peer-focus-visible:ring-offset-gray-900
            `}
          >
            {/* Icono de check (solo si está marcado y no indeterminado) */}
            {checked && !indeterminate && (
              <Check                 
                className={`${iconSizes[size]} text-white`}/>

            )}

            {/* Indicador de estado indeterminado (una línea horizontal) */}
            {indeterminate && (
              <div className={`${iconSizes[size]} rounded-sm bg-white`} />
            )}
          </div>
        </div>

        {/* Etiqueta de texto (opcional) */}
        {label && (
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;

