"use client";

import { RegisterForm } from "@/features/auth/ui/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">ДП</span>
            </div>
            <span className="ml-2 text-2xl font-bold text-gray-900">
              DiploMate
            </span>
          </Link>
          <p className="mt-2 text-gray-600">
            Цифровое сопровождение дипломных работ
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Регистрация</h1>
            <p className="text-gray-600 text-sm mt-1">
              Создайте аккаунт для работы в системе
            </p>
          </div>

          <RegisterForm />

          <div className="mt-6 text-center text-sm text-gray-600">
            Уже есть аккаунт?{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Войти
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          © 2025 DiploMate · Все права защищены
        </div>
      </div>
    </div>
  );
}
