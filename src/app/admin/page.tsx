"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { UserPlus, Users } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button
              className="w-full"
              onClick={() => router.push("/admin/users")}
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button
              className="w-full"
              onClick={() => router.push("/admin/register")}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Register New Admin
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
