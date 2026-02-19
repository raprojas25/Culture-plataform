import { userSchema, loginSchema, roleSchema, updateUserSchema } from '../utils/validators.js';
import { 
  eventSchema, 
  categorySchema, 
  districtSchema, 
  eventImageSchema,
  eventFiltersSchema,
  districtFiltersSchema 
} from '../utils/validators.js';

export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateRole = (req, res, next) => {
  const { error } = roleSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateUpdateUser = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

//

export const validateEvent = (req, res, next) => {
  const { error } = eventSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateCategory = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// export const validateDistrict = (req, res, next) => {
//   const { error } = districtSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }
//   next();
// };

export const validateEventImage = (req, res, next) => {
  const { error } = eventImageSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateEventFilters = (req, res, next) => {
  const { error } = eventFiltersSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
//nuevas validaciones de District
// import { 
//   districtSchema, 
//   districtFiltersSchema 
// } from '../utils/validators.js';

export const validateDistrict = (req, res, next) => {
  const { error } = districtSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// export const validateRole = (req, res, next) => {
//   const { error } = roleSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }
//   next();
// };

export const validateDistrictFilters = (req, res, next) => {
  const { error } = districtFiltersSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

