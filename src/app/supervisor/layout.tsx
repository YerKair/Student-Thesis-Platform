"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Bell, Home, Users } from "lucide-react";
import { Button } from "@/shared/ui/button";
import dynamic from "next/dynamic";
export default function SupervisorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  // Убедимся, что компонент монтирован только на клиенте
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-white border border-gray-200 shadow-sm flex items-center justify-center mr-2 overflow-hidden">
                <Image
                  src="/Diplomate.png"
                  alt="DiploMate"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-lg text-black">
                Супервайзер
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-black border-gray-100"
            >
              <Link href="/dashboard/notifications">
                <Bell className="h-4 w-4 mr-2" />
                Уведомления
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-black border-gray-100"
            >
              <Link href="/dashboard">
                <Home className="h-4 w-4 mr-2" />
                Главная
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-6 px-4 text-black">{children}</main>
    </div>
  );
}
