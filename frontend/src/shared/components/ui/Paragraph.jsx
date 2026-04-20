import React from 'react';

export const Paragraph = ({
  children,
  size = 'base',
  color = 'default',
  margin = false,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  };

  const colorClasses = {
    default: 'text-gray-700 dark:text-gray-300',
    muted: 'text-gray-500 dark:text-gray-400',
  };

  return (
    <p
      className={`
        ${sizeClasses[size]}
        ${colorClasses[color]}
        ${margin ? 'mb-4' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </p>
  );
};

