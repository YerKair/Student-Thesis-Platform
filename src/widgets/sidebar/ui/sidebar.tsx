"use client";

import Link from "next/link";
import { useAuthContext } from "@/app/providers/auth-provider";
import {
  LayoutDashboard,
  Users,
  FileText,
  UserCircle,
  Settings,
  BookOpen,
  GraduationCap,
  MenuSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  roles?: string[];
  badge?: string;
  badgeColor?: string;
}

export function Sidebar({
  collapsed: propCollapsed,
  onToggle,
}: {
  collapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
}) {
  const { user } = useAuthContext();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(propCollapsed || false);

  // Синхронизируем внутреннее состояние с пропсами
  useEffect(() => {
    if (propCollapsed !== undefined) {
      setCollapsed(propCollapsed);
    }
  }, [propCollapsed]);

  // Обработчик переключения состояния
  const handleToggle = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    if (onToggle) {
      onToggle(newCollapsed);
    }
  };

  const navItems: NavItem[] = [
    {
      title: "Дашборд",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Профиль",
      href: "/dashboard/profile",
      icon: <UserCircle className="h-5 w-5" />,
    },
    {
      title: "Команды",
      href: "/dashboard/teams",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Договоры",
      href: "/dashboard/contracts",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Дипломная работа",
      href: "/dashboard/thesis",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Пользователи",
      href: "/dashboard/users",
      icon: <Users className="h-5 w-5" />,
      roles: ["admin"],
    },
    {
      title: "Учебные программы",
      href: "/dashboard/programs",
      icon: <GraduationCap className="h-5 w-5" />,
      roles: ["admin", "teacher"],
    },
    {
      title: "Настройки",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  // Фильтрация навигационных элементов в зависимости от роли
  const filteredNavItems = navItems.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role))
  );

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 z-20 ${
        collapsed ? "w-20" : "w-60"
      }`}
    >
      <button
        className="absolute top-4 right-2 p-0 h-6 w-6 flex items-center justify-center bg-transparent border-none cursor-pointer text-gray-600 hover:text-gray-900"
        onClick={handleToggle}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className="h-full overflow-y-auto p-3 pt-8">
        <div className="space-y-1">
          {filteredNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between py-2 px-3 rounded-md transition-colors ${
                pathname === item.href
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-md ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="truncate text-sm">{item.title}</span>
                )}
              </div>

              {!collapsed && item.badge && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full text-white ${
                    item.badgeColor || "bg-blue-500"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <div className="bg-blue-50 rounded-md p-3 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <MenuSquare className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">Нужна помощь?</p>
            <p className="text-xs text-gray-500 mt-1">
              Посетите наш справочный центр
            </p>
            <button className="mt-2 text-sm text-blue-600 hover:underline">
              Открыть справку
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
