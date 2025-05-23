"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { motion } from "framer-motion";

import { useToast } from "@/shared/ui/use-toast";
import { registerSchema, RegisterFormValues } from "../model";
import { useAuthContext } from "@/app/providers/auth-provider";
import { SpaceInput } from "@/shared/ui/space-input";
import { SpaceButton } from "@/shared/ui/space-button";
import { SpaceProgressLoader } from "@/shared/ui/space-progress-loader";
import { FlashTransition } from "@/shared/ui/flash-transition";

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { register: registerUser, isLoading } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regProgress, setRegProgress] = useState(0);
  const [showPortal, setShowPortal] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Отладочное сообщение при изменении showPortal
  useEffect(() => {
    console.log("showPortal state changed:", showPortal);
  }, [showPortal]);

  // Эффект для перенаправления после успешной регистрации
  useEffect(() => {
    if (registrationSuccess) {
      const timer = setTimeout(() => {
        console.log("Registration successful, redirecting to dashboard");
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
    setShowPortal(true);
    setRegProgress(0);
    console.log("Registration button clicked, showing flash immediately");

    try {
      // Симулируем многоэтапный процесс регистрации
      await simulateProgress(0, 30);

      // Проверка email
      await simulateProgress(30, 50);

      // Создание учетной записи
      await simulateProgress(50, 70);

      // Настройка профиля
      await simulateProgress(70, 100);

      // Успешная регистрация
      console.log("Registration successful");

        toast({
          title: "Регистрация выполнена успешно",
        description: "Подготовка к квантовому переходу...",
        duration: 2000,
      });

      // Закрываем лоадер
      setIsSubmitting(false);
      console.log(
        "Registration successful, flash transition should complete soon"
      );
    } catch (error) {
      setServerError("Что-то пошло не так. Пожалуйста, попробуйте еще раз.");
      setIsSubmitting(false);
      setShowPortal(false);
    }
  };

  // Вспомогательная функция для имитации прогресса
  const simulateProgress = async (start: number, end: number) => {
    const duration = 600; // Ускоряем процесс до 0.6 секунды на этап
    const steps = 8;
    const increment = (end - start) / steps;

    for (let i = 0; i <= steps; i++) {
      setRegProgress(start + increment * i);
      await new Promise((resolve) => setTimeout(resolve, duration / steps));
    }
  };

  const handlePortalComplete = () => {
    console.log(
      "Portal animation complete, setting registrationSuccess to true"
    );
    setRegistrationSuccess(true);
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
      <SpaceProgressLoader
        isLoading={isSubmitting}
        progress={regProgress}
        message="Подготовка к регистрации..."
      />

      <FlashTransition
        isActive={showPortal}
        onComplete={handlePortalComplete}
        duration={2000}
        color="#8b5cf6"
        intensity="high"
      />

      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        variants={formAnimation}
        initial="hidden"
        animate="visible"
      >
        {formFields.map((field) => (
          <motion.div key={field.name} variants={itemAnimation}>
            <SpaceInput
              label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
              showPasswordToggle={field.showPasswordToggle}
              {...form.register(field.name)}
              error={form.formState.errors[field.name]?.message as string}
            />
          </motion.div>
        ))}

        <motion.div className="flex items-center mt-4" variants={itemAnimation}>
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
            Зарегистрироваться
          </SpaceButton>
        </motion.div>
      </motion.form>
    </>
  );
}
