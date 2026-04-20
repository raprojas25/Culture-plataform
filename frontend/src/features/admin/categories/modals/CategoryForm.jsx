import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, Image, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useFormValidation } from '@/shared/hooks/useFormValidation';
import { categorySchema } from '@/shared/utils/validators';
import { CATEGORY_ICONS, CATEGORY_COLORS } from "@/features/categories/constants/categoryConstants";

const CategoryForm = ({ onSubmit, loading, onCancel }) => {
  const [selectedIcon, setSelectedIcon] = useState('🎉');
  const [selectedColor, setSelectedColor] = useState('#ef4444');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const { 
    values, 
    errors, 
    handleChange, 
    handleSubmit, 
    setFieldValue,
    isValid 
  } = useFormValidation(
    {
      name: '',
      description: '',
      icon: '🎉',
      color: '#ef4444',
    },
    categorySchema,
    async (formData) => {
      const finalData = {
        ...formData,
        icon: selectedIcon,
        color: selectedColor
      };
      onSubmit(finalData);
    }
  );

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setFieldValue('color', color);
    setShowColorPicker(false);
  };

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    setFieldValue('icon', icon);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <div className="flex items-center">
            <Type size={16} className="mr-2" />
            Nombre de la categoría: *
          </div>
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Ej: Deportes, Conciertos, Gastronomía"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent focus:outline-none ${
            errors.name 
              ? 'border-red-500 dark:border-red-500' 
              : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          disabled={loading}
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Descripción:
        </label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          rows={3}
          placeholder="Describe brevemente esta categoría de eventos"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:outline-none"
          disabled={loading}
        />
      </div>

      {/* Selector de ícono */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <div className="flex items-center">
            <Image size={16} className="mr-2" />
            Ícono representativo
          </div>
        </label>
        <div className="grid grid-cols-6 gap-2">
          {CATEGORY_ICONS.map((icon, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleIconSelect(icon)}
              className={`p-2 rounded-lg text-2xl hover:scale-110 transition-transform ${
                selectedIcon === icon
                  ? 'bg-red-100 dark:bg-red-900/30 ring-2 ring-red-500'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              disabled={loading}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Selector de color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <div className="flex items-center">
            <Palette size={16} className="mr-2" />
            Color de la categoría
          </div>
        </label>
        
        <div className="relative">
          <div className="flex items-center space-x-4">
            {/* Color actual */}
            <div className="flex items-center space-x-3">
              <div 
                className="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: selectedColor }}
              />
              <div>
                <div className="font-mono text-sm text-gray-700 dark:text-gray-300">
                  {selectedColor}
                </div>
                <div className="text-xs text-gray-500">
                  Color seleccionado
                </div>
              </div>
            </div>

            {/* Botón para abrir selector */}
            <button
              type="button"
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition-all duration-200"
              disabled={loading}
            >
              {
                showColorPicker
                ?
                <ChevronDown size={20}/>
                :
                <ChevronUp size={20}/>
              }
            </button>
          </div>

          {/* Selector de colores */}
          {showColorPicker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute bottom-full left-0 mb-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-10"
            >
              <div className="grid grid-cols-6 gap-2">
                {CATEGORY_COLORS.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleColorSelect(color)}
                    className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  >
                    {selectedColor === color && (
                      <Check size={16} className="text-white mx-auto" />
                    )}
                  </button>
                ))}
              </div>
              
              {/* Input personalizado */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color personalizado
                </label>
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => handleColorSelect(e.target.value)}
                  className="w-full h-10 cursor-pointer focus:outline-none"
                />
                <input
                  type="text"
                  value={selectedColor}
                  onChange={(e) => handleColorSelect(e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm"
                  placeholder="#RRGGBB"
                  pattern="^#[0-9A-Fa-f]{6}$"
                  disabled
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Botones */}
      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!isValid || loading}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
            !isValid || loading
              ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Creando...
            </div>
          ) : (
            'Crear Categoría'
          )}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
