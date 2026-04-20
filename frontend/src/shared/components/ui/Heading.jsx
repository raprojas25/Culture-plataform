import React from 'react';

export const Heading = ({
  children,
  level = 'h2',
  size,
  color = 'default',
  align = 'left',
  className = '',
  ...props
}) => {
  const Component = level;

  // Tamaños semánticos por defecto según el nivel
  const defaultSizes = {
    h1: 'text-5xl md:text-6xl font-bold mb-6',
    h2: 'text-3xl md:text-4xl font-bold mb-4',
    h3: 'text-xl md:text-2xl font-bold mb-2',
    h4: 'text-base font-semibold',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium',
  };

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
  };

  const colorClasses = {
    default: 'text-gray-800 dark:text-white',
    muted: 'text-gray-600 dark:text-gray-400',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const finalSize = size ? sizeClasses[size] : defaultSizes[level];

  return (
    <Component
      className={` 
        ${finalSize}
        ${colorClasses[color]}
        ${alignClasses[align]}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};
