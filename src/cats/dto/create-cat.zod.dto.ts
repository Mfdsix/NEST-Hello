import { z } from 'zod';

export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number().min(1).max(100),
    breed: z.string(),
  })
  .required()

export type CreateCatDto = z.infer<typeof createCatSchema>;