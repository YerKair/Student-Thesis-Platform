import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";

export interface MobileNavItem {
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export interface MobileBottomBarProps {
  items: MobileNavItem[];
  className?: string;
  position?: "fixed" | "sticky";
}

/**
 * Компонент нижней навигационной панели для мобильных устройств.
 * Отображается только на мобильных устройствах, скрыт на десктопе.
 */
export function MobileBottomBar({
  items,
  className,
  position = "fixed",
}: MobileBottomBarProps) {
  return (
    <div
      className={cn(
        "md:hidden w-full bg-background border-t border-border z-40",
        position === "fixed"
          ? "fixed bottom-0 left-0 right-0"
          : "sticky bottom-0",
        "safe-area-bottom", // Для учета safe area на iOS
        className
      )}
    >
      <nav className="flex items-center justify-around h-16 px-2">
        {items.map((item, index) => {
          // Определяем базовые свойства для всех элементов
          const baseProps = {
            key: index,
            className: cn(
              "flex flex-col items-center justify-center w-full h-full text-xs",
              "transition-colors duration-200",
              item.isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            ),
          };

          // Рендерим ссылку или кнопку в зависимости от наличия href
          if (item.href) {
            return (
              <a {...baseProps} href={item.href}>
                <div className="mb-1">{item.icon}</div>
                <span>{item.label}</span>
              </a>
            );
          } else {
            return (
              <button {...baseProps} type="button" onClick={item.onClick}>
                <div className="mb-1">{item.icon}</div>
                <span>{item.label}</span>
              </button>
            );
          }
        })}
      </nav>
    </div>
  );
}

/**
 * Вспомогательный компонент, который добавляет нижний отступ равный высоте MobileBottomBar,
 * чтобы контент не скрывался за фиксированной панелью.
 */
export function MobileBottomBarSpacer() {
  return <div className="h-16 md:h-0 w-full" />;
}
