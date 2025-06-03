"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { useToast } from "@/shared/ui/use-toast";
import { registerSchema, RegisterFormValues } from "../model";
import { useAuthContext } from "@/app/providers/auth-provider";
import { SpaceInput } from "@/shared/ui/space-input";
import { SpaceButton } from "@/shared/ui/space-button";

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { register: registerUser, isLoading } = useAuthContext();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    if (registrationSuccess) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, router]);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);

    try {
      await registerUser(values);

      toast({
        title: "Регистрация выполнена успешно",
        description: "Перенаправление...",
        duration: 2000,
      });

      setIsSubmitting(false);
      setRegistrationSuccess(true);
    } catch (error) {
      setServerError("Что-то пошло не так. Пожалуйста, попробуйте еще раз.");
      setIsSubmitting(false);
    }
  };

  const formFields = [
    {
      name: "name" as const,
      label: "ФИО",
      placeholder: "Иванов Иван Иванович",
      type: "text",
    },
    {
      name: "email" as const,
      label: "Email",
      placeholder: "email@example.com",
      type: "email",
    },
    {
      name: "password" as const,
      label: "Пароль",
      placeholder: "••••••••",
      type: "password",
      showPasswordToggle: true,
    },
    {
      name: "passwordConfirm" as const,
      label: "Подтверждение пароля",
      placeholder: "••••••••",
      type: "password",
      showPasswordToggle: true,
    },
  ];

  return (
    <div className="relative">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {formFields.map((field) => (
          <div key={field.name}>
            <SpaceInput
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              showPasswordToggle={field.showPasswordToggle}
              {...form.register(field.name)}
              error={form.formState.errors[field.name]?.message as string}
            />
          </div>
        ))}

        <div className="flex items-center mt-4">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
            Я согласен с{" "}
            <Link
              href="#"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              условиями использования
            </Link>{" "}
            и{" "}
            <Link
              href="#"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              политикой конфиденциальности
            </Link>
          </label>
        </div>

        {serverError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3 text-sm text-red-200">
            {serverError}
          </div>
        )}

        <SpaceButton
          type="submit"
          className="w-full"
          isLoading={isLoading || isSubmitting}
        >
          Зарегистрироваться
        </SpaceButton>
      </form>
    </div>
  );
}
