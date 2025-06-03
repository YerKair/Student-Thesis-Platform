"use client";

import { RegisterForm } from "@/features/auth/ui/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-4"
      data-auth="true"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">ДП</span>
            </div>
            <span className="ml-2 text-3xl font-bold text-white">
              DiploMate
            </span>
          </Link>
          <p className="mt-2 text-blue-200">
            Цифровое сопровождение дипломных работ
          </p>
        </div>

        <div className="backdrop-blur-md bg-black/30 border border-gray-700 rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Регистрация</h1>
            <p className="text-gray-300 text-sm mt-1">
              Создайте аккаунт для работы в системе
            </p>
          </div>

          <RegisterForm />

          <div className="mt-6 text-center text-sm text-gray-300">
            Уже есть аккаунт?{" "}
            <Link
              href="/auth/login"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Войти
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          © 2025 DiploMate · Все права защищены
        </div>
      </div>
    </div>
  );
}
