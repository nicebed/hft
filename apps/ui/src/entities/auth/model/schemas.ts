import { z } from 'zod';

export const Nickname = z
  .string({ required_error: 'required' })
  .min(3, 'must contain at least 3 characters')
  .max(100)
  .transform((str) => str.trim());

export const Email = z
  .string({ required_error: 'required' })
  .email('invalid email')
  .transform((str) => str.toLowerCase().trim());

export const Password = z
  .string({ required_error: 'required' })
  .min(7, 'must contain at least 7 characters')
  .max(100)
  .transform((str) => str.trim());

export const SignupSchema = z
  .object({
    nickname: Nickname,
    email: Email,
    birthday: z.string({ required_error: 'required' }),
    password: Password,
    confirmPassword: Password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "don't match",
  });

export const LoginSchema = z.object({
  email: Email,
  password: Password,
});
