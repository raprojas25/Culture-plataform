import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['user', 'admin', 'super_admin']),
});

export const updateUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  role: z.enum(['user', 'admin', 'super_admin']),
});
