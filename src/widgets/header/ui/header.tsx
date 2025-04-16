"use client";

import Link from "next/link";
import { useAuthContext } from "@/app/providers/auth-provider";
import { LogoutButton } from "@/features/auth/ui/logout-button";
import { User, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const { user, isAuthenticated } = useAuthContext();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Закрываем меню при клике вне его
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Функция для получения стиля и текста роли
  const getRoleBadgeInfo = (role: string) => {
    switch (role) {
      case "admin":
        return {
          text: "Администратор",
          bgColor: "bg-purple-500",
        };
      case "teacher":
        return {
          text: "Преподаватель",
          bgColor: "bg-blue-500",
        };
      default:
        return {
          text: "Студент",
          bgColor: "bg-green-500",
        };
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white backdrop-blur-sm border-b border-gray-200">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          {/* Гамбургер меню, отображаемое только на мобильных */}
          {children}

          <Link href="/dashboard" className="flex items-center gap-2 ml-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">ДП</span>
            </div>
            <span className="font-semibold text-xl hidden sm:inline-block">
              Диплом.Платформа
            </span>
          </Link>
        </div>

        {isAuthenticated && user ? (
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:flex" />

            <div className="relative" ref={menuRef}>
              <button
                className="flex items-center gap-1 py-1 px-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div className="hidden sm:flex flex-col items-start ml-1">
                  <span className="text-sm font-medium text-gray-900 max-w-[120px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
              </button>

              {/* Выпадающее меню пользователя */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                  <div className="px-4 py-3">
                    <p className="text-sm leading-5 font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-sm leading-5 text-gray-500 truncate">
                      {user.email}
                    </p>
                    {user.role && (
                      <span
                        className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 text-white ${
                          getRoleBadgeInfo(user.role).bgColor
                        }`}
                      >
                        {getRoleBadgeInfo(user.role).text}
                      </span>
                    )}
                  </div>
                  <div className="py-1">
                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Профиль
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Настройки
                    </Link>

                    {/* Кнопка переключения темы для мобильных */}
                    <button
                      className="flex sm:hidden w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        // Добавить здесь логику переключения темы
                        setUserMenuOpen(false);
                      }}
                    >
                      Переключить тему
                    </button>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        // Логика выхода из системы
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Выйти
                    </button>
                  </div>
                </div>
              )}
            </div>

            <LogoutButton className="hidden sm:flex" />
          </div>
        ) : null}
      </div>
    </header>
  );
}
