import { z } from 'zod';

export const userIdSchema = z.object({
  id: z.coerce
    .number({ error: 'id must be a valid number' })
    .refine(val => !Number.isNaN(val), { message: 'id must be a valid number' })
    .int('id must be an integer')
    .positive('id must be a positive integer'),
});

export const updateUserSchema = z
  .object({
    name: z.string().min(2).max(255).trim().optional(),
    email: z.email().max(255).toLowerCase().trim().optional(),
    //password: z.string().min(8).max(128).optional(), // Optional for password update
    role: z.enum(['user', 'admin']).optional(),
  })
  .refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
    path: [],
  });
