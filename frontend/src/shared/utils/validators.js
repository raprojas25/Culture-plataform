import * as yup from 'yup';

// Esquema de validación para categorías
export const categorySchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y espacios'),
  
  description: yup
    .string()
    .max(200, 'La descripción no puede exceder 200 caracteres')
    .optional(),
  
  icon: yup
    .string()
    .required('Selecciona un ícono')
    .test('valid-icon', 'Ícono no válido', (value) => {
      // Verificar que sea un emoji válido
      const emojiRegex = /\p{Emoji}/u;
      return emojiRegex.test(value);
    }),
  
  color: yup
    .string()
    .required('Selecciona un color')
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Formato de color inválido (ej: #FF0000)')
});

// Función de validación manual (sin yup si prefieres)
export const validateCategory = (data) => {
  const errors = {};

  if (!data.name?.trim()) {
    errors.name = 'El nombre es obligatorio';
  } else if (data.name.length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres';
  } else if (data.name.length > 50) {
    errors.name = 'El nombre no puede exceder 50 caracteres';
  }

  if (data.description && data.description.length > 200) {
    errors.description = 'La descripción no puede exceder 200 caracteres';
  }

  if (!data.icon) {
    errors.icon = 'Selecciona un ícono';
  }

  if (!data.color || !/^#[0-9A-Fa-f]{6}$/.test(data.color)) {
    errors.color = 'Formato de color inválido';
  }

  return errors;
};
