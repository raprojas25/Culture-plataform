import React from "react";

export const Input = React.forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "w-full border border-gray-300 focus:ring-1 focus:ring-red-500 focus:border-transparent focus:outline-none focus:shadow-md focus:shadow-red-700/30 dark:bg-gray-700 dark:text-gray-300 transition-colors duration-300 ";
    const deepseek =
  "w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-25 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 transition-colors duration-300 dark:focus:ring-blue-700 dark:focus:border-blue-700 dark:focus:ring-opacity-25";

    const variants = {
      primary: "pl-10 pr-4 ",
      secondary: "pl-10 pr-4 ",
      password: "pl-10 pr-12 ",
    };

    const sizes = {
      sm: "py-2 text-sm font-normal rounded-md ",
      md: "py-2 text-base font-normal rounded-lg ",
      lg: "py-3 text-base font-medium rounded-lg",
    };

    return (
      <input
        ref={ref}
        className={`${deepseek} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      />
    );
  },
);
