import * as z from 'zod';

export const registerUserSchema = z
  .object({
    username: z.string().min(3, {
      message: 'El nombre de usuario debe de tener al menos 3 caracteres',
    }),
    email: z.string().email({ message: 'Introduce un email valido' }),
    password: z
      .string()
      .min(6, {
        message: 'La contraseña tiene que tener al menos 6 caracteres',
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, {
        message:
          'La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número',
      }),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['repeatPassword'],
  });

export const loginUserSchema = z.object({
  username: z.string().min(3, {
    message: 'El nombre de usuario debe de tener al menos 3 caracteres',
  }),
  password: z
    .string()
    .min(6, {
      message: 'La contraseña tiene que tener al menos 6 caracteres',
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, {
      message:
        'La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número',
    }),
});

export type RegisterUserType = z.infer<typeof registerUserSchema>;
export type LoginUserType = z.infer<typeof loginUserSchema>;
