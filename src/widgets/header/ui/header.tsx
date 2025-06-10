"use client";

import Link from "next/link";
import { useAuthContext } from "@/app/providers/auth-provider";
import { LogoutButton } from "@/features/auth/ui/logout-button";
import { User, ChevronDown, Bell, MessageSquare } from "lucide-react";
import Image from "next/image";
import { Button } from "@/shared/ui/button";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { ChatDropdown } from "@/features/chat/ui/chat-dropdown";
import { NotificationBell } from "@/features/notifications/ui/notification-bell";
import { useNotifications } from "@/features/notifications/hooks/use-notifications";

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const { user, isAuthenticated } = useAuthContext();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Хук для уведомлений (только для студентов)
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();

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
          bgColor: "bg-red-100",
          textColor: "text-red-800",
        };
      case "supervisor":
        return {
          text: "Руководитель",
          bgColor: "bg-blue-100",
          textColor: "text-blue-800",
        };
      case "student":
        return {
          text: "Студент",
          bgColor: "bg-green-100",
          textColor: "text-green-800",
        };
      default:
        return {
          text: "Пользователь",
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
        };
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 shadow-sm bg-white">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          {/* Гамбургер меню, отображаемое только на мобильных */}
          {children}

          <Link href="/dashboard" className="flex items-center gap-2.5 ml-2">
            <div className="h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200 overflow-hidden">
              <Image
                src="/Diplomate.png"
                alt="DiploMate"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <span className="font-semibold text-xl hidden sm:inline-block text-black">
              DiploMate
            </span>
          </Link>
        </div>

        {isAuthenticated && user ? (
          <div className="flex items-center gap-3">
            {/* Notifications button - функциональные уведомления только для студентов */}
            {user.roles?.includes("student") ? (
              <NotificationBell
                unreadCount={unreadCount}
                notifications={notifications}
                href="/student/notifications"
                compact={true}
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
              />
            ) : (
              /* Статичная кнопка уведомлений для других ролей с улучшенным дизайном */
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {/* Можно добавить статичный бейдж для демонстрации */}
                {user.roles?.includes("supervisor") && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-gray-400 rounded-full"></span>
                )}
              </Button>
            )}

            {/* Messages button */}
            <div className="relative" ref={chatRef}>
              <button
                className="h-9 w-9 rounded-full hidden sm:flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
                onClick={() => setChatOpen(!chatOpen)}
              >
                <MessageSquare className="h-5 w-5" />
              </button>

              <ChatDropdown
                isOpen={chatOpen}
                onClose={() => setChatOpen(false)}
              />
            </div>

            <div className="relative" ref={menuRef}>
              <button
                className="flex items-center gap-2 py-1.5 pl-1.5 pr-2.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-gray-700 duration-300",
                    userMenuOpen ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>

              {/* Выпадающее меню пользователя */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 border border-gray-200 overflow-hidden fade-in">
                  <div className="px-4 py-3">
                    <p className="text-sm leading-5 font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-sm leading-5 text-gray-500 truncate">
                      {user.email}
                    </p>
                    {user.role && (
                      <span
                        className={cn(
                          "mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4",
                          getRoleBadgeInfo(user.role).bgColor,
                          getRoleBadgeInfo(user.role).textColor
                        )}
                      >
                        {getRoleBadgeInfo(user.role).text}
                      </span>
                    )}
                  </div>
                  <div className="py-1">
                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Профиль
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Настройки
                    </Link>

                    {/* Кнопка переключения темы для мобильных */}
                    <button
                      className="flex sm:hidden w-full items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
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
                      className="block w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-gray-100"
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
