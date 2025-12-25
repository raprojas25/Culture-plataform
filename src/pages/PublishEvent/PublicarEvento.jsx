import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { eventService } from '../services/api';
import { uploadImage } from '../services/uploadService';

// Esquema de validación con Zod
const eventSchema = z.object({
  title: z.string()
    .min(5, { message: 'El título debe tener al menos 5 caracteres' })
    .max(200, { message: 'El título no puede exceder 200 caracteres' }),
  
  description: z.string()
    .min(50, { message: 'La descripción debe tener al menos 50 caracteres' })
    .max(5000, { message: 'La descripción no puede exceder 5000 caracteres' }),
  
  category_id: z.number()
    .int()
    .positive({ message: 'Selecciona una categoría válida' }),
  
  start_datetime: z.string()
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, { 
      message: 'Formato de fecha inválido. Use YYYY-MM-DD HH:mm:ss' 
    }),
  
  end_datetime: z.string()
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
  
  district_id: z.number()
    .int()
    .positive({ message: 'Selecciona un distrito válido' }),
  
  address: z.string()
    .min(10, { message: 'La dirección debe tener al menos 10 caracteres' })
    .max(500, { message: 'La dirección no puede exceder 500 caracteres' }),
  
  latitude: z.number()
    .min(-90, { message: 'Latitud inválida' })
    .max(90, { message: 'Latitud inválida' })
    .optional()
    .or(z.literal('')),
  
  longitude: z.number()
    .min(-180, { message: 'Longitud inválida' })
    .max(180, { message: 'Longitud inválida' })
    .optional()
    .or(z.literal('')),
  
  price_type: z.enum(['free', 'paid', 'donation'], {
    errorMap: () => ({ message: 'Selecciona un tipo de precio válido' })
  }),
  
  price: z.number()
    .min(0, { message: 'El precio no puede ser negativo' })
    .optional()
    .default(0),
  
  featured_level: z.number()
    .int()
    .min(0, { message: 'Nivel destacado inválido' })
    .max(3, { message: 'El nivel destacado máximo es 3' })
    .default(0),
  
  main_image: z.string()
    .url({ message: 'URL de imagen principal inválida' })
    .optional(),
  
  // Array de detalles del evento
  details: z.array(
    z.object({
      section: z.enum(['schedule', 'recommendations', 'important_info', 'activities']),
      title: z.string().max(100, { message: 'Título demasiado largo' }).optional(),
      content: z.string().min(5, { message: 'El contenido debe tener al menos 5 caracteres' }),
      order: z.number().int().min(0).default(0)
    })
  ).max(20, { message: 'Máximo 20 detalles permitidos' }),
  
  // Array de imágenes adicionales
  images: z.array(
    z.object({
      url: z.string().url({ message: 'URL de imagen inválida' }),
      is_main: z.boolean().default(false)
    })
  ).max(10, { message: 'Máximo 10 imágenes adicionales' }),
  
  // Información de contacto
  contact: z.object({
    name: z.string()
      .min(3, { message: 'El nombre de contacto debe tener al menos 3 caracteres' })
      .max(100, { message: 'Nombre de contacto demasiado largo' }),
    
    phone: z.string()
      .regex(/^[\+]?[1-9][\d]{0,15}$/, { 
        message: 'Número de teléfono inválido' 
      })
      .optional(),
    
    email: z.string()
      .email({ message: 'Email de contacto inválido' })
      .optional()
  })
});

// Datos de ejemplo para selects
const CATEGORIES = [
  { id: 1, name: 'Fiesta Patronal' },
  { id: 2, name: 'Festival Gastronómico' },
  { id: 3, name: 'Concierto' },
  { id: 4, name: 'Exposición de Arte' },
  { id: 5, name: 'Evento Deportivo' },
  { id: 6, name: 'Feria Artesanal' }
];

const DISTRICTS = [
  { id: 1, name: 'Cayma', province: 'Arequipa' },
  { id: 2, name: 'Yanahuara', province: 'Arequipa' },
  { id: 3, name: 'Yanque', province: 'Caylloma' },
  { id: 4, name: 'Chivay', province: 'Caylloma' },
  { id: 5, name: 'Miraflores', province: 'Arequipa' }
];

const EventForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showMapPicker, setShowMapPicker] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(eventSchema),
    mode: 'onChange',
    defaultValues: {
      price_type: 'free',
      featured_level: 0,
      details: [
        { section: 'schedule', title: '', content: '', order: 0 }
      ],
      images: [],
      contact: {
        name: '',
        phone: '',
        email: ''
      }
    }
  });

  // Observar price_type para mostrar/ocultar campo de precio
  const priceType = watch('price_type');
  
  // Arrays de campos dinámicos
  const {
    fields: detailFields,
    append: appendDetail,
    remove: removeDetail
  } = useFieldArray({
    control,
    name: 'details'
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage
  } = useFieldArray({
    control,
    name: 'images'
  });

  // Manejar selección de ubicación en mapa
  const handleMapClick = (lat, lng) => {
    setValue('latitude', lat, { shouldValidate: true });
    setValue('longitude', lng, { shouldValidate: true });
    setShowMapPicker(false);
  };

  // Manejar subida de imágenes
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsSubmitting(true);
      const imageUrl = await uploadImage(file);
      appendImage({ url: imageUrl, is_main: false });
    } catch (error) {
      setSubmitError('Error subiendo imagen: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enviar formulario
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Filtrar detalles vacíos
      const filteredDetails = data.details.filter(
        detail => detail.content.trim() !== ''
      );

      // Preparar datos para enviar
      const eventData = {
        ...data,
        details: filteredDetails,
        // Asegurar formato correcto de fechas
        start_datetime: formatDateTime(data.start_datetime),
        end_datetime: formatDateTime(data.end_datetime),
        // Si es gratis, establecer precio como 0
        price: data.price_type === 'free' ? 0 : data.price
      };

      // Enviar al backend
      const response = await eventService.createEvent(eventData);
      
      setSubmitSuccess(true);
      reset();
      
      // Mostrar mensaje de éxito por 5 segundos
      setTimeout(() => setSubmitSuccess(false), 5000);
      
      // Redirigir o mostrar confirmación
      console.log('Evento creado:', response);
      
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Error al crear el evento');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Formatear fecha para el backend
  const formatDateTime = (dateValue) => {
    if (dateValue instanceof Date) {
      return dateValue.toISOString().slice(0, 19).replace('T', ' ');
    }
    return dateValue;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Registrar Nuevo Evento Cultural
          </h1>
          <p className="text-gray-600">
            Completa todos los campos para publicar tu evento en la plataforma
          </p>
        </div>

        {/* Mensajes de estado */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-green-800 font-medium">
                ¡Evento registrado exitosamente!
              </span>
            </div>
          </div>
        )}

        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800 font-medium">{submitError}</span>
            </div>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Sección 1: Información Básica */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
              1. Información Básica del Evento
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Título */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Título del Evento *
                </label>
                <input
                  type="text"
                  {...register('title')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Ej: Fiesta Patronal de San Juan Bautista"
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Categoría */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Categoría *
                </label>
                <select
                  {...register('category_id', { valueAsNumber: true })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.category_id ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="">Selecciona una categoría</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className="text-red-600 text-sm mt-1">{errors.category_id.message}</p>
                )}
              </div>

              {/* Descripción */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Descripción Detallada *
                </label>
                <textarea
                  {...register('description')}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Describe el evento en detalle..."
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Mínimo 50 caracteres</span>
                  <span>Máximo 5000 caracteres</span>
                </div>
                {errors.description && (
                  <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sección 2: Fecha y Hora */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
              2. Fecha y Duración
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fecha de inicio */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Fecha y Hora de Inicio *
                </label>
                <Controller
                  name="start_datetime"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="yyyy-MM-dd HH:mm:ss"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.start_datetime ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholderText="Selecciona fecha y hora"
                    />
                  )}
                />
                {errors.start_datetime && (
                  <p className="text-red-600 text-sm mt-1">{errors.start_datetime.message}</p>
                )}
              </div>

              {/* Fecha de fin */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Fecha y Hora de Finalización *
                </label>
                <Controller
                  name="end_datetime"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="yyyy-MM-dd HH:mm:ss"
                      minDate={watch('start_datetime')}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.end_datetime ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholderText="Selecciona fecha y hora"
                    />
                  )}
                />
                {errors.end_datetime && (
                  <p className="text-red-600 text-sm mt-1">{errors.end_datetime.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sección 3: Ubicación */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
              3. Ubicación del Evento
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Distrito */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Distrito *
                </label>
                <select
                  {...register('district_id', { valueAsNumber: true })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.district_id ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="">Selecciona un distrito</option>
                  {DISTRICTS.map(dist => (
                    <option key={dist.id} value={dist.id}>
                      {dist.name} - {dist.province}
                    </option>
                  ))}
                </select>
                {errors.district_id && (
                  <p className="text-red-600 text-sm mt-1">{errors.district_id.message}</p>
                )}
              </div>

              {/* Dirección */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Dirección Completa *
                </label>
                <input
                  type="text"
                  {...register('address')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Ej: Plaza principal de Yanque, Calle Los Incas 123"
                />
                {errors.address && (
                  <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>

              {/* Coordenadas */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Coordenadas Geográficas (Opcional)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowMapPicker(!showMapPicker)}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {showMapPicker ? 'Ocultar mapa' : 'Seleccionar en mapa'}
                  </button>
                </div>

                {showMapPicker && (
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <div className="h-64 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
                      {/* Aquí iría un componente de mapa (Leaflet, Google Maps) */}
                      <p className="text-gray-600">Mapa interactivo para seleccionar ubicación</p>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <button
                        type="button"
                        onClick={() => handleMapClick(-15.6394, -71.6392)}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                      >
                        Ubicación de Ejemplo
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">Latitud</label>
                    <input
                      type="number"
                      step="any"
                      {...register('latitude', { valueAsNumber: true })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.latitude ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ej: -15.6394"
                    />
                    {errors.latitude && (
                      <p className="text-red-600 text-sm mt-1">{errors.latitude.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">Longitud</label>
                    <input
                      type="number"
                      step="any"
                      {...register('longitude', { valueAsNumber: true })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.longitude ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ej: -71.6392"
                    />
                    {errors.longitude && (
                      <p className="text-red-600 text-sm mt-1">{errors.longitude.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección 4: Precio y Destacado */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
              4. Precio y Visibilidad
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tipo de Precio */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de Precio *
                </label>
                <select
                  {...register('price_type')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.price_type ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="free">Gratuito</option>
                  <option value="paid">Pago</option>
                  <option value="donation">Donación Voluntaria</option>
                </select>
                {errors.price_type && (
                  <p className="text-red-600 text-sm mt-1">{errors.price_type.message}</p>
                )}
              </div>

              {/* Precio (solo si es pago) */}
              {priceType === 'paid' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Precio (S/) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">S/</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      {...register('price', { valueAsNumber: true })}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        errors.price ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
                  )}
                </div>
              )}

              {/* Nivel Destacado */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Nivel Destacado
                </label>
                <select
                  {...register('featured_level', { valueAsNumber: true })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.featured_level ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="0">Normal</option>
                  <option value="1">Destacado</option>
                  <option value="2">Muy Destacado</option>
                  <option value="3">Prioritario</option>
                </select>
                <p className="text-sm text-gray-500">
                  Los eventos destacados aparecen en posiciones preferenciales
                </p>
              </div>
            </div>
          </div>

          {/* Sección 5: Detalles del Evento (Dinámico) */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                5. Detalles Adicionales
              </h2>
              <button
                type="button"
                onClick={() => appendDetail({ section: 'schedule', title: '', content: '', order: detailFields.length })}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Añadir Detalle
              </button>
            </div>

            {detailFields.map((field, index) => (
              <div key={field.id} className="mb-4 p-4 bg-white rounded-lg border">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-700">Detalle #{index + 1}</h3>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeDetail(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">Sección</label>
                    <select
                      {...register(`details.${index}.section`)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300"
                    >
                      <option value="schedule">Programación</option>
                      <option value="recommendations">Recomendaciones</option>
                      <option value="important_info">Información Importante</option>
                      <option value="activities">Actividades</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">Título (opcional)</label>
                    <input
                      type="text"
                      {...register(`details.${index}.title`)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300"
                      placeholder="Ej: 09:00 AM - Misa de fiesta"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm text-gray-600">Contenido *</label>
                    <textarea
                      {...register(`details.${index}.content`)}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300"
                      placeholder="Describe el detalle..."
                    />
                    {errors.details?.[index]?.content && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.details[index].content.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sección 6: Imágenes */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                6. Imágenes del Evento
              </h2>
              <label className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 cursor-pointer flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Subir Imagen
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* URL de imagen principal */}
            <div className="mb-6 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                URL de Imagen Principal
              </label>
              <input
                type="url"
                {...register('main_image')}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.main_image ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="https://ejemplo.com/imagen-principal.jpg"
              />
              <p className="text-sm text-gray-500">
                Si no subes imágenes, puedes proporcionar una URL directa
              </p>
            </div>

            {/* Galería de imágenes subidas */}
            {imageFields.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Imágenes Subidas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imageFields.map((field, index) => (
                    <div key={field.id} className="relative group">
                      <div className="h-40 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={field.url}
                          alt={`Imagen ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-2 flex items-center">
                        <input
                          type="checkbox"
                          {...register(`images.${index}.is_main`)}
                          id={`main-${index}`}
                          className="mr-2"
                        />
                        <label htmlFor={`main-${index}`} className="text-sm text-gray-600">
                          Usar como principal
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sección 7: Contacto */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
              7. Información de Contacto
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Nombre de Contacto *
                </label>
                <input
                  type="text"
                  {...register('contact.name')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.contact?.name ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Ej: Comité de Fiestas"
                />
                {errors.contact?.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.contact.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="tel"
                  {...register('contact.phone')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.contact?.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="+51 987 654 321"
                />
                {errors.contact?.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.contact.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register('contact.email')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.contact?.email ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="info@fiesta.com"
                />
                {errors.contact?.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.contact.email.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-between pt-6 border-t">
            <button
              type="button"
              onClick={() => reset()}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Limpiar Formulario
            </button>
            
            <div className="space-x-4">
              <button
                type="button"
                className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
              >
                Guardar Borrador
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={`px-8 py-3 rounded-lg ${
                  isSubmitting || !isValid
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-medium`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  'Publicar Evento'
                )}
              </button>
            </div>
          </div>

          {/* Contador de campos */}
          <div className="mt-4 text-sm text-gray-500 text-center">
            {Object.keys(errors).length > 0 && (
              <p className="text-red-600 mb-2">
                Por favor, corrige los {Object.keys(errors).length} errores en el formulario
              </p>
            )}
            <p>Formulario {isValid ? '✅ válido y listo para enviar' : '❌ requiere correcciones'}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
