import React from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
/*
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
*/
export const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg dark:shadow-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed gap-2";

  const variants = {
    primary:
      "text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600",
    secondary:
      "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm font-normal",
    md: "px-4 py-2 text-base font-medium",
    lg: "px-4 py-3 text-base font-bold",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </motion.button>
  );
};
