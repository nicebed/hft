import { z } from 'zod';

const envVariables = z.object({
  VITE_API_URL: z.string().url(),
});

envVariables.parse(import.meta.env);

export const config = {
  API_URL: import.meta.env.VITE_API_URL,
} as const;
