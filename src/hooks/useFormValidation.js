import { useState, useCallback } from 'react';
import { validateCategory } from '../utils/validators';

export const useFormValidation = (initialValues, schema, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validar formulario completo
  const validateForm = useCallback(() => {
    const validationErrors = validateCategory(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [values]);

  // Manejar cambios en los campos
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Validar campo individual cuando pierde el foco
    if (touched[name]) {
      const fieldError = validateCategory({ [name]: value })[name];
      setErrors(prev => ({
        ...prev,
        [name]: fieldError || null
      }));
    }
  }, [touched]);

  // Manejar blur (campo tocado)
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validar campo individual
    const fieldError = validateCategory({ [name]: values[name] })[name];
    setErrors(prev => ({
      ...prev,
      [name]: fieldError || null
    }));
  }, [values]);

  // Establecer valor manualmente
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      const fieldError = validateCategory({ [name]: value })[name];
      setErrors(prev => ({
        ...prev,
        [name]: fieldError || null
      }));
    }
  }, [touched]);

  // Enviar formulario
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validar formulario completo
    const isValid = validateForm();
    
    if (isValid && onSubmit) {
      await onSubmit(values);
    }
  }, [values, validateForm, onSubmit]);

  // Reiniciar formulario
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
    isValid: Object.keys(errors).length === 0
  };
};
