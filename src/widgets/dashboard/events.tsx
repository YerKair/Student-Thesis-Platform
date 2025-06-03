"use client";

import { Calendar, Clock } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

const events = [
  {
    title: "Встреча с научным руководителем",
    date: "18 апреля, 15:00",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: "Дедлайн подачи первой главы",
    date: "25 апреля, 23:59",
    icon: <Clock className="h-4 w-4" />,
  },
];

export default function DashboardEvents() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Ближайшие события</CardTitle>
            <CardDescription>
              График предстоящих дедлайнов и встреч
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            Все события
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.length > 0 ? (
            events.map((event, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-3 rounded-lg border transition-colors"
              >
                <div className="rounded-full p-2 bg-blue-50 text-blue-600">
                  {event.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm md:text-base truncate">
                    {event.title}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
                    {event.date}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  Подробнее
                </Button>
              </div>
            ))
          ) : (
            <div className="h-32 flex items-center justify-center text-gray-500">
              У вас нет предстоящих событий
            </div>
          )}
        </div>
        <Button variant="outline" size="sm" className="mt-4 w-full sm:hidden">
          Все события
        </Button>
      </CardContent>
    </Card>
  );
}
