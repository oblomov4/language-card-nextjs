import { z } from 'zod';

export const passwordSchema = z
  .string({ required_error: 'Пароль обязательное поле!' })
  .min(4, { message: 'Введите корректный пароль!' });

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export const emailSchema = z.object({
  email: z
    .string({ required_error: 'Почта обязательное поле!' })
    .email({ message: 'Введите корректную почту!' }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Почта обязательное поле!' })
    .email({ message: 'Введите корректную почту!' }),
  password: passwordSchema,
});

export const registerSchema = loginSchema
  .merge(
    z.object({
      fullName: z
        .string({ required_error: 'Имя обязательное поле!' })
        .min(2, { message: 'Введите имя и фамилию!' }),
      confirmPassword: passwordSchema,
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export const cardAddSchema = z.object({
  wordOne: z.string({ required_error: 'Eng обязательное поле!' }).min(1, 'Eng обязательное поле!'),
  wordTwo: z.string({ required_error: 'Ru обязательное поле!' }).min(1, 'Ru обязательное поле!'),
});
