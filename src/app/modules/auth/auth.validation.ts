import { z } from 'zod';

// login valiation data
const loginValidationZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

// refresh token zod schema
const refreshTokenValidationZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

export const authValidation = {
  loginValidationZodSchema,
  refreshTokenValidationZodSchema,
};
