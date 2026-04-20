import { Edit2, Eye, EyeOff, MoreVertical, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

/**
 * @typedef {Object} MoreDropdownProps
 * @property {boolean} is_active - Estado actual del usuario
 * @property {() => void} [onEdit] - Callback al hacer clic en editar
 * @property {() => void} [onDelete] - Callback al hacer clic en eliminar
 * @property {() => void} [onToggleStatus] - Callback al hacer clic en activar/desactivar
 */

/**
 * Dropdown de acciones para cada fila de la tabla de usuarios
 *
 * @param {MoreDropdownProps} props
 * @returns {JSX.Element}
 */
export const MoreDropdown = ({
  is_active,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Maneja la acción de editar y cierra el dropdown
   */
  const handleEdit = () => {
    setIsMenuOpen(false);
    onEdit?.();
  };

  /**
   * Maneja la acción de cambiar estado y cierra el dropdown
   */
  const handleToggleStatus = () => {
    setIsMenuOpen(false);
    onToggleStatus?.();
  };

  /**
   * Maneja la acción de eliminar y cierra el dropdown
   */
  const handleDelete = () => {
    setIsMenuOpen(false);
    onDelete?.();
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:bg-white focus:shadow-lg dark:focus:bg-gray-800 focus:outline-none"
        aria-label="Más opciones"
        aria-expanded={isMenuOpen}
      >
        <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 mb-2 z-10 mt-2 w-44 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="py-1">
              {/* Editar */}
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                role="menuitem"
              >
                <Edit2 className="w-4 h-4" />
                <span>Editar</span>
              </button>

              {/* Activar/Desactivar */}
              <button
                onClick={handleToggleStatus}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                role="menuitem"
              >
                {is_active ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    <span>Desactivar</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>Activar</span>
                  </>
                )}
              </button>

              {/* Separador */}
              <div className="my-1 border-t border-gray-100 dark:border-gray-700" />

              {/* Eliminar */}
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                role="menuitem"
              >
                <Trash2 className="w-4 h-4" />
                <span>Eliminar</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
