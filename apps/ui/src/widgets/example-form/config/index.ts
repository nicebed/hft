import { object, string } from 'zod';

export const ExampleSchema = object({
  name: string().min(3, 'Must contain at least 3 character(s)'),
  cats: string().refine((val) => Number(val) >= 0, 'Must be a positive number'),
  date: string(),
  email: string().email(),
  password: string().min(7, 'Must contain at least 7 character(s)'),
});
