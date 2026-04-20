import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, MapPin, Save, Upload } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';

import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import Tabs from '@/shared/components/ui/Tabs';
import { FormField } from '@/shared/components/forms/FormField';
const eventSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
  category_id: z.number().min(1, 'Selecciona una categoría'),
  start_datetime: z.string().min(1, 'Fecha de inicio requerida'),
  end_datetime: z.string().min(1, 'Fecha de fin requerida'),
  district_id: z.number().optional(),
  address: z.string().optional(),
  price_type: z.enum(['free', 'paid', 'donation']),
  price_amount: z.number().optional(),
  featured_level: z.number().min(0).max(3).default(0),
  status: z.enum(['draft', 'published']).default('draft'),
  main_image: z.string().url('URL de imagen inválida').optional(),
});

export const CreateEvent = () => {
  const navigate = useNavigate();
  const { createNewEvent, isLoading } = useEvents();
  const [activeTab, setActiveTab] = useState('basic');

  const methods = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      price_type: 'free',
      featured_level: 0,
      status: 'draft',
    },
  });

  const onSubmit = async (data) => {
    try {
      await createNewEvent(data);
      navigate('/dashboard/events');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Información Básica' },
    { id: 'location', label: 'Ubicación' },
    { id: 'media', label: 'Multimedia' },
    { id: 'settings', label: 'Configuración' },
  ];

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center flex-wrap justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Crear Nuevo Evento
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Completa todos los campos para crear un nuevo evento
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="secondary"
            onClick={() => methods.setValue('status', 'draft')}
            disabled={isLoading}
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar Borrador
          </Button>
          <Button
            variant="primary"
            onClick={() => methods.setValue('status', 'published')}
            isLoading={isLoading}
          >
            Publicar Evento
          </Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          {activeTab === 'basic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
            <FormField
  label="Titulo del Evento *"
  name="titulo"
  variant="primary"
  size="md"
  type="text"
                  placeholder="Ej: Concierto de Rock Nacional"
  error={methods.formState.errors.title}
  isLoading={isLoading}
                  {...methods.register('title')}

/>
                <Input
                  label="Título del Evento"
                  {...methods.register('title')}
                  error={methods.formState.errors.title?.message}
                  placeholder="Ej: Concierto de Rock Nacional"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Descripción
                </label>
                <textarea
                  {...methods.register('description')}
                  rows={6}
                  className="input resize-none"
                  placeholder="Describe tu evento en detalle..."
                />
                {methods.formState.errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {methods.formState.errors.description.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoría
                </label>
                <select
                  {...methods.register('category_id', { valueAsNumber: true })}
                  className="input"
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="1">Conciertos</option>
                  <option value="2">Teatro</option>
                  <option value="3">Deportes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Precio
                </label>
                <select {...methods.register('price_type')} className="input">
                  <option value="free">Gratis</option>
                  <option value="paid">Pago</option>
                  <option value="donation">Donación</option>
                </select>
              </div>
              {methods.watch('price_type') === 'paid' && (
                <div>
                  <Input
                    label="Precio (S/)"
                    type="number"
                    step="0.01"
                    {...methods.register('price_amount', { valueAsNumber: true })}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === 'location' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Distrito
                </label>
                <select
                  {...methods.register('district_id', { valueAsNumber: true })}
                  className="input"
                >
                  <option value="">Selecciona un distrito</option>
                  <option value="1">Miraflores</option>
                  <option value="2">Barranco</option>
                  <option value="3">San Isidro</option>
                </select>
              </div>
              <div>
                <Input
                  label="Dirección"
                  {...methods.register('address')}
                  placeholder="Av. Principal 123"
                />
              </div>
              <div>
                <Input
                  label="Latitud"
                  type="number"
                  step="any"
                  {...methods.register('latitude', { valueAsNumber: true })}
                />
              </div>
              <div>
                <Input
                  label="Longitud"
                  type="number"
                  step="any"
                  {...methods.register('longitude', { valueAsNumber: true })}
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
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Imagen Principal
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Arrastra una imagen o haz clic para seleccionar
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF hasta 5MB
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      // Handle file upload
                    }}
                  />
                </div>
              </div>
              <div>
                <Input
                  label="URL de la Imagen"
                  {...methods.register('main_image')}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fecha de Inicio
                </label>
                <Input
                  type="datetime-local"
                  {...methods.register('start_datetime')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fecha de Fin
                </label>
                <Input
                  type="datetime-local"
                  {...methods.register('end_datetime')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nivel de Destacado
                </label>
                <select
                  {...methods.register('featured_level', { valueAsNumber: true })}
                  className="input"
                >
                  <option value="0">Normal</option>
                  <option value="1">Destacado</option>
                  <option value="2">Muy Destacado</option>
                  <option value="3">Super Destacado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estado
                </label>
                <select {...methods.register('status')} className="input">
                  <option value="draft">Borrador</option>
                  <option value="published">Publicado</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                if (tabs.indexOf(tabs.find(t => t.id === activeTab)) > 0) {
                  setActiveTab(tabs[tabs.indexOf(tabs.find(t => t.id === activeTab)) - 1].id);
                }
              }}
              disabled={activeTab === 'basic'}
            >
              Anterior
            </Button>
            <div className="flex space-x-3">
              {activeTab !== 'settings' ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => {
                    const currentIndex = tabs.findIndex(t => t.id === activeTab);
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1].id);
                    }
                  }}
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

