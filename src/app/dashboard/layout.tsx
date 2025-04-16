"use client";

import { ProtectedRoute } from "@/features/auth/ui";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={(collapsed) => setSidebarCollapsed(collapsed)}
          />
          <main
            className={`flex-1 transition-all duration-300 ${
              sidebarCollapsed ? "ml-20" : "ml-60"
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
