export const Badge = ({
  children,
  variant = "success",
  size = "md",
  leftIcon,
  rightIcon,
  className = "",
}) => {

  const baseClasses = "flex items-center rounded-full";

  const variants = {
    success: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-sky-100 text-sky-800",
    muted: "bg-gray-100 text-gray-800",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs font-base",
    md: "px-3 py-1 text-xs font-medium",
    lg: "p-2 text-sm font-medium",
  };

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <span>{leftIcon}</span>
      <span className="mr-1 ml-1">{children}</span>
      <span>{rightIcon}</span>
    </div>
  );
};
