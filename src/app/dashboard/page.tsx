"use client";

import dynamic from "next/dynamic";
import { useAuthContext } from "@/app/providers/auth-provider";
import { useProfileCompletion } from "@/features/dashboard/hooks/use-profile-completion";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/shared/ui/button";
import { Shield } from "lucide-react";
import {
  PageTransition,
  SlideIn,
  StaggeredChildren,
} from "@/shared/ui/smooth-transition";

// Динамический импорт компонентов
const DashboardStats = dynamic(() => import("@/widgets/dashboard/stats"), {
  loading: () => <div className="h-32 animate-pulse bg-gray-100 rounded-lg" />,
});

const DashboardEvents = dynamic(() => import("@/widgets/dashboard/events"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-lg" />,
});

const DashboardRecommendations = dynamic(
  () => import("@/widgets/dashboard/recommendations"),
  {
    loading: () => (
      <div className="h-64 animate-pulse bg-gray-100 rounded-lg" />
    ),
  }
);

export default function DashboardPage() {
  const { user, token } = useAuthContext();
  const { profile } = useProfileCompletion(token);

  // Получаем имя для приветствия
  const getDisplayName = () => {
    if (profile?.fullname) {
      // Берем первое слово из полного имени
      return profile.fullname.split(" ")[0];
    }
    if (user?.name) {
      return user.name.split(" ")[0];
    }
    return "пользователь";
  };

  return (
    <PageTransition className="w-full px-4 py-6 space-y-6">
      <SlideIn direction="down" delay={0.1}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Добро пожаловать, {getDisplayName()}!
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Здесь вы можете отслеживать прогресс вашей работы
            </p>
          </div>
          {user?.role === "admin" && (
            <Link href="/admin">
              <Button className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Панель администратора
              </Button>
            </Link>
          )}
        </div>
      </SlideIn>

      <SlideIn direction="up" delay={0.3}>
        <Suspense
          fallback={
            <div className="h-32 animate-pulse bg-gray-100 rounded-lg" />
          }
        >
          <DashboardStats />
        </Suspense>
      </SlideIn>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
        <Suspense
          fallback={
            <div className="h-64 animate-pulse bg-gray-100 rounded-lg" />
          }
        >
          <div className="xl:col-span-2">
            <DashboardEvents />
          </div>
        </Suspense>

        <Suspense
          fallback={
            <div className="h-64 animate-pulse bg-gray-100 rounded-lg" />
          }
        >
          <DashboardRecommendations />
        </Suspense>
      </div>
    </PageTransition>
  );
}
