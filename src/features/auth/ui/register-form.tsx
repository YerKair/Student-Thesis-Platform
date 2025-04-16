"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useToast } from "@/shared/ui/use-toast";
import { registerSchema, RegisterFormValues } from "../model";
import { useAuthContext } from "@/app/providers/auth-provider";

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { register, isLoading } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    const result = await register(data);

    if (result.success) {
      toast({
        title: "Регистрация выполнена успешно",
        description: "Вы перенаправлены в личный кабинет",
      });
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Ошибка регистрации",
        description: result.error || "Проверьте введенные данные",
      });
    }
  }

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
      type: showPassword ? "text" : "password",
      showPasswordToggle: true,
    },
    {
      name: "passwordConfirm" as const,
      label: "Подтверждение пароля",
      placeholder: "••••••••",
      type: showPassword ? "text" : "password",
      showPasswordToggle: true,
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {formFields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="text-gray-700">{field.label}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      {...formField}
                    />
                    {field.showPasswordToggle && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        ))}

        <div className="flex items-center mt-4">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            Я согласен с{" "}
            <Link href="#" className="text-blue-600 hover:text-blue-800">
              условиями использования
            </Link>{" "}
            и{" "}
            <Link href="#" className="text-blue-600 hover:text-blue-800">
              политикой конфиденциальности
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Регистрация...</span>
            </div>
          ) : (
            "Зарегистрироваться"
          )}
        </Button>
      </form>
    </Form>
  );
}
