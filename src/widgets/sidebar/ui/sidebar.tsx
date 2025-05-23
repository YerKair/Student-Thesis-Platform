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
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { AIChat } from "@/features/ai-chat";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  roles?: string[];
  badge?: string;
  badgeColor?: string;
}

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  collapsed: propCollapsed,
  onToggle,
  isMobile = false,
  onClose,
}: SidebarProps) {
  const { user } = useAuthContext();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(propCollapsed || false);
  const [showAIChat, setShowAIChat] = useState(false);

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
      badge: "Новое",
      badgeColor: "bg-green-500",
    },
    {
      title: "Супервайзер",
      href: "/supervisor",
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

  // В мобильном режиме сайдбар всегда развернут (не collapsed)
  const sidebarClasses = isMobile
    ? "fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl border-r border-gray-200"
    : cn(
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-20",
        collapsed ? "w-20" : "w-64"
      );

  return (
    <>
      <aside className={sidebarClasses}>
        {isMobile ? (
          // Кнопка закрытия для мобильной версии
          <button
            className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 text-gray-600 transition-colors"
            onClick={onClose}
            aria-label="Закрыть меню"
          >
            <X className="h-5 w-5" />
          </button>
        ) : (
          // Кнопка сворачивания для десктопной версии
          <button
            className="absolute top-20 -right-3.5 p-1.5 h-7 w-7 flex items-center justify-center bg-white rounded-full border border-gray-200 cursor-pointer text-gray-600 shadow-sm transition-all z-30"
            onClick={handleToggle}
            aria-label={collapsed ? "Развернуть меню" : "Свернуть меню"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}

        <div
          className={cn(
            "h-full overflow-y-auto pt-16 pb-24",
            collapsed ? "px-2" : "px-3"
          )}
        >
          <div className="space-y-1.5 staggered-fade-in mt-3">
            {filteredNavItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between py-2.5 px-3 rounded-lg transition-all",
                    isActive
                      ? "bg-primary-light text-primary font-medium"
                      : "text-gray-600",
                    collapsed && !isMobile ? "justify-center" : "",
                    index === 0 ? "mt-2" : ""
                  )}
                  onClick={isMobile && onClose ? onClose : undefined}
                >
                  <div
                    className={cn(
                      "flex items-center gap-3",
                      collapsed && !isMobile ? "justify-center" : ""
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-gray-500"
                      )}
                    >
                      {item.icon}
                    </span>
                    {(!collapsed || isMobile) && (
                      <span className="truncate text-sm">{item.title}</span>
                    )}
                  </div>

                  {(!collapsed || isMobile) && item.badge && (
                    <span
                      className={cn(
                        "text-xs px-1.5 py-0.5 rounded-full text-white",
                        item.badgeColor || "bg-primary"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {(!collapsed || isMobile) && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <div className="p-4 rounded-lg bg-white shadow-sm">
              <div className="flex flex-col items-center text-center">
                <HelpCircle className="h-6 w-6 mb-2 text-primary" />
                <h4 className="text-sm font-medium text-gray-900">
                  Нужна помощь?
                </h4>
                <p className="text-xs mt-1 text-gray-600">
                  Посетите наш справочный центр
                </p>
                <button
                  className="mt-3 text-sm text-primary"
                  onClick={() => setShowAIChat(true)}
                >
                  Открыть справку
                </button>
              </div>
            </div>
          </div>
        )}

        {collapsed && !isMobile && (
          <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 bg-white">
            <div className="flex justify-center">
              <button
                className="p-2 rounded-full bg-white text-primary"
                onClick={() => setShowAIChat(true)}
              >
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </aside>

      <AIChat open={showAIChat} onOpenChange={setShowAIChat} />
    </>
  );
}
