"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { useToast } from "@/shared/ui/use-toast";
import { loginSchema, LoginFormValues } from "../model";
import { useAuthContext } from "@/app/providers/auth-provider";
import { SpaceInput } from "@/shared/ui/space-input";
import { SpaceButton } from "@/shared/ui/space-button";
import { SpaceProgressLoader } from "@/shared/ui/space-progress-loader";
import { FlashTransition } from "@/shared/ui/flash-transition";

// Проверка импорта компонента
console.log("FlashTransition component imported:", typeof FlashTransition);

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { login, isLoading } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authProgress, setAuthProgress] = useState(0);
  const [showPortal, setShowPortal] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Отладочное сообщение при изменении showPortal
  useEffect(() => {
    console.log("showPortal state changed:", showPortal);
  }, [showPortal]);

  // Эффект для перенаправления после успешного входа
  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => {
        console.log("Login successful, redirecting to dashboard");
        router.push("/dashboard");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loginSuccess, router]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setServerError(null);
    setIsSubmitting(true);
    setAuthProgress(0);
    // Показываем вспышку сразу при нажатии на кнопку
    setShowPortal(true);
    console.log("Button clicked, showing flash immediately");

    try {
      // Имитация процесса аутентификации с несколькими этапами
      // Этап 1: Проверка учетных данных
      await simulateProgress(0, 30);

      // Этап 2: Получение токена
      await simulateProgress(30, 60);

      // Этап 3: Загрузка профиля пользователя
      await simulateProgress(60, 85);

      // Этап 4: Подготовка интерфейса
      console.log("Calling login API");
      const result = await login(data);
      console.log("Login API returned:", result);

      if (result.user) {
        // Завершение загрузки
        await simulateProgress(85, 100);

        toast({
          title: "Вход выполнен успешно",
          description: "Подготовка к квантовому переходу...",
          duration: 2000,
        });

        // Закрываем лоадер и отмечаем успешный вход
        setIsSubmitting(false);
        setLoginSuccess(true);
        console.log("Login successful, flash transition should complete soon");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Произошла ошибка при входе";

      setServerError(errorMessage);
      toast({
        variant: "destructive",
        title: "Ошибка входа",
        description: errorMessage,
      });
      setIsSubmitting(false);
      // Скрываем вспышку при ошибке
      setShowPortal(false);
    }
  }

  // Вспомогательная функция для имитации прогресса
  const simulateProgress = async (start: number, end: number) => {
    const duration = 800; // Ускоряем процесс до 0.8 секунды на этап
    const steps = 10;
    const increment = (end - start) / steps;

    for (let i = 0; i <= steps; i++) {
      setAuthProgress(start + increment * i);
      await new Promise((resolve) => setTimeout(resolve, duration / steps));
    }
  };

  const handlePortalComplete = () => {
    console.log("Portal animation complete, setting loginSuccess to true");
    setLoginSuccess(true);
  };

  // Анимация для формы
  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <SpaceProgressLoader isLoading={isSubmitting} progress={authProgress} />

      <FlashTransition
        isActive={showPortal}
        onComplete={handlePortalComplete}
        duration={2000}
        color="#3b82f6"
        intensity="high"
      />

      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        variants={formAnimation}
        initial="hidden"
        animate="visible"
      >
        <motion.div key="email" variants={itemAnimation}>
          <SpaceInput
            label="Email"
            placeholder="email@example.com"
            type="email"
            {...form.register("email")}
            error={form.formState.errors.email?.message}
          />
        </motion.div>

        <motion.div key="password" variants={itemAnimation}>
          <SpaceInput
            label="Пароль"
            type="password"
            placeholder="••••••••"
            showPasswordToggle={true}
            {...form.register("password")}
            error={form.formState.errors.password?.message}
          />
        </motion.div>

        <motion.div
          className="flex justify-between items-center text-sm"
          variants={itemAnimation}
        >
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-blue-500"
              {...form.register("rememberMe")}
            />
            Запомнить меня
          </label>
          <Link
            href="#"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Забыли пароль?
          </Link>
        </motion.div>

        {serverError && (
          <motion.div
            className="bg-red-500/10 border border-red-500/30 rounded-md p-3 text-sm text-red-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {serverError}
          </motion.div>
        )}

        <motion.div variants={itemAnimation}>
          <SpaceButton
            type="submit"
            className="w-full"
            isLoading={isLoading || isSubmitting}
          >
            Войти в систему
          </SpaceButton>
        </motion.div>
      </motion.form>
    </>
  );
}
