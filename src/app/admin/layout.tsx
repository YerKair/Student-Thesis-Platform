"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "@/app/providers/auth-provider";
import { LogoutButton } from "@/features/auth/ui/logout-button";
import {
  Loader2,
  Users,
  Settings,
  Bell,
  FileText,
  LayoutDashboard,
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/shared/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading, logout } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    // Для тестирования отключаем проверку на роль админа
    // if (!isLoading && isAuthenticated && user?.role !== "admin") {
    //   router.push("/dashboard");
    // }

    // Проверяем только авторизацию
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, router, user]);

  // Навигационные элементы
  const navItems: NavItem[] = [
    {
      title: "Обзор",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Пользователи",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Роли",
      href: "/admin/roles",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
      title: "Уведомления",
      href: "/admin/notifications",
      icon: <Bell className="h-5 w-5" />,
    },
    {
      title: "Документы",
      href: "/admin/documents",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Настройки",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  // Определение активного пункта меню
  const getIsActive = (href: string) => {
    if (href === "/admin" && pathname === "/admin") {
      return true;
    }
    return pathname?.startsWith(href) && href !== "/admin";
  };

  // Получение инициалов из имени
  const getInitials = (name: string) => {
    if (!name) return "ПА"; // Пользователь Администратор
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`;
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="mt-4 text-lg text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  // Только проверка на авторизацию
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Боковая панель (десктоп) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <Link href="/admin" className="flex items-center">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">ДП</span>
            </div>
            <div className="ml-3">
              <h1 className="font-bold text-gray-900">Админ-панель</h1>
              <p className="text-xs text-gray-500">DiploMate</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 pt-4 px-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      getIsActive(item.href)
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700"
                    }
                  `}
                >
                  <span
                    className={`mr-3 ${
                      getIsActive(item.href) ? "text-blue-600" : ""
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            href="/dashboard"
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md transition-colors"
          >
            Вернуться в портал
          </Link>
        </div>
      </aside>

      {/* Основной контент */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Верхняя панель */}
        <header className="bg-white border-b border-gray-200 shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            {/* Кнопка мобильного меню */}
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 md:hidden focus:outline-none"
            >
              {isMobileNavOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Заголовок на мобильном */}
            <div className="flex md:hidden">
              <span className="text-lg font-bold text-gray-900">
                Админ-панель
              </span>
            </div>

            {/* Правая секция */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-2"
                asChild
              >
                <Link href="/admin/notifications">
                  <Bell className="h-4 w-4" />
                  <span>Уведомления</span>
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 p-1 pr-2 rounded-full"
                  >
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-700">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500">Администратор</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">Профиль</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/settings">Настройки</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Мобильная навигация */}
        {isMobileNavOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
            <nav className="px-2 py-3">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${
                          getIsActive(item.href)
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700"
                        }
                      `}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <span
                        className={`mr-3 ${
                          getIsActive(item.href) ? "text-blue-600" : ""
                        }`}
                      >
                        {item.icon}
                      </span>
                      {item.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/dashboard"
                    className="flex items-center px-3 py-2 mt-4 rounded-md text-sm font-medium text-gray-700 bg-gray-100 transition-colors"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <span className="mr-3">
                      <LayoutDashboard className="h-5 w-5" />
                    </span>
                    Вернуться в портал
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Основное содержимое */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
