"use client";

import { CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

const recommendations = [
  {
    title: "Заполните профиль",
    description: "Заполните данные профиля для более эффективной работы",
  },
  {
    title: "Присоединитесь к команде",
    description: "Работа в команде улучшает качество проекта",
  },
  {
    title: "Подпишите договор",
    description: "Требуется подписать договор о прохождении практики",
  },
];

export default function DashboardRecommendations() {
  return (
    <Card className="bg-gradient-to-b from-blue-50 to-white border-blue-100">
      <CardHeader>
        <CardTitle className="text-lg">Рекомендации</CardTitle>
        <CardDescription>Что стоит сделать в первую очередь</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="rounded-full p-1.5 bg-blue-100 text-blue-600 mt-0.5">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-sm">{rec.title}</p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {rec.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 