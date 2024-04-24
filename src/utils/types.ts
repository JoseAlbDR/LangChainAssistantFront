import * as z from 'zod';

export enum ModelEnum {
  gpt350 = 'gpt-3.5-turbo-0125',
  gpt351 = 'gpt-3.5-turbo-1106',
  gpt40 = 'gpt-4-0125-preview',
  gpt41 = 'gpt-4-1106-preview',
}

export const configSchema = z.object({
  openAIApiKey: z.string(),
  modelName: z.nativeEnum(ModelEnum),
  temperature: z.number().min(0).max(1),
  maxTokens: z.number().min(0),
});

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
export type ConfigType = z.infer<typeof configSchema>;
