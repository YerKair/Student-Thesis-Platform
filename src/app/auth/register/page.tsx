"use client";

import { RegisterForm } from "@/features/auth/ui/register-form";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link href="/" className="inline-flex items-center justify-center">
            <motion.div
              className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-white font-bold text-lg">ДП</span>
            </motion.div>
            <motion.span
              className="ml-2 text-3xl font-bold text-white"
              animate={{
                textShadow: [
                  "0 0 5px rgba(79, 70, 229, 0.5)",
                  "0 0 15px rgba(79, 70, 229, 0.8)",
                  "0 0 5px rgba(79, 70, 229, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              DiploMate
            </motion.span>
          </Link>
          <motion.p
            className="mt-2 text-blue-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Цифровое сопровождение дипломных работ
          </motion.p>
        </motion.div>

        <motion.div
          className="backdrop-blur-md bg-black/30 border border-gray-700 rounded-lg shadow-lg p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.div
            className="mb-6"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-white">Регистрация</h1>
            <p className="text-gray-300 text-sm mt-1">
              Создайте аккаунт для работы в системе
            </p>
          </motion.div>

          <RegisterForm />

          <motion.div
            className="mt-6 text-center text-sm text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Уже есть аккаунт?{" "}
            <Link
              href="/auth/login"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Войти
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.7 }}
        >
          © 2025 DiploMate · Все права защищены
        </motion.div>
      </motion.div>
    </div>
  );
}
