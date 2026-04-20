import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Save, Upload, Calendar, DollarSign, Tag, FileText, Map } from 'lucide-react';
import { useEvents } from '@/shared/hooks/useEvents';
import { Button } from '@/shared/components/ui/Button';
import Tabs from '@/shared/components/ui/Tabs';
import { FormField } from '@/shared/components/forms/FormField';
import { ErrorMessage } from '@/shared/components/forms/ErrorMessage';
import Select from '@/shared/components/ui/Select';
import { Label } from '@/shared/components/ui/Label';
import { useCategories } from '@/shared/hooks/useCategories';
import { useDistricts } from '@/shared/hooks/useDistrict';
import { NewSelect } from '@/shared/components/ui/NewSelect';

const eventSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
  category_id: z.coerce.number().min(1, 'Selecciona una categoría'),
  start_datetime: z.string().min(1, 'Fecha de inicio requerida'),
  end_datetime: z.string().min(1, 'Fecha de fin requerida'),
  district_id: z.coerce.number().optional(),
  address: z.string().optional(),
  price_type: z.enum(['free', 'paid', 'donation']),
  price_amount: z.coerce.number().optional(),
  featured_level: z.number().min(0).max(3).default(0),
  status: z.enum(['draft', 'published']).default('draft'),
  main_image: z.string().url('URL de imagen inválida').optional().or(z.literal('')),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
});

const tabVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const tabTransition = {
  type: 'tween',
  duration: 0.25,
  ease: 'easeInOut',
};

export const CreateEvent = () => {
  const navigate = useNavigate();
  const {
    categories,
    loading: loadingCategories,
    fetchCategories,
  } = useCategories();

  const {
    districts,
    loading: loadingDistrict,
    fetchDistricts,
  } = useDistricts();

  const { createNewEvent, isLoading } = useEvents();
  const [activeTab, setActiveTab] = React.useState('basic');
  const [filterCategoryData, setFilterCategoryData] = useState([]);

  const methods = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      category_id: '',
      start_datetime: '',
      end_datetime: '',
      district_id: '',
      address: '',
      price_type: 'free',
      price_amount: '',
      featured_level: 0,
      status: 'draft',
      main_image: '',
      latitude: '',
      longitude: '',
    },
    mode: 'onTouched',
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;
  // Cargar categorías al montar
  useEffect(() => {
    fetchCategories();
    fetchDistricts();
  }, [fetchCategories, fetchDistricts]);

  const priceType = watch('price_type');

  const onSubmit = async (data) => {
    try {
      await createNewEvent(data);
      navigate('/dashboard/events');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleSaveDraft = () => {
    setValue('status', 'draft');
    handleSubmit(onSubmit)();
  };

  const handlePublish = () => {
    setValue('status', 'published');
    handleSubmit(onSubmit)();
  };

  const handleNext = () => {
    if (activeTab === 'basic') {
      const isValid = methods.trigger(['title', 'description', 'category_id', 'price_type']);
      isValid.then((valid) => {
        if (valid) goToTab('next');
      });
    } else if (activeTab === 'location') {
      goToTab('next');
    } else if (activeTab === 'media') {
      goToTab('next');
    }
  };

  const tabs = [
    { id: 'basic', label: 'Información Básica' },
    { id: 'location', label: 'Ubicación' },
    { id: 'media', label: 'Multimedia' },
    { id: 'settings', label: 'Configuración' },
  ];

  const tabOrder = ['basic', 'location', 'media', 'settings'];
  const currentIndex = tabOrder.indexOf(activeTab);

  const goToTab = (direction) => {
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < tabOrder.length) {
      setActiveTab(tabOrder[newIndex]);
    }
  };

  const testData = {
  "id": 4,
  "name": "Arte",
  "icon": "🎨",
  "color": "#96CEB4",
  "created_at": "2026-03-14T10:25:32.321Z",
  "description": "Exposiciones de arte y galerías",
  "is_active": true,
  "events_count": 0
}
  const categoriesFalso = [
    { label: 'Conciertos', value: '1' },
    { label: 'Teatro', value: '2' },
    { label: 'Deportes', value: '3' },
  ];
  const districtsFalso = [
    { label: 'Miraflores', value: '1' },
    { label: 'Barranco', value: '2' },
    { label: 'San Isidro', value: '3' },
  ];
  
  const priceTypeOptions = [
    { label: 'Gratis', value: 'free' },
    { label: 'Pago', value: 'paid' },
    { label: 'Donación', value: 'donation' },
  ];

  const featuredLevelOptions = [
    { label: 'Normal', value: '0' },
    { label: 'Destacado', value: '1' },
    { label: 'Muy Destacado', value: '2' },
    { label: 'Super Destacado', value: '3' },
  ];

  const statusOptions = [
    { label: 'Borrador', value: 'draft' },
    { label: 'Publicado', value: 'published' },
  ];

  return (
    <div className="p-4 space-y-6 pt-16">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap items-center space-x-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              Crear Nuevo Evento
            </motion.h1>
            <p className="text-gray-600 dark:text-gray-400">
              Completa todos los campos para crear un nuevo evento
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="secondary"
            onClick={handleSaveDraft}
            disabled={isLoading}
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar Borrador
          </Button>
          <Button
            variant="primary"
            onClick={handlePublish}
            isLoading={isLoading}
          >
            Publicar Evento
          </Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'basic' && (
              <motion.div
                key="basic"
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tabTransition}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="md:col-span-2">
                  <FormField
                    label="Título del Evento *"
                    name="title"
                    variant="primary"
                    size="md"
                    type="text"
                    placeholder="Ej: Concierto de Rock Nacional"
                    // icon={FileText}
                    error={errors.title}
                    isLoading={isLoading}
                    {...register('title')}
                  />
                </div>
                <div className="md:col-span-2">
                  <FormField
                    label="Descripción *"
                    name="description"
                    variant="primary"
                    size="md"
                    textarea
                    rows={3}
                    placeholder="Describe tu evento en detalle..."
                    error={errors.description}
                    isLoading={isLoading}
                    {...register('description')}
                  />
                </div>
                <div className='space-y-2'>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Categoría *
                  </label>
                  <Label>
                    Categoría *
                  </Label>
                  <Controller
                    name="category_id"
                    control={methods.control}
                    render={({ field }) => (
                      <NewSelect
                        options={categories}
                        value={field.value || null}
                        onChange={(val) => field.onChange(val)}
                        placeholder="Selecciona una categoría"
                        searchable
                        disabled={loadingCategories}
                        getOptionLabel={(opt) => opt.name}
                        getOptionValue={(opt) => opt.id}
                      />
                    )}
                  />
                  {errors.category_id && (
                    <ErrorMessage message={errors.category_id.message} />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tipo de Precio *
                  </label>
                  <Controller
                    name="price_type"
                    control={methods.control}
                    render={({ field }) => (
                      <Select
                        options={priceTypeOptions}
                        value={field.value || null}
                        onChange={(val) => field.onChange(val)}
                        placeholder="Selecciona un tipo"
                      />
                    )}
                  />
                  {errors.price_type && (
                    <ErrorMessage message={errors.price_type.message} />
                  )}
                </div>
                {priceType === 'paid' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={tabTransition}
                  >
                    <FormField
                      label="Precio (S/)"
                      name="price_amount"
                      variant="primary"
                      size="md"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      error={errors.price_amount}
                      isLoading={isLoading}
                      {...register('price_amount')}
                    />
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'location' && (
              <motion.div
                key="location"
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tabTransition}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Distrito
                  </label>
                  <Controller
                    name="district_id"
                    control={methods.control}
                    render={({ field }) => (
                      // <Select
                      //   options={districts}
                      //   value={field.value || null}
                      //   onChange={(val) => field.onChange(val)}
                      //   placeholder="Selecciona un distrito"
                      //   searchable
                      // />
                      <NewSelect
                        options={districts}
                        value={field.value || null}
                        onChange={(val) => field.onChange(val)}
                        placeholder="Selecciona un distrito"
                        searchable
                        getOptionLabel={(opt) => opt.name}
                        getOptionValue={(opt) => opt.id}
                        disabled={loadingDistrict}
                      />
                    )}
                  />
                  {errors.district_id && (
                    <ErrorMessage message={errors.district_id.message} />
                  )}
                </div>
                <div>
                  <FormField
                    label="Dirección"
                    name="address"
                    variant="primary"
                    size="md"
                    type="text"
                    placeholder="Av. Principal 123"
                    // icon={MapPin}
                    error={errors.address}
                    isLoading={isLoading}
                    {...register('address')}
                  />
                </div>
                <div>
                  <FormField
                    label="Latitud"
                    name="latitude"
                    variant="primary"
                    size="md"
                    type="number"
                    step="any"
                    placeholder="-12.0464"
                    error={errors.latitude}
                    isLoading={isLoading}
                    {...register('latitude')}
                  />
                </div>
                <div>
                  <FormField
                    label="Longitud"
                    name="longitude"
                    variant="primary"
                    size="md"
                    type="number"
                    step="any"
                    placeholder="-77.0428"
                    error={errors.longitude}
                    isLoading={isLoading}
                    {...register('longitude')}
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 dark:text-gray-400">
                        Mapa de ubicación
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'media' && (
              <motion.div
                key="media"
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tabTransition}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Imagen Principal
                  </label>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Arrastra una imagen o haz clic para seleccionar
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      PNG, JPG, GIF hasta 5MB
                    </p>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        // Handle file upload
                      }}
                    />
                  </motion.div>
                </div>
                <div>
                  <FormField
                    label="URL de la Imagen"
                    name="main_image"
                    variant="primary"
                    size="md"
                    type="url"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    // icon={Upload}
                    error={errors.main_image}
                    isLoading={isLoading}
                    {...register('main_image')}
                  />
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tabTransition}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div>
                  <FormField
                    label="Fecha de Inicio *"
                    name="start_datetime"
                    variant="primary"
                    size="md"
                    type="datetime-local"
                    // icon={Calendar}
                    error={errors.start_datetime}
                    isLoading={isLoading}
                    {...register('start_datetime')}
                  />
                </div>
                <div>
                  <FormField
                    label="Fecha de Fin *"
                    name="end_datetime"
                    variant="primary"
                    size="md"
                    type="datetime-local"
                    // icon={Calendar}
                    error={errors.end_datetime}
                    isLoading={isLoading}
                    {...register('end_datetime')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nivel de Destacado
                  </label>
                  <Controller
                    name="featured_level"
                    control={methods.control}
                    render={({ field }) => (
                      <Select
                        options={featuredLevelOptions}
                        value={String(field.value ?? 0)}
                        onChange={(val) => field.onChange(Number(val))}
                        placeholder="Selecciona un nivel"
                      />
                    )}
                  />
                  {errors.featured_level && (
                    <ErrorMessage message={errors.featured_level.message} />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Estado
                  </label>
                  <Controller
                    name="status"
                    control={methods.control}
                    render={({ field }) => (
                      <Select
                        options={statusOptions}
                        value={field.value || null}
                        onChange={(val) => field.onChange(val)}
                        placeholder="Selecciona un estado"
                      />
                    )}
                  />
                  {errors.status && (
                    <ErrorMessage message={errors.status.message} />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="secondary"
              onClick={() => goToTab('prev')}
              disabled={currentIndex === 0}
            >
              Anterior
            </Button>
            <div className="flex space-x-3">
              {activeTab !== 'settings' ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleNext}
                >
                  Siguiente
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                >
                  Crear Evento
                </Button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

