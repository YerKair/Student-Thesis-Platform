"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useToast } from "@/shared/ui/use-toast";
import { loginSchema, LoginFormValues } from "../model";
import { SpaceInput } from "@/shared/ui/space-input";
import { SpaceButton } from "@/shared/ui/space-button";
import { SpaceProgressLoader } from "@/shared/ui/space-progress-loader";
import { useAuthContext } from "@/app/providers/auth-provider";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export const LoginForm = () => {
  const { login } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      setError(null);

      await login(data);

      toast({
        title: "Успешно!",
        description: "Вход выполнен успешно",
      });
    } catch (err) {
      console.error("Login form error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Ошибка при входе";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Ошибка!",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <SpaceInput
          label="Email"
          placeholder="Введите email"
          {...form.register("email")}
          error={form.formState.errors.email?.message}
        />
      </div>
      <div>
        <SpaceInput
          label="Пароль"
          type="password"
          placeholder="Введите пароль"
          {...form.register("password")}
          error={form.formState.errors.password?.message}
        />
      </div>
      <SpaceButton type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            Вход...
          </>
        ) : (
          "Войти"
        )}
      </SpaceButton>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </form>
  );
};
