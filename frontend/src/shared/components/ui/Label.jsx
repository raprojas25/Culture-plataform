export const Label = ({
  children,
  variant = "primary",
  size = "sm",
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "block";

  const variants = {
    primary:
      "text-gray-700 dark:text-gray-300 font-medium",
    secondary:
      "text-gray-500 dark:text-gray-300 font-normal",

  };

  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <label
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
      disabled={disabled}
    >
      {children}
    </label>
  );
};
