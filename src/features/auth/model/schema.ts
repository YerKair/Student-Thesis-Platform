import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен содержать не менее 6 символов" }),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "ФИО должно содержать не менее 2 символов" }),
    email: z.string().email({ message: "Введите корректный email" }),
    password: z
      .string()
      .min(6, { message: "Пароль должен содержать не менее 6 символов" }),
    passwordConfirm: z
      .string()
      .min(6, { message: "Пароль должен содержать не менее 6 символов" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Пароли не совпадают",
    path: ["passwordConfirm"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
