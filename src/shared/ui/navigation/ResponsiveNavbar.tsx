import { cn } from "@/shared/lib/utils";
import { useState, useEffect, ReactNode } from "react";
import { ResponsiveContainer } from "../layout/ResponsiveContainer";
import { X, Menu } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon?: ReactNode;
  isActive?: boolean;
}

export interface ResponsiveNavbarProps {
  logo: ReactNode;
  items: NavItem[];
  rightContent?: ReactNode;
  className?: string;
  containerClassName?: string;
  compactLogo?: boolean;
}

export function ResponsiveNavbar({
  logo,
  items,
  rightContent,
  className,
  containerClassName,
  compactLogo = false,
}: ResponsiveNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all duration-200",
        isScrolled &&
          "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <ResponsiveContainer
        className={cn("relative", containerClassName)}
        compactOnMobile={true}
      >
        <div className="flex h-14 sdl:h-16 items-center justify-between">
          <div className="flex items-center overflow-hidden">
            <div
              className={cn(
                "flex-shrink-0 mr-1 xxs:mr-2",
                compactLogo ? "scale-75 xxs:scale-90 xs:scale-100" : "min-w-8"
              )}
            >
              {logo}
            </div>

            {/* Desktop navigation */}
            <nav className="ml-0 xxs:ml-1 xs:ml-2 hidden sdl:flex sdl:space-x-2 md:space-x-4 lg:space-x-6 overflow-x-auto scrollbar-hide">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "nav-item whitespace-nowrap text-xs sdl:text-sm md:text-base",
                    item.isActive && "nav-item-active"
                  )}
                >
                  {item.icon && (
                    <span className="flex-shrink-0 mr-1 sdl:mr-1.5">
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Right content for desktop */}
          <div className="hidden sdl:flex sdl:items-center sdl:space-x-1 md:space-x-2 overflow-hidden">
            {rightContent}
          </div>

          {/* Mobile menu button */}
          <div className="flex sdl:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-1.5 xxs:p-2 text-muted-foreground hover:bg-secondary hover:text-foreground focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-5 w-5 xxs:h-6 xxs:w-6" />
              ) : (
                <Menu className="h-5 w-5 xxs:h-6 xxs:w-6" />
              )}
            </button>
          </div>
        </div>
      </ResponsiveContainer>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={cn(
          "sdl:hidden",
          isOpen ? "fixed inset-0 z-50 flex flex-col bg-background" : "hidden"
        )}
      >
        <div className="flex h-14 xxs:h-16 items-center justify-between border-b px-3 xxs:px-4">
          <div className="flex-shrink-0 overflow-hidden">{logo}</div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-1.5 xxs:p-2 text-muted-foreground hover:bg-secondary hover:text-foreground focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-5 w-5 xxs:h-6 xxs:w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 xxs:px-4 py-4 xxs:py-6">
          <nav className="flex flex-col space-y-2 xxs:space-y-3 xs:space-y-4">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "nav-item break-words",
                  item.isActive && "nav-item-active"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.icon && (
                  <span className="flex-shrink-0 mr-1 xxs:mr-1.5">
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Right content for mobile */}
          {rightContent && (
            <div className="mt-4 xxs:mt-6 flex flex-col space-y-2 xxs:space-y-4 overflow-hidden">
              {rightContent}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
