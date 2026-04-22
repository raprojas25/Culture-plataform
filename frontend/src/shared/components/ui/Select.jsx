import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const Select = ({
  options = [],
  value = null,
  onChange,
  placeholder = "Selecciona...",
  id,
  name,
  disabled = false,
  searchable = false,
  searchPlaceholder = "Buscar...",
  // nuevas props
  getOptionLabel = (opt) => opt.label,
  getOptionValue = (opt) => opt.value,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  // Normalizar opciones a objetos { label, value }
  const normalizedOptions = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt,
  );

  // Estado interno si no se usa controlado (pero respetamos value prop)
  const [internalSelected, setInternalSelected] = useState(null);
  const selectedOption =
    value !== undefined
      ? normalizedOptions.find((opt) => opt.value === value) || null
      : internalSelected;

  // Refs para detección de clic fuera y para enfocar el input
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  // Filtrar opciones según búsqueda (case insensitive)
  const filteredOptions = normalizedOptions.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Manejar selección de una opción
  const handleSelect = (option) => {
    if (value === undefined) {
      setInternalSelected(option);
    }
    onChange?.(option.value);
    setIsOpen(false);
    setSearchTerm("");
    buttonRef.current?.focus();
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enfocar el input de búsqueda cuando se abre el dropdown
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Manejar teclas en el input de búsqueda
  const handleSearchKeyDown = (e) => {
    if (disabled) return;

    switch (e.key) {
      case "Escape":
        if (searchTerm) {
          setSearchTerm("");
        } else {
          setIsOpen(false);
          buttonRef.current?.focus();
        }
        e.preventDefault();
        break;

      case "Enter":
        e.preventDefault();
        if (filteredOptions.length > 0 && highlightedIndex >= 0) {
          onChange(filteredOptions[highlightedIndex].value);
          setIsOpen(false);
          buttonRef.current?.focus();
        }
        break;

      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;

      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  // Determinar el texto a mostrar en el control
  // const displayText = selectedOption ? selectedOption.label : placeholder;
  const displayText = selectedOption
    ? getOptionLabel(selectedOption)
    : placeholder;

  // Manejar teclas en el botón principal
  const handleButtonKeyDown = (e) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        setIsOpen(true);
        break;
      case "ArrowDown":
      case "ArrowUp":
        e.preventDefault();
        setIsOpen(true);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative min-w-44 font-sans">
      {/* Control visible */}
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="select-label"
        disabled={disabled}
        className={`
          w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-left shadow-sm
          focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
          dark:border-gray-600 dark:bg-gray-800 text-gray-600 dark:text-gray-300 dark:focus:border-primary-400 dark:focus:ring-primary-400
          ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
          flex items-center justify-between
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleButtonKeyDown}
      >
        <span
          // style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}
          className="flex-1 overflow-hidden overflow-ellipsis"
        >
          {displayText}
        </span>
        <ChevronDown
          size={20}
          className={`text-gray-600 dark:text-gray-300 transform transition-all duration-200 ${isOpen ? "rotate-180" : ""} `}
        />
        {/* <span style={arrowStyle} className=''/> */}
      </button>

      {/* Dropdown con búsqueda y opciones */}
      {isOpen && !disabled && (
        <div
          role="listbox"
          className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800"
        >
          {searchable && (
            <input
              ref={searchInputRef}
              type="text"
              className="
                  w-full rounded-t-md  border-gray-300 bg-white px-3 py-2 text-sm
                  focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-400
                "
              placeholder={searchPlaceholder}
              value={searchTerm}
              // onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}

          <ul
            ref={listRef}
            role="listbox"
            className="max-h-60 overflow-auto py-1 text-base sm:text-sm"
          >
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-2 text-gray-500 dark:text-gray-400">
                No hay resultados
              </li>
            ) : (
              filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  className={`
                    cursor-pointer select-none py-2 px-3 text-sm md:text-base hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex justify-between items-center ${
                      selectedOption?.value === option.value
                        ? "bg-primary-200 text-primary-700 dark:bg-primary-600 dark:text-primary-300"
                        : ""
                    }
                  `}
                  onClick={() => handleSelect(option)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                  role="option"
                  aria-selected={selectedOption?.value === option.value}
                >
                  <span className="truncate">{getOptionLabel(option)}</span>
                  {selectedOption?.value === option.value && (
                    <Check
                      size={18}
                      className="
                        text-primary-600 dark:text-primary-200
                      "
                    />
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* Input oculto para compatibilidad con formularios nativos */}
      {name && (
        <input
          type="hidden"
          id={id}
          name={name}
          value={selectedOption?.value ?? ""}
        />
      )}
    </div>
  );
};

export default Select;
