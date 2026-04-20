import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronDown, ChevronUp, Loader2, Check } from "lucide-react";
import {
  CATEGORY_ICONS,
  CATEGORY_COLORS,
} from "./constants/categoryConstants";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/shared/components/ui/Button.jsx";
import { Label } from "@/shared/components/ui/Label.jsx";
import { FormField } from "@/shared/components/forms/FormField";

const schema = z.object({
  name: z
    .string()
    .min(2, "Nombre debe tener al menos 2 caracteres")
    .max(50, "Nombre no puede exceder 50 caracteres"),
  description: z
    .string()
    .max(200, "Descripción no puede exceder 200 caracteres")
    .optional(),
  icon: z
    .string()
    .min(1, "Icono es requerido")
    .max(5, "Icono no puede exceder 5 caracteres"),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Color debe ser un hexadecimal válido"),
  is_active: z.boolean().default(true),
});

const CategoryForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      name: "",
      description: "",
      icon: "",
      color: "#3b82f6",
      is_active: true,
    },
  });
  const [isIconOpen, setIsIconOpen] = useState(false);
  const [showColors, setShowColors] = useState(false);
  // const [selectedIcon, setSelectedIcon] = useState('🎉');
  // const [selectedColor, setSelectedColor] = useState('#ef4444');

  const selectedColor = watch("color");
  const selectedIcon = watch("icon");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-3 md:gap-6">
        {/* Nombre */}
        <FormField
          label="Nombre *"
          name="name"
          variant="primary"
          size="md"
          type="text"
          placeholder="Ej: Deportes"
          error={errors.name}
          isLoading={isLoading}
          {...register("name", {
            required: "El nombre es requerido",
            minLength: {
              value: 4,
              message: "Mínimo 4 caracteres",
            },
          })}
        />
        {/* Descripción */}
        <FormField
          label="Descripción *"
          name="description"
          variant="primary"
          size="md"
          type="text"
          textarea={true}
          placeholder="Describe la categoría..."
          maxLength={200}
          error={errors.description}
          isLoading={isLoading}
          {...register("description", {
            required: "La Descripción es requerido",
            minLength: {
              value: 10,
              message: "Mínimo 10 caracteres",
            },
          })}
        />

        {/* Icono */}
        <div className="space-y-2">
          <Label>Icono *</Label>
          <div className="flex items-center gap-4 flex-wrap">
            <input
              {...register("icon")}
              type="text"
              maxLength={5}
              className={`
                sm:w-1/3 px-3 py-2 border rounded-lg
                dark:bg-gray-800 dark:text-gray-100
                ${
                  errors.icon
                    ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-red-500"
                }
                focus:ring-2 focus:border-transparent outline-none
              `}
              placeholder="Ej: ⚽"
            />
            <div className="text-xl p-2 bg-gray-100 dark:bg-gray-700 rounded-lg dark:text-gray-400">
              {selectedIcon || "?"}
            </div>

            {/* Botón para abrir selector */}

            <button
              type="button"
              onClick={() => setIsIconOpen(!isIconOpen)}
              className="flex justify-between items-center dark:text-gray-400 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 w-full sm:w-1/2"
            >
              Ver lista de Iconos
              {isIconOpen ? <ChevronUp size={30} /> : <ChevronDown size={30} />}
            </button>
          </div>

          {/* Presets de iconos */}
          <AnimatePresence>
            {isIconOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2"
              >
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Iconos sugeridos:
                </p>
                <div className="flex justify-center flex-wrap gap-2">
                  {CATEGORY_ICONS.map((icon, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setValue("icon", icon, { shouldValidate: true });
                        setIsIconOpen(!isIconOpen);
                      }}
                      className={`
                    text-xl p-2 rounded-lg transition-all
                    ${
                      selectedIcon === icon
                        ? "bg-blue-100 dark:bg-blue-900/50 ring-2 ring-blue-500"
                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }
                   `}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* fin de preset iconos  */}
          {errors.icon && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.icon.message}
            </p>
          )}
        </div>
      </div>

      {/* Color */}
      <div className="space-y-2">
        <Label>Color *</Label>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative">
            <input
              {...register("color")}
              type="color"
              className="w-11 h-11 rounded-lg cursor-pointer border-0"
            />
            <div
              className="absolute top-0 left-0 w-11 h-11 rounded-lg border-2 border-white dark:border-gray-800 shadow"
              style={{ backgroundColor: selectedColor }}
            />
          </div>

          <div className="flex-1">
            <input
              {...register("color")}
              type="text"
              className={`
                w-full px-3 py-2 border rounded-lg font-mono
                dark:bg-gray-800 dark:text-gray-100
                ${
                  errors.color
                    ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-red-500"
                }
                focus:ring-2 focus:border-transparent outline-none
              `}
              placeholder="#000000"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowColors(!showColors)}
            className="flex justify-between items-center dark:text-gray-400 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 w-full sm:w-1/2"
          >
            Ver paleta de colores
            {showColors ? <ChevronUp size={30} /> : <ChevronDown size={30} />}
          </button>
        </div>
        <div>
          {/* Presets de colores */}
          <AnimatePresence>
            {showColors && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2"
              >
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Colores sugeridos:
                </p>
                <div className="flex justify-center flex-wrap gap-2">
                  {CATEGORY_COLORS.map((color, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setValue("color", color, { shouldValidate: true });
                        setShowColors(!showColors);
                      }}
                      className={`
                      w-8 h-8 rounded-full transition-all
                      ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800"
                          : ""
                      }
                    `}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {errors.color && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.color.message}
          </p>
        )}
      </div>

      {/* Estado */}
      <div className="flex items-center space-x-3">
        <input
          {...register("is_active")}
          type="checkbox"
          id="is_active"
          className="w-4 h-4 text-blue-600 rounded 
            border-gray-300 focus:ring-blue-500 
            dark:border-gray-600 dark:bg-gray-700"
        />
        <Label htmlFor="is_active">Categoría activa</Label>
      </div>

      {/* Vista previa */}
      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Vista previa:
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
            style={{
              backgroundColor: `${selectedColor}20`,
              color: selectedColor,
            }}
          >
            {selectedIcon || "?"}
          </div>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {watch("name") || "Nombre de categoría"}
          </span>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="secondary"
          size="sm"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="primary" size="sm" disabled={isLoading}>
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? "Actualizar" : "Crear"} Categoría
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
