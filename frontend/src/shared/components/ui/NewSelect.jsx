import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Check } from "lucide-react";

export const NewSelect = ({
  options = [],
  value = undefined,
  onChange,
  placeholder = "Selecciona...",
  id,
  name,
  disabled = false,
  searchable = false,
  searchPlaceholder = "Buscar...",
  getOptionLabel = (opt) => opt.label ?? opt,
  getOptionValue = (opt) => opt.value ?? opt,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [internalSelected, setInternalSelected] = useState(null);

  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  // Determinar opción seleccionada actual
  const selectedOption = useMemo(() => {
    if (value !== undefined) {
      return options.find((opt) => getOptionValue(opt) === value) || null;
    }
    return internalSelected;
  }, [value, options, internalSelected, getOptionValue]);

  const selectedValue = selectedOption ? getOptionValue(selectedOption) : null;

  // Sincronizar internalSelected cuando el value externo cambia (para no perder la opción)
  useEffect(() => {
    if (value !== undefined) {
      const matched = options.find((opt) => getOptionValue(opt) === value);
      setInternalSelected(matched || null);
    }
  }, [value, options, getOptionValue]);

  // Filtrar opciones según búsqueda
  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      getOptionLabel(opt).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, getOptionLabel]);

  // Resetear índice destacado cuando cambia la lista filtrada
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [filteredOptions]);

  const handleSelect = (option) => {
    if (value === undefined) {
      setInternalSelected(option);
    }
    onChange?.(getOptionValue(option), option);
    setIsOpen(false);
    setSearchTerm("");
    buttonRef.current?.focus();
  };

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enfocar input de búsqueda al abrir
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Navegación por teclado en el input de búsqueda
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
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;

      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;

      case "Tab":
        setIsOpen(false);
        break;
    }
  };

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

  const displayText = selectedOption ? getOptionLabel(selectedOption) : placeholder;

  return (
    <div ref={containerRef} className="relative min-w-44 font-sans">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
        className={`
          w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-left shadow-sm
          focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
          dark:border-gray-600 dark:bg-gray-800 text-gray-600 dark:text-gray-300
          ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
          flex items-center justify-between
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleButtonKeyDown}
      >
        <span className="flex-1 overflow-hidden overflow-ellipsis">{displayText}</span>
        <ChevronDown
          size={20}
          className={`text-gray-600 dark:text-gray-300 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
          {searchable && (
            <input
              ref={searchInputRef}
              type="text"
              className="
                w-full rounded-t-md border-gray-300 bg-white px-3 py-2 text-sm
                focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                dark:border-gray-600 dark:bg-gray-700 dark:text-white
              "
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          )}

          <ul ref={listRef} className="max-h-60 overflow-auto py-1 text-base sm:text-sm">
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-2 text-gray-500 dark:text-gray-400">No hay resultados</li>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = selectedValue === getOptionValue(option);
                return (
                  <li
                    key={getOptionValue(option)}
                    className={`
                      cursor-pointer select-none px-3 py-2 text-sm md:text-base
                      hover:bg-gray-100 dark:hover:bg-gray-700
                      text-gray-700 dark:text-gray-300 transition-colors
                      flex items-center justify-between
                      ${isSelected ? "bg-primary-200 text-primary-700 dark:bg-primary-600 dark:text-primary-300" : ""}
                      ${highlightedIndex === index ? "bg-gray-100 dark:bg-gray-700" : ""}
                    `}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="truncate">{getOptionLabel(option)}</span>
                    {isSelected && <Check size={18} className="text-primary-600 dark:text-primary-200" />}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}

      {name && (
        <input type="hidden" id={id} name={name} value={selectedValue ?? ""} />
      )}
    </div>
  );
};

