import { forwardRef, useState } from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { ErrorMessage } from "./ErrorMessage";

export const FormField = forwardRef(
  (
    {
      label,
      name,
      type = "text",
      placeholder,
      icon: Icon,
      error,
      isLoading,
      variant = "primary",
      size = "md",
      textarea = false,
      as,
      children,
      className = "",
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const baseClasses =
      "w-full border focus:outline-none focus:ring-2 focus:ring-opacity-25 transition-colors duration-300 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-opacity-25";
    const stateClasses = error
      ? "border-red-500 dark:border-red-700 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-700 dark:focus:border-red-700"
      : "border-gray-300 dark:border-gray-500 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-700 dark:focus:border-primary-700";
    const variants = {
      primary: "pl-4 pr-4",
      secondary: "pl-10 pr-4",
      password: "pl-10 pr-12",
    };
    const sizes = {
      sm: "py-2 text-sm font-light rounded-md",
      md: "py-2 text-base font-normal rounded-lg",
      lg: "py-3 text-base font-normal rounded-lg",
    };

    const selectClasses = `${baseClasses} ${stateClasses} ${variants[variant]} ${sizes[size]} appearance-none cursor-pointer ${className}`;

    return (
      <div className="space-y-2">
        {label && <Label htmlFor={name}>{label}</Label>}

        <div className="relative">
          {Icon && as !== "select" && (
            <Icon
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          )}

          {as === "select" ? (
            <div className="relative">
              <select
                id={name}
                name={name}
                ref={ref}
                className={selectClasses}
                error={error ? true : undefined}
                {...props}
              >
                {children}
              </select>
              <ChevronDown
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          ) : (
            <>
              <Input
                id={name}
                name={name}
                type={
                  variant === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                placeholder={placeholder}
                isLoading={isLoading}
                ref={ref}
                error={error}
                variant={variant}
                textarea={textarea}
                {...props}
              />

              {variant === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </>
          )}
        </div>
        {error && <ErrorMessage message={error?.message} />}
      </div>
    );
  },
);

FormField.displayName = "FormField";
// Example white icom

/*
<FormField
  label="Nombre Completo *"
  name="username"
  icon={User}
  variant="secondary"
  size="lg"
  type="text"
  placeholder="Tu nombre completo"
  error={errors.username}
  isLoading={isLoading}
  {...register("username", {
    required: "El nombre es requerido",
    minLength: {
      value: 10,
      message: "Mínimo 10 caracteres",
    },
  })}
/>
*/
// Example primary

/*
<FormField
  label="Nombre Completo *"
  name="username"
  variant="primary"
  size="lg"
  type="text"
  placeholder="Tu nombre completo"
  error={errors.username}
  isLoading={isLoading}
  {...register("username", {
    required: "El nombre es requerido",
    minLength: {
      value: 10,
      message: "Mínimo 10 caracteres",
    },
  })}
/>
*/
