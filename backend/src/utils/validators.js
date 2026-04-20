import Joi from 'joi';

export const userSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).required(),
  role_id: Joi.number().integer().positive().required(),
  is_active: Joi.boolean().default(true)
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// export const roleSchema = Joi.object({
//   name: Joi.string().min(3).max(50).required(),
//   description: Joi.string().allow('').max(500)
// });

export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(50),
  email: Joi.string().email().max(100),
  role_id: Joi.number().integer().positive(),
  is_active: Joi.boolean()
}).min(1);

// Esquemas existentes...
export const eventSchema = Joi.object({
  title: Joi.string().min(5).max(255).required(),
  description: Joi.string().allow('').max(2000),
  category_id: Joi.number().integer().positive().required(),
  organizer_id: Joi.string().uuid(),
  start_datetime: Joi.date().iso().required(),
  end_datetime: Joi.date().iso().min(Joi.ref('start_datetime')).required(),
  district_id: Joi.number().integer().positive(),
  address: Joi.string().max(255),
  latitude: Joi.number().min(-90).max(90),
  longitude: Joi.number().min(-180).max(180),
  price_type: Joi.string().valid('free', 'paid', 'donation').default('free'),
  price_amount: Joi.number().min(0).precision(2).when('price_type', {
    is: 'paid',
    then: Joi.required(),
    otherwise: Joi.optional()
  }),
  featured_level: Joi.number().integer().min(0).max(3).default(0),
  status: Joi.string().valid('draft', 'published', 'cancelled', 'completed').default('draft'),
  main_image: Joi.string().uri()
});

export const categorySchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  icon: Joi.string().max(100),
  color: Joi.string().pattern(/^#[0-9A-F]{6}$/i),
  description: Joi.string().required(),
  is_active: Joi.boolean().default(true)
});

// export const districtSchema = Joi.object({
//   name: Joi.string().min(2).max(100).required(),
//   city: Joi.string().min(2).max(100).required(),
//   province: Joi.string().min(2).max(100),
//   country: Joi.string().max(100).default('Perú'),
//   is_active: Joi.boolean().default(true)
// });

export const eventImageSchema = Joi.object({
  event_id: Joi.number().integer().positive().required(),
  image_url: Joi.string().uri().required(),
  alt_text: Joi.string().max(255).allow(''),
  order_index: Joi.number().integer().min(0).default(0),
  is_main: Joi.boolean().default(false)
});

export const eventFiltersSchema = Joi.object({
  category_id: Joi.number().integer().positive(),
  organizer_id: Joi.string().uuid(),
  district_id: Joi.number().integer().positive(),
  status: Joi.string().valid('draft', 'published', 'cancelled', 'completed'),
  price_type: Joi.string().valid('free', 'paid', 'donation'),
  start_date: Joi.date().iso(),
  end_date: Joi.date().iso(),
  featured_level: Joi.number().integer().min(0).max(3),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10)
});

// Esquemas existentes...

export const districtSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'El nombre del distrito es requerido',
    'string.min': 'El nombre debe tener al menos 2 caracteres',
    'string.max': 'El nombre no puede exceder 100 caracteres'
  }),
  province: Joi.string().max(100).allow('', null),
  region: Joi.string().max(100).allow('', null)
});

export const roleSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'El nombre del rol es requerido',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'string.max': 'El nombre no puede exceder 50 caracteres'
  }),
  description: Joi.string().max(500).allow('', null)
});

export const districtFiltersSchema = Joi.object({
  province: Joi.string().max(100),
  region: Joi.string().max(100),
  search: Joi.string().max(100),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
});
