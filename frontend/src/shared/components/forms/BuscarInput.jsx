import React, { forwardRef } from "react";
import { Search as SearchIcon, X as XIcon } from "lucide-react";

/**
 * @typedef {'sm' | 'md' | 'lg'} Size
 */

/**
 * @typedef {Object} SearchProps
 * @property {string} value
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange
 * @property {() => void} [onClear]
 * @property {(value: string) => void} [onSearch]
 * @property {Size} [size]
 * @property {string} [containerClassName]
 * @property {boolean} [disabled]
 * @property {string} [placeholder]
 */

/** @type {Record<Size, {input: string, icon: string, clearButton: string}>} */
const sizeClasses = {
  sm: {
    input: "py-1.5 text-sm rounded-md pl-8 pr-8",
    icon: "w-4 h-4",
    clearButton: "pr-2.5",
  },
  md: {
    input: "py-2 text-base rounded-lg pl-10 pr-10",
    icon: "w-5 h-5",
    clearButton: "pr-3",
  },
  lg: {
    input: "py-3 text-lg rounded-lg pl-12 pr-12",
    icon: "w-6 h-6",
    clearButton: "pr-4",
  },
};

/**
 * @param {SearchProps & React.InputHTMLAttributes<HTMLInputElement>} props
 * @param {React.Ref<HTMLInputElement>} ref
 */
export const Search = forwardRef((props, ref) => {
  const {
    value = "",
    onChange,
    onClear,
    onSearch,
    size = "md",
    disabled = false,
    placeholder = "Buscar...",
    className = "",
    containerClassName = "",
    ...rest
  } = props;

  // const handleClear = () => {
  //   if (disabled) return;
  //
  //   const event = { target: { value: "" } };
  //   onChange?.(event);
  //   onClear?.();
  // };

  const handleClear = () => {
    if (disabled) return;
    // const event = { target: { value: "" } };
    // onChange?.(event);
    onChange?.({
      target: {
        value: "",
        name: rest.name, // 🔥 importante para RHF
      },
    });

    onClear?.();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !disabled && onSearch) {
      onSearch(value);
    }
    rest.onKeyDown?.(e);
  };

  const { input, icon, clearButton } = sizeClasses[size];

  return (
    <div className={`relative w-full ${containerClassName}`}>
      {/* Icono de búsqueda (izquierda) */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon
          className={`${icon} text-gray-400 dark:text-gray-500 transition-colors`}
        />
      </div>

      {/* Input */}
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        className={`
            w-full
            border border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:ring-opacity-25 dark:focus:ring-opacity-25
            dark:bg-gray-800 dark:text-gray-200
            dark:focus:ring-primary-700 dark:focus:border-primary-700
            transition-colors duration-300
            ${input}
            ${className}
            ${disabled ? "opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-700" : ""}
          `}
        {...props}
      />

      {/* Botón de borrar (solo visible si hay texto y no está deshabilitado) */}
      {value && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className={`
              absolute inset-y-0 right-0 flex items-center
              ${clearButton}
              text-gray-400 hover:text-gray-600
              dark:text-gray-500 dark:hover:text-gray-300
              focus:outline-none transition-colors
            `}
          aria-label="Borrar texto"
        >
          <div className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <XIcon className={icon} />
          </div>
        </button>
      )}
    </div>
  );
});

Search.displayName = "Search";

export default Search;
//example
//
/*
  const [query, setQuery] = useState('');

    <BuscarInput
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onSearch={(val) => console.log('Buscando:', val)}
      onClear={() => console.log('Limpiado')}
      placeholder="Buscar productos..."
      size="lg"
    />
*/
